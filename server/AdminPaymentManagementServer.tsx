import { getPaymentsForAdmin } from "@/actions/query";
import PaymentsManagement from "@/components/pages/admin/PaymentsManagement";
import React from "react";

export const AdminPaymentManagementServer = async () => {
  const data = await getPaymentsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <PaymentsManagement payments={data.payments} />;
};
