import { getMyBookings } from "@/actions/query";
import MyBookings from "@/components/pages/dashboard/MyBookings";
import { TabValue } from "@/data/utils";

export const MyBookingServer = async ({
  limit = "3",
  status,
}: {
  limit: string;
  status?: TabValue | undefined;
}) => {
  const data = await getMyBookings(limit, status);
  console.log("data", data);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Bookings not found</div>;
  }

  return <MyBookings bookings={data.data} limit={limit} />;
};
