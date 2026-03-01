export const DashboardHeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between lg:px-6 animate-pulse">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile menu icon */}
        <div className="lg:hidden w-5 h-5 bg-muted rounded" />

        {/* Title */}
        <div className="h-4 w-40 bg-muted rounded" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Bell icon */}
        <div className="relative">
          <div className="w-5 h-5 bg-muted rounded" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-muted" />
        </div>

        {/* User section */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block space-y-1">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-muted" />

          {/* Chevron */}
          <div className="w-3 h-3 bg-muted rounded" />
        </div>
      </div>
    </header>
  );
};
