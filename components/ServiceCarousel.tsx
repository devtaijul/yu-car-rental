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

// Map of icon names to icon components
const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Car,
  Clock,
  Shield,
  Percent,
  Plane,
};

export const ServicesCarousel = ({
  services,
}: {
  services: {
    icon: string;
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
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="section-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Our Services
            </h2>
          </div>

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

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {services?.length > 0 &&
              services.map((service, index) => {
                const IconComponent = iconMap[service.icon];

                return (
                  <div
                    key={index}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] group lg:flex-[0_0_calc(33.333%-16px)] min-w-0 min-h-[380px]"
                  >
                    <div
                      className={`relative h-full  p-6 md:p-8 overflow-hidden transition-all duration-100 bg-card border border-border group-hover:bg-primary  group-hover:text-primary-foreground`}
                    >
                      {/* Background Number */}
                      <span
                        className={`absolute -top-4 -right-2 text-[120px] md:text-[140px] font-bold leading-none pointer-events-none select-none text-muted/50 group-hover:text-primary-foreground/10`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Content */}
                      <div className="relative z-10">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-muted group-hover:bg-primary/10 mb-6`}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`h-6 w-6 text-foreground group-hover:text-primary-foreground `}
                            />
                          )}
                        </div>

                        <h3
                          className={`text-lg md:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary-foreground`}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={`text-sm md:text-base leading-relaxed text-muted-foreground group-hover:text-primary-foreground/80`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
