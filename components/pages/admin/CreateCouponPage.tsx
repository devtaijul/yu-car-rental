import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const discountTypes = ["PERCENTAGE", "FIXED_AMOUNT", "FREE_UPGRADE"];

const CreateCouponPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "", discountType: "PERCENTAGE", discountValue: "",
    startDate: "", endDate: "", maxUsage: "", description: "",
    minBookingAmount: "",
  });

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create coupon:", form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate("/coupons")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="h-4 w-4" /> BACK TO COUPONS
        </button>
        <h1 className="text-2xl font-bold text-foreground">CREATE <span className="text-primary">COUPON</span></h1>
        <p className="text-muted-foreground mt-1">Set up a new promotional discount code.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">COUPON DETAILS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Coupon Code *</label><input value={form.code} onChange={(e) => update("code", e.target.value.toUpperCase())} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 font-mono uppercase" placeholder="SUMMER24" /></div>
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Discount Type *</label>
              <select value={form.discountType} onChange={(e) => update("discountType", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
                {discountTypes.map((d) => <option key={d} value={d}>{d.replace("_", " ")}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">{form.discountType === "PERCENTAGE" ? "Discount (%)" : "Discount ($)"} *</label><input type="number" value={form.discountValue} onChange={(e) => update("discountValue", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder={form.discountType === "PERCENTAGE" ? "20" : "50"} /></div>
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Min Booking Amount ($)</label><input type="number" value={form.minBookingAmount} onChange={(e) => update("minBookingAmount", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="0" /></div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">VALIDITY & LIMITS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Start Date *</label><input type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">End Date *</label><input type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Max Usage (∞ if empty)</label><input type="number" value={form.maxUsage} onChange={(e) => update("maxUsage", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="500" /></div>
          </div>
          <div className="mt-4"><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Description</label><textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" placeholder="Promotional coupon for summer season..." /></div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate("/coupons")} className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors">CANCEL</button>
          <button type="submit" className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">CREATE COUPON</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCouponPage;
