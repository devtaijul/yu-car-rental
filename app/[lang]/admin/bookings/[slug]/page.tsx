import { AdminBookingDetailsSkeleton } from "@/components/skeleton/AdminBookingDetailsSkeleton";
import { BookingDetailsServer } from "@/server/admin/booking-details.server";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <Suspense fallback={<AdminBookingDetailsSkeleton />}>
      <BookingDetailsServer slug={slug} />;
    </Suspense>
  );
};

export default page;
