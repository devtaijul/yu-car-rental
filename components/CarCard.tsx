"use client";

import { Button } from "@/components/ui/button";
import { Gauge, Fuel, Settings, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

interface CarCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  specs: {
    seats: number;
    engine: string;
    fuel: string;
    transmission: string;
  };
  variant?: "light" | "dark";
  onRent?: () => void;
}

const CarCard = ({ id, name, image, price, specs }: CarCardProps) => {
  const router = useRouter();
  const onRent = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <div
      className={`card-car rounded-none gradient-color bg-card border border-border`}
    >
      {/* Image */}
      <div className="relative h-48 flex items-center justify-center p-4">
        <Image
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
          width={800}
          height={500}
        />
      </div>

      {/* Content */}
      <div className={`p-5 text-primary-foreground `}>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold mb-4">
          {name}
        </h3>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6 border border-gray-400 p-2 rounded-xl ">
          <div className="flex flex-col items-center gap-1">
            <Icons name="mile_icon" className="w-7 h-7" />
            <span className="text-xs ">{specs.seats}</span>
            <span className="text-[10px] opacity-50">Seats</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons name="gas_icon" className="w-7 h-7" />
            <span className="text-xs ">{specs.engine}</span>
            <span className="text-[10px] opacity-50">Engine</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons name="fuel_icon" className="w-7 h-7" />
            <span className="text-xs ">{specs.fuel}</span>
            <span className="text-[10px] opacity-50">Fuel</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Icons name="setting_icon" className="w-7 h-7" />
            <span className="text-xs ">{specs.transmission}</span>
            <span className="text-[10px] opacity-50">Trans</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${price}</span>
            <span className="text-sm opacity-70"> /Day</span>
          </div>
          <Button
            onClick={onRent}
            className={"bg-card text-foreground hover:bg-card/90 rounded-none"}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
