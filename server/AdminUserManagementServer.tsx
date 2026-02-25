import { getUsersForAdmin } from "@/actions/query";
import UsersManagement from "@/components/pages/admin/UsersManagement";
import React from "react";

export const AdminUserManagementServer = async () => {
  const data = await getUsersForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <UsersManagement users={data.users} />;
};
