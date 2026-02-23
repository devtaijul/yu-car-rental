import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Car, LayoutDashboard, CalendarCheck, Users, CreditCard,
  Star, Tag, Truck, Settings, LogOut, Menu, X, Bell, ChevronDown
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/cars", icon: Car, label: "Cars" },
  { to: "/admin/bookings", icon: CalendarCheck, label: "Bookings" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/payments", icon: CreditCard, label: "Payments" },
  { to: "/admin/drivers", icon: Truck, label: "Drivers" },
  { to: "/admin/reviews", icon: Star, label: "Reviews" },
  { to: "/admin/coupons", icon: Tag, label: "Coupons" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><h1 className="text-2xl font-bold text-destructive">Access Denied</h1><p className="text-muted-foreground">You don't have admin privileges.</p><Link to="/" className="text-primary hover:underline">Go to website</Link></div>;

  const userName = user.user_metadata?.name || user.email?.split("@")[0] || "Admin";

  return (
    <div className="min-h-screen flex bg-muted/30">
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[220px] bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static lg:z-auto flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-primary italic">yu</span>
            <div className="leading-none">
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Admin Panel</span>
            </div>
          </Link>
          <button className="lg:hidden ml-auto" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary border-l-3 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground text-sm" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between lg:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
            <h1 className="text-sm font-medium text-muted-foreground">
              {navItems.find(n => n.to === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(n.to))?.label || "Admin"}
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
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full gradient-teal flex items-center justify-center text-primary-foreground font-bold text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
