import { adminDashbaordCount } from "@/actions/query";
import Dashboard from "@/components/pages/admin/Dashboard";
import React from "react";

export const AdminDashboardServer = async () => {
  const data = await adminDashbaordCount();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <Dashboard counts={data.counts} />;
};
