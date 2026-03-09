"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Clock, ChevronRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { IconName } from "@/config/icons.config";
import Image from "next/image";
import { Booking, Car } from "@/generated/prisma/client";
import { PAGES } from "@/config/pages.config";

type BookingWithCar = Booking & { car: Car };

type DashboardData = {
  user: { firstName: string; lastName: string };
  activeBooking: BookingWithCar | null;
  upcomingBookings: BookingWithCar[];
  pastBookings: BookingWithCar[];
  totalTrips: number;
  totalSpent: number;
} | null;

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(date: Date | string, time?: string) {
  const d = new Date(date);
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return time ? `${dateStr}, ${time}` : dateStr;
}

function getTimeRemaining(endDate: Date | string) {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

function getStatusStep(booking: BookingWithCar): number {
  if (booking.status === "ACTIVE") return 2;
  if (booking.status === "CONFIRMED") return 1;
  return 0;
}

export function DashboardOverview({ data }: { data: DashboardData }) {
  const userName = data ? `${data.user.firstName} ${data.user.lastName}` : "User";
  const activeBooking = data?.activeBooking ?? null;
  const upcomingBookings = data?.upcomingBookings ?? [];
  const pastBookings = data?.pastBookings ?? [];
  const totalTrips = data?.totalTrips ?? 0;
  const totalSpent = data?.totalSpent ?? 0;
  const activeCount = activeBooking ? 1 : 0;

  const stats = [
    { label: "Active Booking", value: String(activeCount), icon: "gray_calender_icon" },
    { label: "Total Trips", value: String(totalTrips), icon: "car_icon" },
    { label: "Total Spent", value: `$${totalSpent.toFixed(0)}`, icon: "card_icon" },
  ];

  const timeRemaining = activeBooking ? getTimeRemaining(activeBooking.endDate) : null;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-display font-bold">Welcome back, {userName}</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your rentals today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border border-border">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-lg text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold mt-1">{s.value}</p>
              </div>
              <div className="text-muted-foreground/30">
                <Icons name={s.icon as IconName} className="h-10 w-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Rental Card */}
      {activeBooking ? (
        <Card className="border border-border overflow-hidden">
          <CardContent className="p-0">
            {/* Status Bar */}
            <div className="px-6 py-3 border-b border-border flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 uppercase text-xs font-bold tracking-wider">
                  On Rent
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Booking ID: {activeBooking.bookingId.slice(0, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-6">
                {["Booked", "Picked Up", "Return"].map((step, i) => {
                  const stepDone = i < getStatusStep(activeBooking);
                  return (
                    <div key={step} className="flex items-center gap-2">
                      <div className="flex items-center justify-between flex-col space-y-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${stepDone ? "gradient-teal text-primary-foreground" : "border-2 border-muted-foreground/30 text-muted-foreground/30"}`}
                        >
                          {stepDone ? "✓" : "○"}
                        </div>
                        <span
                          className={`text-xs font-medium uppercase tracking-wider ${stepDone ? "text-primary" : "text-muted-foreground/50"}`}
                        >
                          {step}
                        </span>
                      </div>
                      {i < 2 && (
                        <div
                          className={`w-20 h-1 ${i < getStatusStep(activeBooking) - 1 ? "bg-primary" : "bg-muted-foreground/20"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Car Details */}
            <div className="p-6 flex flex-col lg:flex-row gap-6">
              <div className="bg-[#F8FAFC] p-6">
                <div className="relative w-full lg:w-85 h-55 bg-muted flex items-center justify-center">
                  <div className="gradient-color w-full h-full flex items-center justify-center">
                    <div className="max-w-3xs">
                      <Image
                        src={activeBooking.car.imageUrl}
                        alt={activeBooking.car.name}
                        width={1000}
                        height={500}
                      />
                    </div>
                  </div>
                  <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold">
                    ● Active
                  </Badge>
                  <div className="absolute -bottom-3 -left-3 font-bold text-xs px-2 py-1 bg-white text-black">
                    PLATE: {activeBooking.car.plate ?? "—"}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-black uppercase">{activeBooking.car.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Booking ID: {activeBooking.bookingId.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      ${activeBooking.totalAmount.toFixed(0)}
                      <span className="text-base text-muted-foreground">
                        .{(activeBooking.totalAmount % 1).toFixed(2).slice(2)}
                      </span>
                    </p>
                    <p className="text-xs text-primary flex items-center gap-1 justify-end">
                      <Shield className="h-3 w-3" /> {activeBooking.coverage === "PREMIUM" ? "Full Coverage" : "Standard Coverage"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Pickup</p>
                    <p className="font-semibold">{formatDateTime(activeBooking.startDate, activeBooking.pickupTime)}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {activeBooking.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Return</p>
                    <p className="font-semibold">{formatDateTime(activeBooking.endDate, activeBooking.dropoffTime)}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {activeBooking.dropoffLocation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Time Remaining
                    </span>
                    <span className="text-2xl font-bold text-primary ml-2">{timeRemaining?.days}</span>
                    <span className="text-xs text-muted-foreground">Days</span>
                    <span className="text-2xl font-bold text-primary">{timeRemaining?.hours}</span>
                    <span className="text-xs text-muted-foreground">Hrs</span>
                  </div>
                  <Link href={PAGES.DASHBOARD.BOOKING_DETAILS(activeBooking.id)}>
                    <Button className="gradient-teal text-primary-foreground uppercase text-xs tracking-wider font-bold">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-border">
          <CardContent className="p-8 text-center text-muted-foreground">
            <p className="font-medium">No active rental at the moment.</p>
            <Link href="/">
              <Button className="mt-4 gradient-teal text-primary-foreground uppercase text-xs tracking-wider font-bold">
                Browse Cars
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Upcoming & Past Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold uppercase tracking-wide">Upcoming Trips</h3>
            <Link href="/dashboard/bookings" className="text-xs text-primary font-medium uppercase tracking-wider">
              View All
            </Link>
          </div>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-2">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="border border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={booking.car.imageUrl}
                        alt={booking.car.name}
                        width={64}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold truncate uppercase">{booking.car.name}</p>
                        <Badge variant="outline" className="text-[10px] uppercase shrink-0">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                        <span>💳 ${booking.totalAmount.toFixed(0)}</span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" /> {booking.coverage === "PREMIUM" ? "Full Coverage" : "Standard"}
                        </span>
                      </div>
                    </div>
                    <Link href={PAGES.DASHBOARD.BOOKING_DETAILS(booking.id)}>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border">
              <CardContent className="p-6 text-center text-muted-foreground text-sm">
                No upcoming trips.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Past */}
        <div>
          <h3 className="text-lg font-display font-bold uppercase tracking-wide mb-4">Past Trips</h3>
          {pastBookings.length > 0 ? (
            <div className="space-y-2">
              {pastBookings.map((booking) => (
                <Card key={booking.id} className="border border-border">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm uppercase">{booking.car.name}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                      </p>
                    </div>
                    <Link href={`/?pickupLocation=${encodeURIComponent(booking.pickupLocation)}`}>
                      <button className="flex items-center gap-1 text-xs text-primary font-bold uppercase tracking-wider hover:underline">
                        Rebook <RotateCcw className="h-3 w-3" />
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border">
              <CardContent className="p-6 text-center text-muted-foreground text-sm">
                No past trips yet.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
