import { auth } from "@/auth";
import { AdminLayout } from "@/components/pages/admin/AdminLayout";
import { PAGES } from "@/config/pages.config";
import { UserRole } from "@/generated/prisma/enums";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth(); // ✅ server function
  if (!session) redirect(PAGES.AUTH.LOGIN);

  if (session.user.role !== UserRole.ADMIN) {
    redirect(PAGES.DASHBOARD.ROOT);
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
