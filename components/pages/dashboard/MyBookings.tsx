import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Car, MapPin, Shield, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = ["All Trips", "Active (1)", "Upcoming (2)", "Past (12)"];

const mockBookings = [
  {
    id: "YU-847291", car: "TOYOTA RAIZE", plate: "BNR-482", status: "ACTIVE", amount: 840,
    pickupDate: "Oct 24, 10:00 AM", returnDate: "Nov 02, 14:00 PM", location: "Flamingo Airport",
    coverage: "Full", daysLeft: 4, hrsLeft: 18, featured: true,
  },
  {
    id: "YU-918273", car: "TOYOTA RAIZE", status: "CONFIRMED", amount: 650,
    pickupDate: "Dec 15", returnDate: "Dec 22, 2024", location: "Flamingo Int. Airport", coverage: "Full",
  },
  {
    id: "YU-102938", car: "TOYOTA RAIZE", status: "PENDING PAYMENT", amount: 1250,
    pickupDate: "Feb 05", returnDate: "Feb 12, 2025", location: "Flamingo Int. Airport", coverage: "Basic",
  },
];

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-success/10 text-success border-success/20",
  CONFIRMED: "bg-primary/10 text-primary border-primary/20",
  "PENDING PAYMENT": "bg-warning/10 text-warning border-warning/20",
};

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold uppercase">My Bookings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your active rentals and review your trip history.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vehicle, location or ID" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
              i === activeTab
                ? "gradient-teal text-primary-foreground border-transparent"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <div className="space-y-4">
        {mockBookings.map(booking => (
          <Card key={booking.id} className="border border-border overflow-hidden">
            <CardContent className={cn("p-0", booking.featured && "")}>
              <div className={cn("flex flex-col lg:flex-row gap-4", booking.featured ? "p-6" : "p-4")}>
                {/* Car Image */}
                <div className={cn(
                  "relative rounded-xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0",
                  booking.featured ? "w-full lg:w-[320px] h-[200px]" : "w-[120px] h-[80px]"
                )}>
                  <div className="gradient-teal w-full h-full flex items-center justify-center">
                    <Car className={cn("text-primary-foreground/50", booking.featured ? "h-16 w-16" : "h-8 w-8")} />
                  </div>
                  <Badge className={cn("absolute top-2 right-2 text-[10px] uppercase font-bold", statusStyles[booking.status])}>
                    {booking.status === "ACTIVE" && "● "}{booking.status}
                  </Badge>
                  {booking.plate && (
                    <div className="absolute bottom-2 left-2 bg-foreground/80 text-background text-[10px] px-2 py-0.5 rounded font-mono">PLATE: {booking.plate}</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      {!booking.featured && <p className="text-[10px] text-muted-foreground">ID: {booking.id}</p>}
                      <h3 className={cn("font-display font-bold", booking.featured ? "text-2xl" : "text-lg")}>{booking.car}</h3>
                      {booking.featured && <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>}
                    </div>
                    <div className="text-right">
                      <p className={cn("font-bold", booking.featured ? "text-2xl" : "text-lg")}>${booking.amount}<span className="text-xs text-muted-foreground">.00</span></p>
                      {booking.coverage === "Full" && <p className="text-[10px] text-primary flex items-center gap-1 justify-end"><Shield className="h-3 w-3" /> Full Coverage</p>}
                    </div>
                  </div>

                  {booking.featured ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Pickup</p>
                          <p className="font-semibold">{booking.pickupDate}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.location}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Return</p>
                          <p className="font-semibold">{booking.returnDate}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Time Remaining</span>
                          <span className="text-xl font-bold text-primary ml-2">{booking.daysLeft}</span>
                          <span className="text-xs text-muted-foreground">Days</span>
                          <span className="text-xl font-bold text-primary">{booking.hrsLeft}</span>
                          <span className="text-xs text-muted-foreground">Hrs</span>
                        </div>
                        <Button className="gradient-teal text-primary-foreground uppercase text-xs tracking-wider font-bold">View Details</Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <div><span className="uppercase tracking-wider font-medium text-[10px]">Dates</span><p className="text-foreground font-medium">{booking.pickupDate} - {booking.returnDate}</p></div>
                      <div><span className="uppercase tracking-wider font-medium text-[10px]">Location</span><p className="text-foreground font-medium">{booking.location}</p></div>
                      <div><span className="uppercase tracking-wider font-medium text-[10px]">Coverage</span><p className="text-foreground font-medium flex items-center gap-1"><Shield className="h-3 w-3" /> {booking.coverage}</p></div>
                      <div className="ml-auto flex flex-col gap-1">
                        {booking.status === "PENDING PAYMENT" && (
                          <Button size="sm" className="bg-warning text-warning-foreground uppercase text-[10px] tracking-wider font-bold">Complete Payment</Button>
                        )}
                        <Button size="sm" variant="outline" className="uppercase text-[10px] tracking-wider font-bold">View Details</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <button className="text-sm text-muted-foreground font-medium uppercase tracking-wider hover:text-primary">
          Load Older Trips ▾
        </button>
      </div>
    </div>
  );
}
