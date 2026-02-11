"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { name: "Rental Cars", href: "/cars", submenu: [] },
    { name: "Deals", href: "/deals", submenu: [] },
    {
      name: "Services",
      href: "/services",
      submenu: [
        { name: "Service-1", href: "/services-1" },
        { name: "Service-2", href: "/services-2" },
        { name: "Service-3", href: "/services-3" },
      ],
    },
    { name: "Bonaire", href: "/bonaire", submenu: [] },
    { name: "About Us", href: "/about", submenu: [] },
  ];

  return (
    <header className="fixed top-0 z-50 w-full py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white backdrop-blur  shadow-lg ">
          <div className="bg-background-soft px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/assets/logo-nav.png"
                  className="max-w-52"
                  alt="yu"
                  width={1000}
                  height={400}
                />
                {/*  <span className="text-3xl font-bold italic text-primary"></span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase">
                  Car Rental
                </span>
                <span className="text-[9px] text-muted-foreground uppercase">
                  Drive Into Adventure
                </span>
              </div> */}
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  if (link.submenu.length === 0) {
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  }

                  return (
                    <div key={link.name} className="relative group">
                      <button
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium hover:text-primary",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                      >
                        {link.name}
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute left-0 top-full mt-3 w-48 rounded-xl bg-card shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="p-2">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Right */}
              <div className="hidden md:flex items-center gap-3">
                <LanguageSwitcher />
                <Link href="/booking">
                  <Button className="rounded-none px-6 py-2 h-auto">
                    Explore Fleet
                  </Button>
                </Link>
              </div>

              {/* Mobile toggle */}
              <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 bg-card rounded-2xl shadow-lg p-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                if (link.submenu.length === 0) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-4 py-2 rounded-lg hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                }

                const isOpenSub = openSubmenu === link.name;

                return (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenSubmenu(isOpenSub ? null : link.name)
                      }
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-muted"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isOpenSub && "rotate-180",
                        )}
                      />
                    </button>

                    {isOpenSub && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="px-4 py-2 rounded-lg text-sm hover:bg-muted"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link href="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-3 rounded-none">
                  Explore Fleet
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
