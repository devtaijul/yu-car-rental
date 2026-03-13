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
import { sendSms } from "@/lib/sms/sendSms";
import { ENV } from "@/lib/env";
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
  discount = 0,
}: {
  customer: CheckoutFormValues;
  booking: BookingState;
  payment: PaymentIntent & { latest_charge?: string | null };
  carId: string;
  pricePerDay: number;
  discount?: number;
}) => {
  try {
    // 🔴 1️⃣ Payment must be successful
    if (payment.status !== "succeeded") {
      return actionError("Payment failed");
    }

    // 🔵 2️⃣ Calculate total days (6PM–6PM rule: uses actual pickup/dropoff times)
    const [pickupHour, pickupMin] = (booking.pickupTime || "18:00").split(":").map(Number);
    const [dropoffHour, dropoffMin] = (booking.dropoffTime || "18:00").split(":").map(Number);
    const startDate = new Date(booking.pickupDate!);
    startDate.setHours(pickupHour, pickupMin, 0, 0);
    const endDate = new Date(booking.dropoffDate!);
    endDate.setHours(dropoffHour, dropoffMin, 0, 0);

    const totalDays =
      Math.max(1, Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      ));

    const baseAmount = totalDays * pricePerDay;
    const coverageAmount = booking.coverage === "PREMIUM" ? 12 * totalDays : 0;
    const extrasAmount =
      (booking.extras?.["baby-seat-small"] ?? 0) * 5 * totalDays +
      (booking.extras?.["baby-seat-large"] ?? 0) * 5 * totalDays +
      (booking.extras?.["coolbox"] ?? 0) * 4 * totalDays +
      (booking.extras?.["key-secure-box"] ?? 0) * 2.5 * totalDays;
    const subtotal = baseAmount + coverageAmount + extrasAmount;
    const totalAmount = parseFloat((subtotal * 1.06).toFixed(2)); // incl. 6% VAT

    // 🟢 3️⃣ Transaction start
    let plainPassword: string | null = null;
    const result = await prisma.$transaction(async (tx) => {
      // ✅ 3.1 Find existing user
      let user = await tx.user.findUnique({
        where: { email: customer.email },
      });

      // ✅ 3.2 If not exist → create user
      if (!user) {
        plainPassword = nanoid(12) + "A1!"; // strong: 12 random chars + uppercase + digit + special
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        user = await tx.user.create({
          data: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phoneCode: "+880",
            phone: customer.phone,
            password: hashedPassword,
            role: UserRole.USER,
            isVerified: false,
            dateOfBirth: new Date(customer.dateOfBirth),
            licenseNumber: customer.licenseNumber,
            street: customer.streetAddress,
            houseNo: customer.houseNumber,
            postCode: customer.postCode,
            city: customer.city,
            country: customer.country,
            company: customer.company,
          },
        });
      } else {
        // Update billing info for existing users
        await tx.user.update({
          where: { id: user.id },
          data: {
            street: customer.streetAddress || user.street,
            houseNo: customer.houseNumber || user.houseNo,
            postCode: customer.postCode || user.postCode,
            city: customer.city || user.city,
            country: customer.country || user.country,
            company: customer.company || user.company,
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
          babySeatSmall: booking.extras?.["baby-seat-small"] ?? 0,
          babySeatLarge: booking.extras?.["baby-seat-large"] ?? 0,
          coolbox: booking.extras?.["coolbox"] ?? 0,
          keySecureBox: booking.extras?.["key-secure-box"] ?? 0,
          pickupLocation: booking.pickupLocation as string,
          dropoffLocation: booking.dropoffLocation as string,
          pickupTime: booking.pickupTime as string,
          dropoffTime: booking.dropoffTime as string,
          totalAmount,
          discount,
          specialRequests: customer.specialRequests,
          driversDOB: new Date(customer.dateOfBirth),
          driversLicNo: customer.licenseNumber,
          status: BookingStatus.PENDING,
          customerFirstName: customer.firstName,
          customerLastName: customer.lastName,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          customerStreet: customer.streetAddress,
          customerHouseNo: customer.houseNumber,
          customerPostCode: customer.postCode,
          customerCity: customer.city,
          customerCountry: customer.country,
          customerCompany: customer.company,
        },
      });

      // ✅ 3.4 Increment coupon usage if promo was applied
      if (customer.promoCode && discount > 0) {
        await tx.coupon.updateMany({
          where: { code: customer.promoCode, isActive: true },
          data: { usedCount: { increment: 1 } },
        });
      }

      // ✅ 3.5 Create Payment
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

    // Generate PDF + Send Email (non-blocking — never fail the booking over email)
    try {
      const [pdfBuffer, platformSettings] = await Promise.all([
        generateContractPdf(result.id),
        prisma.platformSettings.findFirst(),
      ]);
      await sendContractEmail({
        email: customer.email,
        name: customer.firstName,
        pdfBuffer,
        bookingId: result.id,
        plainPassword: plainPassword ?? undefined,
        adminEmail:
          platformSettings?.notifyNewBooking && platformSettings?.supportEmail
            ? platformSettings.supportEmail
            : undefined,
      });
    } catch (emailError) {
      console.error("[bookCar] Failed to send confirmation email:", emailError);
    }

    // Send SMS confirmation (non-blocking)
    if (customer.phone) {
      const bookingUrl = `${ENV.APP_URL}/dashboard/bookings/${result.id}`;
      sendSms(
        customer.phone,
        `Hi ${customer.firstName}, your YU Car Rental booking is confirmed! View your booking here: ${bookingUrl}`,
      ).catch((e) => console.error("[bookCar] Failed to send confirmation SMS:", e));
    }

    return actionResponse(result);
  } catch (error) {
    console.error("[bookCar] Error:", error);
    return actionError("Failed to book car", error);
  }
};

export async function generateContractPdf(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { car: true, user: true },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }
  const element = React.createElement(
    ContractDocument as React.ComponentType<DocumentProps>,
    { booking } as unknown as DocumentProps,
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

export const updateProfile = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  dateOfBirth: string;
  licenseNumber: string;
  company?: string;
  street: string;
  houseNo: string;
  postCode: string;
  city: string;
  country: string;
  stateRegion: string;
}) => {
  try {
    const session = await auth();
    if (!session?.user?.email) return actionError("Not logged in");

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneCode: data.phoneCode,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        licenseNumber: data.licenseNumber,
        company: data.company || null,
        street: data.street,
        houseNo: data.houseNo,
        postCode: data.postCode,
        city: data.city,
        country: data.country,
        stateRegion: data.stateRegion,
      },
    });

    return actionResponse(user);
  } catch (error) {
    console.error("Update profile error:", error);
    return actionError("Failed to update profile");
  }
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const session = await auth();
    if (!session?.user?.email) return actionError("Not logged in");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return actionError("User not found");

    const valid = await bcrypt.compare(data.currentPassword, user.password);
    if (!valid) return actionError("Current password is incorrect");

    const hashed = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });

    return actionResponse({ success: true });
  } catch (error) {
    console.error("Update password error:", error);
    return actionError("Failed to update password");
  }
};

export const updateAvatar = async (avatarUrl: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) return actionError("Not logged in");

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { avatarUrl },
    });

    return actionResponse(user);
  } catch (error) {
    console.error("Update avatar error:", error);
    return actionError("Failed to update avatar");
  }
};

export const updateCarMutation = async (carId: string, data: any) => {
  try {
    const car = await prisma.car.update({
      where: {
        id: carId,
      },
      data,
    });
    return actionResponse(car);
  } catch (error) {
    console.error("Update car error:", error);
    return actionError("Failed to update car");
  }
};
