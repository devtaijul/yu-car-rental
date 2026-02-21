import { SelectCarServer } from "@/server/SelectCarServer";
import { LocationData } from "@/types/utils";
import { Suspense } from "react";
import BookingSteps from "../BookingSteps";
import Header from "../Header";
import { HeaderSpace } from "../HeaderSpace";
import { FeaturedCarSkeleton } from "../skeleton/FeaturedCarSkeleton";

export const SelectCarPage = ({
  locationData,
}: {
  locationData?: LocationData;
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto py-24">
        <BookingSteps currentStep={2} />
        <Suspense fallback={<FeaturedCarSkeleton />}>
          <SelectCarServer locationData={locationData} />
        </Suspense>
      </div>
    </div>
  );
};
