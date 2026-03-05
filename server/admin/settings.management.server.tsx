import { getSettingsForAdmin } from "@/actions/query";
import SettingsPage from "@/components/pages/admin/SettingsPage";

export const SettingsManagementServer = async () => {
  const data = await getSettingsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Settings not found</div>;
  }

  return <SettingsPage settings={data.data} />;
};
