import { z } from "zod";

export const locationFormSchema = z
  .object({
    pickupDate: z.date().min(1, "Pickup date required"),
    dropoffDate: z.date().min(1, "Dropoff date required"),
    pickupTime: z.string().min(1),
    dropoffTime: z.string().min(1),
  })
  .refine(
    (data) => {
      const minDrop = new Date(data.pickupDate);
      minDrop.setDate(minDrop.getDate() + 1);
      return data.dropoffDate >= minDrop;
    },
    {
      message: "Dropoff must be at least 1 day after pickup",
      path: ["dropoffDate"],
    },
  );

export type LocationFormValues = z.infer<typeof locationFormSchema>;

// --- Zod Schema ---
export const LocationStepSchema = z
  .object({
    pickupLocation: z.string().min(1, "Pickup location required"),
    dropoffLocation: z.string().min(1, "Dropoff location required"),
    pickupDate: z.date(),
    dropoffDate: z.date(),
    pickupTime: z.string().min(1, "Pickup time required"),
    dropoffTime: z.string().min(1, "Dropoff time required"),
  })
  .superRefine((data, ctx) => {
    if (data.dropoffDate < data.pickupDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Dropoff date must be after pickup date",
        path: ["dropoffDate"],
      });
    }
  });

export type LocationStepValues = z.infer<typeof LocationStepSchema>;
