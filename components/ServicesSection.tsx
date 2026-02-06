import { Locale } from "@/types/utils";
import { ServicesCarousel } from "./ServiceCarousel";
import { getServices } from "@/data/services";

export const ServicesSection = ({ lang }: { lang: Locale }) => {
  const services = getServices(lang);

  return <ServicesCarousel services={services} />;
};
