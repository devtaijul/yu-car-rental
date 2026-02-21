import React from "react";

export const CarCardSkeleton = () => {
  return (
    <div className="card-car rounded-none bg-card border border-border animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 flex items-center justify-center p-4">
        <div className="w-full h-full bg-muted rounded-md" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <div className="h-6 w-3/4 bg-muted rounded mb-4" />

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6 border border-gray-400 p-2 rounded-xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 bg-muted rounded-full" />
              <div className="h-3 w-10 bg-muted rounded" />
              <div className="h-2 w-12 bg-muted rounded" />
            </div>
          ))}
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-10 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};
