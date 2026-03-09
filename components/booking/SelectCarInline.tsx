"use client";

import { Car } from "@/generated/prisma/client";
import { CldImage } from "next-cloudinary";
import { Icons } from "../icons";
import { Button } from "../ui/button";

export const SelectCarInline = ({
  cars,
  onSelect,
  onBack,
}: {
  cars: Car[];
  onSelect: (car: Car) => void;
  onBack: () => void;
}) => {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-8">
        Choose Your Best Car
      </h1>

      {cars.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground mb-8">
          <p className="text-lg font-medium">No cars available on your selected date range</p>
          <p className="text-sm mt-1">Try adjusting your pickup or dropoff dates.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="card-car rounded-none gradient-color bg-card border border-border"
          >
            <div className="relative h-60 flex items-center justify-center p-4">
              <CldImage
                src={car.imageUrl}
                width={400}
                height={300}
                alt="Car"
                className="max-w-80"
              />
            </div>

            <div className="p-5 text-primary-foreground">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-4">
                {car.name}
              </h3>

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

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">${car.pricePerDay}</span>
                  <span className="text-sm opacity-70"> /Day</span>
                </div>
                <button
                  onClick={() => onSelect(car)}
                  className="bg-card text-foreground hover:bg-card/90 py-2 px-4"
                >
                  Rent Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={onBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};
