"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";

export default function StepGuard({
  required,
  children,
}: {
  required: "location" | "car";
  children: React.ReactNode;
}) {
  const { booking } = useBooking();
  const router = useRouter();

  useEffect(() => {
    if (required === "location" && !booking.pickupDate) {
      router.push("/reserve-a-car");
    }

    if (required === "car" && !booking.carSlug) {
      router.push("/reserve-a-car");
    }
  }, [booking]);

  return <>{children}</>;
}
