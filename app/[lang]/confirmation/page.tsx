import ConfirmationSkeleton from "@/components/skeleton/ConfirmationSkeleton";
import { ConfirmationPageServer } from "@/server/ConfirmationPageServer";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ bookingId: string }>;
}) => {
  const query = await searchParams;
  const { bookingId } = query;

  return (
    <Suspense fallback={<ConfirmationSkeleton />}>
      <ConfirmationPageServer bookingId={bookingId} />
    </Suspense>
  );
};

export default page;
