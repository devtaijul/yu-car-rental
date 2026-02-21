import { FeaturedCarServer } from "@/server/FeaturedCarServer";
import { SectionTitle } from "./SectionTitle";
import { Suspense } from "react";
import { FeaturedCarSkeleton } from "./skeleton/FeaturedCarSkeleton";

export const FeaturedCarSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Explore Our Fleet" subtitle="Featured Cars" />

        <Suspense fallback={<FeaturedCarSkeleton />}>
          <FeaturedCarServer />
        </Suspense>
      </div>
    </section>
  );
};
