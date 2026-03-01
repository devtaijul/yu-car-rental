"use client";

import {
  Upload,
  Plus,
  Shield,
  Bell,
  Lock,
  Users,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  "General Settings",
  "Payment Gateway",
  "Notification Preferences",
  "Security Settings",
  "User Permissions",
  "System Preferences",
];

const roles = [
  {
    name: "Super Admin",
    description: "Full access to all system settings and records.",
    users: 2,
  },
  {
    name: "Manager",
    description:
      "Can view and edit bookings, cars, and users. No settings access.",
    users: 8,
  },
  {
    name: "Support Staff",
    description: "Read-only access to bookings and users for support purposes.",
    users: 15,
  },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Platform Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage system configurations, payment gateways, and security
          preferences.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-52 shrink-0 hidden lg:block">
          <nav className="space-y-1">
            {sidebarLinks.map((link, i) => (
              <button
                key={link}
                onClick={() => setActiveSection(i)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === i
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link}
                {activeSection === i && <span className="float-right">›</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* General Settings */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-bold text-foreground">
              General Settings
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Basic configuration details for your rental platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Platform Name
                </label>
                <input
                  type="text"
                  defaultValue="YU Car Rental"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Support Email
                </label>
                <input
                  type="email"
                  defaultValue="support@yurentals.com"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Support Phone
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Base Currency
                </label>
                <select className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none">
                  <option>USD - US Dollar ($)</option>
                  <option>BDT - Taka (৳)</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Brand Logo
              </label>
              <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5 justify-end">
              <button className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted transition-colors">
                CANCEL
              </button>
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                SAVE CHANGES
              </button>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Payment Gateway
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage API keys and payment processing options.
                </p>
              </div>
              <span className="text-xs font-bold text-success tracking-wider">
                LIVE MODE
              </span>
            </div>

            <div className="mt-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-foreground italic">
                    stripe
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Stripe Integration
                  </span>
                </div>
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 h-5 w-5 bg-primary-foreground rounded-full" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Publishable Key
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  SecretKey
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card font-mono focus:outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Keep this key secretKey. Do not expose it in client-side code.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🅿️</span>
                  <span className="text-sm font-medium">
                    PayPal Integration
                  </span>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-card rounded-full shadow" />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                SAVE PAYMENT SETTINGS
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-bold text-foreground">
              Notification Preferences
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Control which email alerts are sent to administrators.
            </p>

            <div className="space-y-5">
              {[
                {
                  title: "New Booking Alerts",
                  desc: "Receive an email whenever a customer completes a new booking.",
                  on: true,
                },
                {
                  title: "Cancellation Alerts",
                  desc: "Get notified when a booking is cancelled or refunded.",
                  on: true,
                },
                {
                  title: "Daily Revenue Summary",
                  desc: "A daily automated report of all transactions and revenue.",
                  on: false,
                },
                {
                  title: "System Error Logs",
                  desc: "Critical system errors or failed API connections.",
                  on: true,
                },
              ].map((n) => (
                <div
                  key={n.title}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <div
                    className={`h-6 w-11 ${n.on ? "bg-primary" : "bg-muted"} rounded-full relative cursor-pointer`}
                  >
                    <div
                      className={`absolute ${n.on ? "right-0.5" : "left-0.5"} top-0.5 h-5 w-5 ${n.on ? "bg-primary-foreground" : "bg-card shadow"} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-bold text-foreground">
              Security Settings
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Protect your platform with advanced security rules.
            </p>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Require Two-Factor Authentication (2FA)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enforce all administrators and staff to use an
                      authenticator app when logging into the dashboard.
                    </p>
                  </div>
                </div>
                <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 h-5 w-5 bg-primary-foreground rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Admin Session Timeout
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically log out inactive users.
                  </p>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Password Expiry
                  </label>
                  <select className="w-full border rounded-lg px-4 py-2.5 text-sm bg-card focus:outline-none">
                    <option>Every 90 Days</option>
                    <option>Every 60 Days</option>
                    <option>Every 30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                UPDATE SECURITY
              </button>
            </div>
          </div>

          {/* User Roles */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  User Roles & Permissions
                </h2>
                <p className="text-sm text-muted-foreground">
                  Define access levels for dashboard staff.
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                <Plus className="h-4 w-4" /> ADD ROLE
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-right py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Users
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.name} className="border-b last:border-0">
                    <td className="py-3">
                      <span className="px-3 py-1 rounded-md bg-foreground text-card text-xs font-semibold">
                        {role.name}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">
                      {role.description}
                    </td>
                    <td className="py-3 text-right font-bold">{role.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* System Preferences */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-lg font-bold text-foreground">
              System Preferences
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Developer tools and critical actions.
            </p>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Enable Debug Logging
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Write verbose logs to file for troubleshooting.
                  </p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-card shadow rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Clear System Cache
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Force refresh of compiled views and data queries.
                  </p>
                </div>
                <button className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                  CLEAR CACHE
                </button>
              </div>

              <div className="flex items-center justify-between bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <div>
                  <p className="font-semibold text-destructive text-sm">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Disables the public-facing site and shows a "Coming Back
                    Soon" page. Only admins can log in.
                  </p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-card shadow rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
