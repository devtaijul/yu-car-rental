import React from "react";
import BookingSearch from "./BookingSearch";
import { Locale } from "@/types/utils";
import { getDictionary } from "@/app/[lang]/dictionaries/dictionaries";

export const HeroSection = async ({ lang }: { lang: Locale }) => {
  const dict = await getDictionary(lang);
  return (
    <section className="relative min-h-[98vh] flex flex-col justify-center pt-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${"/assets/hero-bg-black-car.png"})` }}
      >
        {/*  <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/40 to-background/80" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 flex flex-col justify-center items-center text-center py-20">
        <p className="font-bold  mb-4 text-white whitespace-pre-line flex items-center font-roboto">
          <hr className="border-b[0.5px] w-12 border-[#BFD1D7]" />
          <span className="mx-4">
            {dict.home.hero.welcome}
          </span>
         <hr className="border-b[0.5px] w-12 border-[#BFD1D7]" />
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display mb-2">
          <span className="text-white whitespace-pre-line">
            {dict.home.hero.titleMain}
          </span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-8xl font-display italic text-[#BFD1D7] mb-6 font-extralight whitespace-pre-line">
          {dict.home.hero.titleAccent}
        </h2>
        <p className="mb-10 max-w-md px-1 text-base leading-7 whitespace-normal text-[#EAF0F2] tracking-wide sm:max-w-xl sm:px-0 sm:text-center md:mb-12 md:text-xl md:leading-9 md:tracking-widest md:whitespace-pre-line">
          {dict.home.hero.description}
        </p>

        {/* Booking Search */}
        <div className="w-full max-w-7xl">
          <BookingSearch />
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 bg-[#2B6174] py-12">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <p className="text-primary-foreground italic text-lg md:text-2xl lg:text-3xl font-poppins font-light">
            {'"'}
            {dict.home.hero.quote} {'"'}
          </p>
        </div>
      </div>
    </section>
  );
};
