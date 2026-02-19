import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Booking, BookingStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const STATUSES: BookingStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
const statusColor = (s: BookingStatus) => s === 'CONFIRMED' ? 'default' : s === 'COMPLETED' ? 'secondary' : s === 'CANCELLED' ? 'destructive' : 'outline';

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [status, setStatus] = useState<BookingStatus>('PENDING');
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("bookings").select("*, cars(name, brand), profiles!bookings_user_id_fkey(name)").order("created_at", { ascending: false });
    setBookings((data as any[])?.map(b => ({ ...b, car: b.cars, profile: b.profiles })) || []);
  };

  useEffect(() => { fetch(); }, []);

  const handleStatusUpdate = async () => {
    if (!editBooking) return;
    const { error } = await supabase.from("bookings").update({ status }).eq("id", editBooking.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Status updated" }); setEditBooking(null); fetch(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Booking deleted" }); fetch(); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">Bookings ({bookings.length})</h2>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.car?.name || b.car_id}</TableCell>
                <TableCell>{b.profile?.name || b.user_id.slice(0,8)}</TableCell>
                <TableCell className="text-xs">{format(new Date(b.start_date), 'MMM dd')} - {format(new Date(b.end_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>${b.total_amount}</TableCell>
                <TableCell><Badge variant={statusColor(b.status)}>{b.status}</Badge></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewBooking(b)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { setEditBooking(b); setStatus(b.status); }}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No bookings</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
        <DialogContent><DialogHeader><DialogTitle>Booking Details</DialogTitle></DialogHeader>
          {viewBooking && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Car:</span> {viewBooking.car?.name}</div>
              <div><span className="text-muted-foreground">Customer:</span> {viewBooking.profile?.name}</div>
              <div><span className="text-muted-foreground">Start:</span> {format(new Date(viewBooking.start_date), 'PPP')}</div>
              <div><span className="text-muted-foreground">End:</span> {format(new Date(viewBooking.end_date), 'PPP')}</div>
              <div><span className="text-muted-foreground">Days:</span> {viewBooking.total_days}</div>
              <div><span className="text-muted-foreground">Price/Day:</span> ${viewBooking.price_per_day}</div>
              <div><span className="text-muted-foreground">Discount:</span> ${viewBooking.discount}</div>
              <div><span className="text-muted-foreground">Total:</span> ${viewBooking.total_amount}</div>
              <div><span className="text-muted-foreground">Status:</span> <Badge variant={statusColor(viewBooking.status)}>{viewBooking.status}</Badge></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
        <DialogContent><DialogHeader><DialogTitle>Update Booking Status</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Label>Status</Label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={e => setStatus(e.target.value as BookingStatus)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button className="w-full" onClick={handleStatusUpdate}>Update Status</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
