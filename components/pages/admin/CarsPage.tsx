"use client";

import { PAGES } from "@/config/pages.config";
import { getAvailabilityInfo } from "@/lib/utils";
import { CarWithAvailability } from "@/types/system";
import { Pencil, Plus, Search } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteCarAction } from "./DeleteCarAction";

const tabs = [
  "ALL CARS (1,248)",
  "AVAILABLE (850)",
  "ON RENT (342)",
  "MAINTENANCE (56)",
];

const statusBadgeBase =
  "inline-flex items-center justify-center rounded border px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase";
const statusBadgeVariants: Record<string, string> = {
  AVAILABLE: "border-emerald-200 bg-emerald-50 text-emerald-700",
  ON_RENT: "border-blue-200 bg-blue-50 text-blue-700",
  MAINTENANCE: "border-rose-200 bg-rose-50 text-rose-600",
};

export const CarsPage = ({ cars }: { cars: CarWithAvailability[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cars Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your fleet, track status, and update details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model or plate..."
              className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-64"
            />
          </div>
          <button
            onClick={() => router.push(PAGES.ADMIN.CARS.CREATE)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> ADD NEW CAR
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-xl border">
        {/* Tabs */}
        <div className="flex border-b px-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`py-4 px-4 text-xs font-semibold tracking-wider transition-colors ${
                activeTab === i
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Car Details
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  License Plate
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Next Available
                </th>

                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => {
                const availability = getAvailabilityInfo(car.availability);
                const normalizedAvailableUntil =
                  availability.availableUntil?.toLowerCase() ?? "";
                const isRightNow =
                  availability.message.toLowerCase() === "right now" ||
                  normalizedAvailableUntil.includes("right now") ||
                  normalizedAvailableUntil.includes("infinite");
                return (
                  <tr
                    key={car.id}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        <CldImage
                          src={car.imageUrl}
                          alt={car.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {car.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {car.carType} • {car.year}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono font-semibold text-foreground">
                      {car.plate}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`${statusBadgeBase} ${
                        statusBadgeVariants[car.carStatus] ??
                        "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {car.carStatus.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p
                     className={`text-xs ${
                          isRightNow
                            ? "text-emerald-600 font-semibold"
                            : "text-muted-foreground"
                        }`}
                    >
                      {availability.message}
                    </p>

                    {availability.availableUntil && (
                      <p
                        className={`text-xs ${
                          isRightNow
                            ? "text-emerald-600 font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {availability.availableUntil}
                      </p>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(PAGES.ADMIN.CARS.EDIT(car.id.toString()))
                        }
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {/* <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      </button> */}
                      <DeleteCarAction id={car.id} />
                    </div>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">5</span> of{" "}
            <span className="font-semibold text-foreground">1,248</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              ←
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-foreground hover:bg-muted transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-foreground hover:bg-muted transition-colors">
              3
            </button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="px-3 py-1.5 text-sm rounded-lg text-foreground hover:bg-muted transition-colors">
              250
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
