"use client";

import { useEffect, useRef, useState } from "react";
import { GeneralSettings } from "./settings/GeneralSettings";
import { NotificationPreferences } from "./settings/NotificationPreferences";
import { PaymentGateway } from "./settings/PaymentGateway";
import { SecuritySettings } from "./settings/SecuritySettings";
import { SystemPreferences } from "./settings/SystemPreferences";
import { UserRules } from "./settings/UserRules";
import { PlatformSettings } from "@/generated/prisma/client";

const SettingsPage = ({ settings }: { settings: PlatformSettings }) => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sections = [
    {
      id: "general-settings",
      label: "General Settings",
      render: <GeneralSettings settings={settings} />,
    },
    {
      id: "payment-gateway",
      label: "Payment Gateway",
      render: <PaymentGateway settings={settings} />,
    },
    {
      id: "notification-preferences",
      label: "Notification Preferences",
      render: <NotificationPreferences />,
    },
    {
      id: "security-settings",
      label: "Security Settings",
      render: <SecuritySettings />,
    },
    {
      id: "user-permissions",
      label: "User Permissions",
      render: <UserRules />,
    },
    {
      id: "system-preferences",
      label: "System Preferences",
      render: <SystemPreferences />,
    },
  ];

  useEffect(() => {
    const targets = sectionRefs.current.filter((el): el is HTMLDivElement =>
      Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;

        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        const indexAttr = visible[0].target.getAttribute("data-index");
        const index = indexAttr ? Number(indexAttr) : NaN;
        if (!Number.isNaN(index)) setActiveSection(index);
      },
      { root: null, rootMargin: "-20% 0px -65% 0px", threshold: 0.1 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

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
          <div className="pr-1">
            <nav className="space-y-1 fixed w-[15%] overflow-y-auto overscroll-contain">
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(i);
                    const el = sectionRefs.current[i];
                    if (el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === i
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-current={activeSection === i ? "true" : "false"}
                >
                  {section.label}
                  {activeSection === i && (
                    <span className="float-right">›</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 lg:ml-[10%]">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[i] = el;
              }}
              data-index={i}
              className="scroll-mt-24"
            >
              {section.render}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
