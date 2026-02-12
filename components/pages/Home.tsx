import CarCard from "@/components/CarCard";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

import { Car } from "lucide-react";

import { cars } from "@/data/cars";
import { Locale } from "@/types/utils";
import FAQSection from "../FAQSection";
import { FeatureSection } from "../FeatureSection";
import { HeroSection } from "../HeroSection";
import { PricingTable } from "../PricingTable";
import ReviewsCarousel from "../ReviewsCarousel";
import { ServicesSection } from "../ServicesSection";
import { SectionTitle } from "../SectionTitle";

export const HomePage = ({ lang }: { lang: Locale }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection lang={lang} />

      {/* Features Bar */}
      <FeatureSection />

      {/* Our Services */}
      <ServicesSection lang={lang} />

      {/* Featured Cars */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Explore Our Fleet" subtitle="Featured Cars" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 6).map((car) => (
              <CarCard
                key={car.id}
                name={car.name}
                image={car.image}
                price={car.price}
                specs={car.specs}
                id={car.id}
              />
            ))}
          </div>
        </div>
      </section>

      <PricingTable />

      <ReviewsCarousel />

      {/* FAQ */}
      <FAQSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
