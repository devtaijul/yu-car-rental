import { CarsManagementSkeleton } from "@/components/skeleton/CarsManagementSkeleton";
import { AdminCarManagementServer } from "@/server/AdminCarManagementServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<CarsManagementSkeleton />}>
      <AdminCarManagementServer />
    </Suspense>
  );
};

export default page;
