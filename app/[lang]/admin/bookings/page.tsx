import AdminBookingSkeleton from "@/components/skeleton/AdminBookingSkeleton";
import { AdminBookingManagementServer } from "@/server/AdminBookingManagementServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<AdminBookingSkeleton />}>
      <AdminBookingManagementServer />
    </Suspense>
  );
};

export default page;
