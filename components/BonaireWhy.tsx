"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TextStroke } from "./TextStroke";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

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

export const BonaireWhy = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
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

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent>
            {whyNeedCarItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="group p-1">
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex w-14 h-14 bg-primary text-white hover:bg-primary/80 opacity-50 left-5 top-[40%] hover:opacity-100" />
          <CarouselNext className="hidden md:flex w-14 h-14 bg-primary text-white hover:bg-primary/80 opacity-50 right-5 top-[40%] hover:opacity-100" />
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {whyNeedCarItems.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
