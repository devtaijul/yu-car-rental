"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Car,
  Percent,
  Sparkles,
  Plane,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

// Map of icon names to icon components
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Car,
  Clock,
  Shield,
  Percent,
  Plane,
};

export const BonaireWhyCarousel = ({
  services,
}: {
  services: {
    image: string;
    category: string;
    title: string;
    description: string;
  }[];
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Use ref to avoid setting state in the resize event handler
  const resizeTimeoutRef = useRef<NodeJS.Timeout>(null);

  // Detect screen size and set slides to scroll
  useEffect(() => {
    const updateSlidesToScroll = () => {
      if (window.innerWidth < 768) {
        setSlidesToScroll(1); // Mobile: 1
      } else if (window.innerWidth < 1024) {
        setSlidesToScroll(2); // Tablet: 2
      } else {
        setSlidesToScroll(3); // Desktop: 3
      }
    };

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(updateSlidesToScroll, 150);
    };

    updateSlidesToScroll();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: slidesToScroll,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Initialize state when emblaApi is available
  useEffect(() => {
    if (!emblaApi) return;

    // Use setTimeout to avoid synchronous state update
    const initState = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Schedule initialization for next tick
    const timeoutId = setTimeout(initState, 0);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      clearTimeout(timeoutId);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Re-init carousel when slidesToScroll changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        align: "start",
        loop: true,
        slidesToScroll: slidesToScroll,
      });
    }
  }, [emblaApi, slidesToScroll]);

  return (
    <section className="py-20 bg-[#BFD1D780]">
      <div className="container mx-auto px-4">
        {/* Header */}

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {services?.length > 0 &&
              services.map((service, index) => {
                return (
                  <div key={index} className="group">
                    <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4">
                      <Image
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={500}
                        height={500}
                      />
                    </div>
                    <span className="text-xs tracking-[0.15em] text-primary font-medium">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-display font-bold mt-1 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-start justify-between mb-10">
          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="rounded-none border-border  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-none border-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
