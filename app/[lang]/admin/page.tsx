import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { AdminDashboardServer } from "@/server/AdminDashboardServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboardServer />
    </Suspense>
  );
};

export default page;
