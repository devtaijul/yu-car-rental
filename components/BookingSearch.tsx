"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const BookingSearch = () => {
  const navigate = useRouter();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");

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

  const handleSearch = () => {
    navigate.push("/booking");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-5 px-7  backdrop-blur-sm rounded-xl">
      {/* Pickup Date */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="input-booking flex items-center gap-2 min-w-40">
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
        <PopoverContent className="w-auto p-0 bg-card" align="start">
          <CalendarComponent
            mode="single"
            selected={pickupDate}
            onSelect={setPickupDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Pickup Time */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="input-booking flex items-center gap-2 min-w-35">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{pickupTime}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-2 bg-card max-h-50 overflow-y-auto"
          align="start"
        >
          <div className="flex flex-col gap-1">
            {times.map((time) => (
              <button
                key={time}
                className="px-3 py-1.5 text-sm hover:bg-muted rounded text-left"
                onClick={() => setPickupTime(time)}
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
          <button className="input-booking flex items-center gap-2 min-w-40">
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
        <PopoverContent className="w-auto p-0 bg-card" align="start">
          <CalendarComponent
            mode="single"
            selected={dropoffDate}
            onSelect={setDropoffDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Dropoff Time */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="input-booking flex items-center gap-2 min-w-35">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{dropoffTime}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-2 bg-card max-h-50 overflow-y-auto"
          align="start"
        >
          <div className="flex flex-col gap-1">
            {times.map((time) => (
              <button
                key={time}
                className="px-3 py-1.5 text-sm hover:bg-muted rounded text-left"
                onClick={() => setDropoffTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="gradient-teal text-primary-foreground px-8 h-full py-3.5 rounded-none  font-semibold hover:opacity-90"
      >
        SEARCH
      </Button>
    </div>
  );
};

export default BookingSearch;
