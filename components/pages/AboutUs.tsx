import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Clock,
  Globe,
  Percent,
  Plane,
  Settings,
  Shield,
  Users,
  Zap,
} from "lucide-react";

import { Locale } from "@/types/utils";
import Image from "next/image";
import Link from "next/link";
import { AboutHero } from "../AboutHero";
import { AboutMobilitySection } from "../AboutMobilitySection";
import { DividerText } from "../DividerText";
import { HeaderSpace } from "../HeaderSpace";
import { Icons } from "../icons";
import { Marquee } from "../Marquee";
import { TextStroke } from "../TextStroke";
import { YuAdvantages } from "../YuAdvantages";

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
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <div className="relative bg-background overflow-hidden">
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
      <section className="bg-primary py-12 text-white sm:py-16 md:py-20 lg:py-20">
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

          <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="space-y-5 border border-[#ffffff27] bg-[#FFFFFF0D] p-5 whitespace-normal sm:p-6 md:p-8 lg:space-y-6 lg:whitespace-pre-line"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-10 w-10 text-white md:h-12 md:w-12" />
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed sm:text-lg">
                  {item.description}
                </p>
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
      <section className="bg-background py-12 text-center sm:py-16 md:py-20 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-2 md:mb-10 bg-[#F8FAFC] rounded-full">
            <Icons name="hart_icon" className="h-9 w-9 text-primary mx-auto" />
          </div>
          <span className="flex flex-wrap items-center justify-center gap-x-1 text-center text-xl font-bold tracking-[0.12em] text-primary sm:gap-x-2 sm:tracking-[0.2em] md:text-base">
            THE{" "}
            <Image
              src={"/assets/YU.png"}
              alt="Relaxed mobility"
              className="mx-1 inline-block w-12 sm:mx-2 sm:w-14"
              width={500}
              height={500}
            />{" "}
            EXPERIENCE
          </span>
          <h2 className="text-5xl md:text-5xl lg:text-7xl text-center font-bold mt-3 mb-6">
            OUR{" "}
            <TextStroke strokeWidth="1px" className="italic">
              HEARTFELT
            </TextStroke>{" "}
            PROMISE
          </h2>
          <p className="mx-auto mb-10 text-center text-base font-light sm:text-lg md:mb-12 md:text-xl lg:text-3xl">
            &quot;At YU CAR RENTAL, everything revolves around ease, trust and a{" "}
            <br className="hidden lg:block" />
            heartfelt welcome. We make sure your car is perfectly prepared, with
            clear instructions and personal service.&quot;
          </p>
          <p className="mx-auto max-w-xl text-sm font-bold uppercase tracking-[0.12em] text-primary opacity-90 sm:text-base md:text-lg md:tracking-widest">
            FROM THE MOMENT YOU ARRIVE, YOUR JOURNEY BEGINS IN STYLE - RELAXED,
            SMOOTH AND STRESS-FREE.
          </p>
        </div>
      </section>

      {/* Freedom CTA */}
      <section className="bg-[#F8FAFC] py-12 text-center sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <span className="text-xs font-bold tracking-[0.12em] text-primary sm:text-sm sm:tracking-[0.16em] md:text-base md:tracking-[0.2em] whitespace-pre-line md:whitespace-normal">
            {" READY TO EXPLORE \n BONAIRE AT YOUR OWN PACE?"}
          </span>
          <div>
            <h2 className="text-5xl lg:text-9xl font-display tracking-tighter font-bold  mt-4 mb-2">
              YOUR KEY TO
            </h2>
            <TextStroke
              strokeWidth="1px"
              className="text-5xl lg:text-9xl tracking-tighter font-bold italic"
            >
              FREEDOM.
            </TextStroke>
          </div>
          <Link
            href="https://bonaireisland.com"
            target="_blank"
            className="mt-10 inline-block sm:mt-12"
          >
            <Button className="lg:mt-10 w-full bg-primary px-6 py-4 font-extrabold tracking-[0.15rem] border-primary-foreground/30 sm:mt-12 sm:w-auto sm:px-10 sm:py-5 sm:tracking-[0.2rem] lg:px-16 lg:py-8 lg:tracking-[0.25rem]">
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
