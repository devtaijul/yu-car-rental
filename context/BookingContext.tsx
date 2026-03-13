"use client";

import { CoverageType } from "@/generated/prisma/enums";
import { createContext, useContext, useEffect, useState } from "react";

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

const STORAGE_KEY = "yu_booking_state";

const defaultState: BookingState = {
  coverage: "STANDARD",
  extras: {},
};

function loadFromStorage(): BookingState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    // Dates are serialized as strings — restore them
    if (parsed.pickupDate) parsed.pickupDate = new Date(parsed.pickupDate);
    if (parsed.dropoffDate) parsed.dropoffDate = new Date(parsed.dropoffDate);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function saveToStorage(state: BookingState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [booking, setBookingState] = useState<BookingState>(loadFromStorage);

  // Persist every change to sessionStorage
  useEffect(() => {
    saveToStorage(booking);
  }, [booking]);

  const setBooking = (data: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    const fresh = defaultState;
    setBookingState(fresh);
    sessionStorage.removeItem(STORAGE_KEY);
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
