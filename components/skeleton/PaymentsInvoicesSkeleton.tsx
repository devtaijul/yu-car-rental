export const PaymentsInvoicesSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-4 w-80 bg-muted rounded" />
        </div>
        <div className="h-10 w-40 bg-muted rounded" />
      </div>

      {/* Payment Cards */}
      <div className="flex gap-4">
        <div className="w-70 h-40 bg-muted rounded" />
        <div className="w-50 h-40 bg-muted rounded border-2 border-dashed border-border" />
      </div>

      {/* Search */}
      <div className="h-10 w-full sm:w-96 bg-muted rounded" />

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-border">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-4 p-4 border-b border-border"
          >
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="h-4 bg-muted rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
