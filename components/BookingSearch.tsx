"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, ChevronDown, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  locationFormSchema,
  LocationFormValues,
} from "@/lib/validation/system.schema";
import { PAGES } from "@/config/pages.config";

const times = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

const BookingSearch = () => {
  const router = useRouter();

  const {
    handleSubmit,
    setValue,

    control,
    formState: { errors },
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      pickupTime: "10:00",
      dropoffTime: "10:00",
    },
  });

  const pickupDate = useWatch({ control, name: "pickupDate" });
  const dropoffDate = useWatch({ control, name: "dropoffDate" });
  const pickupTime = useWatch({ control, name: "pickupTime" });
  const dropoffTime = useWatch({ control, name: "dropoffTime" });

  const onSubmit = (data: LocationFormValues) => {
    const query = new URLSearchParams({
      pickupDate: data.pickupDate.toISOString(),
      dropoffDate: data.dropoffDate.toISOString(),
      pickupTime: data.pickupTime,
      dropoffTime: data.dropoffTime,
    });

    router.push(`${PAGES.RESERVE_A_CAR.ROOT}?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-center justify-between gap-3 p-5 px-7 backdrop-blur-sm bg-white/10"
    >
      {/* Pickup Date */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="input-booking w-full md:max-w-56 flex items-center gap-2"
          >
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span
              className={
                pickupDate ? "text-foreground" : "text-muted-foreground"
              }
            >
              {pickupDate ? format(pickupDate, "PP") : "Pick-up Date"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card">
          <CalendarComponent
            mode="single"
            selected={pickupDate}
            onSelect={(date) => date && setValue("pickupDate", date)}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>

      {/* Pickup Time */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="input-booking w-full md:max-w-56 flex items-center gap-2"
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{pickupTime}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 bg-card max-h-50 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {times.map((time) => (
              <button
                type="button"
                key={time}
                className="px-3 py-1.5 text-sm hover:bg-muted rounded text-left"
                onClick={() => setValue("pickupTime", time)}
              >
                {time}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Dropoff Date */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="input-booking w-full md:max-w-56 flex items-center gap-2"
          >
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span
              className={
                dropoffDate ? "text-foreground" : "text-muted-foreground"
              }
            >
              {dropoffDate ? format(dropoffDate, "PP") : "Drop-off Date"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card">
          <CalendarComponent
            mode="single"
            selected={dropoffDate}
            onSelect={(date) => date && setValue("dropoffDate", date)}
            disabled={(date) => {
              if (!pickupDate) return true;
              const minDate = new Date(pickupDate);
              minDate.setDate(minDate.getDate() + 1);
              return date < minDate;
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Dropoff Time */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="input-booking w-full md:max-w-56 flex items-center gap-2"
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{dropoffTime}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 bg-card max-h-50 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {times.map((time) => (
              <button
                type="button"
                key={time}
                className="px-3 py-1.5 text-sm hover:bg-muted rounded text-left"
                onClick={() => setValue("dropoffTime", time)}
              >
                {time}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}
      <Button
        type="submit"
        className="bg-primary w-full md:max-w-56 text-primary-foreground px-8 h-full py-3.5 rounded-none font-semibold hover:opacity-90"
      >
        SEARCH
      </Button>

      {/* Error */}
      {errors.dropoffDate && (
        <p className="text-red-500 text-sm w-full mt-2">
          {errors.dropoffDate.message}
        </p>
      )}
    </form>
  );
};

export default BookingSearch;
