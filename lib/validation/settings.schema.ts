import { z } from "zod";

export const settingsSchema = z.object({
  // General Settings
  platformName: z.string().min(2, "Platform Name is required"),
  supportEmail: z.string().email("Invalid email"),
  supportPhone: z.string().min(5, "Phone number required"),
  baseCurrency: z.enum(["USD", "BDT"]),
  brandLogoUrl: z.string().url().optional(),

  // Payment Gateway
  stripePublishableKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  stripeEnabled: z.boolean(),
  paypalEnabled: z.boolean(),

  // Notification Preferences
  notifyNewBooking: z.boolean(),
  notifyCancellation: z.boolean(),
  notifyDailyRevenue: z.boolean(),
  notifySystemErrors: z.boolean(),

  // Security Settings
  twoFactorAuthRequired: z.boolean(),
  adminSessionTimeout: z.enum(["30 Minutes", "1 Hour", "2 Hours"]),
  passwordExpiry: z.enum(["30 Days", "60 Days", "90 Days"]),

  // User Roles
  roles: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        users: z.number().nonnegative(),
      }),
    )
    .optional(),

  // System Preferences
  debugLoggingEnabled: z.boolean(),
  maintenanceMode: z.boolean(),
  clearCacheRequested: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

// lib/validation/payment.schema.ts

export const paymentSchema = z.object({
  stripeEnabled: z.boolean(),

  publishableKey: z
    .string()
    .min(1, "Publishable key is required")
    .regex(/^pk_/, "Invalid Stripe publishable key"),

  secretKey: z
    .string()
    .min(1, "Secret key is required")
    .regex(/^sk_/, "Invalid Stripe secret key"),

  paypalEnabled: z.boolean(),
});

export type PaymentFormValues = z.infer<typeof paymentSchema>;
