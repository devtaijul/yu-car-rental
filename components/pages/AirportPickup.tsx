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

const airportHero = "/assets/Arrival Hall.png";
const arrivalsImg = "/assets/Airport-1.png";
const luggageImg = "/assets/Airport-2.png";
const drivingImg = "/assets/Airport-3.png";
import Image from "next/image";
import Link from "next/link";
import { HeaderSpace } from "../HeaderSpace";
import { TextStroke } from "../TextStroke";

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
      <div className="relative min-h-[80vh] bg-background">
        <div className="absolute inset-0 z-20">
          <Header />
        </div>

        <div className="relative z-10 min-h-[80vh] flex items-center pt-44">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">
            {/* Left - Image */}
            <div className="relative overflow-hidden  aspect-4/3 before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-primary before:opacity-30">
              <Image
                src={airportHero}
                alt="Airport"
                className="w-full h-full object-cover "
                width={1000}
                height={500}
              />
              <div className="absolute bottom-4 left-4 text-white text-xs tracking-widest">
                <div>FLAMINGO INT'L AIRPORT</div>
                <div className="text-white/60">BONAIRE (BON)</div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="p-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-foreground/40" />
                <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
                  AIRPORT PICKUP SERVICE
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] mb-6">
                LUXURY
                <br />
                <span
                  className="font-display font-bold italic"
                  style={{
                    WebkitTextStroke: "2px hsl(var(--foreground))",
                    WebkitTextFillColor: "transparent",
                  }}
                ></span>
                <TextStroke strokeWidth="2px" className="font-extrabold ">
                  ARRIVAL.
                </TextStroke>
              </h1>

              <p className="text-dark-text text-sm max-w-sm mb-6 leading-relaxed">
                Escape the chaos of the terminal. The redesigned airport is
                expected to provide an experience as tranquil and serene as the
                Caribbean sea itself. No queues, no shuttle, just pure island
                flow
              </p>

              <div className="px-8 border-l-4 border-dark-text">
                <span className="font-bold ">Available Carriers</span>
                <div className="flex flex-wrap items-center gap-4 text-lg  text-black font-bold tracking-widest">
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    HELP
                  </Link>
                  <span>•</span>
                  <Link
                    href="/help"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                  <span>•</span>
                  <Link
                    href="/deals"
                    className="hover:text-foreground transition-colors"
                  >
                    DEALS
                  </Link>
                  <span>•</span>
                  <Link
                    href="/bonaire"
                    className="hover:text-foreground transition-colors"
                  >
                    BONAIRE INFO
                  </Link>
                  <span>•</span>
                  <Link
                    href="/booking"
                    className="hover:text-foreground transition-colors"
                  >
                    EXPANSION
                  </Link>
                </div>
              </div>
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
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 md:[direction:ltr]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={500}
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
      <section className="py-20 bg-[#214C5A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-primary-foreground/40" />
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
                We operate on your schedule, not the airline's. Our proprietary
                tracking system monitors Flamingo Airport (BON) in real-time to
                match arrivals with your exact pickup, delayed or early — we are
                always where you need us to be.
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
            <div className="bg-[#142D35] text-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-widest">
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

      <section className="py-24 bg-[#F8FAFC] text-center">
        <div className="container mx-auto px-4">
          <span className="text-xm md:text-base font-bold text-primary tracking-[0.2em] ">
            YOUR ISLAND JOURNEY
          </span>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-9xl font-display tracking-tighter font-bold  mt-4 mb-2">
              START IN
            </h2>
            <TextStroke
              strokeWidth="1px"
              className="text-4xl md:text-5xl lg:text-9xl tracking-tighter font-bold italic"
            >
              HIGH GEAR.
            </TextStroke>
          </div>
          <div className="flex items-center justify-center gap-4  mt-12">
            <Link href="/booking">
              <Button className="bg-primary  border-primary-foreground/30  px-16 py-8 tracking-[0.25rem] font-extrabold">
                BOOK TODAY
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                variant="outline"
                className=" border-primary text-dark-text hover:bg-primary-foreground hover:text-primary px-16 py-8 tracking-[0.25rem] font-extrabold"
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
