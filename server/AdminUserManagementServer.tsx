import { getUsersByAdmin } from "@/actions/query";
import UsersPage from "@/components/pages/admin/UsersPage";

export const AdminUserManagementServer = async ({
  page,
  limit,
  search,
}: {
  page: string;
  limit: string;
  search: string;
}) => {
  const data = await getUsersByAdmin(page, limit, search);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Users not found</div>;
  }

  console.log(data.data);

  return (
    <UsersPage
      users={data.data.users}
      page={page}
      limit={limit}
      totalCount={data.data.totalUsers}
    />
  );
};
