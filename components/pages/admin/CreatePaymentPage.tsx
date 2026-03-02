"use client";

import { PAGES } from "@/config/pages.config";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const paymentMethods = [
  "CREDIT_CARD",
  "DEBIT_CARD",
  "PAYPAL",
  "BANK_TRANSFER",
  "CASH",
];
const paymentStatuses = ["PAID", "PENDING", "FAILED", "REFUNDED"];

const CreatePaymentPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    customerId: "",
    bookingRef: "",
    amount: "",
    method: "CREDIT_CARD",
    status: "PENDING",
    cardLast4: "",
    transactionId: "",
    notes: "",
  });

  const update = (key: string, value: any) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create payment:", form);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push(PAGES.ADMIN.PAYMENTS.ROOT)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO PAYMENTS
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          RECORD <span className="text-primary">PAYMENT</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manually record a payment transaction.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-sm font-bold text-foreground mb-4">
            PAYMENT STATUS
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
              >
                {paymentStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Transaction ID
              </label>
              <input
                value={form.transactionId}
                onChange={(e) => update("transactionId", e.target.value)}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                placeholder="TXN-XXXX"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">
              PAYMENT DETAILS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Customer ID *
                </label>
                <input
                  value={form.customerId}
                  onChange={(e) => update("customerId", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="YU-8432"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Booking Reference *
                </label>
                <input
                  value={form.bookingRef}
                  onChange={(e) => update("bookingRef", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="YU-847291"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => update("amount", e.target.value)}
                  required
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="1250.00"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Payment Method *
                </label>
                <select
                  value={form.method}
                  onChange={(e) => update("method", e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  {paymentMethods.map((m) => (
                    <option key={m} value={m}>
                      {m.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                  Card Last 4 Digits
                </label>
                <input
                  value={form.cardLast4}
                  onChange={(e) => update("cardLast4", e.target.value)}
                  maxLength={4}
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="4242"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
                Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                className="w-full px-3 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(PAGES.ADMIN.PAYMENTS.ROOT)}
              className="px-6 py-2.5 text-sm font-semibold border rounded-lg hover:bg-muted transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              RECORD PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentPage;
