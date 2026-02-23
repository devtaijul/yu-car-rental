"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons";
import { IconName } from "@/config/icons.config";
import { usePathname } from "next/navigation";

export const DashboardNav = ({
  navItems,
  setSidebarOpen,
}: {
  navItems: {
    to: string;
    icon: string;
    label: string;
  }[];
  setSidebarOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <nav className="p-3 space-y-1 flex-1">
      {navItems.map((item) => {
        const isActive =
          item.to === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            href={item.to}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary border-l-3 border-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icons name={item.icon as IconName} className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
