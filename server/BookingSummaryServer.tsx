import { getCarBySlug } from "@/actions/query";
import BookingSummaryPage from "@/components/pages/BookingSummaryPage";
import React from "react";

export const BookingSummaryServer = async ({
  car_slug,
}: {
  car_slug: string;
}) => {
  const data = await getCarBySlug(car_slug);

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  if (!data.car) {
    return <div>Car not found</div>;
  }

  return <BookingSummaryPage car={data.car} />;
};
