/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn } from "@/auth";
import { PAGES } from "@/config/pages.config";
import { BookingState } from "@/context/BookingContext";
import { Prisma } from "@/generated/prisma/client";
import {
  BookingStatus,
  Currency,
  PaymentStatus,
  UserRole,
} from "@/generated/prisma/enums";
import { CarCreateInput } from "@/generated/prisma/models";
import { sendContractEmail } from "@/lib/email/sendContractEmail";
import { CarRentalInvoice } from "@/lib/pdf/CarRentalInvoice.tsx";
import { ContractDocument } from "@/lib/pdf/ContractDocument";
import prisma from "@/lib/prisma";
import { CheckoutFormValues } from "@/lib/validation/checkout.schema";
import {
  GeneralSettingsFormValues,
  PaymentFormValues,
} from "@/lib/validation/settings.schema";
import { actionError, actionResponse } from "@/types/server";
import { PaymentWithAll } from "@/types/system";
import { DocumentProps, renderToBuffer } from "@react-pdf/renderer";
import { PaymentIntent } from "@stripe/stripe-js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import React from "react";

function generateBookingId(): string {
  return `BK-${nanoid(8).toUpperCase()}`;
}

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
          id: generateBookingId(),
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

    // Generate PDF
    const pdfBuffer = await generateContractPdf(result.id);

    // Send Email
    await sendContractEmail({
      email: customer.email,
      name: customer.firstName,
      pdfBuffer,
      bookingId: result.id,
    });

    return actionResponse(result);
  } catch (error) {
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

export const generateInvoicePDF = async (payment: PaymentWithAll) => {
  const element = React.createElement(
    CarRentalInvoice as React.ComponentType<DocumentProps>,
    { payment } as DocumentProps,
  );
  console.log(element);

  const buffer = await renderToBuffer(element);
  return buffer;
};

export const me = async () => {
  try {
    const session = await auth();

    if (!session) {
      throw {
        success: false,
        message: "User not logged in",
      };
    }

    if (!session.user.email) {
      throw {
        success: false,
        message: "User not logged in",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email,
      },
    });

    return user;
  } catch {
    throw {
      success: false,
      message: "User not logged in",
    };
  }
};

async function generateUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await prisma.car.findUnique({
      where: { slug },
    });

    if (!existing) break;

    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

// CREATE CAR
export const createCarMutation = async (carData: CarCreateInput) => {
  console.log("carData", carData);
  const uniqueSlug = await generateUniqueSlug(carData.slug);

  try {
    const user = await me();

    if (user?.role !== UserRole.ADMIN) {
      return {
        success: false,
        message: "You are not authorized to create a car",
        data: null,
      };
    }

    const createdCar = await prisma.car.create({
      data: {
        ...carData,
        slug: uniqueSlug,
      },
    });
    return actionResponse(createdCar);
  } catch (error) {
    console.log(error);
    // Handle Unique Constraint
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = (error.meta as any)?.target?.[0];

      return actionError(`${field} already exists`);
    }

    return actionError("Failed to create car", error);
  }
};

export const deleteCarMutation = async (carId: string) => {
  try {
    const user = await me();

    if (user?.role !== UserRole.ADMIN) {
      return {
        success: false,
        message: "You are not authorized to delete a car",
        data: null,
      };
    }

    const deletedCar = await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    revalidatePath(PAGES.ADMIN.CARS.ROOT);
    return actionResponse(deletedCar);
  } catch (error) {
    console.log(error);
    return actionError("Failed to delete car", error);
  }
};

// settings mutation

