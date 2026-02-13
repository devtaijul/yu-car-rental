import Link from "next/link";
import { DividerText } from "./DividerText";
import { TextStroke } from "./TextStroke";

export const AboutHero = () => {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-8 md:pt-16">
      <div className="min-h-[60vh] relative">
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
        <div className="absolute right-0 rotate-90 top-[50%] opacity-80 font-bold tracking-[0.3rem] text-primary">
          PREMIUM ISLAND MOBILITY
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[50vh] gap-8 items-end h-full  ">
          {/* Left Content */}
          <div>
            <span className="text-xs md:text-base tracking-[0.2em] text-dark-text font-medium">
              WELCOME TO YU CAR RENTAL
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-foreground leading-[0.9] mt-4 mb-6">
              DRIVE
              <br />
              <TextStroke>INTO</TextStroke>
              <br />
              <span className="font-extralight italic text-primary">
                FREEDOM
              </span>
            </h1>
          </div>

          {/* Right Content */}
          <div className="relative flex flex-col justify-center pb-10">
            {/* Large YU watermark */}
            <div className="absolute -top-10 -right-10 text-[200px] font-display italic text-muted/30 select-none pointer-events-none z-0 opacity-20">
              yu
            </div>
            <p className="text-sm lg:text-lg text-dark-text max-w-xl leading-relaxed mb-6 relative z-10 whitespace-pre-line">
              Your trusted partner for worry-free <br />
              transportation on the beautiful island of <br />
              Bonaire. Simplicity, clarity and a warm <br />
              welcome.
            </p>
            <Link href="/booking" className="relative z-10">
              <DividerText
                text="EXPLORE OUR PROMISE"
                side="left"
                borderClassName="border-primary"
                className="font-bold"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
