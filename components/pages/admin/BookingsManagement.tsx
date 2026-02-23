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
const statusStyle = (s: BookingStatus) => s === 'CONFIRMED' ? "bg-primary/10 text-primary border-primary/20" : s === 'COMPLETED' ? "bg-success/10 text-success border-success/20" : s === 'CANCELLED' ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/10 text-warning border-warning/20";

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
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Car</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Customer</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Dates</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Total</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id} className="border-b border-border">
                <TableCell className="font-medium">{b.car?.name || b.car_id}</TableCell>
                <TableCell className="text-muted-foreground">{b.profile?.name || b.user_id.slice(0,8)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(b.start_date), 'MMM dd')} - {format(new Date(b.end_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="font-semibold">${b.total_amount}</TableCell>
                <TableCell><Badge className={`${statusStyle(b.status)} text-[10px]`}>{b.status}</Badge></TableCell>
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
        <DialogContent><DialogHeader><DialogTitle className="font-display">Booking Details</DialogTitle></DialogHeader>
          {viewBooking && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Car", viewBooking.car?.name], ["Customer", viewBooking.profile?.name], ["Start", format(new Date(viewBooking.start_date), 'PPP')], ["End", format(new Date(viewBooking.end_date), 'PPP')], ["Days", viewBooking.total_days], ["Price/Day", `$${viewBooking.price_per_day}`], ["Discount", `$${viewBooking.discount}`], ["Total", `$${viewBooking.total_amount}`]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
              <div><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Status</span><p><Badge className={`${statusStyle(viewBooking.status)} text-[10px]`}>{viewBooking.status}</Badge></p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editBooking} onOpenChange={() => setEditBooking(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">Update Booking Status</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</Label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={e => setStatus(e.target.value as BookingStatus)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button className="w-full gradient-teal text-primary-foreground" onClick={handleStatusUpdate}>Update Status</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
