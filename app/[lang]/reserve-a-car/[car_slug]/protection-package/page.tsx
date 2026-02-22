import { PackageAndExtras } from "@/components/pages/PackageAndExtras";
import { LocationDataAndPackage } from "@/types/utils";

const page = async ({
  searchParams,
  params,
}: {
  params: Promise<{ car_slug: string }>;
  searchParams: Promise<LocationDataAndPackage>;
}) => {
  const query = await searchParams;
  const { car_slug } = await params;
  console.log(car_slug);
  return <PackageAndExtras car_slug={car_slug} />;
};

export default page;
