import { Car, Clock, Percent, Plane, Shield, Sparkles } from "lucide-react";
import React from "react";

export const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Zero Deductible with 100% Coverage Package",
      description:
        "With our 100% coverage package, you'll enjoy peace of mind as there's no deposit required, and you won't need to worry about paying for scratches or dents. All damages, even to the rental vehicle, is fully covered.",
    },
    {
      icon: Clock,
      title: "100% Flexible Cancellation Policy",
      description:
        "Life is full of surprises, and we understand that. With our flexible cancellation policy, you only pay for the days you rent, allowing you the freedom to adjust your plans without any hassles.",
    },
    {
      icon: Car,
      title: "New and Fuel Efficient Cars and Unlimited Miles",
      description:
        "Drive around the island in style with eco-friendly vehicles with our fleet of new Toyota cars and pickups. Enjoy a smooth and efficient ride while exploring Bonaire's stunning landscapes.",
    },
    {
      icon: Percent,
      title: "Online Reservation Discounts Up To 15%",
      description:
        "Book online and save! Get up to 15% off on reservations of 7 days or longer.",
    },
    {
      icon: Sparkles,
      title: "Self Service Option (24 Hours A Day)",
      description:
        "We provide free self-service options to all customers. Just fill out the online check-in form that we will send to you by mail or WhatsApp and choose the Self-service after-work option.",
    },
    {
      icon: Plane,
      title: "Airport Pickup Service",
      description:
        "Upon arriving at the airport, your car will be in the airport parking lot, so you can just hop in and drive off and start the vacation.",
    },
  ];

  return (
    <section className="py-20 bg-primary/15">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-badge mb-4">
            <Sparkles className="h-3 w-3" />
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-card transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
