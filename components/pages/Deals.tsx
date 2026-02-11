import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Car, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderSpace } from "../HeaderSpace";
import { TextStroke } from "../TextStroke";

const Deals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />

      {/* Deal 01 - Self Service */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Left Content */}
            <div className="flex-1">
              {/* Badge */}
              <span className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
                Deal 01 — Exclusive Benefits
              </span>

              {/* Title */}
              <div className="mt-4 mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground">
                  SELF-SERVICE
                </h1>
                <TextStroke
                  strokeWidth="1px"
                  className="italic font-bold text-4xl md:text-5xl lg:text-6xl "
                >
                  24/7
                </TextStroke>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  EXCLUSIVE
                  <br />
                  ONLINE
                </h1>
              </div>

              <p className="text-muted-foreground mb-8 max-w-md">
                Experience the freedom of top-level travel with our self-service
                option. Online booking is specially designed for guests who
                value comfort, flexibility and time savings.
              </p>

              {/* Discount Card */}
              <div className="border-l-4 border-primary pl-6 py-4 mb-8">
                <h3 className="text-sm font-bold tracking-widest text-foreground uppercase mb-6">
                  Book Online and Start Receiving
                  <br />
                  Incredible Discount
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        3%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1 uppercase">
                        Discount
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                      For Rental Periods
                      <br />
                      of 7 Days or Less
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        6%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1 uppercase">
                        Discount
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                      For Rental Periods
                      <br />
                      of 8 Days or More
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        12%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1 uppercase">
                        Discount
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                      For Rental Periods
                      <br />
                      of 15 Days or More
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide text-primary">
                    Valid All Year Round
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide text-primary">
                    No High/Low Season Exceptions
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative ">
              <div className=" overflow-hidden shadow-2xl">
                <Image
                  src="/assets/driving-hand.png"
                  alt="Hands on steering wheel"
                  className="w-full max-w-[500px] h-auto object-cover aspect-3/4   grayscale"
                  width={500}
                  height={800}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-xs font-bold tracking-[0.15em] text-white/70 uppercase mb-1">
                    Fast, Easy, Worry-Free
                  </h4>
                  <p className="text-sm text-white/60">
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
          <span className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
            Deal 02 — Airport Pickup
          </span>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-6">
            {/* Left Content */}
            <div>
              {/* Title */}
              <div className="mb-8">
                <TextStroke
                  strokeWidth="1px"
                  className="italic font-bold text-4xl md:text-5xl "
                >
                  FREEDOM
                </TextStroke>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  AROUND
                  <br />
                  THE CLOCK
                </h1>
              </div>

              <p className="text-muted-foreground mb-8 max-w-md">
                Choose our self-service option and collect your vehicle without
                any waiting — 24 hours a day, completely contactless. Whether
                you arrive early or late at night, your car will be ready.
              </p>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10  bg-primary flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground uppercase text-sm">
                      Direct Airport Delivery
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upon arrival at the airport, your rental car will be
                      waiting in the airport parking lot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground uppercase text-sm">
                      Simple Drive-Off
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You can simply get in and drive off. No paperwork at the
                      counter required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Instructions Card */}
            <div className="bg-primary/10  p-12">
              <h4 className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-6">
                Instructions
              </h4>
              <p className="text-black mb-8">
                All instructions and exact details on how this service works
                will be provided upon completing your reservation.
              </p>

              <p className="text-lg md:text-xl font-display  text-foreground mb-6">
                We ensure everything is perfectly prepared for your arrival.
                From the moment you land, your journey begins in style.
              </p>

              <p className="text-xs font-bold tracking-widest text-primary uppercase mb-8">
                We Handle the Details — You Enjoy the Experience.
              </p>

              <Link href="/booking">
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
