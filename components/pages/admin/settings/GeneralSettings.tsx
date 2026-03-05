"use client";

import { Upload } from "lucide-react";
import React from "react";

export const GeneralSettings = () => {
  return (
    <div className="bg-card rounded-xl border p-6">
      <h2 className="text-lg font-bold text-foreground">General Settings</h2>
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
  );
};
