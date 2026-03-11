import { getCarByIdAdmin } from "@/actions/query";
import EditCarPage from "@/components/pages/admin/EditCarPage";
import React from "react";

export const EditCarServer = async ({ car_id }: { car_id: string }) => {
  const data = await getCarByIdAdmin(car_id);
  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Car not found</div>;
  }

  return <EditCarPage car={data.data} />;
};
