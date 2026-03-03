"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";

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
import { Calendar as CalendarIcon } from "lucide-react";

import { useBooking } from "@/context/BookingContext";
import { locationCoords, locations, times } from "@/data/utils";
import {
  LocationStepSchema,
  LocationStepValues,
} from "@/lib/validation/system.schema";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export const StepLocation = ({ path }: { path: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setBooking } = useBooking();

  const defaultPickupDate = searchParams.get("pickupDate")
    ? new Date(searchParams.get("pickupDate")!)
    : new Date();

  const defaultDropoffDate = searchParams.get("dropoffDate")
    ? new Date(searchParams.get("dropoffDate")!)
    : new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  const defaultPickupTime = searchParams.get("pickupTime") || "10:00";
  const defaultDropoffTime = searchParams.get("dropoffTime") || "10:00";

  const defaultValues: LocationStepValues = {
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: defaultPickupDate,
    dropoffDate: defaultDropoffDate,
    pickupTime: defaultPickupTime,
    dropoffTime: defaultDropoffTime,
  };

  const { control, handleSubmit } = useForm<LocationStepValues>({
    resolver: zodResolver(LocationStepSchema),
    defaultValues,
  });

  // --- Safe watch with useWatch ---
  const pickupDate = useWatch({ control, name: "pickupDate" });
  //const dropoffDate = useWatch({ control, name: "dropoffDate" });
  const pickupLocation = useWatch({ control, name: "pickupLocation" });
  const dropoffLocation = useWatch({ control, name: "dropoffLocation" });
  //const pickupTime = useWatch({ control, name: "pickupTime" });
  //const dropoffTime = useWatch({ control, name: "dropoffTime" });

  console.log("pickupLocation", pickupLocation, dropoffLocation);

  const onSubmit = (data: LocationStepValues) => {
    setBooking(data);
    console.log("data", data);

    const query = new URLSearchParams({
      pickupDate: data.pickupDate.toISOString(),
      dropoffDate: data.dropoffDate.toISOString(),
      pickupTime: data.pickupTime || "10:00",
      dropoffTime: data.dropoffTime || "10:00",
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
    });

    router.push(`${path}?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto container p-4">
      <h1 className="text-2xl font-display font-semibold mb-8">
        Location & Dates
      </h1>

      {/* Map */}
      <div className="w-full h-64 bg-muted rounded-xl mb-8 flex items-center justify-center z-0">
        <LeafletMap
          pickupCoords={locationCoords[pickupLocation]}
          dropoffCoords={locationCoords[dropoffLocation]}
        />
      </div>

      {/* Locations */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 z-10 relative">
        <Controller
          control={control}
          name="pickupLocation"
          render={({ field }) => (
            <div key={field.value}>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Pickup Location
              </Label>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Pickup Location" />
                </SelectTrigger>

                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc.split(" ").join("-")}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="dropoffLocation"
          render={({ field }) => (
            <div key={field.value}>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Dropoff Location
              </Label>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Dropoff Location" />
                </SelectTrigger>

                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc.split(" ").join("-")}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Dates & Time */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Pickup Date */}
        <Controller
          control={control}
          name="pickupDate"
          render={({ field }) => (
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Pickup Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {field.value ? format(field.value, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date!)}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />

        {/* Pickup Time */}
        <Controller
          control={control}
          name="pickupTime"
          render={({ field }) => (
            <div key={field.value}>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Time
              </Label>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
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
          )}
        />
        {/* Dropoff Date */}
        <Controller
          control={control}
          name="dropoffDate"
          render={({ field }) => (
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Dropoff Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {field.value ? format(field.value, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date!)}
                    disabled={(date) => {
                      const minDate = new Date(pickupDate);
                      minDate.setDate(minDate.getDate() + 1);
                      return date < minDate;
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        />

        {/* Dropoff Time */}
        <Controller
          control={control}
          name="dropoffTime"
          render={({ field }) => (
            <div key={field.value}>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Time
              </Label>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
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
          )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" className="gradient-teal text-primary-foreground">
          Continue
        </Button>
      </div>
    </form>
  );
};
