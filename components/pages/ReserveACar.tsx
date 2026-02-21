import { PAGES } from "@/config/pages.config";
import Header from "../Header";
import { HeaderSpace } from "../HeaderSpace";
import { StepLocation } from "../booking/StepLocation";
import BookingSteps from "../BookingSteps";

export const ReserveACar = ({ step = 1 }: { step?: number }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={step} />
        <StepLocation path={PAGES.RESERVE_A_CAR.SELECT_CAR} />
      </div>
    </div>
  );
};
