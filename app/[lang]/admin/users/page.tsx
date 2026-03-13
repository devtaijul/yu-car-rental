import { UsersPageSkeleton } from "@/components/skeleton/UsersPageSkeleton";
import { AdminUserManagementServer } from "@/server/AdminUserManagementServer";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) => {
  const query = await searchParams;
  const { page = "1", limit = "10", search = "" } = query;
  return (
    <Suspense fallback={<UsersPageSkeleton />}>
      <AdminUserManagementServer page={page} limit={limit} search={search} />
    </Suspense>
  );
};

export default page;
