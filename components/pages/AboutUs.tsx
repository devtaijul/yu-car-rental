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
import { YuAdvantages } from "../YuAdvantages";
import { Locale } from "@/types/utils";
import { Icons } from "../icons";

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
    title: "Total Peace of Mind",
    description:
      "Every rental includes full coverage with zero deductible. No need \n to worry about deposits, scratches, or unexpected damage — \n you’re completely protected.",
    comment: "ZERO DEDUCTIBLE INCLUDED",
  },
  {
    icon: Settings,
    title: "FULLY FLEXIBLE",
    description:
      "Plans changed? No problem. We offer a fully flexible cancellation \n policy. You only pay for the days you actually \n use the car. We adapt to you.",
    comment: "PAY ONLY FOR ACTUAL USE",
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

const AboutUs = async ({ lang }: { lang: Locale }) => {
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
            <span className="text-xs md:text-base tracking-[0.2em] text-white/80">
              STANDARD OF EXCELLENCE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-roboto font-extrabold mt-3">
              OUR{" "}
              <TextStroke
                className="italic"
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
                className="bg-[#FFFFFF0D] p-8 space-y-6 border whitespace-pre-line border-[#ffffff27]"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-12 w-12 text-white " />
                  <h3 className="text-3xl  font-bold whitespace-pre-line">
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg  leading-relaxed">{item.description}</p>
                <DividerText text={item.comment} side="left" className="" />
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
      <YuAdvantages lang={lang} />

      {/* Heartfelt Promise Section */}
      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-10 bg-[#F8FAFC] rounded-full">
            <Icons name="hart_icon" className="h-9 w-9 text-primary mx-auto" />
          </div>
          <span className="text-xs md:text-base tracking-[0.2em] flex justify-center items-center  text-primary font-bold">
            THE{" "}
            <Image
              src={"/assets/YU.png"}
              alt="Relaxed mobility"
              className="w-14 mx-2 inline-block"
              width={500}
              height={500}
            />{" "}
            EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-7xl text-center font-bold mt-3 mb-6">
            OUR{" "}
            <TextStroke strokeWidth="1px" className="italic">
              HEARTFELT
            </TextStroke>{" "}
            PROMISE
          </h2>
          <p className="text-xl lg:text-3xl font-light mb-12 text-center mx-auto">
            "At YU CAR RENTAL, everything revolves around ease, trust and a{" "}
            <br />
            heartfelt welcome. We make sure your car is perfectly prepared, with
            clear instructions and personal service."
          </p>
          <p className="text-primary tracking-widest text-lg font-bold uppercase opacity-90 max-w-xl mx-auto">
            FROM THE MOMENT YOU ARRIVE, YOUR JOURNEY BEGINS IN STYLE — RELAXED,
            SMOOTH AND STRESS-FREE.
          </p>
        </div>
      </section>

      {/* Freedom CTA */}
      <section className="py-24 bg-[#F8FAFC] text-center">
        <div className="container mx-auto px-4">
          <span className="text-xm md:text-base font-bold text-primary tracking-[0.2em] ">
            READY TO EXPLORE BONAIRE AT YOUR OWN PACE?
          </span>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-9xl font-display tracking-tighter font-bold  mt-4 mb-2">
              YOUR KEY TO
            </h2>
            <TextStroke
              strokeWidth="1px"
              className="text-4xl md:text-5xl lg:text-9xl tracking-tighter font-bold italic"
            >
              FREEDOM.
            </TextStroke>
          </div>
          <Link href="/booking" className="mt-12">
            <Button className="bg-primary mt-12  border-primary-foreground/30  px-16 py-8 tracking-[0.25rem] font-extrabold">
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
