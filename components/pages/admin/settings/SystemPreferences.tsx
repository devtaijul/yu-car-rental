"use client";

import React from "react";

export const SystemPreferences = () => {
  return (
    <div className="bg-card rounded-xl border p-6">
      <h2 className="text-lg font-bold text-foreground">System Preferences</h2>
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
              Disables the public-facing site and shows a &quot;Coming Back
              Soon&quot; page. Only admins can log in.
            </p>
          </div>
          <div className="h-6 w-11 bg-gray-300 rounded-full relative cursor-pointer">
            <div className="absolute left-0.5 top-0.5 h-5 w-5 bg-card shadow rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
