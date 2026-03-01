import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const paymentStatuses = ["PAID", "PENDING", "FAILED", "REFUNDED"];
const paymentMethods = ["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "BANK_TRANSFER", "CASH"];

const mockPayment = {
  invoiceId: "INV-2024-001", customerId: "YU-8432", customerName: "Alex Johnson",
  bookingRef: "YU-847291", amount: "1250.00", method: "CREDIT_CARD",
  cardLast4: "4242", status: "PAID", transactionId: "TXN-9928371", notes: "",
};

const EditPaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(mockPayment);

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update payment:", id, form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate("/payments")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="h-4 w-4" /> BACK TO PAYMENTS
        </button>
        <h1 className="text-2xl font-bold text-foreground">EDIT <span className="text-primary">PAYMENT</span></h1>
        <p className="text-muted-foreground mt-1">Update payment status and details for {form.invoiceId}.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">STATUS</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Payment Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
                {paymentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">REFERENCE</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Invoice</span><span className="font-mono font-bold">{form.invoiceId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-semibold">{form.customerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Booking</span><span className="font-mono">{form.bookingRef}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">PAYMENT DETAILS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Amount ($) *</label><input type="number" step="0.01" value={form.amount} onChange={(e) => update("amount", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Payment Method</label>
                <select value={form.method} onChange={(e) => update("method", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
                  {paymentMethods.map((m) => <option key={m} value={m}>{m.replace("_", " ")}</option>)}
                </select>
              </div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Card Last 4</label><input value={form.cardLast4} onChange={(e) => update("cardLast4", e.target.value)} maxLength={4} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Transaction ID</label><input value={form.transactionId} onChange={(e) => update("transactionId", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            </div>
            <div className="mt-4"><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Notes</label><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" /></div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate("/payments")} className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors">CANCEL</button>
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"><Save className="h-4 w-4" /> UPDATE PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPaymentPage;
