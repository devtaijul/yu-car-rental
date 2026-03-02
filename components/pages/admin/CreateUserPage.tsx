"use client";
import { ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roles = ["USER", "ADMIN", "MODERATOR"];
const statuses = ["VERIFIED", "PENDING", "SUSPENDED"];

const CreateUserPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCode: "+880",
    password: "",
    role: "USER",
    dateOfBirth: "",
    licenseNumber: "",
    company: "",
    street: "",
    houseNo: "",
    postCode: "",
    city: "",
    country: "",
    stateRegion: "",
  });

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create user:", form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push("/users")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO USERS
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          CREATE <span className="text-primary">NEW USER</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Add a new customer to the system.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">
            PERSONAL INFORMATION
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                First Name *
              </label>
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="John"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Last Name *
              </label>
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Phone
              </label>
              <div className="flex gap-2">
                <input
                  value={form.phoneCode}
                  onChange={(e) => update("phoneCode", e.target.value)}
                  className="w-20 px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="1757418181"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Password *
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Role *
              </label>
              <select
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Date of Birth
              </label>
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => update("dateOfBirth", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                License Number
              </label>
              <input
                value={form.licenseNumber}
                onChange={(e) => update("licenseNumber", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="DL-1234567"
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">
            ADDRESS INFORMATION
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Company
              </label>
              <input
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Street
              </label>
              <input
                value={form.street}
                onChange={(e) => update("street", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                House No
              </label>
              <input
                value={form.houseNo}
                onChange={(e) => update("houseNo", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Post Code
              </label>
              <input
                value={form.postCode}
                onChange={(e) => update("postCode", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                City
              </label>
              <input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Country
              </label>
              <input
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                State/Region
              </label>
              <input
                value={form.stateRegion}
                onChange={(e) => update("stateRegion", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            CREATE USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
