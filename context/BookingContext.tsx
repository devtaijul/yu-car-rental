"use client";

import { CoverageType } from "@/generated/prisma/enums";
import { createContext, useContext, useState } from "react";

export interface BookingState {
  pickupDate?: Date;
  pickupTime?: string;
  dropoffTime?: string;
  dropoffDate?: Date;
  pickupLocation?: string;
  dropoffLocation?: string;
  carSlug?: string;
  coverage?: CoverageType;
  extras: Record<string, number>;
}

interface BookingContextType {
  booking: BookingState;
  setBooking: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [booking, setBookingState] = useState<BookingState>({
    coverage: "STANDARD",
    extras: {},
  });

  const setBooking = (data: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingState({
      coverage: "STANDARD",
      extras: {},
    });
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be inside BookingProvider");
  return ctx;
};
