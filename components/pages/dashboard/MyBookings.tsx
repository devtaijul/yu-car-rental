"use client";

import { Input } from "@/components/ui/input";
import { TABS, TabValue } from "@/data/utils";
import { cn } from "@/lib/utils";
import { BookingWithAll } from "@/types/system";
import { Search } from "lucide-react";
import { useState } from "react";
import { BookingCard } from "./BookingCard";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";

export default function MyBookings({
  bookings,
  limit = "3",
}: {
  bookings: BookingWithAll[];
  limit?: string;
}) {
  const [activeTab, setActiveTab] = useState<TabValue>("ALL_TRIPS");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onHandleTabChange = (value: TabValue) => {
    setActiveTab(value);

    // set query params to status = value and others same as before .
    const params = new URLSearchParams({
      status: value,
      limit,
    });

    router.push(`${PAGES.DASHBOARD.BOOKINGS}?${params.toString()}`);
  };

  const onLimitUpdate = (value: number) => {
    // set query params to limit = value and others same as before .
    const params = new URLSearchParams({
      status: activeTab,
      limit: value.toString(),
    });
    router.push(`${PAGES.DASHBOARD.BOOKINGS}?${params.toString()}`);
  };

  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase">
            My Bookings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your active rentals and review your trip history.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicle, location or ID"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={onHandleTabChange.bind(null, tab.value)}
            className={cn(
              "px-6 py-2 text-sm font-medium transition-colors border",
              tab.value === activeTab
                ? "bg-primary text-primary-foreground border-transparent"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <div className="space-y-4">
        {bookings.length === 0 && (
          <div className="min-h-32 flex items-center justify-center">
            <p>No bookings found</p>
          </div>
        )}
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>

      <div className="text-center">
        <button
          className="text-sm text-muted-foreground font-medium uppercase tracking-wider hover:text-primary"
          onClick={onLimitUpdate.bind(null, parseInt(limit) + 3)}
        >
          Load Older Trips ▾
        </button>
      </div>
    </div>
  );
}
