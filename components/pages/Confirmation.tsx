"use client";

import { generateContractPdf } from "@/actions/mutation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/config/pages.config";
import { formatDate } from "@/lib/formatDate";
import { BookingWithAll } from "@/types/system";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeaderSpace } from "../HeaderSpace";

const Confirmation = ({ booking }: { booking: BookingWithAll }) => {
  const router = useRouter();
  const handleDownload = async () => {
    const buffer = await generateContractPdf(booking.id);

    let blob: Blob;

    if (Buffer.isBuffer(buffer)) {
      // Node.js Buffer → convert to Uint8Array
      blob = new Blob([new Uint8Array(buffer)], { type: "application/pdf" });
    } else if (typeof buffer === "object") {
      // JSON-like object { "0": 37, "1": 80, ... }
      const uint8Array = new Uint8Array(
        Object.keys(buffer).map(
          (key) => (buffer as Record<string, number>)[key],
        ),
      );
      blob = new Blob([uint8Array], { type: "application/pdf" });
    } else {
      throw new Error("Unsupported PDF format returned");
    }

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contract-${booking.id}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          {/* Success Card */}
          <div className="bg-card border border-border overflow-hidden shadow-card">
            {/* Header */}
            <div className="gradient-color py-12 px-6 text-primary-foreground">
              <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-display font-semibold mb-2">
                Booking Confirmed!
              </h1>
              <p className="opacity-80">Your car is reserved.</p>
            </div>

            {/* Details */}
            <div className="p-6 w-full">
              <div className="text-sm text-muted-foreground mb-1">
                Booking Reference
              </div>
              <div className="text-xl font-semibold mb-6">{booking.id}</div>

              <div className="border border-border rounded-xl bg-[#F9FAFB] p-4 mb-6">
                <div className="flex justify-between py-2  ">
                  <span className="text-muted-foreground">Vehicle</span>
                  <span className="font-medium">{booking.car.name}</span>
                </div>
                <div className="flex justify-between py-2 ">
                  <span className="text-muted-foreground">Dates</span>
                  <span className="font-medium">
                    {formatDate(booking.startDate)} -{" "}
                    {formatDate(booking.endDate)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="font-medium text-primary">
                    €{booking.totalAmount}
                  </span>
                </div>
              </div>

              <div className="space-y-3 w-full">
                <Link
                  href={PAGES.DASHBOARD.BOOKING_DETAILS(booking.id)}
                  className="w-full bg-primary text-primary-foreground block hover:bg-primary/80  py-2 "
                >
                  Manage Booking
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleDownload}
                >
                  Download Confirmation
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                A confirmation email has been sent to your email address.
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="mt-8"
            onClick={() => router.push(PAGES.HOME)}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Confirmation;
