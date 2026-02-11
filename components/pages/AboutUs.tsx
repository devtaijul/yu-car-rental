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
import Image from "next/image";

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
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mt-3">
              THE{" "}
              <Image
                src={"/assets/YU.png"}
                alt="Relaxed mobility"
                className="max-w-30 max-h-24 inline-block"
                width={500}
                height={500}
              />
            </h2>
            <TextStroke
              className="text-4xl md:text-5xl lg:text-6xl font-bold italic"
              strokeWidth="1px"
            >
              ADVANTAGE.
            </TextStroke>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {advantages.map((item) => (
              <div
                key={item.num}
                className="bg-primary/20 text-primary hover:text-white min-h-80  p-12 relative overflow-hidden group hover:bg-primary transition-shadow"
              >
                <span className="text-4xl  font-bold opacity-20">
                  {item.num}
                </span>
                <div className="pt-10">
                  <h3 className="text-2xl font-bold tracking-wider mb-2 text-[#0F172A] group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className=" leading-relaxed text-[#64748B] group-hover:text-[#BFD1D7]">
                    {item.description}
                  </p>
                </div>
                <item.icon className="h-8 w-8 opacity-10 absolute bottom-4 right-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heartfelt Promise Section */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
          <span className="text-xs tracking-[0.2em] text-muted-foreground">
            THE YU EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-6xl text-center font-bold mt-3 mb-6">
            OUR{" "}
            <TextStroke strokeWidth="1px" className="italic">
              HEARTFELT
            </TextStroke>{" "}
            PROMISE
          </h2>
          <p className="text-xl font-light mb-12 max-w-3xl text-center mx-auto">
            "At YU CAR RENTAL, everything revolves around ease, trust and a
            heartfelt welcome. We make sure your car is perfectly prepared, with
            clear instructions and personal service."
          </p>
          <p className="text-muted-foreground tracking-widest font-bold uppercase opacity-65 max-w-xl mx-auto">
            FROM THE MOMENT YOU ARRIVE, YOUR JOURNEY BEGINS IN STYLE — RELAXED,
            SMOOTH AND STRESS-FREE.
          </p>
        </div>
      </section>

      {/* Freedom CTA */}
      <section className="py-24 bg-[#F8FAFC] text-center">
        <div className="container mx-auto px-4">
          <span className="text-xs tracking-[0.2em] ">
            READY TO EXPLORE BONAIRE AT YOUR OWN PACE?
          </span>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold  mt-4 mb-2">
              YOUR KEY TO
            </h2>
            <TextStroke
              strokeWidth="1px"
              className="text-4xl md:text-5xl lg:text-6xl font-bold italic"
            >
              FREEDOM.
            </TextStroke>
          </div>
          <Link href="/booking" className="mt-12">
            <Button className="bg-primary mt-12 border-primary-foreground/30  px-8 py-6">
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
