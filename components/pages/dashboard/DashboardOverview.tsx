import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Shield,
  Clock,
  ChevronRight,
  RotateCcw,
  Check,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { IconName } from "@/config/icons.config";
import Image from "next/image";

export function DashboardOverview() {
  // Mock data for UI design
  const stats = [
    { label: "Active Booking", value: "1", icon: "gray_calender_icon" },
    { label: "Total Trips", value: "12", icon: "car_icon" },
    {
      label: "Total Spent",
      value: "$4,250",
      icon: "card_icon",
    },
  ];

  return (
      <div className="space-y-5 sm:space-y-6">
          {/* Welcome */}
          <div>
              <h1 className="text-2xl font-display font-bold sm:text-3xl">
                  Welcome back, {/* {userName} */}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  Here&apos;s what&apos;s happening with your rentals today.
              </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((s) => (
                  <Card key={s.label} className="border border-border">
                      <CardContent className="flex items-center justify-between p-4 sm:p-5">
                          <div>
                              <p className="text-base text-muted-foreground sm:text-lg">
                                  {s.label}
                              </p>
                              <p className="mt-1 text-2xl font-bold sm:text-3xl">
                                  {s.value}
                              </p>
                          </div>
                          <div className="text-muted-foreground/30">
                              {typeof s.icon === "object" ? (
                                  s.icon
                              ) : (
                                  <Icons
                                      name={s.icon as IconName}
                                      className="h-8 w-8 sm:h-10 sm:w-10"
                                  />
                              )}
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>

          {/* Active Rental Card */}
          <Card className="overflow-hidden border border-border">
              <CardContent className="p-0">
                  {/* Status Bar */}
                  <div className="flex flex-col gap-4 border-b border-border px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <Badge className="border-destructive/20 bg-destructive/10 text-xs font-bold uppercase tracking-wider text-destructive">
                              On Rent
                          </Badge>
                          <span className="text-xs text-muted-foreground sm:text-sm">
                              Booking ID: YU-847291
                          </span>
                      </div>
                      <div className="w-full overflow-x-auto lg:w-auto">
                          <div className="flex min-w-max items-center gap-4 sm:gap-6">
                              {["Booked", "Picked Up", "Return"].map(
                                  (step, i) => (
                                      <div
                                          key={step}
                                          className="flex items-center gap-1.5 sm:gap-2"
                                      >
                                          <div className="flex flex-col items-center justify-between space-y-2">
                                              <div
                                                  className={`flex h-5 w-5 items-center justify-center rounded-full sm:h-6 sm:w-6 ${i < 2 ? "gradient-teal text-primary-foreground" : "border-2 border-muted-foreground/30 text-muted-foreground/30"}`}
                                              >
                                                  {i < 2 ? (
                                                      <Check className="h-3 w-3" />
                                                  ) : (
                                                      <Circle className="h-2.5 w-2.5" />
                                                  )}
                                              </div>
                                              <span
                                                  className={`text-[10px] font-medium uppercase tracking-wider sm:text-xs ${i < 2 ? "text-primary" : "text-muted-foreground/50"}`}
                                              >
                                                  {step}
                                              </span>
                                          </div>
                                          {i < 2 && (
                                              <div
                                                  className={`h-1 w-10 sm:w-16 lg:w-20 ${i === 0 ? "bg-primary" : "bg-muted-foreground/20"}`}
                                              />
                                          )}
                                      </div>
                                  ),
                              )}
                          </div>
                      </div>
                  </div>

                  {/* Car Details */}
                  <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row">
                      <div className="bg-[#F8FAFC] p-4 sm:p-6">
                          <div className="relative mx-auto flex h-48 w-full max-w-md items-center justify-center bg-muted sm:h-55 lg:mx-0 lg:w-85">
                              <div className="gradient-color flex h-full w-full items-center justify-center">
                                  <div className="max-w-3xs">
                                      <Image
                                          src="/car/car-1.png"
                                          alt="vehicle"
                                          width={1000}
                                          height={500}
                                      />
                                  </div>
                              </div>
                              <Badge className="absolute right-2 top-2 bg-primary text-xs font-bold text-primary-foreground sm:-right-3 sm:-top-3">
                                  Active
                              </Badge>
                              <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-bold text-black sm:-bottom-3 sm:-left-3">
                                  PLATE: BNR-482
                              </div>
                          </div>
                      </div>

                      <div className="flex-1 space-y-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                  <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                                      TOYOTA RAIZE
                                  </h2>
                                  <p className="text-sm text-muted-foreground">
                                      Booking ID: YU-847291
                                  </p>
                              </div>
                              <div className="text-left sm:text-right">
                                  <p className="text-2xl font-bold sm:text-3xl">
                                      $840
                                      <span className="text-base text-muted-foreground">
                                          .00
                                      </span>
                                  </p>
                                  <p className="flex items-center gap-1 text-xs text-primary sm:justify-end">
                                      <Shield className="h-3 w-3" /> Full
                                      Coverage
                                  </p>
                              </div>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                              <div>
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                      Pickup
                                  </p>
                                  <p className="text-sm font-semibold sm:text-base">
                                      Oct 24, 10:00 AM
                                  </p>
                                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <MapPin className="h-3 w-3" /> Flamingo
                                      Airport
                                  </p>
                              </div>
                              <div>
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                      Return
                                  </p>
                                  <p className="text-sm font-semibold sm:text-base">
                                      Nov 02, 14:00 PM
                                  </p>
                                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <MapPin className="h-3 w-3" /> Flamingo
                                      Airport
                                  </p>
                              </div>
                          </div>

                          <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex flex-wrap items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                      Time Remaining
                                  </span>
                                  <span className="ml-2 text-xl font-bold text-primary sm:text-2xl">
                                      4
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                      Days
                                  </span>
                                  <span className="text-xl font-bold text-primary sm:text-2xl">
                                      18
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                      Hrs
                                  </span>
                              </div>
                              <Link
                                  href="/dashboard/bookings"
                                  className="w-full sm:w-auto"
                              >
                                  <Button className="gradient-teal w-full text-xs font-bold uppercase tracking-wider text-primary-foreground sm:w-auto">
                                      View Details
                                  </Button>
                              </Link>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card>

          {/* Upcoming & Past Trips */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {/* Upcoming */}
              <div>
                  <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                      <h3 className="text-base font-display font-bold uppercase tracking-wide sm:text-lg">
                          Upcoming Trips
                      </h3>
                      <Link
                          href="/dashboard/bookings"
                          className="text-[11px] font-medium uppercase tracking-wider text-primary sm:text-xs"
                      >
                          View All
                      </Link>
                  </div>
                  <Card className="border border-border">
                      <CardContent className="flex items-start gap-3 p-4 sm:items-center sm:gap-4">
                          <div className="gradient-teal flex h-20 w-16 shrink-0 items-center justify-center rounded-lg p-1 sm:h-14 sm:w-20 sm:p-1.5">
                              <Image
                                  src="/car/car-1.png"
                                  alt="vehicle"
                                  width={220}
                                  height={120}
                                  className="h-full w-full object-contain"
                              />
                              {/* <Car className="h-5 w-5 text-primary-foreground/70 sm:h-6 sm:w-6" /> */}
                          </div>
                          <div className="flex-1">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <p className="text-sm font-bold sm:text-base">
                                      TOYOTA HILUX
                                  </p>
                                  <Badge
                                      variant="outline"
                                      className="text-[10px] uppercase"
                                  >
                                      Confirmed
                                  </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                  Dec 15 - Dec 22, 2024
                              </p>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground sm:gap-3">
                                  <span>PAID $650</span>
                                  <span className="flex items-center gap-1">
                                      <Shield className="h-3 w-3" /> Full
                                      Coverage
                                  </span>
                              </div>
                          </div>
                          <ChevronRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
                      </CardContent>
                  </Card>
              </div>

              {/* Past */}
              <div>
                  <h3 className="mb-3 text-base font-display font-bold uppercase tracking-wide sm:mb-4 sm:text-lg">
                      Past Trips
                  </h3>
                  <div className="space-y-2">
                      {[
                          {
                              name: "Kia Rio Pick-up",
                              dates: "Sep 10 - Sep 15, 2024",
                          },
                          {
                              name: "Nissan X-Trail",
                              dates: "Jul 02 - Jul 08, 2024",
                          },
                          {
                              name: "Jeep Wrangler",
                              dates: "Jan 12 - Jan 20, 2024",
                          },
                      ].map((trip) => (
                          <Card
                              key={trip.name}
                              className="border border-border"
                          >
                              <CardContent className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                      <p className="text-sm font-semibold">
                                          {trip.name}
                                      </p>
                                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                          {trip.dates}
                                      </p>
                                  </div>
                                  <button className="flex items-center gap-1 self-start text-xs font-bold uppercase tracking-wider text-primary hover:underline sm:self-auto">
                                      Rebook <RotateCcw className="h-3 w-3" />
                                  </button>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  );
}
