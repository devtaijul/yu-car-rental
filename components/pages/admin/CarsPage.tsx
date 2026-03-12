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
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="lg:flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">
              Cars Inventory
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Manage your fleet, track status, and update details.
            </p>
          </div>
          <button
            onClick={() => router.push(PAGES.ADMIN.CARS.CREATE)}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:self-start sm:px-5 sm:text-sm"
          >
            <Plus className="h-4 w-4" /> ADD NEW CAR
          </button>
        </div>

        {/* Search — full width on mobile */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model or plate..."
            className="w-full rounded-lg border bg-card py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-xl border md:w-full w-[95vw]">
        {/* Tabs — horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto border-b px-2 scrollbar-hide sm:px-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 whitespace-nowrap px-3 py-4 text-[11px] font-semibold tracking-wider transition-colors sm:px-4 sm:text-xs ${
                activeTab === i
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
                          <p className="font-semibold text-foreground">{car.name}</p>
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
                        <DeleteCarAction id={car.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden w-min">
          {cars.map((car) => {
            const availability = getAvailabilityInfo(car.availability);
            const normalizedAvailableUntil =
              availability.availableUntil?.toLowerCase() ?? "";
            const isRightNow =
              availability.message.toLowerCase() === "right now" ||
              normalizedAvailableUntil.includes("right now") ||
              normalizedAvailableUntil.includes("infinite");
            return (
              <div key={car.id} className="flex gap-3 p-4">
                {/* Car Image */}
                <div className="flex h-12 w-16 p-2 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                  <CldImage
                    src={car.imageUrl}
                    alt={car.name}
                    width={80}
                    height={56}
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start md:justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {car.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {car.carType} • {car.year}
                      </p>
                    </div>
                    <span
                      className={`${statusBadgeBase} shrink-0 text-[10px] ${
                        statusBadgeVariants[car.carStatus] ??
                        "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {car.carStatus.replace("_", " ")}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Plate
                      </p>
                      <p className="font-mono text-sm font-semibold text-foreground">
                        {car.plate}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Next Available
                      </p>
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
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          router.push(PAGES.ADMIN.CARS.EDIT(car.id.toString()))
                        }
                        className="rounded-lg p-2 transition-colors hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <DeleteCarAction id={car.id} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t px-4 py-4 sm:flex-row sm:px-6">
          <p className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">5</span> of{" "}
            <span className="font-semibold text-foreground">1,248</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted sm:px-3 sm:text-sm">
              ←
            </button>
            <button className="rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-primary-foreground sm:px-3 sm:text-sm">
              1
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-muted sm:px-3 sm:text-sm">
              2
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-muted sm:px-3 sm:text-sm">
              3
            </button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="hidden rounded-lg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted sm:block">
              250
            </button>
            <button className="rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted sm:px-3 sm:text-sm">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
