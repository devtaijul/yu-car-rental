const AdminBookingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-muted rounded-md" />
          <div className="h-4 w-64 bg-muted rounded-md" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-64 bg-muted rounded-lg" />
          <div className="h-10 w-32 bg-muted rounded-lg" />
          <div className="h-10 w-36 bg-muted rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {Array.from({ length: 7 }).map((_, i) => (
                  <th key={i} className="py-3 px-4">
                    <div className="h-3 w-20 bg-muted rounded-md" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b last:border-0">
                  {/* Booking ID */}
                  <td className="py-4 px-6">
                    <div className="h-4 w-24 bg-muted rounded-md" />
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded-md" />
                        <div className="h-3 w-40 bg-muted rounded-md" />
                      </div>
                    </div>
                  </td>

                  {/* Car */}
                  <td className="py-4 px-4 space-y-2">
                    <div className="h-4 w-28 bg-muted rounded-md" />
                    <div className="h-3 w-16 bg-muted rounded-md" />
                  </td>

                  {/* Dates */}
                  <td className="py-4 px-4 space-y-2">
                    <div className="h-3 w-32 bg-muted rounded-md" />
                    <div className="h-3 w-32 bg-muted rounded-md" />
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <div className="h-4 w-20 bg-muted rounded-md" />
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-4 space-y-2">
                    <div className="h-4 w-16 bg-muted rounded-md" />
                    <div className="h-3 w-12 bg-muted rounded-md" />
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-24 bg-muted rounded-md" />
                      <div className="h-8 w-8 bg-muted rounded-md" />
                      <div className="h-8 w-8 bg-muted rounded-md" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="h-4 w-56 bg-muted rounded-md" />

          <div className="flex items-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-8 bg-muted rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingSkeleton;
