"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car } from "@/generated/prisma/client";
import { CarType, FuelType, TransmissionType } from "@/generated/prisma/enums";
import { useToast } from "@/hooks/use-toast";

import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { CAR_TYPES, FUEL_TYPES, TRANSMISSION_TYPES } from "@/lib/utils";

const emptyCar = {
  name: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  car_type: "SEDAN" as CarType,
  fuel_type: "PETROL" as FuelType,
  transmission: "AUTOMATIC" as TransmissionType,
  seats: 4,
  price_per_day: 0,
  registration_no: "",
  is_available: true,
  description: "",
  image_url: "",
};

export function CarsManagement({ cars }: { cars: Car[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewCar, setViewCar] = useState<Car | null>(null);
  const [editing, setEditing] = useState<Car | null>(null);
  const [form, setForm] = useState(emptyCar);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm(emptyCar);
    setDialogOpen(true);
  };
  const openEdit = (car: Car) => {
    setEditing(car);
    /*  setForm({
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      car_type: car.carType,
      FuelType: car.fuelType,
      transmission: car.transmission,
      seats: car.seats,
      price_per_day: car.price_per_day,
      registration_no: car.registration_no,
      is_available: car.is_available,
      description: car.description || "",
      image_url: car.image_url || "",
    }); */
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    /*    if (editing) {
      const { error } = await supabase
        .from("cars")
        .update(form)
        .eq("id", editing.id);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Car updated" });
    } else {
      const { error } = await supabase.from("cars").insert(form);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Car created" });
    } */
    setLoading(false);
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    /*   const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Car deleted" });
    } */
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">Cars ({cars.length})</h2>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1" /> Add Car
        </Button>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.name}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>
                  <Badge variant="outline">{car.carType}</Badge>
                </TableCell>
                <TableCell>${car.pricePerDay}</TableCell>
                <TableCell>
                  <Badge variant={car.isAvailable ? "default" : "destructive"}>
                    {car.isAvailable ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewCar(car)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEdit(car)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(car.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {cars.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No cars found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewCar} onOpenChange={() => setViewCar(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{viewCar?.name}</DialogTitle>
          </DialogHeader>
          {viewCar && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Brand:</span>{" "}
                {viewCar.brand}
              </div>
              <div>
                <span className="text-muted-foreground">Model:</span>{" "}
                {viewCar.model}
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>{" "}
                {viewCar.year}
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>{" "}
                {viewCar.carType}
              </div>
              <div>
                <span className="text-muted-foreground">Fuel:</span>{" "}
                {viewCar.fuelType}
              </div>
              <div>
                <span className="text-muted-foreground">Trans:</span>{" "}
                {viewCar.transmission}
              </div>
              <div>
                <span className="text-muted-foreground">Seats:</span>{" "}
                {viewCar.seats}
              </div>
              <div>
                <span className="text-muted-foreground">Price/Day:</span> $
                {viewCar.pricePerDay}
              </div>
              <div>
                <span className="text-muted-foreground">Reg No:</span>{" "}
                {viewCar.registrationNo}
              </div>
              <div>
                <span className="text-muted-foreground">Available:</span>{" "}
                {viewCar.isAvailable ? "Yes" : "No"}
              </div>
              {viewCar.description && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Description:</span>{" "}
                  {viewCar.description}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Car" : "Add New Car"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Brand</Label>
              <Input
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Model</Label>
              <Input
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Year</Label>
              <Input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: +e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Type</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.car_type}
                onChange={(e) =>
                  setForm({ ...form, car_type: e.target.value as CarType })
                }
              >
                {CAR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Fuel</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.fuel_type}
                onChange={(e) =>
                  setForm({ ...form, fuel_type: e.target.value as FuelType })
                }
              >
                {FUEL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Transmission</Label>
              <select
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.transmission}
                onChange={(e) =>
                  setForm({
                    ...form,
                    transmission: e.target.value as TransmissionType,
                  })
                }
              >
                {TRANSMISSION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Seats</Label>
              <Input
                type="number"
                value={form.seats}
                onChange={(e) => setForm({ ...form, seats: +e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Price/Day ($)</Label>
              <Input
                type="number"
                value={form.price_per_day}
                onChange={(e) =>
                  setForm({ ...form, price_per_day: +e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Registration No</Label>
              <Input
                value={form.registration_no}
                onChange={(e) =>
                  setForm({ ...form, registration_no: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) =>
                  setForm({ ...form, is_available: e.target.checked })
                }
              />
              <Label>Available</Label>
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <Button
            className="w-full mt-2"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : editing ? "Update Car" : "Create Car"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
