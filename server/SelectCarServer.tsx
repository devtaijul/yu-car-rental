import { getAvailableCars } from "@/actions/query";
import { SelectCar } from "@/components/booking/SelectCar";
import { LocationData } from "@/types/utils";

export const SelectCarServer = async ({
  locationData,
}: {
  locationData?: LocationData;
}) => {
  if (!locationData) return null;
  const data = await getAvailableCars({ locationData });

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <SelectCar cars={data.cars} />;
};
