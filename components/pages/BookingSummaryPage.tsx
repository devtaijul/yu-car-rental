"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";
import { useSyncBookingFromQuery } from "@/hooks/useSyncBookingFromQuery";
import {
  CalendarIcon,
  Car as CarIcon,
  Check,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

import { SummaryForm } from "../booking/SummaryForm";
import { StripeWrapper } from "../StripeWrapper";
import { useEffect, useState } from "react";

export default function BookingSummaryPage({ car }: { car: Car }) {
  console.log("car", car);
  useSyncBookingFromQuery();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const router = useRouter();
  const { booking } = useBooking();
  console.log("booking", booking);

  const {
    coverage,
    extras,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
  } = booking;

  // Sample car data; ideally fetch from your database or context
  const selectedCarData = {
    name: "Volkswagen Tiguan",
    image: "/cars/tiguan.png",
    specs: { seats: 5, transmission: "Automatic" },
    pricePerDay: 55,
  };

  // Rental days calculation (minimum 1 day)
  const days =
    pickupDate && dropoffDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 1;

  // Base price from real car data
  const basePrice = car.pricePerDay * days;

  // Coverage
  const coveragePrice = coverage === "premium" ? 12 * days : 0;

  // Extras (example pricing logic)
  const extrasTotal = Object.entries(extras || {}).reduce((sum, [key, qty]) => {
    const extraPriceMap: Record<string, number> = {
      "baby-seat-large": 5,
    };

    const price = extraPriceMap[key] || 0;
    return sum + price * qty * days;
  }, 0);

  const subtotal = basePrice + coveragePrice + extrasTotal;
  const vat = subtotal * 0.06;
  const total = subtotal + vat;

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(total * 100),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("CLIENT SECRET FROM API:", data.clientSecret); // 👈 এখানে দেখবে
        setClientSecret(data.clientSecret);
      });
  }, [total]);

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Summary - Left Column */}
        <div>
          <h2 className="text-xl font-display font-semibold mb-6">
            Booking Summary
          </h2>
          <div className="bg-card border border-border  overflow-hidden">
            {selectedCarData && (
              <>
                <div className="h-48 gradient-color flex items-center justify-center">
                  <CldImage
                    src={car.imageUrl}
                    width={500}
                    className="max-h-full object-contain"
                    height={300}
                    alt="Car"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{car.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    e.g. Volkswagen Tiguan or similar
                  </p>
                  <div className="flex gap-2 mb-6">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                      {car.transmission}
                    </span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                      {car.seats} Seats
                    </span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary">
                      Eco-Friendly
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">Pick-Up Location</span>
                        <p className="text-muted-foreground">
                          {pickupLocation ? pickupLocation : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">Pick-Up Date</span>
                        <p className="text-muted-foreground">
                          {pickupDate
                            ? new Date(pickupDate).toLocaleDateString()
                            : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">Drop-Off Location</span>
                        <p className="text-muted-foreground">
                          {dropoffLocation ? dropoffLocation : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <div>
                        <span className="font-medium">Drop-Off Date</span>
                        <p className="text-muted-foreground">
                          {dropoffDate
                            ? new Date(dropoffDate).toLocaleDateString()
                            : "Not selected"}
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
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        Base rental (${car.pricePerDay}/day × {days} days)
                      </span>
                      <span>${basePrice.toFixed(2)}</span>
                    </div>

                    {coverage === "premium" && (
                      <div className="flex justify-between">
                        <span>Premium Coverage ($12/day × {days})</span>
                        <span>${coveragePrice.toFixed(2)}</span>
                      </div>
                    )}

                    {Object.entries(extras || {}).map(([key, qty]) => {
                      const extraPriceMap: Record<string, number> = {
                        "baby-seat-large": 5,
                      };

                      const price = extraPriceMap[key] || 0;
                      const totalExtra = price * qty * days;

                      return (
                        <div key={key} className="flex justify-between">
                          <span>
                            {key} (${price}/day × {qty} × {days})
                          </span>
                          <span>${totalExtra.toFixed(2)}</span>
                        </div>
                      );
                    })}

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
                  {/* No Hidden Fees */}
                  <div className="bg-[#2F6B7F]/10 border border-[#2F6B7F] rounded-xl p-4 mt-6 text-[#2F6B7F]">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-[#2F6B7F]" />
                      <span className="font-semibold text-sm">
                        No Hidden Fees
                      </span>
                    </div>
                    <ul className="space-y-1 pl-4">
                      {[
                        "Unlimited kilometers",
                        "Full tank return policy",
                        "100% Coverage included",
                        "Free cancellation up to 48h",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm "
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Why Choose YU */}
          <div className="mt-6 bg-card border border-border  p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-sm" />
              Why Choose YU Car Rental?
            </h4>
            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "100% Coverage Included",
                  desc: "No deposit worries with our premium package",
                },
                {
                  icon: CarIcon,
                  title: "New Fleet Vehicles",
                  desc: "Vehicles are available.",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  desc: "Customer Service in multiple languages",
                },
                {
                  icon: MapPin,
                  title: "Convenient Locations",
                  desc: "Bonaire Flamingo Airport pick-up",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <span className="font-medium text-sm">{item.title}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Info & Payment */}
        {clientSecret && (
          <StripeWrapper clientSecret={clientSecret}>
            <SummaryForm
              car={car}
              total={total}
              clientSecret={clientSecret}
              booking={booking}
            />
          </StripeWrapper>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost">Go To Step 3</Button>
        <Button
          className="gradient-teal text-primary-foreground px-8"
          onClick={() => {
            router.push("/confirmation");
          }}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}
