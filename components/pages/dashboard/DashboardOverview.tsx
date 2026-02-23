import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  MapPin,
  Calendar,
  Shield,
  Clock,
  ChevronRight,
  RotateCcw,
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
    <div className="space-y-6 ">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-display font-bold">
          Welcome back, {/* {userName} */}
        </h1>
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
                {typeof s.icon === "object" ? (
                  s.icon
                ) : (
                  <Icons name={s.icon as IconName} className="h-10 w-10 " />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Rental Card */}
      <Card className="border border-border overflow-hidden">
        <CardContent className="p-0">
          {/* Status Bar */}
          <div className="px-6 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 uppercase text-xs font-bold tracking-wider">
                On Rent
              </Badge>
              <span className="text-sm text-muted-foreground">
                Booking ID: YU-847291
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["Booked", "Picked Up", "Return"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex items-center justify-between flex-col space-y-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i < 2 ? "gradient-teal text-primary-foreground" : "border-2 border-muted-foreground/30 text-muted-foreground/30"}`}
                    >
                      {i < 2 ? "✓" : "○"}
                    </div>
                    <span
                      className={`text-xs font-medium uppercase tracking-wider ${i < 2 ? "text-primary" : "text-muted-foreground/50"}`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-20 h-1 ${i === 0 ? "bg-primary" : "bg-muted-foreground/20"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Car Details */}
          <div className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="bg-[#F8FAFC] p-6">
              <div className="relative w-full lg:w-85 h-55   bg-muted flex items-center justify-center">
                <div className="gradient-color w-full h-full flex items-center justify-center">
                  <div className="max-w-3xs">
                    <Image
                      src="/car/car-1.png"
                      alt="vehicle"
                      width={1000}
                      height={500}
                    />
                  </div>
                </div>
                <Badge className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold">
                  ● Active
                </Badge>
                <div className="absolute -bottom-3 -left-3  font-bold text-xs px-2 py-1 bg-white text-black">
                  PLATE: BNR-482
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-4xl font-black">TOYOTA RAIZE</h2>
                  <p className="text-sm text-muted-foreground">
                    Booking ID: YU-847291
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    $840
                    <span className="text-base text-muted-foreground">.00</span>
                  </p>
                  <p className="text-xs text-primary flex items-center gap-1 justify-end">
                    <Shield className="h-3 w-3" /> Full Coverage
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
                    Pickup
                  </p>
                  <p className="font-semibold">Oct 24, 10:00 AM</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Flamingo Airport
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary font-bold">
                    Return
                  </p>
                  <p className="font-semibold">Nov 02, 14:00 PM</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Flamingo Airport
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Time Remaining
                  </span>
                  <span className="text-2xl font-bold text-primary ml-2">
                    4
                  </span>
                  <span className="text-xs text-muted-foreground">Days</span>
                  <span className="text-2xl font-bold text-primary">18</span>
                  <span className="text-xs text-muted-foreground">Hrs</span>
                </div>
                <Link href="/dashboard/bookings">
                  <Button className="gradient-teal text-primary-foreground uppercase text-xs tracking-wider font-bold">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming & Past Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold uppercase tracking-wide">
              Upcoming Trips
            </h3>
            <Link
              href="/dashboard/bookings"
              className="text-xs text-primary font-medium uppercase tracking-wider"
            >
              View All
            </Link>
          </div>
          <Card className="border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-16 h-12 rounded-lg gradient-teal flex items-center justify-center">
                <Car className="h-6 w-6 text-primary-foreground/70" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold">TOYOTA HILUX</p>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    Confirmed
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Dec 15 - Dec 22, 2024
                </p>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span>💳 PAID $650</span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Full Coverage
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Past */}
        <div>
          <h3 className="text-lg font-display font-bold uppercase tracking-wide mb-4">
            Past Trips
          </h3>
          <div className="space-y-2">
            {[
              { name: "Kia Rio Pick-up", dates: "Sep 10 - Sep 15, 2024" },
              { name: "Nissan X-Trail", dates: "Jul 02 - Jul 08, 2024" },
              { name: "Jeep Wrangler", dates: "Jan 12 - Jan 20, 2024" },
            ].map((trip) => (
              <Card key={trip.name} className="border border-border">
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm">{trip.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {trip.dates}
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-primary font-bold uppercase tracking-wider hover:underline">
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
