"use client";

import { PAGES } from "@/config/pages.config";
import { User } from "@/generated/prisma/client";
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
import { PaginationAdmin } from "./PaginationAdmin";

const statusTabs = ["All Users", "Active", "Pending"];
const statusBadgeBase =
  "inline-flex items-center gap-2 rounded border px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase";
const statusBadgeVariants: Record<string, string> = {
  VERIFIED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  SUSPENDED: "border-rose-200 bg-rose-50 text-rose-600",
};

const statusBadgeVariantsFn = (status: boolean) => {
  if (status) {
    return statusBadgeVariants.VERIFIED;
  } else {
    return statusBadgeVariants.PENDING;
  }
};

const statusDotVariants: Record<string, string> = {
  VERIFIED: "bg-emerald-500",
  PENDING: "bg-amber-500",
  SUSPENDED: "bg-rose-500",
};

const statusDotVariantsFn = (status: boolean) => {
  if (status) {
    return statusDotVariants.VERIFIED;
  } else {
    return statusDotVariants.PENDING;
  }
};

const UsersPage = ({
  users,
  page,
  limit,
  totalCount,
}: {
  users: (User & {
    totalBookings: number;
    totalSpend: number;
    _count: {
      bookings: number;
    };
  })[];
  page: string;
  limit: string;
  totalCount: number;
}) => {
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
            {users.map((user) => (
              <div key={user.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold `}
                    >
                      {user.firstName.charAt(0).toUpperCase() +
                        user.lastName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground wrap-break-word">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground wrap-break-word">
                        {user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        # {user.id}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`${statusBadgeBase} ${
                      statusBadgeVariantsFn(user.isVerified) ??
                      "border-border bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        statusDotVariantsFn(user.isVerified) ??
                        "bg-muted-foreground"
                      }`}
                    />
                    {user.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>

                {/* <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
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
                </div> */}

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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold `}
                      >
                        {user.firstName.charAt(0).toUpperCase() +
                          user.lastName.charAt(1).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {user.firstName + " " + user.lastName}
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
                    {user.totalBookings}
                  </td>
                  <td className="py-4 px-4 text-center font-bold">
                    ${user.totalSpend}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`${statusBadgeBase} ${
                        statusBadgeVariantsFn(user.isVerified) ??
                        "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          statusDotVariantsFn(user.isVerified) ??
                          "bg-muted-foreground"
                        }`}
                      />
                      {user.isVerified ? "Verified" : "Unverified"}
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

        <PaginationAdmin
          page={parseInt(page)}
          limit={parseInt(limit)}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default UsersPage;
