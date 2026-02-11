"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Import images
import heroSunset from "@/assets/bonaire-hero-sunset.jpg";
import Image from "next/image";
import Link from "next/link";

const carouselImages = [
  { id: 1, src: "/assets/bonaire-hero-sunset.jpg", alt: "Sunset view" },
  { id: 2, src: "/assets/bonaire-flamingos.jpg", alt: "Flamingos at lagoon" },
  { id: 3, src: "/assets/bonaire-lighthouse.jpg", alt: "Lighthouse" },
  { id: 4, src: "/assets/bonaire-beach.jpg", alt: "Beach paradise" },
  { id: 5, src: "/assets/bonaire-diving.jpg", alt: "Diving" },
  { id: 6, src: "/assets/bonaire-diving.jpg", alt: "Island driving" },
];

const whyNeedCarItems = [
  {
    image: `/assets/bonaire-diving.jpg`,
    category: "SHORE DIVING",
    title: "DIVE ON YOUR TERMS",
    description:
      "Bonaire is the shore-diving capital of the world. Our packages come with custom dive racks, allowing you to drive directly to over 80 dive sites.",
  },
  {
    image: "/assets/bonaire-lighthouse.jpg",
    category: "NATIONAL PARK",
    title: "UNREACHABLE HEIGHTS",
    description:
      "Washington Slagbaai National Park requires high-clearance vehicles. Our Plazus fleet is fully compliant with park regulations for safety and access.",
  },
  {
    image: "/assets/bonaire-beach.jpg",
    category: "FREEDOM",
    title: "NO LIMITS, NO LAGS",
    description:
      "Public transport is minimal. Taxis are costly for daily trips. A rental car gives you the freedom to chase sunsets and hidden beaches at any hour.",
  },
];

const drivingLaws = [
  {
    title: "KEEP RIGHT",
    description:
      "We drive on the right. Priority is always given to traffic coming from the main road, as well as traffic coming from the right, unless otherwise indicated.",
  },
  {
    title: "SPEED LIMITS",
    description:
      "40 km/h in urban areas, 60 km/h on main connecting roads. Watch for wild donkeys.",
  },
  {
    title: "NO TRAFFIC LIGHTS",
    description:
      "Bonaire has no traffic lights. Intersections are managed by roundabouts or signs.",
  },
  {
    title: "FUEL POLICY",
    description:
      "Fuel stations are conveniently located. We provide vehicles with a full tank upon request.",
  },
];

