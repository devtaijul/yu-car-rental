import { auth } from "@/auth";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session);

  if (session) {
    redirect(PAGES.DASHBOARD.ROOT);
  }

  return <div>{children}</div>;
};

export default layout;
