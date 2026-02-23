import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Driver } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const driverSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  license_no: z.string().trim().min(1, "License is required").max(30),
  experience: z.coerce.number().min(0, "Min 0").max(50),
  is_available: z.boolean(),
});

type DriverForm = z.infer<typeof driverSchema>;

export default function DriversManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDriver, setViewDriver] = useState<Driver | null>(null);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<DriverForm>({
    resolver: zodResolver(driverSchema),
    defaultValues: { name: '', phone: '', license_no: '', experience: 0, is_available: true },
  });

  const fetchData = async () => {
    const { data } = await supabase.from("drivers").select("*").order("created_at", { ascending: false });
    setDrivers((data as Driver[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); form.reset({ name: '', phone: '', license_no: '', experience: 0, is_available: true }); setDialogOpen(true); };
  const openEdit = (d: Driver) => { setEditing(d); form.reset({ name: d.name, phone: d.phone, license_no: d.license_no, experience: d.experience, is_available: d.is_available }); setDialogOpen(true); };

  const handleSave = async (data: DriverForm) => {
    setLoading(true);
    if (editing) {
      const { error } = await supabase.from("drivers").update(data as any).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Driver updated" });
    } else {
      const { error } = await supabase.from("drivers").insert([data as any]);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Driver created" });
    }
    setLoading(false); setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this driver?")) return;
    const { error } = await supabase.from("drivers").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchData(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">Drivers ({drivers.length})</h2>
        <Button onClick={openCreate} className="gradient-teal text-primary-foreground gap-1"><Plus className="h-4 w-4" /> Add Driver</Button>
      </div>
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader><TableRow className="border-b border-border">
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Name</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Phone</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">License</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Experience</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Available</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {drivers.map(d => (
              <TableRow key={d.id} className="border-b border-border">
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-muted-foreground">{d.phone}</TableCell>
                <TableCell className="font-mono text-xs">{d.license_no}</TableCell>
                <TableCell>{d.experience} yrs</TableCell>
                <TableCell><Badge className={d.is_available ? "bg-success/10 text-success border-success/20 text-[10px]" : "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"}>{d.is_available ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewDriver(d)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(d)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(d.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {drivers.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No drivers</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewDriver} onOpenChange={() => setViewDriver(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">{viewDriver?.name}</DialogTitle></DialogHeader>
          {viewDriver && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Phone", viewDriver.phone], ["License", viewDriver.license_no], ["Experience", `${viewDriver.experience} years`], ["Available", viewDriver.is_available ? "Yes" : "No"]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">{editing ? "Edit Driver" : "Add Driver"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
              {(["name", "phone", "license_no"] as const).map(field => (
                <FormField key={field} control={form.control} name={field} render={({ field: f }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{field.replace("_", " ")}</FormLabel><FormControl><Input {...f} /></FormControl><FormMessage /></FormItem>
                )} />
              ))}
              <FormField control={form.control} name="experience" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Experience (years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="is_available" render={({ field }) => (
                <FormItem className="flex items-center gap-2"><FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} /></FormControl><FormLabel>Available</FormLabel></FormItem>
              )} />
              <Button type="submit" className="w-full gradient-teal text-primary-foreground" disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Create"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
