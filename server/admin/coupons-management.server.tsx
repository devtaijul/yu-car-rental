import { getCouponsForAdmin } from "@/actions/query";
import CouponsPage from "@/components/pages/admin/CouponsPage";

export const CouponManagementServer = async () => {
  const data = await getCouponsForAdmin();
  console.log(data);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <CouponsPage />;
};
