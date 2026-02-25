"use client";

import { Button } from "@/components/ui/button";
import { cn, stripLocale } from "@/lib/utils";
import { LogOut, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardNav } from "../DashboardNav";

const navItems = [
  { to: "/admin", icon: "dashbaord_icon", label: "Dashboard" },
  { to: "/admin/cars", icon: "dashbaord_icon", label: "Cars" },
  { to: "/admin/bookings", icon: "dashbaord_icon", label: "Bookings" },
  { to: "/admin/users", icon: "dashbaord_icon", label: "Users" },
  { to: "/admin/payments", icon: "dashbaord_icon", label: "Payments" },
  { to: "/admin/drivers", icon: "dashbaord_icon", label: "Drivers" },
  { to: "/admin/reviews", icon: "dashbaord_icon", label: "Reviews" },
  { to: "/admin/coupons", icon: "dashbaord_icon", label: "Coupons" },
  { to: "/admin/settings", icon: "dashbaord_icon", label: "Settings" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const location = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );

  if (!session?.user?.role)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="text-muted-foreground">
          You don&apos;t have admin privileges.
        </p>
        <Link href="/" className="text-primary hover:underline">
          Go to website
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-muted/20">
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
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/assets/logo-nav.png"
              alt="Logo"
              width={200}
              height={32}
            />
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <DashboardNav navItems={navItems} setSidebarOpen={setSidebarOpen} />
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            /*    onClick={signOut} */
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
          <Link
            href="/"
            className="block px-3 py-2 text-xs text-muted-foreground hover:text-primary"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur border-b px-4 py-3 flex items-center gap-3 lg:px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold font-display">
            {navItems.find((n) =>
              n.to === "/admin"
                ? stripLocale(location) === "/admin"
                : location.startsWith(n.to),
            )?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
