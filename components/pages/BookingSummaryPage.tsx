"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarIcon, Clock, Shield, Check } from "lucide-react";

export default function BookingSummaryPage() {
  const router = useRouter();
  const { booking } = useBooking();

  if (!booking.carSlug) return <p>No car selected</p>;

  const {
    coverage,
    extras,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
    carSlug,
  } = booking;

  // Sample car data; ideally fetch from your database or context
  const selectedCarData = {
    name: "Volkswagen Tiguan",
    image: "/cars/tiguan.png",
    specs: { seats: 5, transmission: "Automatic" },
    pricePerDay: 55,
  };

  // Calculate rental days
  const days =
    pickupDate && dropoffDate
      ? Math.ceil(
          (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 1;

  // Calculate extras total
  const extrasTotal = Object.entries(extras || {}).reduce((sum, [id, qty]) => {
    // You might want to fetch real extra price from your data
    const extraPrice = 5; // default $5/day for demo
    return sum + extraPrice * qty * days;
  }, 0);

  const coveragePrice = coverage === "premium" ? 12 * days : 0;
  const basePrice = selectedCarData.pricePerDay * days;
  const subtotal = basePrice + coveragePrice + extrasTotal;
  const vat = subtotal * 0.06;
  const total = subtotal + vat;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Booking Summary */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-6">
            Booking Summary
          </h2>
          <div className="bg-card border border-border overflow-hidden">
            <div className="h-48 gradient-teal flex items-center justify-center">
              <Image
                src={selectedCarData.image}
                alt={selectedCarData.name}
                className="max-h-full object-contain"
                width={500}
                height={500}
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">
                {selectedCarData.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                e.g. Volkswagen Tiguan or similar
              </p>

              <div className="flex gap-2 mb-6">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                  {selectedCarData.specs.transmission}
                </span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                  {selectedCarData.specs.seats} Seats
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium">Pick-Up Location</span>
                    <p className="text-muted-foreground">
                      {pickupLocation || "Airport"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium">Pick-Up Date</span>
                    <p className="text-muted-foreground">
                      {pickupDate
                        ? new Date(pickupDate).toDateString()
                        : "Thu, Jan 15, 2026"}{" "}
                      at 10:00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium">Drop-Off Location</span>
                    <p className="text-muted-foreground">
                      {dropoffLocation || "Airport"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium">Drop-Off Date</span>
                    <p className="text-muted-foreground">
                      {dropoffDate
                        ? new Date(dropoffDate).toDateString()
                        : "Sun, Jan 18, 2026"}{" "}
                      at 10:00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <span className="font-medium">Duration</span>
                    <p className="text-muted-foreground">{days} days</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border mt-6 pt-6">
                <h4 className="font-semibold mb-4">Price Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      Base rental (${selectedCarData.pricePerDay}/day × {days}{" "}
                      days)
                    </span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {coveragePrice > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {coverage} Coverage Package (${coveragePrice / days}
                        /day)
                      </span>
                      <span>${coveragePrice.toFixed(2)}</span>
                    </div>
                  )}
                  {Object.entries(extras).map(([id, qty]) => (
                    <div className="flex justify-between" key={id}>
                      <span>
                        {id} ($5/day × {qty} days)
                      </span>
                      <span>${(5 * qty * days).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>VAT (6%)</span>
                      <span>${vat.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Customer Info & Payment */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-6">
            Customer Information
          </h2>
          <div className="bg-card border border-border p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  First Name
                </label>
                <input className="input" placeholder="John" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Last Name
                </label>
                <input className="input" placeholder="Doe" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="john.doe@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input"
                  placeholder="+31 6 12345678"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <h3 className="font-semibold">Payment Information</h3>
              <input className="input" placeholder="Card Number" />
              <input className="input" placeholder="Cardholder Name" />
              <div className="grid grid-cols-2 gap-4">
                <input className="input" placeholder="Expiry Date MM/YY" />
                <input className="input" placeholder="CVV" />
              </div>
            </div>

            <Button
              className="w-full gradient-teal text-primary-foreground py-4"
              onClick={() => router.push("/confirmation")}
            >
              Confirm & Pay Securely - ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-end gap-4 mt-8">
        {/* <Button variant="ghost" onClick={() => setStep(3)}>
          Go To Step 3
        </Button> */}
        <Button
          className="gradient-teal text-primary-foreground px-8"
          onClick={() => router.push("/confirmation")}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}
