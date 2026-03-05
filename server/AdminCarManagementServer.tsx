import { getCarsForAdmin } from "@/actions/query";
import { CarsPage } from "@/components/pages/admin/CarsPage";

export const AdminCarManagementServer = async () => {
  const data = await getCarsForAdmin({
    limit: "10",
    page: "1",
    search: "",
  });
  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <CarsPage cars={data.cars} />;
};
