import { CarAvailability } from "@/generated/prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDate } from "./formatDate";

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

export function getAvailabilityInfo(blocks: CarAvailability[]) {
  const now = new Date();

  // sort blocks by startDate
  const sortedBlocks = [...blocks].sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );

  // check if currently blocked
  const currentBlock = sortedBlocks.find(
    (block) => now >= block.startDate && now <= block.endDate,
  );

  // 🚫 Currently Blocked
  if (currentBlock) {
    const diffMs = currentBlock.endDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    return {
      isAvailable: false,
      nextAvailableAt: currentBlock.endDate,
      message:
        diffHours < 24
          ? `Available in ${diffHours} hour${diffHours > 1 ? "s" : ""}`
          : `Available in ${Math.ceil(diffHours / 24)} days`,
      availableUntil: null, // still blocked, so no availableUntil
    };
  }

  // ✅ Currently Available
  const nextBlock = sortedBlocks.find((block) => block.startDate > now);

  return {
    isAvailable: true,
    nextAvailableAt: null,
    message: "Right now",
    availableUntil: nextBlock
      ? `Until ${formatDate(nextBlock.endDate)}`
      : "Infinite", // ← Infinity if no next block
  };
}
