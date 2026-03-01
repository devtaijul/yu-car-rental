import { getPaymentsForAdmin } from "@/actions/query";
import { PaymentsPage } from "@/components/pages/admin/PaymentsPage";

export const AdminPaymentManagementServer = async () => {
  const data = await getPaymentsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <PaymentsPage />;
};
