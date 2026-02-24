"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Clock, Download } from "lucide-react";

export default function BookingDetailsPage() {
  const booking = {
    id: "YU-847291",
    car: "TOYOTA RAIZE",
    plate: "BNR-482",
    status: "ON RENT",
    amount: 840,
    pickupDate: "Oct 24, 2024 • 10:00 AM",
    returnDate: "Nov 02, 2024 • 14:00 PM",
    location: "Flamingo Airport",
    daysLeft: 4,
    hrsLeft: 18,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          Back to Overview
        </p>
        <h1 className="text-3xl font-display font-bold uppercase mt-2">
          Booking <span className="text-primary">Details</span>
        </h1>
      </div>

      {/* Top Card */}
      <Card className="border border-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Car Image */}
            <div className="bg-muted p-6 relative flex items-center justify-center lg:w-[350px]">
              <div className="gradient-color w-full h-[200px] flex items-center justify-center">
                <Image
                  src="/car/car-1.png"
                  alt="vehicle"
                  width={600}
                  height={300}
                  className="max-w-[250px]"
                />
              </div>

              <Badge className="absolute top-4 right-4 bg-primary text-white uppercase text-[10px] font-bold">
                ● {booking.status}
              </Badge>

              <div className="absolute bottom-3 left-3 bg-white border px-4 py-1 text-xs font-mono font-bold rounded">
                PLATE: {booking.plate}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold">
                    {booking.car}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${booking.amount}
                    <span className="text-xs text-muted-foreground">.00</span>
                  </p>
                  <p className="text-xs text-primary flex items-center gap-1 justify-end">
                    <Shield className="h-3 w-3" /> Full Coverage
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Pickup
                  </p>
                  <p className="font-semibold">{booking.pickupDate}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {booking.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Return
                  </p>
                  <p className="font-semibold">{booking.returnDate}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {booking.location}
                  </p>
                </div>
              </div>

              {/* Time Remaining */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs uppercase text-muted-foreground font-medium">
                    Time Remaining
                  </span>
                  <span className="text-xl font-bold text-primary">
                    {booking.daysLeft}
                  </span>
                  <span className="text-xs text-muted-foreground">Days</span>
                  <span className="text-xl font-bold text-primary">
                    {booking.hrsLeft}
                  </span>
                  <span className="text-xs text-muted-foreground">Hrs</span>
                </div>

                <Button className="gradient-teal text-primary-foreground uppercase text-xs font-bold">
                  Extend Time
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rental Itinerary */}
        <Card className="lg:col-span-2 border border-border">
          <CardHeader>
            <h3 className="text-lg font-display font-bold uppercase">
              Rental Itinerary
            </h3>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <div className="border p-4 rounded bg-muted">
              <p className="uppercase text-primary text-xs font-bold">
                Pickup Date & Time
              </p>
              <p className="font-semibold">{booking.pickupDate}</p>
              <p className="text-xs text-muted-foreground">
                Flamingo International Airport (BON)
              </p>
            </div>

            <div className="border p-4 rounded bg-muted">
              <p className="uppercase text-primary text-xs font-bold">
                Return Date & Time
              </p>
              <p className="font-semibold">{booking.returnDate}</p>
              <p className="text-xs text-muted-foreground">
                Flamingo International Airport (BON)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="border border-border">
          <CardHeader>
            <h3 className="text-lg font-display font-bold uppercase">
              Payment Summary
            </h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Base Rate (9 days @ $85)</span>
              <span>$765.00</span>
            </div>
            <div className="flex justify-between">
              <span>Full Coverage</span>
              <span>$180.00</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>$59.40</span>
            </div>

            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
              <span>Total Paid</span>
              <span className="text-primary">$1,049.40</span>
            </div>

            <Button
              variant="outline"
              className="w-full uppercase text-xs font-bold mt-3"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
