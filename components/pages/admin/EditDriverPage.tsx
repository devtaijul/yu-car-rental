import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const statuses = ["VERIFIED", "PENDING", "SUSPENDED"];

const mockDriver = {
  name: "Marcus Johnson", email: "marcus.j@email.com", phone: "+1 (555) 019-2834",
  licenseNumber: "DL-8472910", licenseExpiry: "2026-10-15", status: "VERIFIED",
  address: "123 Main St", city: "New York", country: "USA",
  emergencyContact: "Jane Johnson", emergencyPhone: "+1 (555) 111-2222", notes: "",
  rating: 4.9, trips: 342,
};

const EditDriverPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(mockDriver);

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update driver:", id, form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate("/drivers")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="h-4 w-4" /> BACK TO DRIVERS
        </button>
        <h1 className="text-2xl font-bold text-foreground">EDIT <span className="text-primary">DRIVER</span></h1>
        <p className="text-muted-foreground mt-1">Update driver details and verification status.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">STATUS</h3>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Verification Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">PERFORMANCE</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Rating</span><span className="font-bold">⭐ {form.rating}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Trips</span><span className="font-bold">{form.trips}</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">PERSONAL INFORMATION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name *</label><input value={form.name} onChange={(e) => update("name", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email *</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Phone *</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">LICENSE & DOCUMENTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">License Number *</label><input value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">License Expiry *</label><input type="date" value={form.licenseExpiry} onChange={(e) => update("licenseExpiry", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">ADDRESS & EMERGENCY</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Address</label><input value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">City</label><input value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Country</label><input value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Emergency Contact</label><input value={form.emergencyContact} onChange={(e) => update("emergencyContact", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Emergency Phone</label><input value={form.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            </div>
            <div className="mt-4"><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Notes</label><textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" /></div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate("/drivers")} className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors">CANCEL</button>
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"><Save className="h-4 w-4" /> UPDATE DRIVER</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDriverPage;
