"use client";

import { useBooking } from "@/context/BookingContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type CoverageType = "standard" | "premium";

export const useSyncBookingFromQuery = () => {
  const searchParams = useSearchParams();
  const { setBooking } = useBooking();

  const hasSyncedRef = useRef(false);

  useEffect(() => {
    const queryString = searchParams.toString();

    if (!queryString) return;

    // ✅ prevent infinite re-sync
    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    const updateData: Record<string, string | Date | CoverageType> = {};

    const pickupDate = searchParams.get("pickupDate");
    if (pickupDate) updateData.pickupDate = new Date(pickupDate);

    const dropoffDate = searchParams.get("dropoffDate");
    if (dropoffDate) updateData.dropoffDate = new Date(dropoffDate);

    const pickupTime = searchParams.get("pickupTime");
    if (pickupTime) updateData.pickupTime = pickupTime;

    const dropoffTime = searchParams.get("dropoffTime");
    if (dropoffTime) updateData.dropoffTime = dropoffTime;

    const pickupLocation = searchParams.get("pickupLocation");
    if (pickupLocation) updateData.pickupLocation = pickupLocation;

    const dropoffLocation = searchParams.get("dropoffLocation");
    if (dropoffLocation) updateData.dropoffLocation = dropoffLocation;

    const coverage = searchParams.get("coverage") as CoverageType | null;
    if (coverage === "standard" || coverage === "premium") {
      updateData.coverage = coverage;
    }

    const extrasParam = searchParams.get("extras");
    if (extrasParam) {
      try {
        updateData.extras = JSON.parse(extrasParam);
      } catch {
        console.warn("Invalid extras JSON");
      }
    }

    if (Object.keys(updateData).length > 0) {
      setBooking(updateData);
    }
  }, [searchParams.toString()]);
};
