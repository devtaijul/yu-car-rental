import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import Link from "next/link";
import { DividerText } from "../DividerText";
import { HeaderSpace } from "../HeaderSpace";
import { MessageIcon } from "../icons/MessageIcon";
import One from "../icons/One";
import Three from "../icons/Three";
import Two from "../icons/Two";
import { TextStroke } from "../TextStroke";

const airportHero = "/assets/Arrival Hall.png";
const arrivalsImg = "/assets/Airport-1.png";
const luggageImg = "/assets/Airport-2.png";
const drivingImg = "/assets/Airport-3.png";

const arrivalSteps = [
  {
    image: arrivalsImg,
    title: "PERSONAL \n MEET & GREET",
    description:
      "Step into the arrival hall to find your dedicated \n concierge waiting. A personalized tablet display \n ensures you spot us immediately amidst the crowd. No \n wandering, no confusion.",
    imagePosition: "right" as const,
    backgroundWaterMark: One,
  },
  {
    image: luggageImg,
    title: "LUGGAGE \n CONCIERGE",
    description:
      "Your transition should be weightless. Our team \n manages your luggage from the arrival hall directly \n to the trunk of your vehicle. Focus on the island air \n while we handle the logistics.",
    imagePosition: "left" as const,
    backgroundWaterMark: Two,
  },
  {
    image: drivingImg,
    title: "DIRECT-TO-DRIVE \n PROTOCOL",
    description:
      "Our team is ready to welcome you. Your documents are \n pre-processed, your vehicle is climate-controlled \n and the keys are ready. Arrival to departure in under \n 300 seconds.",
    imagePosition: "right" as const,
    backgroundWaterMark: Three,
  },
];

const flightRoutes = [
  {
    route: "KLM • AMSTERDAM",
    vehicle: "BOEING 777-300ER",
    status: "ON TIME",
    statusColor: "text-green-500",
  },
  {
    route: "DL 899 • ATLANTA",
    vehicle: "AIRBUS A321",
    status: "DELAYED +1HR",
    statusColor: "text-orange-500",
  },
  {
    route: "UA94 • CURAÇAO",
    vehicle: "BOEING 777-300ER",
    status: "ARRIVED",
    statusColor: "text-green-500",
  },
];

