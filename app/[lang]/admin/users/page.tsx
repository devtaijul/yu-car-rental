import { AdminUserManagementServer } from "@/server/AdminUserManagementServer";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminUserManagementServer />
    </Suspense>
  );
};

export default page;
