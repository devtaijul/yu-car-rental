import { PackageAndExtras } from "@/components/pages/PackageAndExtras";
import { LocationDataAndPackage } from "@/types/utils";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<LocationDataAndPackage>;
}) => {
  const query = await searchParams;
  return <PackageAndExtras />;
};

export default page;
