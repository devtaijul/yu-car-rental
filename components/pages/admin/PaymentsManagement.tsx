import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Payment, PaymentStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const STATUSES: PaymentStatus[] = ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'];
const statusColor = (s: PaymentStatus) => s === 'SUCCESS' ? 'default' : s === 'FAILED' ? 'destructive' : s === 'REFUNDED' ? 'secondary' : 'outline';

export default function PaymentsManagement() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [viewPayment, setViewPayment] = useState<Payment | null>(null);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [status, setStatus] = useState<PaymentStatus>('PENDING');
  const { toast } = useToast();

  const fetchData = async () => {
    const { data } = await supabase.from("payments").select("*").order("created_at", { ascending: false });
    setPayments((data as Payment[]) || []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatusUpdate = async () => {
    if (!editPayment) return;
    const { error } = await supabase.from("payments").update({ status }).eq("id", editPayment.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Payment updated" }); setEditPayment(null); fetchData(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this payment?")) return;
    const { error } = await supabase.from("payments").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchData(); }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-display font-bold">Payments ({payments.length})</h2>
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Transaction ID</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">${p.amount}</TableCell>
                <TableCell><Badge variant="outline">{p.payment_method}</Badge></TableCell>
                <TableCell className="text-xs font-mono">{p.transaction_id || "—"}</TableCell>
                <TableCell><Badge variant={statusColor(p.status)}>{p.status}</Badge></TableCell>
                <TableCell className="text-xs">{format(new Date(p.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="icon" variant="ghost" onClick={() => setViewPayment(p)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => { setEditPayment(p); setStatus(p.status); }}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {payments.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No payments</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!viewPayment} onOpenChange={() => setViewPayment(null)}>
        <DialogContent><DialogHeader><DialogTitle>Payment Details</DialogTitle></DialogHeader>
          {viewPayment && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Amount:</span> ${viewPayment.amount}</div>
              <div><span className="text-muted-foreground">Method:</span> {viewPayment.payment_method}</div>
              <div><span className="text-muted-foreground">Transaction:</span> {viewPayment.transaction_id || "—"}</div>
              <div><span className="text-muted-foreground">Status:</span> <Badge variant={statusColor(viewPayment.status)}>{viewPayment.status}</Badge></div>
              <div><span className="text-muted-foreground">Booking:</span> {viewPayment.booking_id.slice(0, 8)}</div>
              <div><span className="text-muted-foreground">Date:</span> {format(new Date(viewPayment.created_at), 'PPP')}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editPayment} onOpenChange={() => setEditPayment(null)}>
        <DialogContent><DialogHeader><DialogTitle>Update Payment Status</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Label>Status</Label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={e => setStatus(e.target.value as PaymentStatus)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button className="w-full" onClick={handleStatusUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
