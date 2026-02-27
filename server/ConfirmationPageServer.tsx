import { getBookingByBookingId } from "@/actions/query";
import Confirmation from "@/components/pages/Confirmation";
import React from "react";

export const ConfirmationPageServer = async ({
  bookingId,
}: {
  bookingId: string;
}) => {
  const data = await getBookingByBookingId(bookingId);
  console.log("data", data);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Booking not found</div>;
  }

  return <Confirmation booking={data.data} />;
};
