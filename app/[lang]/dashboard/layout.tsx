import { auth } from "@/auth";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect(PAGES.AUTH.LOGIN);
  }
  // check if user is  USER or ADMIN

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
