// lib/validations/auth.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneCode: z
    .string()
    .min(1, "Phone code is required")
    .regex(/^\+?[0-9]+$/, "Invalid phone code"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9]+$/, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().max(100).optional(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
