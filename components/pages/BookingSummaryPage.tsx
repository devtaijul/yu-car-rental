"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";
import {
  CalendarIcon,
  Car as CarIcon,
  Check,
  Clock,
  MapPin,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CldImage } from "next-cloudinary";

export default function BookingSummaryPage({ car }: { car: Car }) {
  const router = useRouter();
  const { booking } = useBooking();

  if (!car) return <p>No car selected</p>;

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
                <div className="h-48 gradient-teal flex items-center justify-center">
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
                  <div className="border-t border-border mt-6 pt-6">
                    <h4 className="font-semibold mb-4">Price Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base rental ($55/day × 3 days)</span>
                        <span>$165.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>100% Coverage Package ($12/day)</span>
                        <span>$45.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Child seat ($5/day × 3 days)</span>
                        <span>$15.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional driver</span>
                        <span className="text-primary font-medium">FREE</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>$225.00</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>VAT (6%)</span>
                          <span>$20.00</span>
                        </div>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-primary">$245.00</span>
                      </div>
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
        <div>
          <h2 className="text-xl font-display font-semibold mb-6">
            Customer Information
          </h2>
          <div className="bg-card border border-border  p-6">
            {/* Personal Details */}
            <h3 className="font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  First Name
                </Label>
                <Input placeholder="John" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Last Name
                </Label>
                <Input placeholder="Doe" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Email Address
                </Label>
                <Input placeholder="john.doe@email.com" type="email" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Phone Number
                </Label>
                <Input placeholder="+31 6 12345678" type="tel" />
              </div>
            </div>

            {/* Driver's License */}
            <h3 className="font-semibold mb-4">
              Driver&apos;s License Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Date Of Birth
                </Label>
                <Input type="date" />
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Driver&apos;s License Number
                </Label>
                <Input placeholder="1234567890" />
              </div>
            </div>

            {/* Additional Information */}
            <h3 className="font-semibold mb-4">Additional Information</h3>
            <div className="mb-4">
              <Label className="text-sm font-medium mb-1 block">
                Promo Code
              </Label>
              <div className="flex gap-2">
                <Input placeholder="Enter code" className="flex-1" />
                <Button className="gradient-teal text-primary-foreground px-6">
                  Apply
                </Button>
              </div>
            </div>
            <div className="mb-6">
              <Label className="text-sm font-medium mb-1 block">
                Special Requests
              </Label>
              <textarea
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-20 resize-none"
                placeholder="e.g., Early pick-up, vehicle preference, special equipment..."
              />
            </div>

            {/* Payment Information */}
            <h3 className="font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Card Number
                </Label>
                <div className="relative">
                  <Input placeholder="1234 5678 9012 3456" className="pr-20" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded">
                      VISA
                    </span>
                    <span className="text-[10px] font-bold bg-destructive text-destructive-foreground px-1 rounded">
                      MC
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-1 block">
                  Cardholder Name
                </Label>
                <Input placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1 block">
                    Expiry Date
                  </Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1 block">CVV</Label>
                  <Input placeholder="123" />
                </div>
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 mt-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> SSL Secure
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> 100% Coverage
              </span>
              <span>★★★★★ Trustpilot Verified</span>
            </div>

            {/* Total */}
            <div className="text-center mt-4">
              <div className="text-lg font-semibold">Total: $245.00</div>
              <div className="text-xs text-muted-foreground">
                (including 6% VAT)
              </div>
            </div>

            {/* Terms */}
            <div className="mt-4 space-y-2">
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded border-input" />
                <span className="text-muted-foreground">
                  I agree to the Terms & Conditions, Cancellation Policy (free
                  up to 48h before), Fuel Policy
                </span>
              </label>
              <p className="text-xs text-muted-foreground">
                Minimum rental 3 days. Prices include 100% coverage option.
              </p>
            </div>

            {/* Pay Button */}
            <Button
              className="w-full mt-6 gradient-teal text-primary-foreground py-6 text-base"
              onClick={() => router.push("/confirmation")}
            >
              Confirm & Pay Securely - €245.00
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Pay €245.00 now · Full payment secured
            </p>
          </div>
        </div>
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
