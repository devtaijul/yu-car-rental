import { z } from "zod";

export const carSchema = z.object({
  name: z.string().min(2, "Car name is required"),

  slug: z
    .string()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),

  brand: z.string().min(2, "Brand is required"),
  model: z.string().min(1, "Model is required"),

  year: z
    .string()
    .min(4, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year"),

  speed: z.string().optional(),
  engineCapacity: z.string().optional(),

  fuelType: z.enum(["PETROL", "DIESEL", "HYBRID", "ELECTRIC"]),
  transmission: z.enum(["MANUAL", "AUTOMATIC"]),
  carType: z.enum([
    "SEDAN",
    "SUV",
    "MICROBUS",
    "HATCHBACK",
    "PICKUP",
    "LUXURY",
  ]),

  seats: z.string().min(1, "Seats must be at least 1").optional(),

  pricePerDay: z.string().min(1, "Price per day is required"),

  registrationNo: z.string().min(3, "Registration number required"),

  plate: z.string().optional(),
  description: z.string().optional(),

  imageUrl: z.string().min(1, "Car image is required"),
});

export type CarFormValues = z.infer<typeof carSchema>;
