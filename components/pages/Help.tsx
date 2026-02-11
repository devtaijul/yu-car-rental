import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Shield,
  Headphones,
  Phone,
  FileText,
  Camera,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import { HeaderSpace } from "../HeaderSpace";

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeaderSpace />

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Badge */}
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Immediate Incident Protocol
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-center text-foreground mb-12">
            ACCIDENT?
          </h1>

          {/* Warning Card */}
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-sm md:text-base font-semibold text-foreground uppercase tracking-wide mb-4">
              IF YOU DRIVE AWAY, YOU WILL BE HELD RESPONSIBLE FOR ALL DAMAGE TO
              THE CAR,
              <br className="hidden md:block" />
              EVEN IF YOU HAVE TAKEN THE PREMIUM 100% COVERAGE OR CDW INSURANCE
              OPTIONS!
            </p>
            <div className="w-16 h-px bg-primary mx-auto my-6"></div>
            <p className="text-muted-foreground text-sm">
              While waiting for the road service, please call to inform us of
              what happened.
              <br />
              Contact us at{" "}
              <a
                href="tel:+5997905565"
                className="text-primary font-semibold hover:underline"
              >
                +599 790 5565
              </a>
              {" / "}
              <a
                href="tel:+5997955565"
                className="text-primary font-semibold hover:underline"
              >
                +599 795 5565
              </a>{" "}
              (mobile, also on WhatsApp).
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {/* Security & Documentation */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
                    Security &
                  </h2>
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
                    Documentation
                  </h2>
                </div>
              </div>

              <div className="border-l-2 border-primary pl-6 space-y-6">
                <p className="text-muted-foreground">
                  In case any event occurs which may have caused damage to the
                  car, you{" "}
                  <span className="font-semibold text-foreground">
                    must leave the car standing exactly where the accident
                    happened
                  </span>
                  , even if this is in the middle of the road.
                </p>
                <p className="text-muted-foreground">
                  Stay there and call{" "}
                  <span className="font-semibold text-foreground">
                    BONAIRE SECURITY FORCE SERVICE
                  </span>
                  <br />
                  at{" "}
                  <a
                    href="tel:+5997179292"
                    className="text-primary font-semibold hover:underline"
                  >
                    +(599) 717-9292
                  </a>
                </p>
              </div>

              {/* Protocol Outcome Box */}
              <div className="mt-8 bg-muted rounded-lg p-6">
                <h4 className="text-xs font-bold tracking-[0.15em] text-foreground uppercase mb-4">
                  Protocol Outcome:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Camera className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      They will take pictures of the scene and make a formal
                      report.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      You will get a copy of this report which is required for
                      insurance processing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Support & Roadside Assistance */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
                    Support &
                  </h2>
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">
                    Roadside Assistance
                  </h2>
                </div>
              </div>

              <div className="space-y-8">
                {/* Mechanical Difficulties */}
                <div>
                  <h4 className="text-xs font-bold tracking-[0.15em] text-primary uppercase mb-2">
                    Mechanical Difficulties
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For mechanical difficulties like a flat tire, engine
                    trouble, or other technical issues, contact the specialized
                    service:
                  </p>
                  <div>
                    <span className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
                      Road Service Bonaire
                    </span>
                    <a
                      href="tel:+5997852604"
                      className="block text-2xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      +599 785-2604
                    </a>
                  </div>
                </div>

                {/* Notification Card */}
                <div className="gradient-teal rounded-lg p-6 text-primary-foreground">
                  <h4 className="text-xs font-bold tracking-[0.15em] uppercase mb-3 opacity-80">
                    Notification to YU Car Rental
                  </h4>
                  <p className="text-sm opacity-90 mb-4">
                    While waiting for road service, you must inform us. This
                    ensures we can start the insurance claim and prepare a
                    replacement vehicle.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <div>
                        <a
                          href="tel:+5997905565"
                          className="block font-semibold hover:underline"
                        >
                          +599 790 5565
                        </a>
                        <a
                          href="tel:+5997955565"
                          className="block font-semibold hover:underline"
                        >
                          +599 795 5565
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span className="uppercase tracking-wide text-xs font-semibold">
                        WhatsApp Available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="gradient-teal py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold italic text-primary-foreground mb-4">
            LEAVING THE SCENE
            <br />
            IS A BREACH OF CONTRACT.
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/70 uppercase tracking-[0.15em] max-w-2xl mx-auto mt-8">
            The premium 100% coverage or CDW insurance options do not cover
            <br className="hidden md:block" />
            damage if you drive away from the accident location
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-16 h-px bg-primary-foreground/30"></div>
            <AlertTriangle className="w-6 h-6 text-primary-foreground/50" />
            <div className="w-16 h-px bg-primary-foreground/30"></div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Help;
