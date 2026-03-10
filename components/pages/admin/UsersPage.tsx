"use client";

import { PAGES } from "@/config/pages.config";
import {
  Search,
  UserPlus,
  Eye,
  Pencil,
  Ban,
  Filter,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statusTabs = ["All Users", "Active", "Pending"];
const statusBadgeBase =
  "inline-flex items-center gap-2 rounded border px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase";
const statusBadgeVariants: Record<string, string> = {
  VERIFIED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  SUSPENDED: "border-rose-200 bg-rose-50 text-rose-600",
};
const statusDotVariants: Record<string, string> = {
  VERIFIED: "bg-emerald-500",
  PENDING: "bg-amber-500",
  SUSPENDED: "bg-rose-500",
};

const mockUsers = [
  {
    id: "YU-8432",
    name: "Sarah Jenkins",
    email: "sarah.j@company.net",
    initials: "SJ",
    color: "bg-primary/20",
    bookings: 3,
    spent: "$890.00",
    status: "VERIFIED",
    statusClass: "badge-verified",
  },
  {
    id: "YU-9044",
    name: "David Kim",
    email: "david.kim88@gmail.com",
    initials: "DK",
    color: "bg-muted",
    bookings: 0,
    spent: "$0.00",
    status: "PENDING",
    statusClass: "badge-pending",
  },
  {
    id: "YU-7721",
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    initials: "ER",
    color: "bg-success/20",
    bookings: 8,
    spent: "$2,840.00",
    status: "VERIFIED",
    statusClass: "badge-verified",
  },
  {
    id: "YU-6588",
    name: "Marcus Chen",
    email: "marcus.chen@startup.io",
    initials: "MC",
    color: "bg-warning/20",
    bookings: 2,
    spent: "$420.00",
    status: "SUSPENDED",
    statusClass: "badge-suspended",
  },
  {
    id: "YU-8102",
    name: "Amanda Patel",
    email: "amanda.p@example.com",
    initials: "AP",
    color: "bg-accent",
    bookings: 1,
    spent: "$180.00",
    status: "VERIFIED",
    statusClass: "badge-verified",
  },
];

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage customers, view activity, and update verification status.
          </p>
        </div>
        <button
          onClick={() => router.push(PAGES.ADMIN.USERS.CREATE)}
          className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity sm:w-auto"
        >
          <UserPlus className="h-4 w-4" /> ADD NEW USER
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or ID..."
            className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-full"
          />
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="flex w-full border rounded-lg overflow-hidden sm:w-auto">
            {statusTabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors sm:flex-none ${activeTab === i ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex w-full items-center justify-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors sm:w-auto">
            <Filter className="h-4 w-4" /> Filters
          </button>
          <button className="flex w-full items-center justify-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors sm:w-auto">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        {/* Mobile Cards */}
        <div className="md:hidden">
          <div className="divide-y">
            {mockUsers.map((user) => (
              <div key={user.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${user.color}`}
                    >
                      {user.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground break-words">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground break-words">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground"># {user.id}</p>
                    </div>
                  </div>
                  <span
                    className={`${statusBadgeBase} ${
                      statusBadgeVariants[user.status] ??
                      "border-border bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        statusDotVariants[user.status] ?? "bg-muted-foreground"
                      }`}
                    />
                    {user.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Bookings:{" "}
                    <span className="font-semibold text-foreground">
                      {user.bookings}
                    </span>
                  </span>
                  <span>
                    Spent:{" "}
                    <span className="font-semibold text-foreground">
                      {user.spent}
                    </span>
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-end gap-1">
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => router.push(PAGES.ADMIN.USERS.EDIT(user.id))}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Ban className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="hidden w-full text-sm md:table">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  User Profile
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bookings
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold ${user.color}`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          # {user.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold">
                    {user.bookings}
                  </td>
                  <td className="py-4 px-4 text-center font-bold">
                    {user.spent}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`${statusBadgeBase} ${
                        statusBadgeVariants[user.status] ??
                        "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusDotVariants[user.status] ?? "bg-muted-foreground"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() =>
                          router.push(PAGES.ADMIN.USERS.EDIT(user.id))
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Ban className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 px-4 sm:px-6 py-4 border-t sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">6</span> of{" "}
            <span className="font-semibold text-foreground">8,921</span> users
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-end">
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
              48
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

export default UsersPage;
