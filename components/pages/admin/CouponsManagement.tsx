import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Coupon } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const couponSchema = z.object({
  code: z.string().trim().min(1, "Code is required").max(30).transform(v => v.toUpperCase()),
  discount_type: z.string().min(1),
  discount_value: z.coerce.number().min(0, "Min 0"),
  expires_at: z.string().min(1, "Expiry date is required"),
  usage_limit: z.coerce.number().nullable().optional(),
  is_active: z.boolean(),
});

type CouponForm = z.infer<typeof couponSchema>;

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewCoupon, setViewCoupon] = useState<Coupon | null>(null);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: { code: '', discount_type: 'PERCENTAGE', discount_value: 0, expires_at: '', usage_limit: null, is_active: true },
  });

  const fetchData = async () => {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setCoupons((data as Coupon[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => { setEditing(null); form.reset({ code: '', discount_type: 'PERCENTAGE', discount_value: 0, expires_at: '', usage_limit: null, is_active: true }); setDialogOpen(true); };
  const openEdit = (c: Coupon) => { setEditing(c); form.reset({ code: c.code, discount_type: c.discount_type, discount_value: c.discount_value, expires_at: c.expires_at.slice(0, 16), usage_limit: c.usage_limit, is_active: c.is_active }); setDialogOpen(true); };

  const handleSave = async (data: CouponForm) => {
    setLoading(true);
    const payload = { ...data, expires_at: new Date(data.expires_at).toISOString() };
    if (editing) {
      const { error } = await supabase.from("coupons").update(payload as any).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Coupon updated" });
    } else {
      const { error } = await supabase.from("coupons").insert([payload as any]);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Coupon created" });
    }
    setLoading(false); setDialogOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchData(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">Coupons ({coupons.length})</h2>
        <Button onClick={openCreate} className="gradient-teal text-primary-foreground gap-1"><Plus className="h-4 w-4" /> Add Coupon</Button>
      </div>
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader><TableRow className="border-b border-border">
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Code</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Type</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Value</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Expires</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Usage</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Active</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {coupons.map(c => (
              <TableRow key={c.id} className="border-b border-border">
                <TableCell className="font-mono font-bold">{c.code}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{c.discount_type}</Badge></TableCell>
                <TableCell className="font-semibold">{c.discount_type === 'PERCENTAGE' ? `${c.discount_value}%` : `$${c.discount_value}`}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(c.expires_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{c.used_count}/{c.usage_limit || '∞'}</TableCell>
                <TableCell><Badge className={c.is_active ? "bg-success/10 text-success border-success/20 text-[10px]" : "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"}>{c.is_active ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewCoupon(c)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {coupons.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No coupons</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewCoupon} onOpenChange={() => setViewCoupon(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">Coupon: {viewCoupon?.code}</DialogTitle></DialogHeader>
          {viewCoupon && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Code", viewCoupon.code], ["Type", viewCoupon.discount_type], ["Value", viewCoupon.discount_type === 'PERCENTAGE' ? `${viewCoupon.discount_value}%` : `$${viewCoupon.discount_value}`], ["Expires", format(new Date(viewCoupon.expires_at), 'PPP')], ["Used", `${viewCoupon.used_count}/${viewCoupon.usage_limit || '∞'}`], ["Active", viewCoupon.is_active ? "Yes" : "No"]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">{editing ? "Edit Coupon" : "Add Coupon"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
              <FormField control={form.control} name="code" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Code</FormLabel><FormControl><Input {...field} placeholder="SUMMER2024" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="discount_type" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Discount Type</FormLabel><FormControl>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...field}>
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="FIXED">Fixed Amount</option>
                  </select></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="discount_value" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Value</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="expires_at" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Expires At</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="usage_limit" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Usage Limit (empty = unlimited)</FormLabel><FormControl><Input type="number" value={field.value || ''} onChange={e => field.onChange(e.target.value ? +e.target.value : null)} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="is_active" render={({ field }) => (
                <FormItem className="flex items-center gap-2"><FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} /></FormControl><FormLabel>Active</FormLabel></FormItem>
              )} />
              <Button type="submit" className="w-full gradient-teal text-primary-foreground" disabled={loading}>{loading ? "Saving..." : editing ? "Update" : "Create"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
