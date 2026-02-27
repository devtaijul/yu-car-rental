"use server";

import { signIn } from "@/auth";
import { BookingState } from "@/context/BookingContext";
import {
  BookingStatus,
  PaymentStatus,
  UserRole,
} from "@/generated/prisma/enums";
import { ContractDocument } from "@/lib/pdf/ContractDocument";
import prisma from "@/lib/prisma";
import { CheckoutFormValues } from "@/lib/validation/checkout.schema";
import { actionError, actionResponse } from "@/types/server";
import { DocumentProps, renderToBuffer } from "@react-pdf/renderer";
import { PaymentIntent } from "@stripe/stripe-js";
import bcrypt from "bcryptjs";
import React from "react";

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      ok: true,
      error: null,
    };
  } catch {
    return {
      ok: false,
      error: "User and password missmatch",
    };
  }
}

export const bookCar = async ({
  customer,
  booking,
  payment,
  carId,
  pricePerDay,
}: {
  customer: CheckoutFormValues;
  booking: BookingState;
  payment: PaymentIntent & { latest_charge?: string | null };
  carId: string;
  pricePerDay: number;
}) => {
  try {
    // 🔴 1️⃣ Payment must be successful
    if (payment.status !== "succeeded") {
      return actionError("Payment failed");
    }

    // 🔵 2️⃣ Calculate total days
    const startDate = new Date(booking.pickupDate!);
    const endDate = new Date(booking.dropoffDate!);

    const totalDays =
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) || 1;

    const totalAmount = totalDays * pricePerDay;

    // 🟢 3️⃣ Transaction start
    const result = await prisma.$transaction(async (tx) => {
      // ✅ 3.1 Find existing user
      let user = await tx.user.findUnique({
        where: { email: customer.email },
      });

      // ✅ 3.2 If not exist → create user
      if (!user) {
        const hashedPassword = await bcrypt.hash(
          Math.random().toString(36), // random password
          10,
        );

        user = await tx.user.create({
          data: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phoneCode: "+880", // তুমি চাইলে dynamic করো
            phone: customer.phone,
            password: hashedPassword,
            role: UserRole.USER,
            isVerified: false,
            dateOfBirth: new Date(customer.dateOfBirth),
            licenseNumber: customer.licenseNumber,
          },
        });
      }

      // ✅ 3.3 Create Booking
      const createdBooking = await tx.booking.create({
        data: {
          userId: user.id,
          carId,
          startDate,
          endDate,
          totalDays,
          pricePerDay,
          coverage: booking.coverage,
          pickupLocation: booking.pickupLocation as string,
          dropoffLocation: booking.dropoffLocation as string,
          pickupTime: booking.pickupTime as string,
          dropoffTime: booking.dropoffTime as string,
          totalAmount,
          driversDOB: new Date(customer.dateOfBirth),
          driversLicNo: customer.licenseNumber,
          status: BookingStatus.PENDING,
        },
      });

      // ✅ 3.4 Create Payment
      await tx.payment.create({
        data: {
          bookingId: createdBooking.id,
          userId: user.id,
          amount: payment.amount! / 100,
          paymentMethod: "STRIPE",
          stripePaymentIntentId: payment.id,
          stripeChargeId:
            typeof payment.latest_charge === "string"
              ? payment.latest_charge
              : undefined,
          currency: payment.currency?.toUpperCase() as "USD" | "EUR",
          status: PaymentStatus.SUCCESS,
          customerEmail: customer.email,
        },
      });

      return createdBooking;
    });

    return actionResponse(result);
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return actionError("Failed to book car", error);
  }
};

export async function generateContractPdf(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { car: true },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }
  const element = React.createElement(
    ContractDocument as React.ComponentType<DocumentProps>,
    { booking } as DocumentProps,
  );

  const buffer = await renderToBuffer(element);

  return buffer;
}
