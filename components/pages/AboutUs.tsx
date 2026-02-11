import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Clock,
  Globe,
  Heart,
  Percent,
  Plane,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";

import Link from "next/link";
import { AboutHero } from "../AboutHero";
import { AboutMobilitySection } from "../AboutMobilitySection";
import { HeaderSpace } from "../HeaderSpace";
import { Marquee } from "../Marquee";
import { TextStroke } from "../TextStroke";
import { DividerText } from "../DividerText";

const marqueeItems = [
  "PURE ENJOYMENT",
  "NO WAITING LINES",
  "ZERO HASSLE",
  "ISLAND FREEDOM",
  "DRIVE SAFE",
];

const commitments = [
  {
    icon: Shield,
    title: "TOTAL PEACE OF MIND",
    description:
      "Drive today, insured for full coverage with zero deductible. Managed by a team of driven specialists in every aspect — accidents, aid coverage damage — you're comprehensively protected.",
  },
  {
    icon: Settings,
    title: "FULLY FLEXIBLE",
    description:
      "Plans change? No problem. We offer a fully flexible cancellation policy — you only pay for the days you're behind the wheel and return the car late without ever being hit by surprise fees or penalties.",
  },
];

const advantages = [
  {
    num: "01",
    icon: Clock,
    title: "24/7 SELF-SERVICE",
    description:
      "Pick up your car whenever you like — day, night, fully contactless car booking, no waiting, no hassle.",
  },
  {
    num: "02",
    icon: Plane,
    title: "DIRECT FROM AIRPORT",
    description:
      "Your car will be waiting in the airport parking lot. Just hop in and head off. Your journey begins immediately.",
  },
  {
    num: "03",
    icon: Percent,
    title: "ONLINE DISCOUNT",
    description:
      "Book through our website and benefit from a 3%, 6% and 12% monthly. Freedom services for early birds only.",
  },
  {
    num: "04",
    icon: Globe,
    title: "MULTILINGUAL TEAM",
    description:
      "We speak your language. Our associates are well versed in Dutch, English, Spanish, and Papiamentu.",
  },
  {
    num: "05",
    icon: Users,
    title: "LOCAL EXPERTISE",
    description:
      "As a local Bonairean, we know the best roads and sights. We will help you explore and discover every treasure.",
  },
  {
    num: "06",
    icon: Zap,
    title: "EFFORTLESS FLOW",
    description:
      "From your initial request all the way to our door, everything is just a click or call and text form away.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] bg-background overflow-hidden">
        <div className="relative z-20">
          <Header />
          <HeaderSpace />
        </div>

        <AboutHero />
      </div>

      {/* Marquee Section */}

      <Marquee
        items={[...marqueeItems, ...marqueeItems]}
        className="bg-primary text-primary-foreground py-12"
        speed={25}
        direction="left"
        pauseOnHover
      />

      {/* Mobility as Relaxed Section */}
      <AboutMobilitySection />

      {/* Our Commitment Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <span className="text-xs tracking-[0.2em] text-muted-foreground">
              STANDARD OF EXCELLENCE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
              OUR{" "}
              <TextStroke
                className="itelic"
                fillColor="transparent"
                strokeColor="white"
                strokeWidth="1px"
              >
                COMMITMENT
              </TextStroke>
              <br />
              TO YOU
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-6  mx-auto">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF0D] p-8 space-y-6 border border-[#ffffff27]"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-12 w-12 text-white " />
                  <h3 className="text-3xl  font-bold ">{item.title}</h3>
                </div>
                <p className="text-lg  leading-relaxed">{item.description}</p>
                <DividerText
                  text="ZERO DEDUCTIBLE INCLUDED"
                  side="left"
                  className=""
                />
                {/* <Link
                  href="/services"
                  className="text-xs font-semibold text-primary hover:underline mt-4 inline-block"
                >
                  LEARN MORE →
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The YU Advantage Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <span className="text-xs tracking-[0.2em] text-muted-foreground">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
              THE{" "}
              <span className="text-4xl md:text-5xl lg:text-6xl font-display italic">
                yu
              </span>
            </h2>
            <h2
              className="text-3xl md:text-4xl font-display font-bold italic"
              style={{
                WebkitTextStroke: "2px hsl(193, 30%, 25%)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              ADVANTAGE.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {advantages.map((item) => (
              <div
                key={item.num}
                className="bg-primary/20 text-primary min-h-80  p-6 relative overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <span className="text-4xl font-display font-bold opacity-20 absolute top-4 left-6">
                  {item.num}
                </span>
                <div className="pt-10">
                  <h3 className="text-sm font-bold tracking-wider mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs  leading-relaxed">{item.description}</p>
                </div>
                <item.icon className="h-8 w-8 opacity-10 absolute bottom-4 right-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heartfelt Promise Section */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
          <span className="text-xs tracking-[0.2em] text-muted-foreground">
            THE YU EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-6">
            OUR{" "}
            <span
              className="font-display italic"
              style={{
                WebkitTextStroke: "2px hsl(193, 30%, 25%)",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              HEARTFELT
            </span>{" "}
            PROMISE
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
            "At YU CAR RENTAL, everything revolves around value, trust and a
            heartfelt welcome. We make sure your car is perfectly prepared, with
            clear instructions and personal service."
          </p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            FROM THE MOMENT YOU ARRIVE, YOUR JOURNEY BEGINS IN STYLE — RELAXED,
            SMOOTH AND STRESS-FREE.
          </p>
        </div>
      </section>

      {/* Freedom CTA */}
      <section className="py-24 gradient-teal text-center">
        <div className="container mx-auto px-4">
          <span className="text-xs tracking-[0.2em] text-primary-foreground/60">
            READY TO EXPLORE BONAIRE AT YOUR OWN PACE?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mt-4 mb-2">
            YOUR KEY TO
          </h2>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold italic mb-8"
            style={{
              WebkitTextStroke: "2px hsl(var(--primary-foreground))",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            FREEDOM.
          </h2>
          <Link href="/booking">
            <Button className="gradient-teal text-primary-foreground border-2 border-primary-foreground/30 rounded-lg px-8 py-6">
              BOOK TODAY
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutUs;
