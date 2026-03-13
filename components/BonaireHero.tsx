"use client";

import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Header from "./Header";
import { HeaderSpace } from "./HeaderSpace";
import { whyNeedCar } from "@/data/services";
import { Locale } from "@/types/utils";

const heroFallbackSlides = [
  {
    id: "hero-fallback",
    image: "/assets/bonaire-hero-sunset.jpg",
    category: "SCENIC ROUTES",
    title: "ALPINE DRIVE.",
    description:
      "Conquer the mountain passes with unmatched power and comfort. Every turn brings a new breathtaking view.",
  },
];

const DESCRIPTION_WORD_LIMIT = 24;

const truncateWords = (text: string, limit: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return `${words.slice(0, limit).join(" ")}...`;
};

export const BonaireHero = ({ lang }: { lang: Locale }) => {
  const slides = whyNeedCar(lang) ?? heroFallbackSlides;
  const initialImage = slides[0]?.image || heroFallbackSlides[0].image;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(initialImage);
  const [prevImage, setPrevImage] = useState(initialImage);
  const [fadeKey, setFadeKey] = useState(0);
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    watchDrag: true,
  });
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    watchDrag: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApiMobile?.scrollPrev();
    emblaApiDesktop?.scrollPrev();
  }, [emblaApiMobile, emblaApiDesktop]);

  const scrollNext = useCallback(() => {
    emblaApiMobile?.scrollNext();
    emblaApiDesktop?.scrollNext();
  }, [emblaApiMobile, emblaApiDesktop]);

  const syncToIndex = useCallback(
    (index: number, source: "mobile" | "desktop") => {
      const next = slides[index]?.image || heroFallbackSlides[0].image;
      if (next !== activeImage) {
        setPrevImage(activeImage);
        setActiveImage(next);
        setFadeKey((key) => key + 1);
      }
      setCurrentIndex(index);
      if (
        source !== "mobile" &&
        emblaApiMobile &&
        emblaApiMobile.selectedScrollSnap() !== index
      ) {
        emblaApiMobile.scrollTo(index);
      }
      if (
        source !== "desktop" &&
        emblaApiDesktop &&
        emblaApiDesktop.selectedScrollSnap() !== index
      ) {
        emblaApiDesktop.scrollTo(index);
      }
    },
    [activeImage, emblaApiDesktop, emblaApiMobile, slides],
  );

  const onSelectMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    syncToIndex(emblaApiMobile.selectedScrollSnap(), "mobile");
  }, [emblaApiMobile, syncToIndex]);

  const onSelectDesktop = useCallback(() => {
    if (!emblaApiDesktop) return;
    syncToIndex(emblaApiDesktop.selectedScrollSnap(), "desktop");
  }, [emblaApiDesktop, syncToIndex]);

  useEffect(() => {
    if (!emblaApiMobile) return;

    requestAnimationFrame(() => onSelectMobile());

    emblaApiMobile.on("select", onSelectMobile);
    emblaApiMobile.on("reInit", onSelectMobile);

    return () => {
      emblaApiMobile.off("select", onSelectMobile);
      emblaApiMobile.off("reInit", onSelectMobile);
    };
  }, [emblaApiMobile, onSelectMobile]);

  useEffect(() => {
    if (!emblaApiDesktop) return;

    requestAnimationFrame(() => onSelectDesktop());

    emblaApiDesktop.on("select", onSelectDesktop);
    emblaApiDesktop.on("reInit", onSelectDesktop);

    return () => {
      emblaApiDesktop.off("select", onSelectDesktop);
      emblaApiDesktop.off("reInit", onSelectDesktop);
    };
  }, [emblaApiDesktop, onSelectDesktop]);

  const totalSlides = slides.length;
  const activeSlide = slides[currentIndex] ?? slides[0] ?? heroFallbackSlides[0];
  const heroCategory = activeSlide?.category || heroFallbackSlides[0].category;
  const heroTitle = activeSlide?.title || heroFallbackSlides[0].title;
  const heroDescription = truncateWords(
    activeSlide?.description || heroFallbackSlides[0].description,
    DESCRIPTION_WORD_LIMIT,
  );

  return (
    <div className="relative min-h-svh bg-cover bg-center bg-no-repeat lg:min-h-screen">
      {/* Fading background images */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${prevImage})`,
          }}
        />
        <div
          key={fadeKey}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-in fade-in-0 duration-1000 ease-out"
          style={{
            backgroundImage: `url(${activeImage})`,
          }}
        />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Header */}
      <div className="relative z-20">
        <Header />
        <HeaderSpace />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-56 pt-14 sm:pt-20 md:pt-24 lg:pb-48 lg:pt-32">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-0.5 bg-white/60" />
          <span className="text-xs font-medium tracking-[0.16em] text-white/80 sm:text-sm sm:tracking-[0.2em]">
            {heroCategory}
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-display font-bold leading-[0.9] text-white sm:text-5xl md:text-7xl lg:text-8xl">
          {heroTitle}
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-md text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
          {heroDescription}
        </p>

        {/* CTA Button */}
        <Link href={"/#explore-fleet"}>
          <Button className="group w-auto bg-primary px-6 py-4 text-sm font-semibold text-white sm:px-8 sm:py-5 sm:text-base md:px-10 md:py-6">
            EXPLORE FLEET
            <ArrowRight className="h-4 w-4  group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Bottom Carousel Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 pb-6 sm:pb-7 md:pb-8">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Navigation controls */}
            <div className="mb-4 flex items-center gap-4 md:mb-5">
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollPrev}
                className="h-10 w-10 rounded-full text-white hover:bg-white/20 md:h-11 md:w-11"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="text-center">
                <span className="text-2xl font-bold text-white md:text-3xl">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="block text-sm text-white/60 md:text-base">
                  /{String(totalSlides).padStart(2, "0")}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollNext}
                className="h-10 w-10 rounded-full text-white hover:bg-white/20 md:h-11 md:w-11"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Carousel */}
            <div
              className="w-full overflow-hidden touch-pan-y sm:max-w-xl md:max-w-2xl"
              ref={emblaRefMobile}
            >
              <div className="flex items-end gap-3 select-none">
                {slides.map((img, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={img.id}
                      className={`min-w-0 transition-all duration-500 ease-out ${
                        isActive
                          ? "flex-[0_0_30%] sm:flex-[0_0_40%] md:flex-[0_0_40%]"
                          : "flex-[0_0_20%] sm:flex-[0_0_28%] md:flex-[0_0_32%]"
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
                          src={img.image}
                          alt={img.title}
                          draggable={false}
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
          <div className="hidden lg:flex items-end gap-4">
            {/* Image thumbnails */}
            <div className="flex-1 overflow-hidden" ref={emblaRefDesktop}>
              <div className="flex gap-4 items-end select-none">
              {slides.map((img, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={img.id}
                    className={`relative shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out transform ${
                      isActive
                        ? "z-10 scale-[1.04] ring-2 ring-primary shadow-2xl"
                        : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
                    }`}
                    style={{
                      width: isActive ? "188px" : "160px",
                      height: isActive ? "128px" : "100px",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onClick={() => emblaApiDesktop?.scrollTo(index)}
                  >
                    <Image
                      src={img.image}
                      alt={img.title}
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
  );
};
