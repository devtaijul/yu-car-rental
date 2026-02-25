import { Booking, User } from "@/generated/prisma/client";

export type BookingWithAll = Booking & {
  car: Car;
  driver: Driver;
  user: User;
};

export type ReviewWithAll = Review & {
  user: User;
  car: Car;
};
