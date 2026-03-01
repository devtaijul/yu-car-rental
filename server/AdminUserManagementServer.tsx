import { getUsersForAdmin } from "@/actions/query";
import UsersPage from "@/components/pages/admin/UsersPage";

export const AdminUserManagementServer = async () => {
  const data = await getUsersForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <UsersPage />;
};
