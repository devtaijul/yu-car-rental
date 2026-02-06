import { ServicesCarousel } from "./ServiceCarousel";

export const ServicesSection = () => {
  const services = [
    {
      icon: "Sparkles",
      title: "24/7 SELF-SERVICE",
      description:
        "Pick up your car whenever it suits you — day or night, fully contactless. No waiting, no hassle.",
    },
    {
      icon: "Car",
      title: "No Hidden Fees",
      description:
        "Transparency is at the core of our values. With YU Car Rental, what you see is what you get. Say goodbye to hidden charges and unexpected fees.",
    },
    {
      icon: "Clock",
      title: "Free pick-up service",
      description:
        "No more waiting in line! We offer a hassle free pick-up process, with our free pick-up service. Your rental vehicle will be waiting for you, so you can get started on your Bonaire adventure right away.",
    },
    {
      icon: "Shield",
      title: "100% Coverage Package",
      description:
        "With our 100% coverage package, you'll enjoy peace of mind as there's no deposit required, and you won't need to worry about paying for scratches or dents.",
    },
    {
      icon: "Percent",
      title: "Up To 15% Discount",
      description:
        "Book online and save! Get up to 15% off on reservations of 7 days or longer.",
    },
    {
      icon: "Plane",
      title: "Airport Pickup",
      description:
        "Upon arriving at the airport, your car will be in the airport parking lot, so you can just hop in and drive off.",
    },
  ];

  return <ServicesCarousel services={services} />;
};
