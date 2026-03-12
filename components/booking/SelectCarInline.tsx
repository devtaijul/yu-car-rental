"use client";

import { Car } from "@/generated/prisma/client";
import { CldImage } from "next-cloudinary";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { times } from "@/data/utils";

export const SelectCarInline = ({
  cars,
  onSelect,
  onBack,
  pickupDate: initialPickupDate,
  dropoffDate: initialDropoffDate,
  pickupTime: initialPickupTime,
  dropoffTime: initialDropoffTime,
  onSearchAgain,
}: {
  cars: Car[];
  onSelect: (car: Car) => void;
  onBack: () => void;
  pickupDate?: Date;
  dropoffDate?: Date;
  pickupTime?: string;
  dropoffTime?: string;
  onSearchAgain?: (data: {
    pickupDate: Date;
    dropoffDate: Date;
    pickupTime: string;
    dropoffTime: string;
  }) => void;
}) => {
  const [pickupDate, setPickupDate] = useState<Date>(
    initialPickupDate ?? new Date(),
  );
  const [dropoffDate, setDropoffDate] = useState<Date>(
    initialDropoffDate ?? new Date(Date.now() + 86400000),
  );
  const [pickupTime, setPickupTime] = useState(initialPickupTime ?? "10:00");
  const [dropoffTime, setDropoffTime] = useState(initialDropoffTime ?? "10:00");

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold mb-8">
        Choose Your Best Car
      </h1>

      {cars.length === 0 && (
        <div className="mb-8 border border-border bg-card p-6">
          <p className="text-lg font-medium mb-1">
            No cars available on your selected date range
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Adjust your pickup or dropoff dates to find available cars.
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Pickup Date */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Pickup Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(pickupDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => {
                      if (!date) return;
                      setPickupDate(date);
                      const minDropoff = new Date(date);
                      minDropoff.setDate(minDropoff.getDate() + 1);
                      if (dropoffDate <= date) setDropoffDate(minDropoff);
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Pickup Time */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Pickup Time
              </Label>
              <Select value={pickupTime} onValueChange={setPickupTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {times.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dropoff Date */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Dropoff Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(dropoffDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card">
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={(date) => date && setDropoffDate(date)}
                    disabled={(date) => {
                      const minDate = new Date(pickupDate);
                      minDate.setDate(minDate.getDate() + 1);
                      return date < minDate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Dropoff Time */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Dropoff Time
              </Label>
              <Select value={dropoffTime} onValueChange={setDropoffTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {times.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="mt-4 gradient-teal text-primary-foreground"
            onClick={() =>
              onSearchAgain?.({
                pickupDate,
                dropoffDate,
                pickupTime,
                dropoffTime,
              })
            }
          >
            Search Again
          </Button>
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
