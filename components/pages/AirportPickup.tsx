import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Plane,
  Users,
  Briefcase,
  Car,
  Clock,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { HeaderSpace } from "../HeaderSpace";

const airportHero = "/assets/airport-hero.jpg";
const arrivalsImg = "/assets/airport-arrivals.jpg";
const luggageImg = "/assets/airport-luggage.jpg";
const drivingImg = "/assets/airport-driving.jpg";

const arrivalSteps = [
  {
    image: arrivalsImg,
    title: "PERSONAL MEET & GREET",
    description:
      "Step into the arrival hall to find your dedicated concierge waiting. A personalized name display ensures you are met immediately — no idle time, no searching, no confusion.",
    imagePosition: "right" as const,
  },
  {
    image: luggageImg,
    title: "LUGGAGE CONCIERGE",
    description:
      "Your transition should be effortless. Our team manages your luggage from the claim belt directly to the trunk of your vehicle. Focus on the island air while we handle the logistics.",
    imagePosition: "left" as const,
  },
  {
    image: drivingImg,
    title: "DIRECT-TO-DRIVE PROTOCOL",
    description:
      "Our team is ready to welcome you. Your documents are pre-processed, your vehicle is climate-controlled. From the keys to the road, arrival to departure in under 180 seconds.",
    imagePosition: "right" as const,
  },
];

const flightRoutes = [
  {
    route: "KLM • AMSTERDAM",
    status: "ON TIME",
    statusColor: "text-green-500",
  },
  {
    route: "DL 899 • ATLANTA",
    status: "DELAYED +1HR",
    statusColor: "text-orange-500",
  },
  { route: "UA94 • CURAÇAO", status: "LANDED", statusColor: "text-green-500" },
];

const AirportPickup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div
        className="relative min-h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${airportHero})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-20">
          <Header />
          <HeaderSpace />
        </div>

        <div className="relative z-10 container mx-auto px-4 flex items-center min-h-[60vh]">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-white/60" />
              <span className="text-xs tracking-[0.2em] text-white/80 font-medium">
                AIRPORT PICKUP SERVICE
              </span>
            </div>

            {/* Location info */}
            <div className="text-xs text-white/60 tracking-widest mb-4">
              FLAMINGO INT&apos;L AIRPORT
              <br />
              BONAIRE (BON)
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.95] mb-6">
              LUXURY
              <br />
              <span
                className="text-gradient-teal"
                style={{
                  background: "linear-gradient(90deg, #4fd1c5, #38b2ac)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ARRIVAL.
              </span>
            </h1>

            <p className="text-white/80 text-sm max-w-sm mb-6 leading-relaxed">
              Escape the chaos of the terminal. The redesigned airport is
              expected to provide an experience as tranquil and serene as the
              Caribbean sea itself. No queues, no shuttles, just your island
              flow.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 tracking-widest">
              <Link href="/help" className="hover:text-white transition-colors">
                HELP
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-white transition-colors">
                FAQ
              </Link>
              <span>•</span>
              <Link
                href="/deals"
                className="hover:text-white transition-colors"
              >
                DEALS
              </Link>
              <span>•</span>
              <Link
                href="/bonaire"
                className="hover:text-white transition-colors"
              >
                BONAIRE INFO
              </Link>
              <span>•</span>
              <Link
                href="/booking"
                className="hover:text-white transition-colors"
              >
                EXPANSION
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* The Arrival Sequence */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              THE ARRIVAL
              <br />
              SEQUENCE.
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mt-4 md:mt-0 leading-relaxed uppercase tracking-wide">
              A meticulously choreographed transition from cabin to coastline,
              designed for the discerning traveler and you are that match all in
              all.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-20">
            {arrivalSteps.map((step, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  step.imagePosition === "left" ? "" : "md:[direction:rtl]"
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:[direction:ltr]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 text-center">
                      <span className="text-2xl font-display font-bold italic">
                        yu
                      </span>
                      <div className="text-[8px] tracking-widest">
                        CAR RENTAL
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:[direction:ltr]">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Intelligence Section */}
      <section className="py-20 bg-[hsl(var(--primary))]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-primary-foreground/40" />
                <span className="text-xs tracking-[0.2em] text-primary-foreground/60 font-medium">
                  SYSTEM STATUS: MONITORING LIVE
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                FLIGHT
                <br />
                INTELLIGENCE.
              </h2>

              <p className="text-sm text-primary-foreground/70 max-w-md mb-8 leading-relaxed">
                We operate on your schedule, not the airline&apos;s. Our
                proprietary tracking system monitors Flamingo Airport (BON) in
                real-time to match arrivals with your exact pickup, delayed or
                early — we are always where you need us to be.
              </p>

              <div className="flex gap-12">
                <div>
                  <span className="text-3xl font-display font-bold">24/7</span>
                  <div className="text-xs text-primary-foreground/60 tracking-widest mt-1">
                    CONTINUOUS MONITORING
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-display font-bold">0 MIN</span>
                  <div className="text-xs text-primary-foreground/60 tracking-widest mt-1">
                    AVERAGE WAIT TIME
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Board */}
            <div className="bg-card text-foreground rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-widest text-muted-foreground">
                  FLIGHT TRACKER • BON
                </span>
                <span className="flex items-center gap-1 text-xs text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="space-y-4">
                {flightRoutes.map((flight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {flight.route}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium tracking-wider ${flight.statusColor}`}
                    >
                      {flight.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                <span>DIRECT DASHBOARD ACCESS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-teal text-center">
        <div className="container mx-auto px-4">
          <span className="text-xs tracking-[0.2em] text-primary-foreground/60 font-medium">
            YOUR ISLAND JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mt-4 mb-2">
            START IN
          </h2>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8"
            style={{
              background: "linear-gradient(90deg, #4fd1c5, #38b2ac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(79, 209, 197, 0.3)",
            }}
          >
            HIGH GEAR.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="gradient-teal text-primary-foreground border-2 border-primary-foreground/30 rounded-lg px-8 py-6">
                SCHEDULE YOUR PICKUP
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-lg px-8 py-6"
              >
                VIEW LUXURY FLEET
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AirportPickup;
