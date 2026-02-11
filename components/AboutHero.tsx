import React from "react";
import { TextStroke } from "./TextStroke";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const AboutHero = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-16">
      <div className="min-h-[50vh] relative">
        <div
          className="absolute w-full h-full top-0 left-0  bg-cover bg-center"
          style={{
            backgroundImage: `url(${"/assets/YU.png"})`,
            backgroundPosition: "center center",
            objectPosition: "center center",
            backgroundSize: "contain",
            opacity: 0.1,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="absolute right-0 rotate-90 top-[50%] font-bold tracking-[0.3rem] text-primary">
          PREMIUM ISLAND MOBILITY
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[40vh] gap-8 items-end h-full  ">
          {/* Left Content */}
          <div>
            <span className="text-xs tracking-[0.2em] text-muted-foreground font-medium">
              WELCOME TO YU CAR RENTAL
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[0.9] mt-4 mb-6">
              DRIVE
              <br />
              <TextStroke>INTO</TextStroke>
              <br />
              FREEDOM
            </h1>
          </div>

          {/* Right Content */}
          <div className="relative flex flex-col justify-center pb-10">
            {/* Large YU watermark */}
            <div className="absolute -top-10 -right-10 text-[200px] font-display italic text-muted/30 select-none pointer-events-none z-0 opacity-20">
              yu
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6 relative z-10">
              Your trusted partner for worry-free transportation on the
              beautiful island of Bonaire. Effortless driving starts at YU —
              smooth, reliable, unforgettable.
            </p>
            <Link href="/booking" className="relative z-10">
              <span className="flex items-center">
                EXPLORE OUR FLEET
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
