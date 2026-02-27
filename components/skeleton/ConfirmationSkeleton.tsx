const ConfirmationSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header Space Placeholder */}
      <div className="h-20 w-full bg-muted" />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-card border border-border overflow-hidden shadow-card">
            {/* Top Gradient Section */}
            <div className="py-12 px-6 bg-muted">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/20 mx-auto mb-4" />
              <div className="h-6 w-48 bg-muted-foreground/30 mx-auto rounded mb-3" />
              <div className="h-4 w-32 bg-muted-foreground/20 mx-auto rounded" />
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="h-3 w-32 bg-muted rounded mx-auto mb-2" />
              <div className="h-6 w-40 bg-muted rounded mx-auto mb-6" />

              {/* Booking Box */}
              <div className="border border-border rounded-xl bg-muted/30 p-4 mb-6 space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-4 w-24 bg-muted rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-muted rounded" />
                  <div className="h-4 w-28 bg-muted rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="h-11 w-full bg-muted rounded" />
                <div className="h-11 w-full bg-muted rounded" />
              </div>

              <div className="h-3 w-64 bg-muted rounded mx-auto mt-6" />
            </div>
          </div>

          <div className="h-10 w-32 bg-muted rounded mx-auto mt-8" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSkeleton;
