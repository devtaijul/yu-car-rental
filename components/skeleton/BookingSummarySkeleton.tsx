"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function BookingSummarySkeleton() {
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div>
          <Skeleton className="h-8 w-48 mb-6" />

          <div className="bg-card border border-border overflow-hidden">
            {/* Car Image */}
            <Skeleton className="h-48 w-full" />

            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-56" />
                <Skeleton className="h-4 w-72" />
              </div>

              {/* Specs badges */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
              </div>

              {/* Booking details */}
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <div className="space-y-1 w-full">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border pt-6 space-y-3">
                <Skeleton className="h-5 w-40" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
                <Skeleton className="h-6 w-full mt-2" />
              </div>

              {/* No Hidden Fees Box */}
              <div className="rounded-xl border p-4 space-y-3">
                <Skeleton className="h-4 w-32" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-56" />
                ))}
              </div>
            </div>
          </div>

          {/* Why Choose */}
          <div className="mt-6 bg-card border border-border p-6 space-y-4">
            <Skeleton className="h-5 w-56" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="space-y-1 w-full">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-60" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <Skeleton className="h-8 w-56 mb-6" />

          <div className="bg-card border border-border p-6 space-y-6">
            {/* Personal Details */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-40" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>

            {/* License */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-52" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-44" />
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>

            {/* Total */}
            <div className="space-y-2 text-center">
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>

            {/* Button */}
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
