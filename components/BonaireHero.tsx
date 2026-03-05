"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Header from "./Header";
import { HeaderSpace } from "./HeaderSpace";

const carouselImages = [
  { id: 1, src: "/bonaire/bonaire-1.png", alt: "Sunset view" },
  { id: 2, src: "/bonaire/bonaire-2.png", alt: "Flamingos at lagoon" },
  { id: 3, src: "/bonaire/bonaire-3.png", alt: "Lighthouse" },
  { id: 4, src: "/bonaire/bonaire-4.png", alt: "Beach paradise" },
  { id: 5, src: "/bonaire/bonaire-5.png", alt: "Diving" },
  { id: 6, src: "/bonaire/bonaire-6.png", alt: "Island driving" },
  { id: 7, src: "/bonaire/bonaire-7.png", alt: "Sunset view" },
  { id: 8, src: "/bonaire/bonaire-8.png", alt: "Flamingos at lagoon" },
  { id: 9, src: "/bonaire/bonaire-9.png", alt: "Lighthouse" },
  { id: 10, src: "/bonaire/bonaire-10.png", alt: "Beach paradise" },
  { id: 11, src: "/bonaire/bonaire-11.png", alt: "Diving" },
  { id: 12, src: "/bonaire/bonaire-12.png", alt: "Island driving" },
  { id: 13, src: "/bonaire/bonaire-13.png", alt: "Sunset view" },
  { id: 14, src: "/bonaire/bonaire-14.png", alt: "Flamingos at lagoon" },
  { id: 15, src: "/bonaire/bonaire-15.png", alt: "Lighthouse" },
];

export const BonaireHero = () => {
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

    requestAnimationFrame(() => onSelect());

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
    const timeout = setTimeout(() => {
      setBgOpacity(0);

      setTimeout(() => {
        setDisplayedBg(activeImage);
        setBgOpacity(1);
      }, 400);
    }, 0);

    return () => clearTimeout(timeout);
  }, [activeImage]);
  return (
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
        <HeaderSpace />
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
          <Button className="bg-primary text-white px-10 py-6 text-base font-semibold group">
            EXPLORE FLEET
            <ArrowRight className="h-4 w-4  group-hover:translate-x-1 transition-transform" />
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
  );
};
