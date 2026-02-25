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
