import { SelectCarPage } from "@/components/pages/SelectCarPage";
import { LocationData } from "@/types/utils";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<LocationData>;
}) => {
  const query = await searchParams;

  return <SelectCarPage locationData={query} />;
};

export default page;
