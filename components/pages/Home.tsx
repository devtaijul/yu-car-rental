import CarCard from "@/components/CarCard";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

import { Car, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cars } from "@/data/cars";
import { Locale } from "@/types/utils";
import { FeatureSection } from "../FeatureSection";
import { HeroSection } from "../HeroSection";
import { ServicesSection } from "../ServicesSection";
import { Button } from "../ui/button";
import { PricingTable } from "../PricingTable";
import FAQSection from "../FAQSection";
import ReviewsCarousel from "../ReviewsCarousel";

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
          <div className="text-center mb-12">
            <span className="section-badge mb-4">
              <Car className="h-3 w-3" />
              Explore Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Featured Cars
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.slice(0, 6).map((car, index) => (
              <CarCard
                key={car.id}
                name={car.name}
                image={car.image}
                price={car.price}
                specs={car.specs}
                variant={index < 3 ? "dark" : "light"}
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
