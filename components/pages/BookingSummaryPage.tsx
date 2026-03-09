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
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function BookingSummaryPage({
  car,
  onBack,
}: {
  car: Car;
  onBack?: () => void;
}) {
  useSyncBookingFromQuery();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const generatedOtpRef = useRef<string | null>(null);
  const router = useRouter();
  const { booking } = useBooking();

  const {
    coverage,
    extras,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
  } = booking;

  const selectedCarData = {
    name: "Volkswagen Tiguan",
    image: "/cars/tiguan.png",
    specs: { seats: 5, transmission: "Automatic" },
    pricePerDay: 55,
  };

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

  const basePrice = car.pricePerDay * days;
  const coveragePrice = coverage === "PREMIUM" ? 12 * days : 0;

  const extraPriceMap: Record<string, number> = {
    "baby-seat-small": 5,
    "baby-seat-large": 5,
    coolbox: 4,
    "key-secure-box": 2.5,
  };

  const extrasTotal = Object.entries(extras || {}).reduce((sum, [key, qty]) => {
    const price = extraPriceMap[key] || 0;
    return sum + price * qty * days;
  }, 0);

  const subtotal = basePrice + coveragePrice + extrasTotal;
  const vat = subtotal * 0.06;
  const total = subtotal + vat;

  // Only fetch payment intent after phone is verified
  useEffect(() => {
    if (!phoneVerified) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(total * 100),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [total, phoneVerified]);

  const handleSendOtp = useCallback(() => {
    if (!phone.trim()) return;

    const otp = generateOtp();
    generatedOtpRef.current = otp;
    setOtpSent(true);
    setOtpError(null);
    setOtpInput("");

    // TODO: Replace with actual SMS sending
    alert(`Your OTP is: ${otp}`);
  }, [phone]);

  const handleVerifyOtp = useCallback(() => {
    if (otpInput === generatedOtpRef.current) {
      setPhoneVerified(true);
      setOtpError(null);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  }, [otpInput]);

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
                <div className="h-48 gradient-color flex items-center justify-center rounded-2xl">
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
                    <h2 className="text-xl font-display font-semibold mt-6 mb-3">Price Breakdown</h2>
                    <div className="flex justify-between">
                      <span>
                        Base rental (${car.pricePerDay}/day × {days} days)
                      </span>
                      <span>${basePrice.toFixed(2)}</span>
                    </div>

                    {coverage === "PREMIUM" && (
                      <div className="flex justify-between">
                        <span>Premium Coverage ($12/day × {days})</span>
                        <span>${coveragePrice.toFixed(2)}</span>
                      </div>
                    )}

                    {Object.entries(extras || {}).map(([key, qty]) => {
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
        <div>
          <h2 className="text-xl font-display font-semibold mb-6">
            Customer Information
          </h2>

          {/* Phone Verification */}
          <div className="bg-card border border-border p-6 mb-6">
            <h3 className="font-semibold mb-4">Verify Phone Number</h3>

            {!phoneVerified ? (
              <div className="space-y-4">
                <div>
                  <Label className="mb-1 block">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      disabled={otpSent}
                    />
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!phone.trim() || otpSent}
                      className="bg-primary text-primary-foreground shrink-0"
                    >
                      {otpSent ? "OTP Sent" : "Send OTP"}
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <Label className="mb-1 block">Enter OTP</Label>
                    <div className="flex gap-2">
                      <Input
                        value={otpInput}
                        onChange={(e) => {
                          setOtpInput(e.target.value);
                          setOtpError(null);
                        }}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      <Button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otpInput.length !== 6}
                        className="bg-primary text-primary-foreground shrink-0"
                      >
                        Verify
                      </Button>
                    </div>
                    {otpError && (
                      <p className="text-xs text-red-500 mt-1">{otpError}</p>
                    )}
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-xs text-primary mt-2 hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>Phone verified: {phone}</span>
              </div>
            )}
          </div>

          {/* Payment - only shown after phone verification */}
          {phoneVerified && clientSecret ? (
            <StripeWrapper clientSecret={clientSecret}>
              <SummaryForm
                car={car}
                total={total}
                clientSecret={clientSecret}
                booking={booking}
                verifiedPhone={phone}
              />
            </StripeWrapper>
          ) : phoneVerified ? (
            <div className="bg-card border border-border p-6 text-center">
              <p className="text-muted-foreground">Loading payment form...</p>
            </div>
          ) : (
            <div className="bg-card border border-border p-6 text-center">
              <p className="text-muted-foreground">
                Please verify your phone number to proceed with payment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-end gap-4 mt-8">
        <Button className="text-gray-400 bg-transparent border border-transparent hover:border-gray-300 hover:bg-transparent transition-all duration-300" onClick={onBack || (() => router.back())}>
          Go To Step 3
        </Button>
      </div>
    </div>
  );
}
