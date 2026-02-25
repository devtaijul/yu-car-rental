import { CouponManagementServer } from "@/server/admin/coupons-management.server";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CouponManagementServer />
    </Suspense>
  );
};

export default page;
