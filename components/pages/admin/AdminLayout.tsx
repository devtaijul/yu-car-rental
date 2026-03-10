"use client";

import { Button } from "@/components/ui/button";
import { cn, stripLocale } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardNav } from "../DashboardNav";

const navItems = [
  { to: "/admin", icon: "dashbaord_icon", label: "Dashboard" },
  { to: "/admin/cars", icon: "dashboard_car_icon", label: "Cars" },
  { to: "/admin/bookings", icon: "dashboard_callendar_icon", label: "Bookings" },
  { to: "/admin/users", icon: "dashboard_user_icon", label: "Users" },
  { to: "/admin/payments", icon: "identity_icon", label: "Payments" },
  { to: "/admin/drivers", icon: "dashboard_user_check_icon", label: "Drivers" },
  { to: "/admin/reviews", icon: "dashboard_star", label: "Reviews" },
  { to: "/admin/coupons", icon: "dashbaord_coupon_icon", label: "Coupons" },
  { to: "/admin/settings", icon: "dashboard_settings_icon", label: "Settings" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const location = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );

  return (
    <div className="min-h-screen flex overflow-x-hidden bg-muted/20">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[17rem] bg-card border-r transform transition-transform duration-300 sm:w-64 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/assets/logo-nav.png"
              alt="Logo"
              className="max-w-32 sm:max-w-38"
              width={1000}
              height={500}
            />
          </Link>
          <button
            className="rounded p-1 hover:bg-muted lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <DashboardNav navItems={navItems} setSidebarOpen={setSidebarOpen} />
        <div className="border-t p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sm text-muted-foreground"
            onClick={() => signOut({ callbackUrl: "/en/login" })}
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
          <Link
            href="/"
            className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary"
          >
            {"< Back to Website"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-card/80 px-3 py-3 backdrop-blur sm:px-4 lg:px-6">
          <button
            className="rounded p-1 hover:bg-muted lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="truncate font-display text-base font-semibold sm:text-lg">
            {navItems.find((n) =>
              n.to === "/admin"
                ? stripLocale(location) === "/admin"
                : location.startsWith(n.to),
            )?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
