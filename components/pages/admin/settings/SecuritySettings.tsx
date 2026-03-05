import { Shield } from "lucide-react";
import React from "react";

export const SecuritySettings = () => {
  return (
    <div className="bg-card rounded-xl border p-6">
      <h2 className="text-lg font-bold text-foreground">Security Settings</h2>
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
                Enforce all administrators and staff to use an authenticator app
                when logging into the dashboard.
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
  );
};
