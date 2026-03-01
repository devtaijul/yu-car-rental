import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statuses = ["VERIFIED", "PENDING", "SUSPENDED"];

const CreateDriverPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", licenseNumber: "", licenseExpiry: "",
    status: "PENDING", address: "", city: "", country: "",
    emergencyContact: "", emergencyPhone: "", notes: "",
  });

  const update = (key: string, value: any) => setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create driver:", form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button onClick={() => navigate("/drivers")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
          <ArrowLeft className="h-4 w-4" /> BACK TO DRIVERS
        </button>
        <h1 className="text-2xl font-bold text-foreground">ADD <span className="text-primary">NEW DRIVER</span></h1>
        <p className="text-muted-foreground mt-1">Register a new driver in the system.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile photo */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">DRIVER PHOTO</h3>
          <div className="border-2 border-dashed rounded-xl aspect-square flex items-center justify-center bg-muted/30">
            <label className="flex flex-col items-center gap-2 cursor-pointer text-muted-foreground">
              <Upload className="h-8 w-8" />
              <span className="text-sm font-medium">Upload photo</span>
              <span className="text-xs">PNG, JPG up to 5MB</span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">PERSONAL INFORMATION</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Full Name *</label><input value={form.name} onChange={(e) => update("name", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Marcus Johnson" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Email *</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Phone *</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="+1 (555) 019-2834" /></div>
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Status</label>
                <select value={form.status} onChange={(e) => update("status", e.target.value)} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30">
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">LICENSE & DOCUMENTS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block">License Number *</label><input value={form.licenseNumber} onChange={(e) => update("licenseNumber", e.target.value)} required className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="DL-8472910" /></div>
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
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Notes</label>
              <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate("/drivers")} className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors">CANCEL</button>
            <button type="submit" className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">ADD DRIVER</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateDriverPage;
