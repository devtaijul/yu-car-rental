export const CreateCarPageSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-muted rounded" />
        <div className="h-6 w-64 bg-muted rounded" />
        <div className="h-4 w-80 bg-muted rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image upload skeleton */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="aspect-4/3 bg-muted rounded-xl" />
        </div>

        {/* Right form skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <div className="h-4 w-40 bg-muted rounded" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-10 w-full bg-muted rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <div className="h-4 w-36 bg-muted rounded" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-10 w-full bg-muted rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card rounded-xl border p-6 space-y-4">
            <div className="h-4 w-48 bg-muted rounded" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-28 bg-muted rounded" />
                  <div className="h-10 w-full bg-muted rounded-lg" />
                </div>
              ))}
            </div>

            <div className="space-y-2 mt-4">
              <div className="h-3 w-24 bg-muted rounded" />
              <div className="h-20 w-full bg-muted rounded-lg" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <div className="h-10 w-24 bg-muted rounded-lg" />
            <div className="h-10 w-32 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
