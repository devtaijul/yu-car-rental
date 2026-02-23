"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Car, ChevronDown, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DashboardNav } from "../DashboardNav";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { to: "/dashboard", icon: "dashbaord_icon", label: "Overview" },
  {
    to: "/dashboard/bookings",
    icon: "gray_calender_icon",
    label: "My Bookings",
  },
  {
    to: "/dashboard/payments",
    icon: "card_icon",
    label: "Payments & Invoices",
  },
  {
    to: "/dashboard/profile",
    icon: "profile_icon",
    label: "Profile & Documents",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  console.log("session", session);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = session?.user;

  const userName = user?.name || "User";

  return (
    <div className="min-h-screen h-screen fixed flex  w-full">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-55 h-screen top-0 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo-nav.png"
              alt="Logo"
              className="max-w-38"
              width={1000}
              height={500}
            />
          </Link>
          <button
            className="lg:hidden ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <DashboardNav navItems={navItems} setSidebarOpen={setSidebarOpen} />

        {/* Book CTA */}
        <div className="p-4">
          <div className="gradient-teal rounded-xl p-4 text-center">
            <Car className="h-6 w-6 text-primary-foreground mx-auto mb-2" />
            <p className="text-xs text-primary-foreground/80 font-medium uppercase tracking-wide">
              Need another ride?
            </p>
            <Link href="/booking">
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 w-full text-xs font-bold uppercase tracking-wider"
              >
                Book New Car
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between lg:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-medium text-muted-foreground">
              Dashboard Overview
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{userName}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Premium Member
                </p>
              </div>
              <div className="w-9 h-9 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