const Bonaire = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const totalSlides = carouselImages.length;

  const activeImage =
    carouselImages[currentIndex]?.src || "/assets/bonaire-hero-sunset.jpg";
  const [displayedBg, setDisplayedBg] = useState(activeImage);
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    setBgOpacity(0);
    const timeout = setTimeout(() => {
      setDisplayedBg(activeImage);
      setBgOpacity(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [activeImage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen bg-cover bg-center bg-no-repeat">
        {/* Fading background images */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
          style={{ backgroundImage: `url(${displayedBg})`, opacity: bgOpacity }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Header */}
        <div className="relative z-20">
          <Header />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-32 pb-48">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-white/60" />
            <span className="text-sm tracking-[0.2em] text-white/80 font-medium">
              SCENIC ROUTES
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] mb-6">
            ALPINE
            <br />
            DRIVE.
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
            Conquer the mountain passes with unmatched power and comfort. Every
            turn brings a new breathtaking view.
          </p>

          {/* CTA Button */}
          <Link href="/booking">
            <Button className="gradient-teal text-primary-foreground rounded-lg px-8 py-6 text-base font-semibold group">
              EXPLORE FLEET
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Bottom Carousel Section */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 pb-8">
            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* Navigation controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollPrev}
                  className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-white/60 block">
                    /{String(totalSlides).padStart(2, "0")}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={scrollNext}
                  className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-3 items-end">
                  {carouselImages.map((img, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <div
                        key={img.id}
                        className={`min-w-0 transition-all duration-500 ease-out ${
                          isActive ? "flex-[0_0_55%]" : "flex-[0_0_40%]"
                        }`}
                      >
                        <div
                          className={`relative rounded-xl overflow-hidden transition-all duration-500 ease-out ${
                            isActive
                              ? "aspect-4/3 ring-2 ring-primary shadow-2xl"
                              : "aspect-4/3 opacity-70"
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              isActive ? "scale-100" : "scale-95"
                            }`}
                            width={500}
                            height={500}
                          />
                          <div
                            className={`absolute bottom-2 right-2 text-sm font-medium transition-all duration-300 ${
                              isActive ? "text-white" : "text-white/60"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          {/* Active indicator glow */}
                          {isActive && (
                            <div className="absolute inset-0 ring-2 ring-primary/50 rounded-xl animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-end gap-4">
              {/* Image thumbnails */}
              <div className="flex gap-4 flex-1 items-end">
                {carouselImages.slice(0, 5).map((img, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={img.id}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out transform ${
                        isActive
                          ? "ring-2 ring-primary scale-110 shadow-2xl z-10"
                          : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{
                        width: isActive ? "200px" : "160px",
                        height: isActive ? "140px" : "100px",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onClick={() => emblaApi?.scrollTo(index)}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isActive ? "scale-100" : "scale-100"
                        }`}
                        width={500}
                        height={500}
                      />
                      <div
                        className={`absolute bottom-2 right-2 text-sm font-semibold drop-shadow-lg transition-all duration-300 ${
                          isActive ? "text-white" : "text-white/70"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      {/* Active glow effect */}
                      {isActive && (
                        <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-3">
                <span className="text-2xl font-bold text-white">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/60">
                  /{String(totalSlides).padStart(2, "0")}
                </span>
                <div className="flex gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollPrev}
                    className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollNext}
                    className="text-white hover:bg-white/20 rounded-full h-8 w-8"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why You Need a Car Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.2em] text-primary font-medium">
              THE ESSENTIAL GUIDE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
              WHY YOU NEED A CAR
              <br />
              IN BONAIRE.
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyNeedCarItems.map((item, index) => (
              <div key={index} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={500}
                    height={500}
                  />
                </div>
                <span className="text-xs tracking-[0.15em] text-primary font-medium">
                  {item.category}
                </span>
                <h3 className="text-xl font-display font-bold mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driving Laws Section */}
      <section className="py-20 bg-[hsl(var(--primary))]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-primary-foreground">
              <span className="text-xs tracking-[0.2em] text-primary-foreground/70 font-medium">
                LOCAL KNOWLEDGE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-3 mb-8 leading-tight">
                DRIVING LAWS
                <br />
                ON THE ISLAND.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {drivingLaws.map((law, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-primary-foreground/70 mb-2">
                      {law.title}
                    </h4>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed">
                      {law.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={"/assets/bonaire-diving.jpg"}
                  alt="Driving in Bonaire"
                  className="w-full h-auto object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Key to Freedom CTA Section */}
      <section className="py-24 gradient-teal text-center">
        <div className="container mx-auto px-4">
          <span className="text-sm tracking-[0.2em] text-primary-foreground/70 font-medium">
            READY TO EXPLORE BONAIRE AT YOUR OWN PACE?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mt-4 mb-2">
            YOUR KEY TO
          </h2>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #4fd1c5, #38b2ac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(79, 209, 197, 0.3)",
            }}
          >
            FREEDOM.
          </h2>
          <p className="text-primary-foreground/80 text-sm max-w-xl mx-auto mb-8">
            IF YOU WANT TO LEARN MORE ABOUT OUR BEAUTIFUL ISLAND OF BONAIRE, YOU
            CAN SEARCH FOR MORE ACTIVITIES HERE:
          </p>
          <Link href="/booking">
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-lg px-8 py-6"
            >
              EXPLORE BONAIRE MORE
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Bonaire;
