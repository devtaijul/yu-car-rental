"use client";

import { PAGES } from "@/config/pages.config";
import { BookingWithAll } from "@/types/system";
import { ArrowLeft, Clock, MapPin, Download, Car } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const mockBooking = {
  id: "c312bd45-f9be-4053-98e0-bd260e10f45c",
  status: "PENDING",
  car: {
    name: "Toyota Hilux",
    type: "SUV",
    year: 2024,
    plate: "dfsdfkfkf",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/samples/car.jpg",
    pricePerDay: 55,
    plan: "PREMIUM",
  },
  customer: {
    name: "Taijul Islam",
    email: "devtaijul@gmail.com",
    phone: "+8801757418181",
  },
  pickup: {
    date: "04 Mar 2026",
    time: "10:00 AM",
    location: "Bachelor's-Beach",
    fullLocation: "Flamingo International Airport (BON)",
  },
  return: {
    date: "05 Mar 2026",
    time: "10:00 AM",
    location: "Te-Amo-Beach",
    fullLocation: "Flamingo International Airport (BON)",
  },
  totalDays: 1,
  hoursRemaining: 250,
  payment: {
    baseRate: 55.0,
    coverage: 12.0,
    taxes: 0.0,
    total: 55.0,
  },
};

const statusOptions = [
  "PENDING",
  "CONFIRMED",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
];

const BookingDetailsPage = ({
  booking: databooking,
}: {
  booking: BookingWithAll;
}) => {
  const router = useRouter();
  const { id } = useParams();
  const [booking, setBooking] = useState(mockBooking);
  const [editingStatus, setEditingStatus] = useState(false);
  console.log("data", booking);
  

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "badge-active";
      case "PENDING":
        return "badge-pending";
      case "CONFIRMED":
        return "badge-active";
      case "COMPLETED":
        return "badge-completed";
      case "CANCELLED":
        return "badge-cancelled";
      default:
        return "badge-pending";
    }
  };

  return (
    <div className="space-y-6">
      {/* Back + Title */}
      <div>
        <button
          onClick={() => router.push(PAGES.ADMIN.BOOKINGS.ROOT)}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO OVERVIEW
        </button>
        <h1 className="text-2xl font-bold text-foreground">
          BOOKING <span className="text-primary">DETAILS</span>
        </h1>
      </div>

      {/* Main Booking Card */}
      <div className="bg-card rounded-xl border p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Car Image */}
          <div className="relative w-full lg:w-[320px] shrink-0">
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3]">
              <CldImage
                src={booking.car.imageUrl}
                alt={booking.car.name}
                width={320}
                height={240}
                className="w-full h-full object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                {editingStatus ? (
                  <select
                    value={booking.status}
                    onChange={(e) => {
                      setBooking({ ...booking, status: e.target.value });
                      setEditingStatus(false);
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border bg-card focus:outline-none"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                ) : (
                  <button
                    onClick={() => setEditingStatus(true)}
                    className={`status-badge-pill ${getStatusClass(booking.status)} cursor-pointer hover:opacity-80`}
                  >
                    ● {booking.status}
                  </button>
                )}
              </div>
            </div>
            <div className="mt-2 inline-block bg-foreground text-card text-xs font-mono px-3 py-1 rounded">
              PLATE: {booking.car.plate}
            </div>
          </div>

          {/* Booking Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {booking.car.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Booking ID: {booking.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">
                    ${booking.car.pricePerDay}
                    <span className="text-sm font-normal text-muted-foreground">
                      .00
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ◇ {booking.car.plan}
                  </p>
                </div>
              </div>

              {/* Pickup & Return */}
              <div className="flex flex-col sm:flex-row gap-8 mt-6">
                <div>
                  <p className="text-xs font-bold text-primary tracking-wider">
                    PICKUP
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {booking.pickup.date}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {booking.pickup.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary tracking-wider">
                    RETURN
                  </p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {booking.return.date}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {booking.return.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Time Remaining + Extend */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-semibold tracking-wider">
                  TIME REMAINING
                </span>
                <span className="text-2xl font-bold text-foreground ml-2">
                  {booking.totalDays}
                </span>
                <span className="text-xs text-muted-foreground">Days</span>
                <span className="text-2xl font-bold text-primary ml-2">
                  {booking.hoursRemaining}
                </span>
                <span className="text-xs text-muted-foreground">Hrs</span>
              </div>
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                EXTEND TIME
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Itinerary + Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rental Itinerary */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            RENTAL ITINERARY
          </h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <p className="text-xs font-bold text-primary tracking-wider">
                PICKUP DATE & TIME
              </p>
              <p className="text-base font-bold text-foreground mt-1">
                {booking.pickup.date}
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.pickup.fullLocation}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-xs font-bold text-primary tracking-wider">
                RETURN DATE & TIME
              </p>
              <p className="text-base font-bold text-foreground mt-1">
                {booking.return.date}
              </p>
              <p className="text-sm text-muted-foreground">
                {booking.return.fullLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">
            PAYMENT SUMMARY
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Base Rate ({booking.totalDays} days @ ${booking.car.pricePerDay}
                )
              </span>
              <span className="font-medium text-foreground">
                ${booking.payment.baseRate.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Full Coverage</span>
              <span className="font-medium text-foreground">
                ${booking.payment.coverage.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Taxes</span>
              <span className="font-medium text-foreground">
                ${booking.payment.taxes.toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-3 flex items-center justify-between">
              <span className="font-bold text-foreground">Total Paid</span>
              <span className="text-xl font-bold text-primary">
                ${booking.payment.total.toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" /> DOWNLOAD RECEIPT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
