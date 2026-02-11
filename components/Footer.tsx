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
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Large YU watermark */}
      <div className="absolute max-w-96 right-[20%] bottom-0 italic opacity-40  select-none pointer-events-none w-full h-full object-center ">
        <Image
          src="/assets/YU.png"
          alt="Logo"
          className="max-w-125"
          width={1000}
          height={500}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side */}
          <div>
            <h2 className="text-2xl md:text-3xl font-display italic mb-8 max-w-md">
              Drive Into Adventure with your trusted partner YU Car Rental.
              Enjoy & Drive Safe.
            </h2>

            {/* Logo */}
            <Image
              src="/assets/logo-footer.png"
              alt="Logo"
              className="max-w-125"
              width={1000}
              height={500}
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>Bonaire Flamingo Airport</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>hello@yucarrental.com</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8  pt-8 border-t border-primary-foreground/20">
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
