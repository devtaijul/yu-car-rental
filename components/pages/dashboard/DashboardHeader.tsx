"use client";

import { DashboardHeaderSkeleton } from "@/components/skeleton/DashboardHeaderSkeleton";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import React, { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const DashboardHeader = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) => {
  const { data: session } = useSession();

  return (
    <Suspense fallback={<DashboardHeaderSkeleton />}>
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

          {/* User dropdown using shadcn/ui */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{session?.user?.name}</p>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                  Premium Member
                </p>
              </div>
              <div className="w-9 h-9 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-sm">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </Suspense>
  );
};
