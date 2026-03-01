import { getBookingsForAdmin } from "@/actions/query";
import BookingsPage from "@/components/pages/admin/BookingsPage";

export const AdminBookingManagementServer = async () => {
  const data = await getBookingsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <BookingsPage />;
};
