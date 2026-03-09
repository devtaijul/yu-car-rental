"use client";

import { cn, stripLocale } from "@/lib/utils";
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
  const pathnameWithLocale = usePathname();
  const pathname = stripLocale(pathnameWithLocale);

  return (
    <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3">
      {navItems.map((item) => {
        const isActive =
          item.to === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            href={item.to}
            onClick={() => {
              if (window.matchMedia("(max-width: 1023px)").matches) {
                setSidebarOpen(false);
              }
            }}
            className={cn(
              "flex min-h-11 items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium leading-tight transition-colors sm:text-sm lg:text-[0.95rem]",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icons
              name={item.icon as IconName}
              className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
            />
            <span className="truncate pr-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
