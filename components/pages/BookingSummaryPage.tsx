"use client";

import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";
import { Car } from "@/generated/prisma/client";
import { useSyncBookingFromQuery } from "@/hooks/useSyncBookingFromQuery";
import {
  CalendarIcon,
  Car as CarIcon,
  Check,
  ChevronRight,
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
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
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
    pickupTime,
    dropoffTime,
  } = booking;

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
    return sum + (extraPriceMap[key] || 0) * qty * days;
  }, 0);

  const subtotal = basePrice + coveragePrice + extrasTotal;
  const vat = subtotal * 0.06;
  const total = subtotal + vat;

  useEffect(() => {
    if (!phoneVerified) return;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(total * 100) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPublishableKey(data.publishableKey);
      });
  }, [total, phoneVerified]);

  const handleSendOtp = useCallback(() => {
    if (!phone.trim()) return;
    const otp = generateOtp();
    generatedOtpRef.current = otp;
    setOtpSent(true);
    setOtpError(null);
    setOtpInput("");
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

  const formatBookingDate = (date?: string | Date) => {
    if (!date) return "Not selected";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-8 items-start">
        {/* ── LEFT: Booking Summary ── */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold">
            Booking Summary
          </h2>

          <div className="bg-card border border-border overflow-hidden">
            {/* Car Image */}
            <div className="h-44 gradient-color flex items-center justify-center">
              <CldImage
                src={car.imageUrl}
                width={500}
                height={280}
                alt={car.name}
                className="max-h-full object-contain"
              />
            </div>

            <div className="p-5 space-y-5">
              {/* Car Name & Tags */}
              <div>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  e.g. Volkswagen Tiguan or similar
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary font-medium">
                    {car.transmission}
                  </span>
                  {car.seats && (
                    <span className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary font-medium">
                      {car.seats} Seats
                    </span>
                  )}
                  <span className="text-[11px] px-2.5 py-1 bg-primary/10 text-primary font-medium">
                    Eco-Friendly
                  </span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Pick-Up Location
                    </p>
                    <p className="font-medium">
                      {pickupLocation?.replace(/-/g, " ") || "Not selected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CalendarIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Pick-Up Date
                    </p>
                    <p className="font-medium">
                      {formatBookingDate(pickupDate)}
                      {pickupTime ? `, ${pickupTime}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Drop-Off Location
                    </p>
                    <p className="font-medium">
                      {dropoffLocation?.replace(/-/g, " ") || "Not selected"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CalendarIcon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Drop-Off Date
                    </p>
                    <p className="font-medium">
                      {formatBookingDate(dropoffDate)}
                      {dropoffTime ? `, ${dropoffTime}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                      Duration
                    </p>
                    <p className="font-medium">{days} days</p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <h4 className="font-semibold text-base mb-3">
                  Price Breakdown
                </h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Base rental (${car.pricePerDay}/day × {days} days)
                  </span>
                  <span className="font-medium">${basePrice.toFixed(2)}</span>
                </div>
                {coverage === "PREMIUM" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      100% Coverage Package ($12/day)
                    </span>
                    <span className="font-medium">
                      ${coveragePrice.toFixed(2)}
                    </span>
                  </div>
                )}
                {Object.entries(extras || {}).map(([key, qty]) => {
                  const price = extraPriceMap[key] || 0;
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/-/g, " ")} (${price}/day × {qty})
                      </span>
                      <span className="font-medium">
                        ${(price * qty * days).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
                {coverage !== "PREMIUM" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Additional driver
                    </span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (6%)</span>
                    <span>${vat.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* No Hidden Fees */}
              <div className="bg-primary/5 border border-primary/20 p-4 text-primary">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 shrink-0" />
                  <span className="font-semibold text-sm">No Hidden Fees</span>
                </div>
                <ul className="space-y-1 pl-1">
                  {[
                    "Unlimited kilometers",
                    "Full tank return policy",
                    "100% Coverage included",
                    "Free cancellation up to 48h",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs">
                      <Check className="h-3 w-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose YU */}
          <div className="bg-card border border-border p-5">
            <h4 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-primary rounded-sm shrink-0" />
              Why Choose YU Car Rental?
            </h4>
            <div className="space-y-3.5">
              {[
                {
                  icon: Shield,
                  title: "100% Coverage Included",
                  desc: "No deposit worries with our premium package",
                },
                {
                  icon: CarIcon,
                  title: "New Fleet Vehicles",
                  desc: "All vehicles freshly serviced and available",
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  desc: "Customer service in multiple languages",
                },
                {
                  icon: MapPin,
                  title: "Convenient Locations",
                  desc: "Bonaire Flamingo Airport pick-up",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Customer Info & Payment ── */}
        <div>
          {/* Phone Verification */}
          {!phoneVerified ? (
            <div className="bg-card border border-border p-6 mb-4">
              <h3 className="font-semibold mb-1">Verify Your Phone Number</h3>
              <p className="text-xs text-muted-foreground mb-4">
                We&apos;ll send a one-time code to confirm your identity before
                payment.
              </p>
              <div className="space-y-4">
                <div>
                  <Label className="mb-1.5 block text-xs text-muted-foreground">
                    Phone Number
                  </Label>
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
                      {otpSent ? "Sent ✓" : "Send OTP"}
                    </Button>
                  </div>
                </div>
                {otpSent && (
                  <div>
                    <Label className="mb-1.5 block text-xs text-muted-foreground">
                      Enter OTP
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={otpInput}
                        onChange={(e) => {
                          setOtpInput(e.target.value);
                          setOtpError(null);
                        }}
                        placeholder="6-digit code"
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
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-3 mb-4">
              <Check className="h-4 w-4 shrink-0" />
              <span>
                Phone verified: <strong>{phone}</strong>
              </span>
            </div>
          )}

          {/* Payment Form */}
          {phoneVerified && clientSecret && publishableKey ? (
            <StripeWrapper
              clientSecret={clientSecret}
              publishableKey={publishableKey}
            >
              <SummaryForm
                car={car}
                total={total}
                clientSecret={clientSecret}
                booking={booking}
                verifiedPhone={phone}
              />
            </StripeWrapper>
          ) : phoneVerified ? (
            <div className="bg-card border border-border p-8 text-center">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Loading payment form...
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border p-8 text-center text-muted-foreground text-sm">
              Please verify your phone number above to continue.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onBack || (() => router.back())}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Go To Step 3
        </button>
        <button
          type="button"
          onClick={onBack || (() => router.back())}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
