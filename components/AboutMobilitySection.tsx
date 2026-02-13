import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const aboutRelaxed = "/assets/mobility-bg.png";

export const AboutMobilitySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className=" overflow-hidden">
            <Image
              src={aboutRelaxed}
              alt="Relaxed mobility"
              className="max-w-136.25 max-h-181.75"
              width={1000}
              height={1500}
            />
            {/*  <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground rounded-xl px-4 py-3 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <div>
                <div className="text-xs font-bold">5+ YEARS</div>
                <div className="text-[10px] opacity-70">ON THE ROAD</div>
              </div>
            </div> */}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl  lg:text-6xl font-display font-bold mb-4 leading-tight">
              MOBILITY AS <span className="text-primary">RELAXED</span>
              <br />
              AS YOUR VACATION.
            </h2>
            <div className="grid  md:grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-dark-text md:text-base leading-relaxed mb-4">
                  We understand exactly what you want to <br /> experience —
                  because we’ve been travelers ourselves, exploring countries
                  around the world. We know the crave for simplicity and
                  reliability when arriving in a new place.
                </p>
                <p className="text-black font-bold">
                  Our Mission: To give you the best experience from the moment
                  you land until the moment you leave.
                </p>
              </div>
              <div>
                <p className="text-sm text-dark-text md:text-base  leading-relaxed mb-4">
                  At YU CAR RENTAL, we believe in freedom, comfort and good
                  service. Everything revolves around ease, trust, and a
                  heartfelt welcome. Your journey begins in style — relaxed,
                  smooth and stress-free.
                </p>
                <Link
                  href="/booking"
                  className="text-sm font-semibold text-primary hover:underline flex tracking-widest items-center gap-2"
                >
                  BOOK YOUR ADVENTURE <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
