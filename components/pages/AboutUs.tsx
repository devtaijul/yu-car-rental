import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Settings,
  Users,
  Globe,
  Zap,
  Clock,
  Plane,
  Percent,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const aboutRelaxed = "/assets/about-relaxed.jpg";
import Link from "next/link";
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
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[60vh]">
            {/* Left Content */}
            <div>
              <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
                WELCOME TO YU CAR RENTAL
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[0.9] mt-4 mb-6">
                DRIVE
                <br />
                <span
                  className="font-display italic"
                  style={{
                    WebkitTextStroke: "2px hsl(193, 30%, 25%)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  INTO
                </span>
                <br />
                FREEDOM
              </h1>
            </div>

            {/* Right Content */}
            <div className="relative flex flex-col justify-center">
              {/* Large YU watermark */}
              <div className="absolute -top-10 -right-10 text-[200px] font-display italic text-muted/30 select-none pointer-events-none z-0 opacity-20">
                yu
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6 relative z-10">
                Your trusted partner for worry-free transportation on the
                beautiful island of Bonaire. Effortless driving starts at YU —
                smooth, reliable, unforgettable.
              </p>
              <Link href="/booking" className="relative z-10">
                <Button className=" px-8 py-6 group" variant={"ghost"}>
                  EXPLORE OUR FLEET
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-[hsl(var(--primary))] text-primary-foreground py-4 overflow-hidden">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-semibold tracking-widest flex items-center gap-3"
            >
              <span className="text-primary-foreground/50">✦</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* Mobility as Relaxed Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3">
              <Image
                src={aboutRelaxed}
                alt="Relaxed mobility"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <div>
                  <div className="text-xs font-bold">5+ YEARS</div>
                  <div className="text-[10px] opacity-70">ON THE ROAD</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
                MOBILITY AS{" "}
                <span
                  className="font-display italic"
                  style={{
                    WebkitTextStroke: "2px hsl(193, 30%, 25%)",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  RELAXED
                </span>
                <br />
                AS YOUR VACATION.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We understand exactly what you need to experience: fun, beauty,
                and leisure. Travelers are welcome and offered an easy,
                comfortable and special car fleet with a heartfelt welcome. You
                can simply leave it to us — relaxed, smooth and stress-free.
              </p>
              <p className="text-xs text-muted-foreground italic mb-6">
                Our Mission: To give you the best experience from the moment you
                land until the moment you leave.
              </p>
              <Link
                href="/booking"
                className="text-sm font-semibold text-primary hover:underline flex items-center gap-2"
              >
                BOOK YOUR ADVENTURE <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] text-muted-foreground">
              STANDARD OF EXCELLENCE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
              OUR{" "}
              <span
                className="font-display italic"
                style={{
                  WebkitTextStroke: "2px hsl(193, 30%, 25%)",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                COMMITMENT
              </span>
              <br />
              TO YOU
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border"
              >
                <item.icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="text-lg font-display font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-primary hover:underline mt-4 inline-block"
                >
                  LEARN MORE →
                </Link>
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
