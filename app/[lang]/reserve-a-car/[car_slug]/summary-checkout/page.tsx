import BookingSteps from "@/components/BookingSteps";
import Header from "@/components/Header";
import { HeaderSpace } from "@/components/HeaderSpace";
import { BookingSummaryServer } from "@/server/BookingSummaryServer";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ car_slug: string }> }) => {
  const { car_slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />
      <div className="container mx-auto px-4 py-8">
        <BookingSteps currentStep={4} />
        <Suspense fallback={<div>Loading...</div>}>
          <BookingSummaryServer car_slug={car_slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
