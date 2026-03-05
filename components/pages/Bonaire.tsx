import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "@/components/WhatsAppButton";

// Import images
import Image from "next/image";
import Link from "next/link";
import { BonaireHero } from "../BonaireHero";
import { BonaireWhy } from "../BonaireWhy";
import { TextStroke } from "../TextStroke";

const drivingLaws = [
  {
    title: "KEEP RIGHT",
    description:
      "We drive on the right. Priority is always given to traffic coming from the main road, as well as traffic coming from the right, unless otherwise indicated.",
  },
  {
    title: "SPEED LIMITS",
    description:
      "40 km/h in urban areas, 60 km/h on main connecting roads. Watch for wild donkeys.",
  },
  {
    title: "NO TRAFFIC LIGHTS",
    description:
      "Bonaire has no traffic lights. Intersections are managed by roundabouts or signs.",
  },
  {
    title: "FUEL POLICY",
    description:
      "Fuel stations are conveniently located. We provide vehicles with a full tank upon request.",
  },
];

const Bonaire = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section with Background Image */}
      <BonaireHero />

      {/* Why You Need a Car Section */}
      <BonaireWhy />

      {/* Driving Laws Section */}
      <section className="py-20 bg-[#142D35]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-primary-foreground">
              <span className="text-xs md:text-base tracking-[0.2em] text-[#7CB7CA] font-medium">
                LOCAL KNOWLEDGE
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mt-3 mb-8 leading-tight">
                DRIVING LAWS
                <br />
                ON THE ISLAND.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {drivingLaws.map((law, index) => (
                  <div key={index}>
                    <h4 className="text-sm md:text-base font-semibold text-[#7CB7CA] mb-2 ">
                      {law.title}
                    </h4>
                    <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                      {law.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className=" flex items-center justify-center">
                <Image
                  src={"/assets/Bonaire Driving.png"}
                  alt="Driving in Bonaire"
                  className="w-full h-auto object-cover object-center"
                  width={900}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Key to Freedom CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
          <span className="text-sm md:text-base text-primary tracking-[0.3em]  font-bold">
            READY TO EXPLORE BONAIRE AT YOUR OWN PACE?
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter font-bold mt-4 mb-2">
            YOUR KEY TO
          </h2>
          <TextStroke
            strokeWidth="1px"
            className="font-bold text-5xl md:text-7xl lg:text-9xl italic tracking-tighter"
          >
            FREEDOM.
          </TextStroke>
          <p className="font-medium lg:text-xl tracking-wider text-primary mx-auto mb-8 mt-5 whitespace-pre-line">
            IF YOU WANT TO LEARN MORE ABOUT OUR BEAUTIFUL ISLAND OF BONAIRE, YOU
            CAN SEARCH FOR <br /> MORE ACTIVITIES HERE:
          </p>
          <Link href="https://bonaireisland.com/en/" target="_blank">
            <Button
              variant="outline"
              className=" text-white bg-primary underline tracking-[0.25rem] px-8 py-6"
            >
              EXPLORE BONAIRE MORE
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Bonaire;
