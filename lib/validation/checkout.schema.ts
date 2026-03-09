import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  licenseNumber: z.string().min(5, "License number required"),
  promoCode: z.string().optional(),
  specialRequests: z.string().optional(),
  cardholderName: z.string().min(2, "Cardholder name required"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, { message: "You must accept terms" }),
});
export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
