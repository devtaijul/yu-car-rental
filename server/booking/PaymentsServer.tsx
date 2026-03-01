import { getMyPayments } from "@/actions/query";
import PaymentsInvoices from "@/components/pages/dashboard/PaymentsInvoices";

export const PaymentsServer = async ({
  limit,
  page,
  search,
}: {
  limit?: string;
  page?: string;
  search?: string;
}) => {
  const data = await getMyPayments(limit, page, search);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Payments not found</div>;
  }

  return <PaymentsInvoices payments={data.data} />;
};
