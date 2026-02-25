import { AdminBookingManagementServer } from "@/server/AdminBookingManagementServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminBookingManagementServer />
    </Suspense>
  );
};

export default page;
