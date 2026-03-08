import {
  MapPin,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Large YU watermark */}
      <div className="pointer-events-none absolute -right-16 bottom-0 flex w-56 select-none items-end opacity-15 sm:-right-8 sm:w-72 sm:opacity-20 md:w-80 md:opacity-30 lg:right-[10%] lg:w-[28rem] lg:opacity-80">
        <Image
          src="/assets/YU.png"
          alt="Logo"
          className="h-auto w-full"
          width={1000}
          height={500}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-4 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-x-10">
          <div className="space-y-8 lg:col-span-2">
            <h2 className="max-w-3xl text-2xl font-display italic sm:text-3xl lg:text-4xl">
              Drive Into Adventure with your trusted partner YU Car Rental.
              Enjoy & Drive Safe.
            </h2>

            <div className="max-w-xs sm:max-w-sm lg:max-w-lg">
              <Image
                src="/assets/logo-footer.png"
                alt="Logo"
                className="h-auto w-full"
                width={1000}
                height={500}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 lg:justify-between lg:pt-3">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="max-w-xs text-sm sm:text-base">
                  Bonaire Flamingo Airport
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="break-all text-sm sm:text-base">
                  hello@yucarrental.com
                </span>
              </div>
            </div>

            <div className="flex items-center mx-auto md:mx-0 gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-70"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="transition-opacity hover:opacity-70"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-70"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-70"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-10 flex md:flex-col justify-center gap-4 border-t border-primary-foreground/20 pt-6 text-center sm:flex-row sm:gap-8 lg:mt-12 lg:pt-8 flex-row">
          <Link href="/terms" className="text-sm hover:underline text-center">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm hover:underline text-center">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
