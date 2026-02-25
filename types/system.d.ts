import { Booking, User } from "@/generated/prisma/client";

export type BookingWithAll = Booking & {
  car: Car;
  driver: Driver;
  user: User;
};
