"use client";

import CarCard from "@/components/CarCard";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

import {
  Car,
  ChevronLeft,
  ChevronRight,
  Clock,
  Percent,
  Plane,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

import { cars } from "@/data/cars";
import { useRouter } from "next/navigation";
import { FeatureSection } from "../FeatureSection";
import { HeroSection } from "../HeroSection";
import { Button } from "../ui/button";
import { ServicesSection } from "../ServicesSection";

export const HomePage = () => {
  const navigate = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Bar */}
      <FeatureSection />

      {/* Our Services */}
      <ServicesSection />

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
                onRent={() => navigate.push(`/booking?car=${car.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4">
              <Star className="h-3 w-3" />
              Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Real Experiences, Real Freedom
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            {/* Rating */}
            <div className="gradient-teal text-primary-foreground rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold mb-2">4.6/5</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/50 text-yellow-400/50"}`}
                  />
                ))}
              </div>
              <p className="text-sm opacity-80">
                Average rating from 1,200+ reviews
              </p>
            </div>

            {/* Review Card */}
            <div className="bg-card border border-border rounded-2xl p-6 max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-semibold text-primary">ER</span>
                </div>
                <div>
                  <h4 className="font-semibold">Elena R.</h4>
                  <p className="text-sm text-muted-foreground">VEYRA TRAIL</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;The YU Car Rental Team Was Incredibly Responsive And
                Professional. Pick-Up And Drop-Off Were Smooth, And The Digital
                Check-In Saved Me So Much Time. Highly Recommend Their
                Service.&quot;
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
