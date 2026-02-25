import { getBookingsForAdmin } from "@/actions/query";
import BookingsManagement from "@/components/pages/admin/BookingsManagement";
import React from "react";

export const AdminBookingManagementServer = async () => {
  const data = await getBookingsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <BookingsManagement bookings={data.bookings} />;
};
