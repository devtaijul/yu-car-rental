import { getCarByIdAdmin } from "@/actions/query";
import React from "react";

export const EditCarServer = async ({ car_id }: { car_id: string }) => {
  const data = await getCarByIdAdmin(car_id);
  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.data) {
    return <div>Car not found</div>;
  }

  console.log(data.data);

  return <div>EditCarServer</div>;
};
