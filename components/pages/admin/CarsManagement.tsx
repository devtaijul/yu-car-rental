import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Car, CarType, FuelType, TransmissionType } from "@/types/database";
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

const CAR_TYPES: CarType[] = ['SEDAN', 'SUV', 'MICROBUS', 'HATCHBACK', 'PICKUP', 'LUXURY'];
const FUEL_TYPES: FuelType[] = ['PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC'];
const TRANSMISSIONS: TransmissionType[] = ['MANUAL', 'AUTOMATIC'];

const carSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  brand: z.string().trim().min(1, "Brand is required").max(50),
  model: z.string().trim().min(1, "Model is required").max(50),
  year: z.coerce.number().min(1990, "Min 1990").max(2030, "Max 2030"),
  car_type: z.enum(['SEDAN', 'SUV', 'MICROBUS', 'HATCHBACK', 'PICKUP', 'LUXURY']),
  fuel_type: z.enum(['PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC']),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  seats: z.coerce.number().min(1, "Min 1").max(50, "Max 50"),
  price_per_day: z.coerce.number().min(0, "Min 0"),
  registration_no: z.string().trim().min(1, "Registration is required").max(30),
  is_available: z.boolean(),
  description: z.string().max(500).optional(),
  image_url: z.string().max(500).optional(),
});

type CarForm = z.infer<typeof carSchema>;

export default function CarsManagement() {
  const [cars, setCars] = useState<Car[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewCar, setViewCar] = useState<Car | null>(null);
  const [editing, setEditing] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CarForm>({
    resolver: zodResolver(carSchema),
    defaultValues: { name: '', brand: '', model: '', year: new Date().getFullYear(), car_type: 'SEDAN', fuel_type: 'PETROL', transmission: 'AUTOMATIC', seats: 4, price_per_day: 0, registration_no: '', is_available: true, description: '', image_url: '' },
  });

  const fetchCars = async () => {
    const { data } = await supabase.from("cars").select("*").order("created_at", { ascending: false });
    setCars((data as Car[]) || []);
  };

  useEffect(() => { fetchCars(); }, []);

  const openCreate = () => { setEditing(null); form.reset({ name: '', brand: '', model: '', year: new Date().getFullYear(), car_type: 'SEDAN', fuel_type: 'PETROL', transmission: 'AUTOMATIC', seats: 4, price_per_day: 0, registration_no: '', is_available: true, description: '', image_url: '' }); setDialogOpen(true); };
  const openEdit = (car: Car) => { setEditing(car); form.reset({ name: car.name, brand: car.brand, model: car.model, year: car.year, car_type: car.car_type, fuel_type: car.fuel_type, transmission: car.transmission, seats: car.seats, price_per_day: car.price_per_day, registration_no: car.registration_no, is_available: car.is_available, description: car.description || '', image_url: car.image_url || '' }); setDialogOpen(true); };

  const handleSave = async (data: CarForm) => {
    setLoading(true);
    if (editing) {
      const { error } = await supabase.from("cars").update(data as any).eq("id", editing.id);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Car updated" });
    } else {
      const { error } = await supabase.from("cars").insert([data as any]);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Car created" });
    }
    setLoading(false);
    setDialogOpen(false);
    fetchCars();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Car deleted" }); fetchCars(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">Cars ({cars.length})</h2>
        <Button onClick={openCreate} className="gradient-teal text-primary-foreground gap-1"><Plus className="h-4 w-4" /> Add Car</Button>
      </div>

      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Name</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Brand</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Type</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Price/Day</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Available</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map(car => (
              <TableRow key={car.id} className="border-b border-border">
                <TableCell className="font-medium">{car.name}</TableCell>
                <TableCell className="text-muted-foreground">{car.brand}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{car.car_type}</Badge></TableCell>
                <TableCell className="font-semibold">${car.price_per_day}</TableCell>
                <TableCell><Badge className={car.is_available ? "bg-success/10 text-success border-success/20 text-[10px]" : "bg-destructive/10 text-destructive border-destructive/20 text-[10px]"}>{car.is_available ? "Yes" : "No"}</Badge></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewCar(car)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(car)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(car.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {cars.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No cars found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewCar} onOpenChange={() => setViewCar(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display">{viewCar?.name}</DialogTitle></DialogHeader>
          {viewCar && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Brand", viewCar.brand], ["Model", viewCar.model], ["Year", viewCar.year], ["Type", viewCar.car_type], ["Fuel", viewCar.fuel_type], ["Trans", viewCar.transmission], ["Seats", viewCar.seats], ["Price/Day", `$${viewCar.price_per_day}`], ["Reg No", viewCar.registration_no], ["Available", viewCar.is_available ? "Yes" : "No"]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
              {viewCar.description && <div className="col-span-2"><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Description</span><p>{viewCar.description}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{editing ? "Edit Car" : "Add New Car"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {(["name", "brand", "model"] as const).map(field => (
                  <FormField key={field} control={form.control} name={field} render={({ field: f }) => (
                    <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{field}</FormLabel><FormControl><Input {...f} /></FormControl><FormMessage /></FormItem>
                  )} />
                ))}
                <FormField control={form.control} name="year" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="car_type" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Type</FormLabel><FormControl>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...field}>
                      {CAR_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="fuel_type" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Fuel</FormLabel><FormControl>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...field}>
                      {FUEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="transmission" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Transmission</FormLabel><FormControl>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" {...field}>
                      {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="seats" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Seats</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="price_per_day" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Price/Day ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="registration_no" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Registration No</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="image_url" render={({ field }) => (
                  <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="is_available" render={({ field }) => (
                  <FormItem className="flex items-center gap-2 pt-5"><FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} /></FormControl><FormLabel className="text-sm">Available</FormLabel></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" className="w-full gradient-teal text-primary-foreground" disabled={loading}>{loading ? "Saving..." : editing ? "Update Car" : "Create Car"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
