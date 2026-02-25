import { getCarsForAdmin } from "@/actions/query";
import { CarsManagement } from "@/components/pages/admin/CarsManagement";
import React from "react";

export const AdminCarManagementServer = async () => {
  const data = await getCarsForAdmin();
  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <CarsManagement cars={data.cars} />;
};
