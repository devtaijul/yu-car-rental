"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Driver } from "@/generated/prisma/client";

const emptyDriver = {
  name: "",
  phone: "",
  license_no: "",
  experience: 0,
  is_available: true,
};

export default function DriversManagement({ drivers }: { drivers: Driver[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDriver, setViewDriver] = useState<Driver | null>(null);
  const [editing, setEditing] = useState<Driver | null>(null);
  const [form, setForm] = useState(emptyDriver);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const openCreate = () => {
    setEditing(null);
    setForm(emptyDriver);
    setDialogOpen(true);
  };
  const openEdit = (d: Driver) => {
    setEditing(d);
    /* setForm({
      name: d.name,
      phone: d.phone,
      license_no: d.license_no,
      experience: d.experience,
      is_available: d.is_available,
    }); */
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setLoading(true);
    /* if (editing) {
      const { error } = await supabase
        .from("drivers")
        .update(form)
        .eq("id", editing.id);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Driver updated" });
    } else {
      const { error } = await supabase.from("drivers").insert(form);
      if (error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      else toast({ title: "Driver created" });
    }
    setLoading(false);
    setDialogOpen(false);
    fetchData(); */
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this driver?")) return;
    /*  const { error } = await supabase.from("drivers").delete().eq("id", id);
    if (error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    else {
      toast({ title: "Deleted" });
      fetchData();
    } */
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold">
          Drivers ({drivers.length})
        </h2>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-1" /> Add Driver
        </Button>
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Available</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell>{d.phone}</TableCell>
                <TableCell className="font-mono text-xs">
                  {d.licenseNo}
                </TableCell>
                <TableCell>{d.experience} yrs</TableCell>
                <TableCell>
                  <Badge variant={d.isAvailable ? "default" : "destructive"}>
                    {d.isAvailable ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setViewDriver(d)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEdit(d)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(d.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {drivers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No drivers
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewDriver} onOpenChange={() => setViewDriver(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewDriver?.name}</DialogTitle>
          </DialogHeader>
          {viewDriver && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {viewDriver.phone}
              </div>
              <div>
                <span className="text-muted-foreground">License:</span>{" "}
                {viewDriver.licenseNo}
              </div>
              <div>
                <span className="text-muted-foreground">Experience:</span>{" "}
                {viewDriver.experience} years
              </div>
              <div>
                <span className="text-muted-foreground">Available:</span>{" "}
                {viewDriver.isAvailable ? "Yes" : "No"}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Driver" : "Add Driver"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>License No</Label>
              <Input
                value={form.license_no}
                onChange={(e) =>
                  setForm({ ...form, license_no: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Experience (years)</Label>
              <Input
                type="number"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: +e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) =>
                  setForm({ ...form, is_available: e.target.checked })
                }
              />
              <Label>Available</Label>
            </div>
            <Button className="w-full" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
