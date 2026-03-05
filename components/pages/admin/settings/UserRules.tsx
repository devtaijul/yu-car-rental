import { Plus } from "lucide-react";
import React from "react";
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

export const UserRules = () => {
  return (
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
              <td className="py-3 text-muted-foreground">{role.description}</td>
              <td className="py-3 text-right font-bold">{role.users}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
