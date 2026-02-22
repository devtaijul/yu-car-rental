import React from "react";
import Header from "../Header";
import { HeaderSpace } from "../HeaderSpace";
import BookingSteps from "../BookingSteps";
import StepCoverageExtras from "../booking/StepCoverageExtras";

export const PackageAndExtras = ({ car_slug }: { car_slug: string }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={3} />
        <StepCoverageExtras car_slug={car_slug} />
      </div>
    </div>
  );
};