const AirportPickup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <div className="absolute inset-0 ">
        <Header />
        <HeaderSpace />
      </div>
      <div className="relative min-h-[80vh] bg-background w-full">
        <div className="absolute right-0 top-2/3 z-50 hidden -translate-y-1/2 translate-x-1/3 rotate-90 font-bold tracking-[0.3rem] text-primary opacity-80 xl:block">
          ESTABLISHED 2009 — BONAIRE
        </div>
        <div className="relative min-h-[80vh] flex items-center pt-28 sm:pt-32 lg:pt-44">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left - Image */}
            <div className="relative aspect-4/3 overflow-hidden before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-primary before:opacity-30 sm:aspect-16/10 lg:aspect-4/3">
              <Image
                src={airportHero}
                alt="Airport"
                className="w-full h-full object-cover "
                width={1000}
                height={500}
              />
              <div className="absolute bottom-4 uppercase left-4 text-white text-xs">
                <span className="font-bold text-lg tracking-widest">
                  Flamingo Int&apos;l Airport
                </span>

                <DividerText
                  side="left"
                  text="Bonaire, Dutch Caribbean"
                  dividerWidth="50px"
                  className="tracking-wider"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="z-10 px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:p-20">
              {/* <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-0.5 bg-foreground/40" />
                <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
                  AIRPORT PICKUP SERVICE
                </span>
              </div> */}

              <h1 className="mb-6 text-4xl font-display font-bold leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
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
                  ARRIVAL
                </TextStroke>
              </h1>

              <p className="text-dark-text text-sm max-w-sm mb-6 leading-relaxed">
                Escape the chaos of the terminal. The redesigned airport is
                expected to provide an experience as tranquil and serene as the
                Caribbean sea itself. No queues, no shuttle, just pure island
                flow
              </p>

              <div className="mt-8 border-l-4 border-dark-text pl-5 uppercase sm:pl-6 lg:pl-8">
                <span className="font-bold text-[#94A3B8]">
                  Available Carriers
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold tracking-[0.2em] text-black sm:text-base">
                  <span>KLM • TUI • DELTA • AMERICAN • Corendon</span>
                  {/*  <Link
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
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Arrival Sequence */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row">
            <h2 className="text-3xl font-display font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              THE ARRIVAL
              <br />
              SEQUENCE.
            </h2>
            <p className="text-left text-sm font-medium leading-relaxed tracking-wider text-dark-text uppercase lg:mt-0 lg:text-right lg:w-[40%]">
              A meticulously choreographed transition from cabin to cockpit,
              designed for the discerning traveler who values time above all
              else.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {arrivalSteps.map((step, index) => {
              const WatermarkIcon = step.backgroundWaterMark;

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 ${
                    step.imagePosition === "left" ? "" : "lg:[direction:rtl]"
                  }`}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl lg:rounded-2xl lg:[direction:ltr]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                      width={800}
                      height={500}
                    />
                  </div>
                  <div className="relative overflow-hidden whitespace-normal lg:[direction:ltr] lg:whitespace-pre-line">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2"
                    >
                      <div className="origin-center scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.75]">
                        <WatermarkIcon />
                      </div>
                    </div>
                    <h3 className="relative z-10 mb-4 text-2xl font-display font-bold md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="relative z-10 text-sm leading-relaxed text-gray-800 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flight Intelligence Section */}
      <section className="bg-[#214C5A] py-16 lg:py-32 min-h-[75vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="text-primary-foreground">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06B6D4] ring-4 ring-emerald-400/15" />
                </span>
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

              <div className="flex flex-wrap gap-8 sm:gap-12">
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
            <div className="bg-[#142D35] text-white  p-14 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-widest">
                  INBOUND TRAFFIC / BON
                </span>
                <span className="relative flex items-center gap-1 rounded-full px-2 py-1 text-xs text-[#2F6B7F]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 88 89"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 opacity-15"
                  >
                    <path
                      d="M72.2736 15.7309C66.0451 9.49579 57.9318 5.49219 49.1941 4.34211C40.4563 3.19202 31.5833 4.95985 23.9536 9.37093M11.9936 20.0109H12.0336M5.15359 34.4909C3.65397 40.5992 3.61591 46.975 5.0425 53.1007C6.46909 59.2264 9.32012 64.9294 13.3641 69.7466C17.4081 74.5638 22.5311 78.3595 28.3172 80.8254C34.1032 83.2914 40.3893 84.3582 46.6649 83.9392C52.9406 83.5201 59.029 81.6271 64.4358 78.4137C69.8427 75.2004 74.4156 70.7573 77.7832 65.4452C81.1509 60.1331 83.2184 54.1017 83.8179 47.8407C84.4174 41.5797 83.532 35.2656 81.2336 29.4109"
                      stroke="currentColor"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M60.9533 27.0509C58.6514 24.7356 55.9012 22.9142 52.8711 21.6984C49.841 20.4825 46.5947 19.8977 43.3308 19.9797C40.0669 20.0617 36.854 20.8088 33.8888 22.1753C30.9236 23.5418 28.2683 25.4989 26.0856 27.927C23.9028 30.355 22.2384 33.2029 21.1942 36.2963C20.15 39.3898 19.7479 42.6637 20.0126 45.9179C20.2773 49.1721 21.2032 52.3381 22.7336 55.2221C24.2641 58.1061 26.3668 60.6476 28.9133 62.6909M43.9933 68.0109H44.0333M67.9533 42.6509C68.1709 46.4564 67.479 50.259 65.9348 53.7439C64.3906 57.2288 62.0385 60.2958 59.0733 62.6909"
                      stroke="currentColor"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M43.9932 52.011C48.4114 52.011 51.9932 48.4293 51.9932 44.011C51.9932 39.5927 48.4114 36.011 43.9932 36.011C39.5749 36.011 35.9932 39.5927 35.9932 44.011C35.9932 48.4293 39.5749 52.011 43.9932 52.011Z"
                      stroke="currentColor"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M49.6338 38.371L72.2738 15.731"
                      stroke="currentColor"
                      strokeWidth={8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="relative py-1 px-3 bg-green-500/10 ">
                    <span className=" text-green-500">ACTIVE</span>
                  </div>
                </span>
              </div>

              <div className="space-y-4">
                {flightRoutes.map((flight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-6 border-b border-b-gray-600 border-border last:border-0"
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {flight.route}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.vehicle}
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

              <div className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/60">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 text-white">
                  <MessageIcon className="h-4 w-4" />
                </span>

                <span>
                  DIRECT DASHBOARD ACCESS
                  <br />
                  <span className="text-gray-400">WhatsApp: +599 717 8000</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16 text-center lg:py-24">
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold tracking-[0.2em] text-primary md:text-base">
            YOUR ISLAND JOURNEY
          </span>
          <div>
            <h2 className="mt-4 mb-2 text-5xl font-display font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-9xl">
              START IN
            </h2>
            <TextStroke
              strokeWidth="1px"
              className="text-5xl font-extrabold italic tracking-tighter sm:text-5xl md:text-6xl lg:text-9xl"
            >
              HIGH GEAR.
            </TextStroke>
          </div>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link href="/booking">
              <Button className="w-full bg-primary px-10 py-6 font-extrabold tracking-[0.25rem] sm:w-auto md:px-12 lg:px-16 lg:py-8">
                BOOK TODAY
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                variant="outline"
                className="w-full border-primary px-10 py-6 font-extrabold tracking-[0.25rem] text-dark-text hover:bg-primary-foreground hover:text-primary sm:w-auto md:px-12 lg:px-16 lg:py-8"
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
