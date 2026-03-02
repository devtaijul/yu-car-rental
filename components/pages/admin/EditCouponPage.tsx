/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const discountTypes = ["PERCENTAGE", "FIXED_AMOUNT", "FREE_UPGRADE"];
const couponStatuses = ["ACTIVE", "EXPIRED", "DISABLED"];

const mockCoupon = {
  code: "SUMMER24",
  discountType: "PERCENTAGE",
  discountValue: "20",
  startDate: "2024-06-01",
  endDate: "2024-08-31",
  maxUsage: "500",
  usedCount: 145,
  status: "ACTIVE",
  description: "Summer season promotion",
  minBookingAmount: "100",
};

const EditCouponPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState(mockCoupon);

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Update coupon:", id, form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push("/coupons")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO COUPONS
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          EDIT <span className="text-primary">COUPON</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Update coupon settings for {form.code}.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="space-y-4">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">STATUS</h3>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              {couponStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">USAGE</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Used</span>
                <span className="font-bold">{form.usedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max</span>
                <span className="font-bold">{form.maxUsage || "∞"}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-primary/60 rounded-full"
                  style={{
                    width: `${(form.usedCount / (parseInt(form.maxUsage) || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              COUPON DETAILS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Coupon Code *
                </label>
                <input
                  value={form.code}
                  onChange={(e) => update("code", e.target.value.toUpperCase())}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 font-mono uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Discount Type *
                </label>
                <select
                  value={form.discountType}
                  onChange={(e) => update("discountType", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {discountTypes.map((d) => (
                    <option key={d} value={d}>
                      {d.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  {form.discountType === "PERCENTAGE"
                    ? "Discount (%)"
                    : "Discount ($)"}
                </label>
                <input
                  type="number"
                  value={form.discountValue}
                  onChange={(e) => update("discountValue", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Min Booking Amount ($)
                </label>
                <input
                  type="number"
                  value={form.minBookingAmount}
                  onChange={(e) => update("minBookingAmount", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              VALIDITY & LIMITS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  End Date
                </label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => update("endDate", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Max Usage
                </label>
                <input
                  type="number"
                  value={form.maxUsage}
                  onChange={(e) => update("maxUsage", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/coupons")}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Save className="h-4 w-4" /> UPDATE COUPON
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCouponPage;
