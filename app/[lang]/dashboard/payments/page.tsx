import { PaymentsInvoicesSkeleton } from "@/components/skeleton/PaymentsInvoicesSkeleton";
import { PaymentsServer } from "@/server/booking/PaymentsServer";
import { Suspense } from "react";

const pages = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) => {
  const query = await searchParams;
  const { page, limit, search } = query;
  return (
    <div>
      <Suspense fallback={<PaymentsInvoicesSkeleton />}>
        <PaymentsServer page={page} limit={limit} search={search} />
      </Suspense>
    </div>
  );
};

export default pages;
