import { getBookingByBookingId } from "@/actions/query";
import BookingDetailsPage from "@/components/pages/dashboard/BookingDetailsPage";
import React from "react";

export const BookingDetailsServer = async ({
  bookingId,
}: {
  bookingId: string;
}) => {
  const data = await getBookingByBookingId(bookingId);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Booking not found</div>;
  }

  console.log("data", data);

  return <BookingDetailsPage booking={data.data} />;
};
