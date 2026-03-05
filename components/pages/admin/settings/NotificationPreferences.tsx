"use client";

import React from "react";

export const NotificationPreferences = () => {
  return (
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
          <div key={n.title} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground text-sm">{n.title}</p>
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
  );
};
