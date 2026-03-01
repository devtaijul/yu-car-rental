import { BookingCardSkeleton } from "@/components/skeleton/BookingCardSkeleton";
import { TabValue } from "@/data/utils";
import { MyBookingServer } from "@/server/booking/MyBookingServer";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ limit?: string; status?: TabValue | undefined }>;
}) => {
  const query = await searchParams;
  const { limit, status } = query;
  return (
    <Suspense fallback={<BookingCardSkeleton />}>
      {" "}
      <MyBookingServer limit={limit || "3"} status={status} />
    </Suspense>
  );
};

export default page;
