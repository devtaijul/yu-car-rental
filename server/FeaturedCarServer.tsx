import prisma from "@/lib/prisma";
import CarCard from "@/components/CarCard";
import { CarCardSkeleton } from "@/components/skeleton/CarCardSkeleton";

export const FeaturedCarServer = async () => {
  const cars = await prisma.car.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (!cars.length) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};
