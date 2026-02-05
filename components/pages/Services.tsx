import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Monitor,
  Percent,
  Plane,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

const Services = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Self Service Option (24 Hours A Day)",
      description:
        "We provide free self-service options to all customers. Just fill out the online check-in form that we will send to you by mail or WhatsApp and choose the Self-service after-work option to simply jump behind the wheel and let the vacation begin.",
      note: "* Exact details on how the self-service option works will be explained in the online check-in form we send you by mail or WhatsApp after completing your online reservation.",
      variant: "outline" as const,
    },
    {
      icon: Monitor,
      title: "Online Check-In Option",
      description:
        "Save time at the counter when you check-in online at Price Car Rental BY. Just fill in a few details now while you are at home and we will have all your paperwork ready when you arrive. You will be on the road and on vacation before you know it!",
      note: "*After you make an online reservation on our website we will send you an online check-in form by email or WhatsApp. After this is filled out, you are all set for your upcoming vacation or business trip.",
      variant: "filled" as const,
    },
    {
      icon: Percent,
      title: "Online Reservation Discounts Up To 15%",
      description:
        "Book online and save! Get exclusive discounts on your rental when you book through our website.",
      bullets: [
        "7 Days Or Longer A 5% Discount.",
        "14 Days Or Longer A 10% Discount.",
      ],
      note: "*Discounts are not applicable during the high season.",
      variant: "outline" as const,
    },
    {
      icon: Plane,
      title: "Airport Pickup Service*",
      description:
        "Upon arriving at the airport, your car will be in the airport parking lot, so you can just hop in and drive off and start the vacation.",
      note: "*Exact details on how this service works will be provided upon completing your reservation.",
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Support
          </h1>
          <div className="flex items-center justify-center gap-2 text-primary-foreground/80 text-sm">
            <Link
              href="/"
              className="hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <span>›</span>
            <span>Support</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display leading-tight">
            Our Mission Is To Make Your
            <br />
            <span className="inline-block gradient-teal text-primary-foreground px-4 py-1 rounded-lg my-2">
              Travel Experience
            </span>{" "}
            Better
            <br />
            Through Reliability
          </h2>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 md:p-8 ${
                  service.variant === "filled"
                    ? "bg-muted/50"
                    : "border border-border bg-card"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    service.variant === "filled" ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <service.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {service.bullets && (
                  <ul className="space-y-2 mb-4">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {service.note && (
                  <p className="text-xs text-muted-foreground italic">
                    {service.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-teal" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Choose your car, book online, and hit the road in minutes with
            Travra.
          </p>
          <Link href="/booking">
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-base font-medium">
              SHOW ALL CARS
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Decorative car silhouettes could be added here */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
