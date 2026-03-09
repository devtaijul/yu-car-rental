import React from "react";

export const AdminBookingDetailsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Back + Title */}
      <div className="space-y-2">
        <div className="h-4 w-40 bg-muted rounded" />
        <div className="h-8 w-64 bg-muted rounded" />
      </div>

      {/* Main Booking Card */}
      <div className="bg-card rounded-xl border p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Car Image */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-2">
            <div className="aspect-4/3 bg-muted rounded-xl" />
            <div className="h-6 w-40 bg-muted rounded" />
          </div>

          {/* Booking Info */}
          <div className="flex-1 space-y-6">
            {/* Top Row */}
            <div className="flex justify-between">
              <div className="space-y-2">
                <div className="h-7 w-48 bg-muted rounded" />
                <div className="h-4 w-64 bg-muted rounded" />
              </div>

              <div className="space-y-2 text-right">
                <div className="h-8 w-20 bg-muted rounded ml-auto" />
                <div className="h-4 w-16 bg-muted rounded ml-auto" />
              </div>
            </div>

            {/* Pickup Return */}
            <div className="flex gap-8">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-6 w-32 bg-muted rounded" />
                <div className="h-4 w-40 bg-muted rounded" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-16 bg-muted rounded" />
                <div className="h-6 w-32 bg-muted rounded" />
                <div className="h-4 w-40 bg-muted rounded" />
              </div>
            </div>

            {/* Time Remaining */}
            <div className="flex justify-between items-center border-t pt-4">
              <div className="flex gap-3 items-center">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-8 w-12 bg-muted rounded" />
                <div className="h-8 w-12 bg-muted rounded" />
              </div>

              <div className="h-10 w-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Itinerary */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-6 space-y-4">
          <div className="h-6 w-48 bg-muted rounded" />

          <div className="border rounded-lg p-4 space-y-2">
            <div className="h-3 w-32 bg-muted rounded" />
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <div className="h-3 w-32 bg-muted rounded" />
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <div className="h-6 w-40 bg-muted rounded" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-40 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>

            <div className="flex justify-between">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-16 bg-muted rounded" />
            </div>

            <div className="border-t pt-3 flex justify-between">
              <div className="h-5 w-24 bg-muted rounded" />
              <div className="h-6 w-20 bg-muted rounded" />
            </div>
          </div>

          <div className="h-10 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};
