import React from "react";
import BookingSearch from "./BookingSearch";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[98vh] flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${"/assets/hero-bg-black-car.png"})` }}
      >
        {/*  <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/40 to-background/80" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 flex flex-col justify-center items-center text-center py-20">
        <p className="font-bold  mb-4 text-white">
          Welcome To Yu Car Rental <br /> Powered By The Woria
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display mb-2">
          <span className="text-white ">Unlocking Luxury</span>
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-8xl font-display italic text-[#BFD1D7] mb-6 font-extralight">
          Driving Experiences
        </h2>
        <p className="max-w-md text-white mb-12  text-base md:text-xl leading-9">
          Premium fleet. Zero hidden fees. 100% Coverage. Drive Into Adventure
          with your trusted partner Yu Car Rental. Enjoy & Drive Safe.
        </p>

        {/* Booking Search */}
        <div className="w-full max-w-4xl">
          <BookingSearch />
        </div>
      </div>

      {/* Quote */}
      <div className="relative z-10 bg-[#2B6174] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground italic text-sm md:text-base font-poppins">
            &quot;Skip the long lines and waiting, avoid extra surprise charges
            and <br />
            penalties for tiny dents, enjoy worry-free and just simple car
            rental!&quot;
          </p>
        </div>
      </div>
    </section>
  );
};
