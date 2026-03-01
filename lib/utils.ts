import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripLocale = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  // যদি first segment 2 letter হয় (en, fr, de etc)
  if (segments[0]?.length === 2) {
    segments.shift();
  }

  return "/" + segments.join("/");
};

export const CAR_TYPES = [
  "SEDAN",
  "SUV",
  "MICROBUS",
  "HATCHBACK",
  "PICKUP",
  "LUXURY",
] as const;

export const FUEL_TYPES = ["PETROL", "DIESEL", "HYBRID", "ELECTRIC"] as const;

export const TRANSMISSION_TYPES = ["AUTOMATIC", "MANUAL"] as const;

export const getTimeLeftFromNow = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0 };
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;

  const days = Math.floor(diff / oneDay);
  const hours = Math.floor((diff % oneDay) / oneHour);

  return { days, hours };
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
