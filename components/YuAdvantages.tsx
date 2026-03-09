import Image from "next/image";
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
    <section className="bg-background py-14 sm:py-16 md:py-20 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-[0.12em] text-primary sm:tracking-[0.16em] md:text-base md:tracking-[0.2em]">
            WHY CHOOSE US
          </span>
          <h2 className="mt-3 text-3xl font-display font-extrabold sm:text-4xl md:text-6xl lg:text-7xl">
            THE{" "}
            <Image
              src={"/assets/YU.png"}
              alt="Relaxed mobility"
              className="inline-block w-20 align-baseline sm:w-24 md:w-32 lg:max-w-36"
              width={800}
              height={500}
            />
          </h2>
          <TextStroke
            className="text-4xl font-bold italic sm:text-5xl md:text-6xl lg:text-7xl"
            strokeWidth="1px"
          >
            ADVANTAGE.
          </TextStroke>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 md:gap-2 lg:grid-cols-3 lg:gap-1">
          {services.map((item, idx) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={idx}
                className="group relative min-h-72 overflow-hidden border border-primary/30 bg-primary/10 p-5 text-primary transition-shadow hover:bg-primary hover:text-white sm:min-h-76 sm:p-7 md:min-h-80 md:p-9 lg:min-h-80 lg:p-12"
              >
                <span className="text-3xl font-bold opacity-20 sm:text-4xl lg:text-6xl">
                  {
                    // need prefix zero before number if single one .
                    idx < 9 ? `0${idx + 1}` : `${idx + 1}`
                  }
                </span>
                <div className="pt-6 sm:pt-8 lg:pt-10">
                  <h3 className="mb-2 font-roboto text-xl font-bold tracking-wide text-[#0F172A] group-hover:text-white sm:text-2xl lg:tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#64748B] group-hover:text-[#BFD1D7] sm:text-base">
                    {item.description}
                  </p>
                </div>
                <IconComponent className="absolute bottom-3 right-3 h-12 w-12 opacity-10 sm:bottom-4 sm:right-4 sm:h-14 sm:w-14 lg:h-15 lg:w-15" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
