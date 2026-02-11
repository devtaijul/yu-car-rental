"use client";

import React from "react";
import Image from "next/image";
import { TextStroke } from "./TextStroke";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
            IN{" "}
            <TextStroke strokeWidth="1px" className="font-bold italic">
              BONAIRE.
            </TextStroke>
          </h2>
        </div>

        {/* Carousel */}
        <Carousel
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
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
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

          {/* Navigation Arrows */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
