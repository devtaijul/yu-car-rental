import { getDashboardOverview } from "@/actions/query";
import { DashboardOverview } from "@/components/pages/dashboard/DashboardOverview";

const page = async () => {
  const result = await getDashboardOverview();
  const data = result?.success ? result.data : null;
  return <DashboardOverview data={data} />;
};

export default page;
