import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";

import { Locale } from "@/types/utils";
import FAQSection from "../FAQSection";
import { FeaturedCarSection } from "../FeaturedCarSection";
import { FeatureSection } from "../FeatureSection";
import { HeroSection } from "../HeroSection";
import { HomePricingSection } from "../HomePricingSection";
import ReviewsCarousel from "../ReviewsCarousel";
import { ServicesSection } from "../ServicesSection";

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
      <FeaturedCarSection />

      <HomePricingSection />

      <ReviewsCarousel />

      {/* FAQ */}
      <FAQSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};
