import { CreateCarPageSkeleton } from "@/components/skeleton/EditCarSkeleton";
import { EditCarServer } from "@/server/admin/edit-car.server";
import React, { Suspense } from "react";

const page = async ({ params }: { params: { car_id: string } }) => {
  const { car_id } = await params;

  return (
    <Suspense fallback={<CreateCarPageSkeleton />}>
      <EditCarServer car_id={car_id} />
    </Suspense>
  );
};

export default page;
