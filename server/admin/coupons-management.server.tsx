import { getCouponsForAdmin } from "@/actions/query";
import CouponsManagement from "@/components/pages/admin/CouponsManagement";
import React from "react";

export const CouponManagementServer = async () => {
  const data = await getCouponsForAdmin();
  console.log(data);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <CouponsManagement coupons={data.coupons} />;
};
