import {
  Booking,
  Prisma,
  StripeAccount,
  User,
} from "@/generated/prisma/client";

export type BookingWithAll = Booking & {
  car: Car;
  driver: Driver | null;
  user: User;
};

export type ReviewWithAll = Review & {
  user: User;
  car: Car;
};

export type SettingWithAll = Setting & {
  stripeAccount: StripeAccount;
};

export type PaymentWithAll = Payment & {
  user: User;
  booking: Booking;
};

export type CarWithAvailability = Prisma.CarGetPayload<{
  include: {
    availability: true;
  };
}>;
