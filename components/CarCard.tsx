"use client";

import { PAGES } from "@/config/pages.config";
import { Car } from "@/generated/prisma/client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Icons } from "./icons";
import { useSearchParams } from "next/navigation";

const CarCard = ({ car, isBookPage }: { car: Car; isBookPage?: boolean }) => {
  const searchParams = useSearchParams();

  // Current query string preserve
  const queryString = searchParams.toString();

  const baseHref = isBookPage
    ? PAGES.RESERVE_A_CAR.SELECTED_CAR(car.id)
    : PAGES.RESERVE_A_CAR.ROOT;

  const finalHref =
    isBookPage && queryString ? `${baseHref}?${queryString}` : baseHref;

  return (
    <div className="card-car rounded-none gradient-color bg-card border border-border">
      {/* Image */}
      <div className="relative h-60 flex items-center justify-center p-4">
        <CldImage src={car.imageUrl} width={400} height={300} alt="Car" />
      </div>

      <div className="p-5 text-primary-foreground">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-4">
          {car.name}
        </h3>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6 border border-gray-400 p-2 rounded-xl">
          <div className="flex flex-col items-center gap-1">
            <Icons name="mile_icon" className="w-7 h-7" />
            <span className="text-xs">{car.seats}</span>
            <span className="text-[10px] opacity-50">Seats</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Icons name="gas_icon" className="w-7 h-7" />
            <span className="text-xs">{car.engineCapacity}</span>
            <span className="text-[10px] opacity-50">Engine</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Icons name="fuel_icon" className="w-7 h-7" />
            <span className="text-xs">{car.fuelType}</span>
            <span className="text-[10px] opacity-50">Fuel</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Icons name="setting_icon" className="w-7 h-7" />
            <span className="text-xs">{car.transmission}</span>
            <span className="text-[10px] opacity-50">Trans</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${car.pricePerDay}</span>
            <span className="text-sm opacity-70"> /Day</span>
          </div>

          <Link
            href={finalHref}
            className="bg-card text-foreground hover:bg-card/90 py-2 px-4"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
