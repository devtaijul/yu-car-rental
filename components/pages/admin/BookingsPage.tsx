"use client";

import { PAGES } from "@/config/pages.config";
import { Search, Eye, Pencil, X, Filter, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const mockBookings = [
  {
    id: "YU-847291",
    initials: "AJ",
    color: "bg-primary/20 text-primary",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    car: "Toyota Raize",
    plate: "BNR-482",
    from: "Oct 24, 10:00 AM",
    to: "Nov 02, 14:00 PM",
    status: "ACTIVE",
    statusDot: "status-active",
    amount: "$840.00",
    payment: "PAID",
    paymentClass: "text-success",
  },
  {
    id: "YU-847305",
    initials: "SW",
    color: "bg-warning/20 text-warning",
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    car: "BMW X5",
    plate: "TXL-901",
    from: "Oct 28, 09:00 AM",
    to: "Nov 05, 18:00 PM",
    status: "PENDING",
    statusDot: "status-pending",
    amount: "$1,250.00",
    payment: "UNPAID",
    paymentClass: "text-destructive",
  },
  {
    id: "YU-847112",
    initials: "MB",
    color: "bg-muted text-muted-foreground",
    name: "Michael Brown",
    email: "m.brown99@gmail.com",
    car: "Mercedes C-Class",
    plate: "LUX-001",
    from: "Oct 10, 11:00 AM",
    to: "Oct 15, 11:00 AM",
    status: "COMPLETED",
    statusDot: "status-completed",
    amount: "$650.00",
    payment: "PAID",
    paymentClass: "text-success",
  },
  {
    id: "YU-847055",
    initials: "ED",
    color: "bg-accent text-accent-foreground",
    name: "Emily Davis",
    email: "emily.d@company.net",
    car: "Audi Q7",
    plate: "AD-772",
    from: "Oct 05, 08:00 AM",
    to: "Oct 08, 20:00 PM",
    status: "CANCELLED",
    statusDot: "status-cancelled",
    amount: "$0.00",
    payment: "REFUNDED",
    paymentClass: "text-warning",
  },
  {
    id: "YU-847310",
    initials: "RK",
    color: "bg-success/20 text-success",
    name: "Robert King",
    email: "r.king88@yahoo.com",
    car: "Tesla Model 3",
    plate: "EV-330",
    from: "Oct 25, 08:30 AM",
    to: "Oct 29, 12:00 PM",
    status: "ACTIVE",
    statusDot: "status-active",
    amount: "$420.00",
    payment: "PAID",
    paymentClass: "text-success",
  },
];

const BookingsPage = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage, track, and update customer reservations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, Customer, Car..."
              className="pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 w-64"
            />
          </div>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" /> Status: All
          </button>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
            <Calendar className="h-4 w-4" /> Last 30 Days
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Car Details
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Booking Dates
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-right py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6 font-mono font-medium text-foreground">
                    {b.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold ${b.color}`}
                      >
                        {b.initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{b.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {b.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{b.car}</p>
                    <p className="text-xs text-muted-foreground">{b.plate}</p>
                  </td>
                  <td className="py-4 px-4 text-xs text-muted-foreground">
                    <p>From: {b.from}</p>
                    <p>To:&nbsp;&nbsp;&nbsp;&nbsp;{b.to}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1.5">
                      <span className={`status-dot ${b.statusDot}`} />
                      <span className="font-semibold text-xs tracking-wide">
                        {b.status}
                      </span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-foreground">{b.amount}</p>
                    <p className={`text-xs font-semibold ${b.paymentClass}`}>
                      {b.payment}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(PAGES.ADMIN.BOOKINGS.EDIT(b.id))
                        }
                        className="flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors"
                      >
                        VIEW DETAILS
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">1</span> to{" "}
            <span className="font-semibold text-foreground">5</span> of{" "}
            <span className="font-semibold text-foreground">1,204</span>{" "}
            bookings
          </p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              ←
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              2
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              3
            </button>
            <span className="px-2 text-muted-foreground">...</span>
            <button className="px-3 py-1.5 text-sm rounded-lg hover:bg-muted">
              24
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg text-muted-foreground hover:bg-muted">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
