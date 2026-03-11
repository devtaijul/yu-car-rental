"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Car, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DashboardNav } from "../DashboardNav";
import { DashboardHeader } from "./DashboardHeader";

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
  console.log(session, "session");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex min-h-screen w-full min-w-0 overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 top-0 z-50 h-screen w-55 lg:w-[20%] overflow-y-auto border-r border-border bg-card transform transition-transform lg:z-auto lg:translate-x-0 flex flex-col",
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
      <div className="flex min-w-0 flex-1 min-h-0 flex-col lg:ml-[20%]">
        {/* Top Header */}
        <DashboardHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overscroll-contain overflow-x-hidden p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
