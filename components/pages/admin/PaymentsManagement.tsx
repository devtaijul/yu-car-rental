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
const statusStyle = (s: PaymentStatus) => s === 'SUCCESS' ? "bg-success/10 text-success border-success/20" : s === 'FAILED' ? "bg-destructive/10 text-destructive border-destructive/20" : s === 'REFUNDED' ? "bg-primary/10 text-primary border-primary/20" : "bg-warning/10 text-warning border-warning/20";

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
      <div className="rounded-lg border border-border overflow-x-auto bg-card">
        <Table>
          <TableHeader><TableRow className="border-b border-border">
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Amount</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Method</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Transaction ID</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Status</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold">Date</TableHead>
            <TableHead className="text-xs uppercase tracking-wider font-semibold text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {payments.map(p => (
              <TableRow key={p.id} className="border-b border-border">
                <TableCell className="font-semibold">${p.amount}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{p.payment_method}</Badge></TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{p.transaction_id || "—"}</TableCell>
                <TableCell><Badge className={`${statusStyle(p.status)} text-[10px]`}>{p.status}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(p.created_at), 'MMM dd, yyyy')}</TableCell>
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
        <DialogContent><DialogHeader><DialogTitle className="font-display">Payment Details</DialogTitle></DialogHeader>
          {viewPayment && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Amount", `$${viewPayment.amount}`], ["Method", viewPayment.payment_method], ["Transaction", viewPayment.transaction_id || "—"], ["Booking", viewPayment.booking_id.slice(0, 8)], ["Date", format(new Date(viewPayment.created_at), 'PPP')]].map(([l, v]) => (
                <div key={String(l)}><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{l}</span><p className="font-medium">{String(v)}</p></div>
              ))}
              <div><span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Status</span><p><Badge className={`${statusStyle(viewPayment.status)} text-[10px]`}>{viewPayment.status}</Badge></p></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editPayment} onOpenChange={() => setEditPayment(null)}>
        <DialogContent><DialogHeader><DialogTitle className="font-display">Update Payment Status</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Status</Label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={e => setStatus(e.target.value as PaymentStatus)}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <Button className="w-full gradient-teal text-primary-foreground" onClick={handleStatusUpdate}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
