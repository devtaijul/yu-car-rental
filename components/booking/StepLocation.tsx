"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
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

interface BlockedRange {
  start: string;
  end: string;
}

function isDateBlocked(date: Date, blockedRanges: BlockedRange[]): boolean {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return blockedRanges.some((range) => {
    const start = new Date(range.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(range.end);
    end.setHours(0, 0, 0, 0);
    return d >= start && d <= end;
  });
}

function getFirstAvailableDate(blockedRanges: BlockedRange[]): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const candidate = new Date(today);
  // Search up to 365 days ahead
  for (let i = 0; i < 365; i++) {
    if (!isDateBlocked(candidate, blockedRanges)) {
      return new Date(candidate);
    }
    candidate.setDate(candidate.getDate() + 1);
  }
  return today;
}

function getFirstAvailableDateAfter(
  after: Date,
  blockedRanges: BlockedRange[],
): Date {
  const candidate = new Date(after);
  candidate.setHours(0, 0, 0, 0);
  candidate.setDate(candidate.getDate() + 1);

  for (let i = 0; i < 365; i++) {
    if (!isDateBlocked(candidate, blockedRanges)) {
      return new Date(candidate);
    }
    candidate.setDate(candidate.getDate() + 1);
  }
  return new Date(after.getTime() + 24 * 60 * 60 * 1000);
}

export const StepLocation = ({
  path,
  onSubmit: onSubmitProp,
  loading,
  blockedRanges = [],
}: {
  path?: string;
  onSubmit?: (data: LocationStepValues) => void;
  loading?: boolean;
  blockedRanges?: BlockedRange[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setBooking } = useBooking();

  const hasBlocked = blockedRanges.length > 0;

  const initialPickupDate = useMemo(() => {
    const fromParam = searchParams.get("pickupDate");
    if (fromParam) return new Date(fromParam);
    if (hasBlocked) return getFirstAvailableDate(blockedRanges);
    return new Date();
  }, [searchParams, hasBlocked, blockedRanges]);

  const initialDropoffDate = useMemo(() => {
    const fromParam = searchParams.get("dropoffDate");
    if (fromParam) return new Date(fromParam);
    return getFirstAvailableDateAfter(initialPickupDate, blockedRanges);
  }, [searchParams, initialPickupDate, blockedRanges]);

  const defaultPickupTime = searchParams.get("pickupTime") || "18:00";
  const defaultDropoffTime = searchParams.get("dropoffTime") || "18:00";

  const defaultValues: LocationStepValues = {
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: initialPickupDate,
    dropoffDate: initialDropoffDate,
    pickupTime: defaultPickupTime,
    dropoffTime: defaultDropoffTime,
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LocationStepValues>({
    resolver: zodResolver(LocationStepSchema),
    defaultValues,
  });

  // When blockedRanges arrive async (preselected car from homepage), update dates
  useEffect(() => {
    if (blockedRanges.length === 0) return;
    if (searchParams.get("pickupDate")) return; // already set from URL

    const firstAvailable = getFirstAvailableDate(blockedRanges);
    const firstDropoff = getFirstAvailableDateAfter(
      firstAvailable,
      blockedRanges,
    );
    setValue("pickupDate", firstAvailable);
    setValue("dropoffDate", firstDropoff);
  }, [blockedRanges]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Safe watch with useWatch ---
  const pickupDate = useWatch({ control, name: "pickupDate" });
  const pickupLocation = useWatch({ control, name: "pickupLocation" });
  const dropoffLocation = useWatch({ control, name: "dropoffLocation" });

  const isPickupDisabled = useCallback(
    (date: Date) => {
      if (date < new Date(new Date().setHours(0, 0, 0, 0))) return true;
      if (hasBlocked && isDateBlocked(date, blockedRanges)) return true;
      return false;
    },
    [hasBlocked, blockedRanges],
  );

  const isDropoffDisabled = useCallback(
    (date: Date) => {
      const minDate = new Date(pickupDate);
      minDate.setDate(minDate.getDate() + 1);
      if (date < minDate) return true;
      if (hasBlocked && isDateBlocked(date, blockedRanges)) return true;
      return false;
    },
    [pickupDate, hasBlocked, blockedRanges],
  );

  const onSubmit = (data: LocationStepValues) => {
    if (onSubmitProp) {
      onSubmitProp(data);
      return;
    }

    setBooking(data);

    const query = new URLSearchParams({
      pickupDate: data.pickupDate.toISOString(),
      dropoffDate: data.dropoffDate.toISOString(),
      pickupTime: data.pickupTime || "18:00",
      dropoffTime: data.dropoffTime || "18:00",
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
                <SelectTrigger
                  className={errors.pickupLocation ? "border-red-500" : ""}
                >
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
              {errors.pickupLocation && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pickupLocation.message}
                </p>
              )}
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
                <SelectTrigger
                  className={errors.dropoffLocation ? "border-red-500" : ""}
                >
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
              {errors.dropoffLocation && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.dropoffLocation.message}
                </p>
              )}
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
                    onSelect={(date) => {
                      if (!date) return;
                      field.onChange(date);
                      // Auto-adjust dropoff if it's now invalid
                      const nextDay = new Date(date);
                      nextDay.setDate(nextDay.getDate() + 1);
                      const currentDropoff = pickupDate;
                      if (currentDropoff && currentDropoff <= date) {
                        const newDropoff = getFirstAvailableDateAfter(
                          date,
                          blockedRanges,
                        );
                        setValue("dropoffDate", newDropoff);
                      }
                    }}
                    disabled={isPickupDisabled}
                  />
                </PopoverContent>
              </Popover>
              {errors.pickupDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pickupDate.message}
                </p>
              )}
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
                <SelectTrigger
                  className={errors.pickupTime ? "border-red-500" : ""}
                >
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
              {errors.pickupTime && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pickupTime.message}
                </p>
              )}
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
                    disabled={isDropoffDisabled}
                  />
                </PopoverContent>
              </Popover>
              {errors.dropoffDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.dropoffDate.message}
                </p>
              )}
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
                <SelectTrigger
                  className={errors.dropoffTime ? "border-red-500" : ""}
                >
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
              {errors.dropoffTime && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.dropoffTime.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          className="bg-primary  text-primary-foreground"
          disabled={loading}
          size={"lg"}
        >
          {loading ? "Loading..." : "Continue"}
        </Button>
      </div>
    </form>
  );
};
