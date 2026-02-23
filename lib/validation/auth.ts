// lib/validations/auth.ts

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^[0-9+]+$/, "Invalid phone number"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
