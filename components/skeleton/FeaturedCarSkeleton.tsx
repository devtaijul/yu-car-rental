import React from "react";
import { CarCardSkeleton } from "./CarCardSkeleton";

export const FeaturedCarSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
};
