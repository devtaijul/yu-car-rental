"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { TABS } from "@/data/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function BookingCardSkeleton() {
  const [activeTab] = useState(0);
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
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab.value}
            className={cn(
              "px-6 py-2 text-sm font-medium transition-colors border",
              i === activeTab
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
        {[...Array(3)].map((booking) => {
          const featured = booking === 0;
          return (
            <Card
              key={booking}
              className="border border-border overflow-hidden animate-pulse"
            >
              <CardContent className="p-0">
                <div
                  className={`flex flex-col lg:flex-row gap-4 ${
                    featured ? "p-6" : "p-4"
                  }`}
                >
                  {/* Image Skeleton */}
                  <div className="p-6 bg-[#F8FAFC]">
                    <div
                      className={`bg-muted rounded ${
                        featured ? "w-full lg:w-[320px] h-50" : "w-50 h-20"
                      }`}
                    />
                  </div>

                  {/* Content Skeleton */}
                  <div className="flex-1 space-y-4">
                    {/* Title + Price */}
                    <div className="flex justify-between">
                      <div className="space-y-2 w-1/2">
                        <div className="h-3 w-20 bg-muted rounded" />
                        <div
                          className={`bg-muted rounded ${
                            featured ? "h-6 w-40" : "h-5 w-32"
                          }`}
                        />
                        {featured && (
                          <div className="h-3 w-32 bg-muted rounded" />
                        )}
                      </div>

                      <div className="space-y-2 w-24 text-right">
                        <div
                          className={`bg-muted rounded ${
                            featured ? "h-6 w-20 ml-auto" : "h-5 w-16 ml-auto"
                          }`}
                        />
                        <div className="h-3 w-20 bg-muted rounded ml-auto" />
                      </div>
                    </div>

                    {/* Featured Layout */}
                    {featured ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-3 w-16 bg-muted rounded" />
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-3 w-40 bg-muted rounded" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-16 bg-muted rounded" />
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-3 w-40 bg-muted rounded" />
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-border">
                          <div className="h-5 w-40 bg-muted rounded" />
                          <div className="h-8 w-32 bg-muted rounded" />
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-6">
                        <div className="h-10 w-40 bg-muted rounded" />
                        <div className="h-10 w-40 bg-muted rounded" />
                        <div className="h-10 w-32 bg-muted rounded" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <button className="text-sm text-muted-foreground font-medium uppercase tracking-wider hover:text-primary">
          Load Older Trips ▾
        </button>
      </div>
    </div>
  );
}
