import { adminDashbaordCount } from "@/actions/query";
import { DashboardOverview } from "@/components/pages/admin/Index";

export const AdminDashboardServer = async () => {
  const data = await adminDashbaordCount();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <DashboardOverview />;
};
