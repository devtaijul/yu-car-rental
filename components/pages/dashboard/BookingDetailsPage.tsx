"use client";

import { generateContractPdf } from "@/actions/mutation";
import { Card, CardContent } from "@/components/ui/card";
import { locationCoords } from "@/data/utils";
import { cn } from "@/lib/utils";
import { BookingWithAll } from "@/types/system";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});
import {
  ChevronDown,
  Clock,
  Download,
  MapPin,
  Phone,
  Printer,
  Shield,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";

function getTimeRemaining(endDate: Date) {
  const ms = Math.max(0, new Date(endDate).getTime() - Date.now());
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours };
}

function formatDateTime(date: Date | string, time?: string | null) {
  const d = new Date(date);
  const datePart = d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  if (time) return `${datePart} • ${time}`;
  return datePart;
}

export default function BookingDetailsPage({
  booking,
}: {
  booking: BookingWithAll;
}) {
  const { days: daysRemaining, hours: hoursRemaining } = getTimeRemaining(
    booking.endDate,
  );
  const [downloading, setDownloading] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);

  // Compute total
  const days = booking.totalDays;
  const baseAmount = booking.car.pricePerDay * days;
  const coverageAmount = booking.coverage === "PREMIUM" ? 12 * days : 0;
  const extrasAmount =
    (booking.babySeatSmall ?? 0) * 5 * days +
    (booking.babySeatLarge ?? 0) * 5 * days +
    (booking.coolbox ?? 0) * 4 * days +
    (booking.keySecureBox ?? 0) * 2.5 * days;
  const subtotal = baseAmount + coverageAmount + extrasAmount;
  const vat = subtotal * 0.06;
  const calculatedTotal = parseFloat((subtotal * 1.06).toFixed(2));

  const extras: { label: string; qty: number; price: number }[] = [];
  if (booking.babySeatSmall)
    extras.push({
      label: "Baby Seat (< 18m)",
      qty: booking.babySeatSmall,
      price: 5,
    });
  if (booking.babySeatLarge)
    extras.push({
      label: "Baby Seat (> 18m)",
      qty: booking.babySeatLarge,
      price: 5,
    });
  if (booking.coolbox)
    extras.push({ label: "Coolbox", qty: booking.coolbox, price: 4 });
  if (booking.keySecureBox)
    extras.push({
      label: "Key Secure Box",
      qty: booking.keySecureBox,
      price: 2.5,
    });

  const handleDownloadReceipt = async () => {
    setDownloading(true);
    try {
      const buffer = await generateContractPdf(booking.id);
      let blob: Blob;
      if (Buffer.isBuffer(buffer)) {
        blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
      } else {
        const uint8Array = new Uint8Array(
          Object.keys(buffer as Record<string, number>).map(
            (k) => (buffer as Record<string, number>)[k],
          ),
        );
        blob = new Blob([uint8Array], { type: "application/pdf" });
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contract-${booking.id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex items-end justify-between">
        <div className="space-y-3">
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground hover:text-foreground"
          >
            ← Back to Overview
          </Link>
          <h1 className="text-4xl font-display font-black uppercase tracking-tight">
            Booking{" "}
            <span className="text-primary">Details</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#ecfdf5] border border-[#d1fae5] rounded-lg px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-[10px] uppercase tracking-[1px] font-black text-[#059669]">
              {booking.status}
            </span>
          </div>
          <button className="border border-border rounded-lg p-2.5 hover:bg-muted transition-colors">
            <Printer className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main Booking Card */}
      <Card className="border-2 border-[rgba(47,107,127,0.2)] overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Car Image */}
            <div className="relative bg-[#f8fafc] p-6 flex items-center justify-center lg:w-[42%] shrink-0">
              <div className="gradient-color w-full h-52 flex items-center justify-center rounded-sm overflow-hidden">
                <CldImage
                  src={booking.car.imageUrl}
                  width={600}
                  height={400}
                  alt="Car"
                  className="max-w-[280px] object-contain"
                />
              </div>
              {/* Active badge */}
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase tracking-[1px] font-black px-3 py-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Active
              </div>
              {/* Plate */}
              <div className="absolute bottom-4 left-4 backdrop-blur-sm bg-white/90 border border-border px-3 py-1 text-[10px] uppercase tracking-[1px] font-black">
                Plate: {booking.car.plate ?? "—"}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tight">
                    {booking.car.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Booking ID: {booking.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-foreground">
                    ${calculatedTotal.toFixed(2)}
                  </p>
                  {booking.coverage === "PREMIUM" && (
                    <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground flex items-center gap-1 justify-end mt-1">
                      <Shield className="h-3 w-3" /> Full Coverage
                    </p>
                  )}
                </div>
              </div>

              {/* Pickup & Return */}
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
                    Pickup
                  </p>
                  <p className="font-black text-base uppercase">
                    {formatDateTime(booking.startDate, booking.pickupTime)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {booking.pickupLocation}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
                    Return
                  </p>
                  <p className="font-black text-base uppercase">
                    {formatDateTime(booking.endDate, booking.dropoffTime)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {booking.dropoffLocation}
                  </p>
                </div>
              </div>

              {/* Time Remaining + Extend */}
              <div className="mt-6 bg-[#f8fafc] border border-[#f1f5f9] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground mb-1">
                    Time Remaining
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-primary">
                      {daysRemaining}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold mb-1">
                      Days
                    </span>
                    <span className="text-2xl font-black text-primary ml-1">
                      {hoursRemaining}
                    </span>
                    <span className="text-xs text-muted-foreground font-bold mb-1">
                      Hrs
                    </span>
                  </div>
                </div>
                <button className="bg-primary text-white text-xs uppercase tracking-[1.2px] font-black px-6 py-3">
                  Extend Time
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-[1fr_341px] gap-6 items-start">
        {/* Left column */}
        <div className="space-y-6">
          {/* Rental Itinerary */}
          <Card className="border border-[rgba(47,107,127,0.2)]">
            <CardContent className="p-8">
              <h3 className="text-sm uppercase tracking-[1.4px] font-black text-foreground flex items-center gap-2 mb-8">
                <Clock className="h-[18px] w-[18px] text-primary" />
                Rental Itinerary
              </h3>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-[#f1f5f9]" />

                {/* Pickup */}
                <div className="flex gap-6 relative z-10">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#ecfdf5] border-4 border-white shadow-sm flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[#10b981]" />
                    </div>
                  </div>
                  <div className="flex-1 bg-[#f8fafc] border border-[#f1f5f9] p-6 mb-8">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
                          Pickup Date &amp; Time
                        </p>
                        <p className="text-lg font-black uppercase text-foreground">
                          {formatDateTime(
                            booking.startDate,
                            booking.pickupTime,
                          )}
                        </p>
                        <div className="flex items-start gap-2 pt-3">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-[#334155]">
                              Flamingo International Airport (BON)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Kralendijk, Bonaire
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return */}
                <div className="flex gap-6 relative z-10">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#f1f5f9] border-4 border-white shadow-sm flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-[#e2e8f0] shadow-sm p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
                          Return Date &amp; Time
                        </p>
                        <p className="text-lg font-black uppercase text-foreground">
                          {formatDateTime(booking.endDate, booking.dropoffTime)}
                        </p>
                        <div className="flex items-start gap-2 pt-3">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-[#334155]">
                              Flamingo International Airport (BON)
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Kralendijk, Bonaire
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <div className="border border-[#f1f5f9] shadow-sm overflow-hidden" style={{ zIndex: 0 }}>
            <LeafletMap
              pickupCoords={locationCoords[booking.pickupLocation]}
              dropoffCoords={locationCoords[booking.dropoffLocation]}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card className="border border-[#f1f5f9] shadow-sm overflow-hidden">
            <div className="bg-[rgba(248,250,252,0.5)] border-b border-[#f1f5f9] px-6 py-5">
              <h3 className="text-sm uppercase tracking-[1.4px] font-black text-foreground">
                Payment Summary
              </h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Base Rate ({days} days @ ${booking.car.pricePerDay})
                </span>
                <span className="font-black">${baseAmount.toFixed(2)}</span>
              </div>
              {booking.coverage === "PREMIUM" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    Full Coverage <Shield className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-black">
                    ${coverageAmount.toFixed(2)}
                  </span>
                </div>
              )}
              {extras.map((e) => (
                <div key={e.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {e.label} (${e.price}/day × {e.qty} × {days})
                  </span>
                  <span className="font-black">
                    ${(e.price * e.qty * days).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes (ABB 6%)</span>
                <span className="font-black">${vat.toFixed(2)}</span>
              </div>

              <div className="border-t border-dashed border-[#e2e8f0] pt-4">
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
                      Total Paid
                    </p>
                    <p className="text-xs text-[#334155] font-bold flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Stripe
                    </p>
                  </div>
                  <span className="text-2xl font-black text-primary">
                    ${calculatedTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <div className="bg-[#f8fafc] border-t border-[#f1f5f9] px-4 py-4">
              <button
                onClick={handleDownloadReceipt}
                disabled={downloading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[1.2px] font-bold text-muted-foreground hover:text-foreground transition-colors",
                  downloading && "opacity-50 cursor-not-allowed",
                )}
              >
                <Download className="h-[18px] w-[18px]" />
                {downloading ? "Downloading..." : "Download Receipt"}
              </button>
            </div>
          </Card>

          {/* Rental Policy accordion */}
          <Card className="border border-[#f1f5f9] shadow-sm overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-5 text-left"
              onClick={() => setPolicyOpen(!policyOpen)}
            >
              <span className="text-sm uppercase tracking-[1.4px] font-black text-foreground">
                Rental Policy
              </span>
              <ChevronDown
                className={cn(
                  "h-[18px] w-[18px] text-foreground transition-transform",
                  policyOpen && "rotate-180",
                )}
              />
            </button>
            {policyOpen && (
              <div className="border-t border-[#f1f5f9] px-5 py-4 text-sm text-muted-foreground">
                <p>
                  The rental vehicle must be returned in the same condition as
                  received. Fuel must be topped up before return. Late returns
                  may incur additional charges.
                </p>
              </div>
            )}
            <div className="border-t border-[#f1f5f9]">
              <button
                className="w-full flex items-center justify-between px-5 py-5 text-left"
                onClick={() => setInsuranceOpen(!insuranceOpen)}
              >
                <span className="text-sm uppercase tracking-[1.4px] font-black text-foreground">
                  Insurance Details
                </span>
                <ChevronDown
                  className={cn(
                    "h-[18px] w-[18px] text-foreground transition-transform",
                    insuranceOpen && "rotate-180",
                  )}
                />
              </button>
              {insuranceOpen && (
                <div className="border-t border-[#f1f5f9] px-5 py-4 text-sm text-muted-foreground">
                  <p>
                    {booking.coverage === "PREMIUM"
                      ? "Full coverage insurance included. Covers collision, theft, and third-party liability with zero excess."
                      : "Standard coverage included. Third-party liability covered. Optional collision waiver available."}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Need Help */}
          <div className="bg-[rgba(47,107,127,0.05)] border border-[rgba(47,107,127,0.1)] p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[1.4px] font-black text-foreground">
                Need Help?
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Premium support is available 24/7 during your active rental
              period.
            </p>
            <button className="w-full bg-white border border-[#e2e8f0] rounded-lg py-3 text-xs uppercase tracking-[1.2px] font-black text-foreground hover:bg-muted transition-colors">
              Call Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