export const paymentSettingsMutation = async (data: PaymentFormValues) => {
  try {
    const user = await me();

    if (user?.role !== UserRole.ADMIN) {
      return {
        success: false,
        message: "You are not authorized to update payment settings",
        data: null,
      };
    }

    let setting = await prisma.platformSettings.findFirst();

    if (!setting) {
      setting = await prisma.platformSettings.create({
        data: {
          // General Settings
          platformName: "YuCar Rental",
          supportEmail: "support@yucarrental.com",
          supportPhone: "+8801700000000",
          baseCurrency: Currency.USD,
          brandLogoUrl: null,

          // Payment Gateway
          stripePublishableKey: null,
          stripeSecretKey: null,
          stripeEnabled: false,
          paypalEnabled: false,

          // Notification Preferences
          notifyNewBooking: true,
          notifyCancellation: true,
          notifyDailyRevenue: false,
          notifySystemErrors: true,

          // Security Settings
          twoFactorAuthRequired: false,
          adminSessionTimeout: "30 Minutes",
          passwordExpiry: "90 Days",

          // User Roles (JSON)
          roles: [
            {
              name: "Super Admin",
              description: "Full system access",
              users: 1,
            },
            {
              name: "Admin",
              description: "Manage bookings, cars and users",
              users: 0,
            },
            {
              name: "Manager",
              description: "Manage bookings and revenue",
              users: 0,
            },
          ],

          // System Preferences
          debugLoggingEnabled: false,
          maintenanceMode: false,
          clearCacheRequested: false,
        },
      });
    }

    // এখানে API call দিবে
    // await updatePaymentSettings(data)

    const updatedSetting = await prisma.platformSettings.update({
      where: {
        id: setting.id,
      },
      data: {
        stripePublishableKey: data.publishableKey,
        stripeSecretKey: data.secretKey,
        stripeEnabled: data.stripeEnabled,
        paypalEnabled: data.paypalEnabled,
      },
    });

    return actionResponse(updatedSetting);
  } catch (error) {
    console.error(error);

    return actionError("Failed to update payment settings", error);
  }
};

export const generalSettingsMutation = async (
  data: GeneralSettingsFormValues,
) => {
  try {
    const user = await me();

    if (user?.role !== UserRole.ADMIN) {
      return {
        success: false,
        message: "You are not authorized to update general settings",
        data: null,
      };
    }

    // এখানে API call দিবে
    // await updateGeneralSettings(data)

    let setting = await prisma.platformSettings.findFirst();

    if (!setting) {
      setting = await prisma.platformSettings.create({
        data: {
          // General Settings
          platformName: "YuCar Rental",
          supportEmail: "support@yucarrental.com",
          supportPhone: "+8801700000000",
          baseCurrency: Currency.USD,
          brandLogoUrl: null,

          // Payment Gateway
          stripePublishableKey: null,
          stripeSecretKey: null,
          stripeEnabled: false,
          paypalEnabled: false,

          // Notification Preferences
          notifyNewBooking: true,
          notifyCancellation: true,
          notifyDailyRevenue: false,
          notifySystemErrors: true,

          // Security Settings
          twoFactorAuthRequired: false,
          adminSessionTimeout: "30 Minutes",
          passwordExpiry: "90 Days",

          // User Roles (JSON)
          roles: [
            {
              name: "Super Admin",
              description: "Full system access",
              users: 1,
            },
            {
              name: "Admin",
              description: "Manage bookings, cars and users",
              users: 0,
            },
            {
              name: "Manager",
              description: "Manage bookings and revenue",
              users: 0,
            },
          ],

          // System Preferences
          debugLoggingEnabled: false,
          maintenanceMode: false,
          clearCacheRequested: false,
        },
      });
    }

    const updatedSetting = await prisma.platformSettings.update({
      where: {
        id: setting.id,
      },
      data: {
        platformName: data.platformName,
        supportEmail: data.supportEmail,
        supportPhone: data.supportPhone,
        baseCurrency: data.baseCurrency as Currency,
        brandLogoUrl: data.brandLogoUrl,
      },
    });

    return actionResponse(updatedSetting);
  } catch (error) {
    console.error(error);

    return actionError("Failed to update general settings", error);
  }
};
