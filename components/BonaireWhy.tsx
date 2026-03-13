"use client";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { whyNeedCar } from "@/data/services";
import { Locale } from "@/types/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type WhyItem = ReturnType<typeof whyNeedCar>[number];

const DESCRIPTION_WORD_LIMIT = 24;

const truncateDescription = (text: string, limit: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) {
    return { text, truncated: false };
  }
  return {
    text: `${words.slice(0, limit).join(" ")}...`,
    truncated: true,
  };
};

export const BonaireWhy = ({ lang }: { lang: Locale }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [activeItem, setActiveItem] = useState<WhyItem | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const items = whyNeedCar(lang);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");

    const update = () => setIsDesktop(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    const frame = requestAnimationFrame(updateCurrent);
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      cancelAnimationFrame(frame);
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  const desktopDotsCount =
    snapCount > 0 ? snapCount : Math.max(1, Math.ceil(items.length / 3));
  const dotsCount = isDesktop ? desktopDotsCount : items.length;
  const activeDotIndex = isDesktop ? Math.min(dotsCount - 1, current) : current;
  const maxSnapIndex =
    snapCount > 0 ? snapCount - 1 : Math.max(0, dotsCount - 1);

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
            loop: false,
            containScroll: "trimSnaps",
            slidesToScroll: isDesktop ? 3 : "auto",
          }}
          className="relative"
        >
          <CarouselContent>
            {items.map((item, index) => {
              const preview = truncateDescription(
                item.description,
                DESCRIPTION_WORD_LIMIT,
              );
              return (
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
                      {preview.text}
                      {preview.truncated && (
                        <>
                          {" "}
                          <button
                            type="button"
                            onClick={() => setActiveItem(item)}
                            className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
                          >
                            See more
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex w-14 h-14 bg-primary text-white hover:bg-primary/80 opacity-50 left-5 top-[40%] hover:opacity-100" />
          <CarouselNext className="hidden md:flex w-14 h-14 bg-primary text-white hover:bg-primary/80 opacity-50 right-5 top-[40%] hover:opacity-100" />
        </Carousel>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: dotsCount }).map((_, index) => (
            <button
              key={index}
              onClick={() =>
                api?.scrollTo(isDesktop ? Math.min(maxSnapIndex, index) : index)
              }
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeDotIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={!!activeItem}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
      >
        <DialogContent className="left-1/2 top-1/2 bottom-auto right-auto w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-0 p-5 sm:p-6 md:p-8 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=closed]:animate-out">
          {activeItem && (
            <div className="space-y-4">
              <div className="max-h-[75vh] overflow-y-auto pr-2">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <DialogHeader className="mt-4 text-left">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">
                    {activeItem.category}
                  </span>
                  <DialogTitle className="text-2xl font-display font-bold">
                    {activeItem.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    {activeItem.description}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
