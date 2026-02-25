import { AdminPaymentManagementServer } from "@/server/AdminPaymentManagementServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPaymentManagementServer />
    </Suspense>
  );
};

export default page;
