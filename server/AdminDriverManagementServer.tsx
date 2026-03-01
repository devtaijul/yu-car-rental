import { getDriversForAdmin } from "@/actions/query";
import DriversPage from "@/components/pages/admin/DriversPage";

export const AdminDriverManagementServer = async () => {
  const data = await getDriversForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <DriversPage />;
};
