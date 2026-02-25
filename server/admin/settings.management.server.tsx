import { getSettingsForAdmin } from "@/actions/query";
import { SettingsPage } from "@/components/pages/admin/SettingsPage";
import React from "react";

export const SettingsManagementServer = async () => {
  const data = await getSettingsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <SettingsPage settings={data.settings} />;
};
