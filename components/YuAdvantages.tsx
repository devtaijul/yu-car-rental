import Image from "next/image";
import React from "react";
import { TextStroke } from "./TextStroke";
import { Locale } from "@/types/utils";
import { getServices } from "@/data/services";
import {
  LucideIcon,
  Shield,
  Clock,
  Car,
  Percent,
  Sparkles,
  Plane,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Car,
  Clock,
  Shield,
  Percent,
  Plane,
};

export const YuAdvantages = ({ lang }: { lang: Locale }) => {
  const services = getServices(lang);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-muted-foreground">
            WHY CHOOSE US
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mt-3">
            THE{" "}
            <Image
              src={"/assets/YU.png"}
              alt="Relaxed mobility"
              className="max-w-36 inline-block"
              width={800}
              height={500}
            />
          </h2>
          <TextStroke
            className="text-5xl md:text-6xl lg:text-7xl font-bold italic"
            strokeWidth="1px"
          >
            ADVANTAGE.
          </TextStroke>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((item, idx) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={idx}
                className="bg-primary/10 text-primary hover:text-white border border-primary/30 min-h-80  p-12 relative overflow-hidden group hover:bg-primary transition-shadow"
              >
                <span className="text-4xl lg:text-6xl  font-bold opacity-20">
                  {
                    // need prefix zero before number if single one .
                    idx < 9 ? `0${idx + 1}` : `${idx + 1}`
                  }
                </span>
                <div className="pt-10">
                  <h3 className="text-2xl font-bold font-roboto tracking-wider mb-2 text-[#0F172A] group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className=" leading-relaxed text-[#64748B] group-hover:text-[#BFD1D7]">
                    {item.description}
                  </p>
                </div>
                <IconComponent className="h-15 w-15 opacity-10 absolute bottom-4 right-4" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
