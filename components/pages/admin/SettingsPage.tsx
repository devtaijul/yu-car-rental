"use client";

import { useState } from "react";
import { GeneralSettings } from "./settings/GeneralSettings";
import { NotificationPreferences } from "./settings/NotificationPreferences";
import { PaymentGateway } from "./settings/PaymentGateway";
import { SecuritySettings } from "./settings/SecuritySettings";
import { SystemPreferences } from "./settings/SystemPreferences";
import { UserRules } from "./settings/UserRules";
import { PlatformSettings } from "@/generated/prisma/client";

const sidebarLinks = [
  "General Settings",
  "Payment Gateway",
  "Notification Preferences",
  "Security Settings",
  "User Permissions",
  "System Preferences",
];

const SettingsPage = ({ settings }: { settings: PlatformSettings }) => {
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
          <GeneralSettings settings={settings} />

          {/* Payment Gateway */}
          <PaymentGateway settings={settings} />

          {/* Notification Preferences */}
          <NotificationPreferences />

          {/* Security Settings */}
          <SecuritySettings />

          {/* User Roles */}
          <UserRules />

          {/* System Preferences */}
          <SystemPreferences />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
