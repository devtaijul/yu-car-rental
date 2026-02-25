import { getDriversForAdmin } from "@/actions/query";
import DriversManagement from "@/components/pages/admin/DriversManagement";
import React from "react";

export const AdminDriverManagementServer = async () => {
  const data = await getDriversForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <DriversManagement drivers={data.drivers} />;
};
