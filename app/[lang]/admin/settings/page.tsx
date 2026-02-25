import { SettingsManagementServer } from "@/server/admin/settings.management.server";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsManagementServer />
    </Suspense>
  );
};

export default page;
