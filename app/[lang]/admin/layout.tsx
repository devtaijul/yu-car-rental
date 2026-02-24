import AdminLayout from "@/components/pages/admin/AdminLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
