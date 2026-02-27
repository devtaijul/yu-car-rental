"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BUSINESS } from "@/config/business.config";
import { formatDate } from "@/lib/formatDate";
import { calculateTax } from "@/lib/taxCounter";
import { BookingWithAll } from "@/types/system";
import { Clock, Download, MapPin, Shield } from "lucide-react";
import { CldImage } from "next-cloudinary";

export default function BookingDetailsPage({
  booking,
}: {
  booking: BookingWithAll;
}) {
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
            <div className="bg-muted p-6 relative flex items-center justify-center lg:w-87.5">
              <div className="gradient-color w-full h-50 flex items-center justify-center">
                <CldImage
                  src={booking.car.imageUrl}
                  width={400}
                  height={300}
                  alt="Car"
                  className="max-w-62.5"
                />
              </div>

              <Badge className="absolute top-4 right-4 bg-primary text-white uppercase text-[10px] font-bold">
                ● {booking.status}
              </Badge>

              <div className="absolute bottom-3 left-3 bg-white border px-4 py-1 text-xs font-mono font-bold rounded">
                PLATE: dfsdkfkf {/* {booking.plate} */}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold">
                    {booking.car.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Booking ID: {booking.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${booking.totalAmount}
                    <span className="text-xs text-muted-foreground">.00</span>
                  </p>
                  <p className="text-xs text-primary flex items-center gap-1 justify-end">
                    <Shield className="h-3 w-3" /> {booking.coverage}
                  </p>
                </div>
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Pickup
                  </p>
                  <p className="font-semibold">
                    {formatDate(booking.startDate)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {booking.pickupLocation}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Return
                  </p>
                  <p className="font-semibold">{formatDate(booking.endDate)}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {booking.dropoffLocation}
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
                    {booking.totalDays}
                  </span>
                  <span className="text-xs text-muted-foreground">Days</span>
                  <span className="text-xl font-bold text-primary">
                    {/* {booking.totalHours} */} 250
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
              <p className="font-semibold">{formatDate(booking.startDate)}</p>
              <p className="text-xs text-muted-foreground">
                Flamingo International Airport (BON)
              </p>
            </div>

            <div className="border p-4 rounded bg-muted">
              <p className="uppercase text-primary text-xs font-bold">
                Return Date & Time
              </p>
              <p className="font-semibold">{formatDate(booking.endDate)}</p>
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
              <span>
                Base Rate ({booking.totalDays} days @ ${booking.car.pricePerDay}
                )
              </span>
              <span>
                ${(booking.car.pricePerDay * booking.totalDays).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Full Coverage</span>
              <span>
                $
                {booking.coverage === "PREMIUM"
                  ? BUSINESS.COVERAGE.PREMIUM.toFixed(2)
                  : BUSINESS.COVERAGE.STANDARD.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>
                $
                {calculateTax(
                  booking.car.pricePerDay * booking.totalDays,
                  booking.coverage === "PREMIUM"
                    ? BUSINESS.COVERAGE.PREMIUM
                    : BUSINESS.COVERAGE.STANDARD,
                ).toFixed(2)}
              </span>
            </div>

            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
              <span>Total Paid</span>
              <span className="text-primary">
                ${booking.totalAmount.toFixed(2)}
              </span>
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
