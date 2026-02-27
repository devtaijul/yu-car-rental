export const BookingDetailsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-3 w-32 bg-muted rounded" />
        <div className="h-8 w-64 bg-muted rounded" />
      </div>

      {/* Top Card Skeleton */}
      <div className="border border-border bg-card rounded shadow-card">
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Car Image */}
            <div className="bg-muted p-6 relative flex items-center justify-center lg:w-87.5 h-50 rounded">
              <div className="w-full h-full bg-muted rounded" />
              <div className="absolute top-4 right-4 h-4 w-16 bg-muted rounded-full" />
              <div className="absolute bottom-3 left-3 h-4 w-24 bg-muted rounded text-xs" />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              {/* Car Name + ID */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-6 w-40 bg-muted rounded" />
                  <div className="h-3 w-24 bg-muted rounded" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-6 w-20 bg-muted rounded" />
                  <div className="h-3 w-32 bg-muted rounded" />
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-28 bg-muted rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-4 w-32 bg-muted rounded" />
                  <div className="h-3 w-28 bg-muted rounded" />
                </div>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-muted rounded-full" />
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-5 w-6 bg-muted rounded" />
                  <div className="h-3 w-10 bg-muted rounded" />
                  <div className="h-5 w-6 bg-muted rounded" />
                  <div className="h-3 w-10 bg-muted rounded" />
                </div>
                <div className="h-10 w-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rental Itinerary */}
        <div className="lg:col-span-2 border border-border bg-card rounded shadow-card space-y-4 p-4">
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-16 w-full bg-muted rounded" />
            <div className="h-16 w-full bg-muted rounded" />
          </div>
        </div>

        {/* Payment Summary */}
        <div className="border border-border bg-card rounded shadow-card space-y-4 p-4">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-6 w-full bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
