"use client";

import { Search, Download, Filter, TrendingUp } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    label: "TOTAL REVENUE",
    value: "$1,245,680",
    sub: "↗ +14% from last month",
    dot: "status-active",
  },
  {
    label: "PENDING PAYMENTS",
    value: "$14,250",
    sub: "42 Invoices awaiting payment",
    dot: "status-pending",
  },
  {
    label: "SUCCESSFUL TXNS",
    value: "8,421",
    sub: "98.2% Success rate this year",
    dot: "status-completed",
  },
];

const mockPayments = [
  {
    id: "INV-2024-001",
    customer: "Alex Johnson",
    ref: "YU-847291",
    amount: "$1,250.00",
    method: "Visa •••• 4242",
    methodIcon: "💳",
    date: "Feb 21, 2024",
    status: "PAID",
    statusClass: "badge-paid",
  },
  {
    id: "INV-2024-002",
    customer: "Sarah Williams",
    ref: "YU-918233",
    amount: "$450.00",
    method: "Master •••• 8888",
    methodIcon: "💳",
    date: "Feb 10, 2024",
    status: "PENDING",
    statusClass: "badge-pending",
  },
  {
    id: "INV-2024-003",
    customer: "Michael Brown",
    ref: "YU-112944",
    amount: "+$500.00",
    method: "Original Method",
    methodIcon: "🔄",
    date: "Jan 15, 2024",
    status: "REFUNDED",
    statusClass: "badge-refunded",
    amountClass: "text-success",
  },
  {
    id: "INV-2024-004",
    customer: "Emily Davis",
    ref: "YU-554211",
    amount: "$1,120.00",
    method: "Amex •••• 1002",
    methodIcon: "💳",
    date: "Jan 05, 2024",
    status: "PAID",
    statusClass: "badge-paid",
  },
  {
    id: "INV-2023-089",
    customer: "Robert Chen",
    ref: "YU-229845",
    amount: "$850.00",
    method: "PayPal",
    methodIcon: "🅿️",
    date: "Dec 28, 2023",
    status: "PAID",
    statusClass: "badge-paid",
  },
  {
    id: "INV-2023-088",
    customer: "Jessica Taylor",
    ref: "YU-774123",
    amount: "$1,050.00",
    method: "Bank Transfer",
    methodIcon: "🏦",
    date: "Dec 20, 2023",
    status: "FAILED",
    statusClass: "badge-failed",
  },
];

export const PaymentsPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Payments & Invoices
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage billing history and track transactions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Download className="h-4 w-4" /> EXPORT REPORT
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-card rounded-xl border overflow-hidden">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`p-6 ${i < stats.length - 1 ? "border-r" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`status-dot ${s.dot}`} />
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                {s.label}
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Invoice ID or Customer..."
            className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-full"
          />
        </div>
        <button className="flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
          All Statuses
        </button>
        <button className="flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
          <Filter className="h-4 w-4" /> FILTERS
        </button>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Booking Ref
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6 font-mono font-medium">{p.id}</td>
                  <td className="py-4 px-4 font-medium">{p.customer}</td>
                  <td className="py-4 px-4 text-muted-foreground">{p.ref}</td>
                  <td
                    className={`py-4 px-4 font-bold ${p.amountClass || "text-foreground"}`}
                  >
                    {p.amount}
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-2">
                      <span>{p.methodIcon}</span>
                      <span className="text-muted-foreground">{p.method}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{p.date}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`status-badge-pill ${p.statusClass}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">8</span> of{" "}
            <span className="font-semibold text-foreground">482</span> results
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              ←
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              2
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              3
            </button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              60
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
