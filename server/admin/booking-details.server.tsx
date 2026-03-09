import { getBookingByBookingAsAdmin } from "@/actions/query";
import BookingDetailsPage from "@/components/pages/admin/BookingDetailsPage";
import React from "react";

export const BookingDetailsServer = async ({ slug }: { slug: string }) => {
  const data = await getBookingByBookingAsAdmin(slug);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Booking not found</div>;
  }

  return <BookingDetailsPage booking={data.data} />;
};
