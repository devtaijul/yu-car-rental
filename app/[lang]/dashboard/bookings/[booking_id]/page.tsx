import { BookingDetailsSkeleton } from "@/components/skeleton/BookingDetailsSkeleton";
import { BookingDetailsServer } from "@/server/booking/BookingDetailsServer";
import { Suspense } from "react";

const page = async ({
  params,
}: {
  params: Promise<{ booking_id: string }>;
}) => {
  const { booking_id } = await params;
  console.log("bookingId", booking_id);

  return (
    <Suspense fallback={<BookingDetailsSkeleton />}>
      <BookingDetailsServer bookingId={booking_id} />
    </Suspense>
  );
};

export default page;
