import { auth } from "@/auth";
import { AdminLayout } from "@/components/pages/admin/AdminLayout";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth(); // ✅ server function
  if (!session) redirect(PAGES.AUTH.LOGIN);
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
