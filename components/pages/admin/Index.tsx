"use client";

import {
  Car,
  CalendarCheck,
  Users,
  DollarSign,
  Clock,
  Heart,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Total Cars", value: "1,248", icon: Car },
  { label: "Active Bookings", value: "342", icon: CalendarCheck },
  { label: "Total Users", value: "8,921", icon: Users },
];

const stats2 = [
  { label: "Total Revenue", value: "$124,500", icon: DollarSign },
  { label: "Pending Approvals", value: "18", icon: Clock },
  { label: "Customer Satisfaction", value: "98%", icon: Heart },
];

const revenueData = [
  { month: "JAN", value: 8000 },
  { month: "FEB", value: 12000 },
  { month: "MAR", value: 10000 },
  { month: "APR", value: 15000 },
  { month: "MAY", value: 13000 },
  { month: "JUN", value: 18000 },
  { month: "JUL", value: 42000 },
  { month: "AUG", value: 35000 },
  { month: "SEP", value: 28000 },
  { month: "OCT", value: 32000 },
  { month: "NOV", value: 45000 },
  { month: "DEC", value: 55000 },
];

const bookingStatusData = [
  { name: "Done", value: 64, color: "hsl(200, 38%, 26%)" },
  { name: "Pending", value: 24, color: "hsl(152, 60%, 42%)" },
  { name: "Failed", value: 12, color: "hsl(0, 72%, 51%)" },
];

const recentBookings = [
  {
    customer: "Alex Johnson",
    car: "Tesla Model 3",
    date: "Oct 24",
    status: "Completed",
    statusClass: "status-completed",
    amount: "$320.00",
  },
  {
    customer: "Sarah Williams",
    car: "BMW X5",
    date: "Oct 23",
    status: "Pending",
    statusClass: "status-pending",
    amount: "$450.00",
  },
  {
    customer: "Michael Brown",
    car: "Mercedes C-Class",
    date: "Oct 22",
    status: "Active",
    statusClass: "status-active",
    amount: "$280.00",
  },
  {
    customer: "Emily Davis",
    car: "Audi Q7",
    date: "Oct 21",
    status: "Cancelled",
    statusClass: "status-cancelled",
    amount: "$0.00",
  },
];

const statusDotClasses: Record<string, string> = {
  "status-completed": "bg-emerald-500",
  "status-pending": "bg-amber-400",
  "status-active": "bg-blue-500",
  "status-cancelled": "bg-rose-500",
};

const topCars = [
  { name: "Tesla Model 3", pct: 85 },
  { name: "BMW X5", pct: 72 },
  { name: "Mercedes C-Class", pct: 64 },
  { name: "Audi Q7", pct: 50 },
  { name: "Toyota Camry", pct: 45 },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Welcome back, Alex
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Here&apos;s what&apos;s happening with your rentals today.
        </p>
      </div>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-xl border bg-card p-4 sm:p-5 lg:p-6"
          >
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              {s.value}
            </p>
            <s.icon
              className="absolute bottom-3 right-3 h-12 w-12 text-muted/60 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              strokeWidth={1}
            />
          </div>
        ))}
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {stats2.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-xl border bg-card p-4 sm:p-5 lg:p-6"
          >
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              {s.value}
            </p>
            <s.icon
              className="absolute bottom-3 right-3 h-12 w-12 text-muted/60 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
              strokeWidth={1}
            />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        {/* Revenue Analytics */}
        <div className="rounded-xl border bg-card p-4 sm:p-5 lg:col-span-2 lg:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-foreground">Revenue Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Monthly recurring revenue
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Current Year
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(200, 38%, 26%)"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(200, 38%, 26%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(210, 10%, 50%)" }}
              />
              <YAxis hide />
              <Tooltip
                formatter={(value) => {
                  if (typeof value !== "number") return ["$0k", "Revenue"];

                  return [`$${(value / 1000).toFixed(0)}k`, "Revenue"];
                }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(214, 20%, 90%)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(200, 38%, 26%)"
                strokeWidth={2}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status */}
        <div className="rounded-xl border bg-card p-4 sm:p-5 lg:p-6">
          <h3 className="font-bold text-foreground mb-4">Booking Status</h3>
          <div className="flex justify-center">
            <div className="relative">
              <PieChart width={180} height={180}>
                <Pie
                  data={bookingStatusData}
                  cx={90}
                  cy={90}
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {bookingStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">
                  1,204
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Total
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6">
            {bookingStatusData.map((d) => (
              <div key={d.name} className="text-center">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-xs text-muted-foreground uppercase font-medium">
                    {d.name}
                  </span>
                </div>
                <p className="text-sm font-bold mt-0.5">{d.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        {/* Recent Bookings */}
        <div className="rounded-xl border bg-card p-4 sm:p-5 lg:col-span-2 lg:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-bold text-foreground">Recent Bookings</h3>
            <Link
              href="/admin/bookings"
              className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline shrink-0"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Car
                  </th>
                  <th className="text-left py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-medium">{b.customer}</td>
                    <td className="py-3 text-muted-foreground">{b.car}</td>
                    <td className="py-3 text-muted-foreground">{b.date}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${statusDotClasses[b.statusClass] ?? "bg-muted-foreground/40"}`}
                        />
                        <span className="text-sm">{b.status}</span>
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Cars */}
        <div className="rounded-xl border bg-card p-4 sm:p-5 lg:p-6">
          <h3 className="font-bold text-foreground mb-4">Top Cars</h3>
          <div className="space-y-4">
            {topCars.map((car) => (
              <div key={car.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{car.name}</span>
                  <span className="text-muted-foreground font-medium">
                    {car.pct}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all"
                    style={{ width: `${car.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
