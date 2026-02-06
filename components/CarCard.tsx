"use client";

import { Button } from "@/components/ui/button";
import { Gauge, Fuel, Settings, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const CarCard = ({
  id,
  name,
  image,
  price,
  specs,
  variant = "dark",
}: CarCardProps) => {
  const isDark = variant === "dark";
  const router = useRouter();
  const onRent = () => {
    router.push(`/booking/${id}`);
  };

  return (
    <div
      className={`card-car ${isDark ? "card-car-gradient" : "bg-card border border-border"}`}
    >
      {/* Image */}
      <div className="relative h-48 flex items-center justify-center p-4">
        <Image
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain"
          width={500}
          height={500}
        />
      </div>

      {/* Content */}
      <div
        className={`p-5 ${isDark ? "text-primary-foreground" : "text-foreground"}`}
      >
        <h3 className="text-xl font-display font-semibold mb-4">{name}</h3>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="flex flex-col items-center gap-1">
            <Users className="h-4 w-4 opacity-70" />
            <span className="text-xs opacity-70">{specs.seats}</span>
            <span className="text-[10px] opacity-50">Seats</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Gauge className="h-4 w-4 opacity-70" />
            <span className="text-xs opacity-70">{specs.engine}</span>
            <span className="text-[10px] opacity-50">Engine</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Fuel className="h-4 w-4 opacity-70" />
            <span className="text-xs opacity-70">{specs.fuel}</span>
            <span className="text-[10px] opacity-50">Fuel</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings className="h-4 w-4 opacity-70" />
            <span className="text-xs opacity-70">{specs.transmission}</span>
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
            variant={isDark ? "secondary" : "outline"}
            className={isDark ? "bg-card text-foreground hover:bg-card/90" : ""}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
