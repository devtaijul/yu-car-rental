"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/context/BookingContext";
import { locations, times } from "@/data/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StepLocationProps {
  path: string;
}

export const StepLocation: React.FC<StepLocationProps> = ({ path }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("22:30");
  const [dropoffTime, setDropoffTime] = useState("22:30");

  const { setBooking } = useBooking();
  const router = useRouter();

  const handleContinue = () => {
    if (
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDate ||
      !dropoffDate ||
      !pickupTime ||
      !dropoffTime
    ) {
      alert("Please fill all fields");
      return;
    }

    setBooking({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    });

    const query = new URLSearchParams({
      pickupDate: pickupDate.toISOString(),
      dropoffDate: dropoffDate.toISOString(),
      pickupTime,
      dropoffTime,
      pickupLocation,
      dropoffLocation,
    });

    router.push(`${path}?${query.toString()}`);
  };

  return (
    <div className="mx-auto container p-4">
      <h1 className="text-2xl font-display font-semibold mb-8">
        Location & Dates
      </h1>

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-muted rounded-xl mb-8 flex items-center justify-center">
        <span className="text-muted-foreground">Map View</span>
      </div>

      {/* Pickup / Dropoff */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Pickup Location
          </Label>
          <Select value={pickupLocation} onValueChange={setPickupLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Pickup Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Return Location
          </Label>

          <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Dropoff Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dates & Time */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Pickup Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {pickupDate ? format(pickupDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card">
              <Calendar
                mode="single"
                selected={pickupDate}
                onSelect={setPickupDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Time
          </Label>
          <Select value={pickupTime} onValueChange={setPickupTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Return Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dropoffDate ? format(dropoffDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card">
              <Calendar
                mode="single"
                selected={dropoffDate}
                onSelect={setDropoffDate}
                disabled={(date) => {
                  if (!pickupDate) return true;

                  const minDate = new Date(pickupDate);
                  minDate.setDate(minDate.getDate() + 2);

                  return date < minDate;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">
            Time
          </Label>
          <Select value={dropoffTime} onValueChange={setDropoffTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Continue */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={handleContinue}
          className="gradient-teal text-primary-foreground"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
