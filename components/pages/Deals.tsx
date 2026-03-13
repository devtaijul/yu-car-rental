import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Car, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderSpace } from "../HeaderSpace";
import { TextStroke } from "../TextStroke";
import { Icons } from "../icons";
import { PAGES } from "@/config/pages.config";

const discountDetails: {
  id: number;
  parcent: number;
  text: string;
}[] = [
  {
    id: 1,
    parcent: 3,
    text: "FOR RENTAL PERIODS \n OF 7 DAYS OR LESS",
  },
  {
    id: 2,
    parcent: 6,
    text: "FOR RENTAL PERIODS \n OF 8 DAYS OR MORE",
  },
  {
    id: 3,
    parcent: 12,
    text: "FOR RENTAL PERIODS \n OF 15 DAYS OR MORE",
  },
];

const Deals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />

      {/* Deal 01 - Self Service */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start gap-10 md:gap-12 lg:flex-row">
            {/* Left Content */}
            <div className="w-full flex-1">
              {/* Badge */}
              <span className="text-xs md:text-base font-bold tracking-[0.15em] text-primary uppercase">
                Deal 01 — Exclusive Benefits
              </span>

              {/* Title */}
              <div className="mt-4 mb-8 leading-14">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                  SELF-SERVICE
                </h1>
                <TextStroke
                  strokeWidth="1px"
                  className="font-bold text-4xl md:text-5xl lg:text-6xl leading-20"
                >
                  24/7
                </TextStroke>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground lg:text-6xl">
                  EXCLUSIVE
                  <br />
                  ONLINE
                </h1>
              </div>

              <p className="text-dark-text mb-8 text-lg md:text-xl max-w-xl">
                Experience the freedom of top-level travel with our self-service
                option. Online booking is specially designed for guests who
                value comfort, flexibility and time savings.
              </p>

              {/* Discount Card */}
              <div className="mb-8 border-l-4 border-primary p-4 sm:p-6 md:p-8 lg:border-l-6 lg:p-15">
                <h3 className="mb-6 text-xl font-bold uppercase tracking-[0.12em] text-foreground sm:text-2xl lg:tracking-widest">
                  Book Online and Start Receiving
                  <br />
                  Incredible Discount
                </h3>

                <div className="grid grid-cols-1 gap-6 pb-8 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-4 lg:pb-10">
                  {discountDetails.map(({ id, parcent, text }) => (
                    <div key={id} className="min-w-0">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-extrabold text-primary md:text-5xl lg:text-6xl">
                          {parcent}%
                        </span>
                        <span className="ml-1 text-sm font-bold uppercase text-[#94A3B8] sm:text-base lg:text-lg">
                          Discount
                        </span>
                      </div>
                      <div className="mt-3 whitespace-pre-line text-xs font-semibold uppercase tracking-wide text-[#64748B] sm:text-sm">
                        {text}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Benefits */}
                <div className="h-0.5 w-full bg-gray-200 lg:max-w-[80%]"></div>
                <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-6">
                  <div className="flex items-start gap-2">
                    <Icons
                      name="calender_icon"
                      className="w-6 h-6 text-primary"
                    />
                    <span className="text-xs font-extrabold uppercase tracking-wide text-primary sm:text-sm md:text-base lg:text-lg">
                      Valid All Year Round
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icons
                      name="sheild_icon"
                      className="w-6 h-6 text-primary"
                    />
                    <span className="text-xs font-extrabold uppercase tracking-wide text-primary sm:text-sm md:text-base lg:text-lg">
                      No High/Low Season Exceptions
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative w-full lg:w-auto">
              <div className=" overflow-hidden shadow-2xl">
                <Image
                  src="/assets/driving-hand.png"
                  alt="Hands on steering wheel"
                  className="aspect-3/4 h-auto w-full max-w-full object-cover grayscale sm:max-w-md md:max-w-lg lg:max-w-125"
                  width={500}
                  height={800}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 sm:p-6">
                  <h4 className="text-xs font-bold tracking-[0.15em] text-white uppercase mb-1">
                    Fast, Easy, Worry-Free
                  </h4>
                  <p className="text-xs text-white sm:text-sm">
                    After completing your online reservation, you&apos;ll
                    receive a personalized booking confirmation by email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal 02 - Airport Pickup */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Badge */}
          <span className="text-xs md:text-base font-bold tracking-[0.15em] text-primary uppercase">
            Deal 02 — Airport Pickup
          </span>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-6">
            {/* Left Content */}
            <div>
              {/* Title */}
              <div className="mb-8">
                <TextStroke
                  strokeWidth="1px"
                  className="italic font-bold text-4xl md:text-5xl lg:text-6xl"
                >
                  FREEDOM
                </TextStroke>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-roboto font-black text-dark-text">
                  AROUND
                  <br />
                  THE CLOCK
                </h1>
              </div>

              <p className="text-dark-text mb-8 max-w-lg text-sm md:text-base lg:text-lg">
                Choose our self-service option and collect your vehicle without
                any waiting — 24 hours a day, completely contactless. Whether
                you arrive early or late at night, your car will be ready.
              </p>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-15 h-15  bg-primary flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-black uppercase text-sm lg:text-xl">
                      Direct Airport Delivery
                    </h4>
                    <p className="text-sm text-dark-text font-roboto lg:text-lg italic  mt-1 max-w-lg">
                      Upon arrival at the airport, your rental car will be
                      waiting in the airport parking lot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-15 h-15 bg-primary flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-black uppercase text-sm lg:text-xl">
                      Simple Drive-Off
                    </h4>
                    <p className="text-sm text-dark-text font-roboto lg:text-lg  italic mt-1 max-w-lg">
                      You can simply get in and drive off. No paperwork at the
                      counter required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Instructions Card */}
            <div className="bg-primary/10  p-12">
              <h4 className="text-sm md:text-base lg:text-lg font-bold tracking-[0.15em] text-primary uppercase mb-6">
                Instructions
              </h4>
              <p className="text-black mb-8 text-base md:text-lg lg:text-xl">
                All instructions and exact details on how this service works
                will be provided upon completing your reservation.
              </p>

              <p className="text-xl md:text-2xl lg:text-3xl font-display  text-foreground mb-6">
                We ensure everything is perfectly prepared for your arrival.
                From the moment you land, your journey begins in style.
              </p>

              <p className="text-xs md:text-base font-semibold tracking-widest text-primary uppercase mb-8">
                We Handle the Details — You Enjoy the Experience.
              </p>

              <Link href={PAGES.RESERVE_A_CAR.ROOT}>
                <Button className="bg-primary text-white hover:opacity-90 px-8 py-3 h-auto font-semibold uppercase tracking-wide">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Deals;
