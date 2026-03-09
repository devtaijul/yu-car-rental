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

  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const navLinks = [
    { name: "Rental Cars", href: "/cars", submenu: [] },
    { name: "Deals", href: "/deals", submenu: [] },
    {
      name: "Services",
      href: "/services",
      submenu: [
        { name: "Airport Pickup", href: "/airport", subTitle: "Bonaire (BON)" },
        { name: "Help By Accident", href: "/help", subTitle: "24/7 Support" },
      ],
    },
    { name: "Bonaire", href: "/bonaire", submenu: [] },
    { name: "About Us", href: "/about", submenu: [] },
  ];

  return (
    <header className="fixed top-0 z-50 w-full py-3 md:py-4">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="relative z-50 bg-white shadow-lg">
          <div className="bg-background-soft px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center gap-2">
                <Image
                  src="/assets/logo-nav.png"
                  className="h-auto w-44 lg:w-52"
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
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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
                      <div className="absolute left-0 top-full mt-3 w-56  bg-card shadow-lg opacity-0 uppercase invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <div className="">
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex items-start flex-col px-6 py-3 border-transparent border-l-4 hover:border-primary text-sm  hover:bg-primary/10"
                            >
                              <span>{sub.name}</span>
                              <span className="text-primary">
                                {sub.subTitle}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>

              {/* Right */}
              <div className="hidden lg:flex items-center gap-3">
                <LanguageSwitcher />
                <Link href="/booking">
                  <Button className="rounded-none px-6 py-2 h-auto">
                    Explore Fleet
                  </Button>
                </Link>
              </div>

              {/* Mobile toggle */}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground lg:hidden"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setOpenSubmenu(null);
                }}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={closeMobileMenu}
            />
            <div className="relative z-50 mt-3 overflow-hidden rounded-2xl bg-card shadow-lg lg:hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-medium text-foreground">
                  Menu
                </span>
                <LanguageSwitcher />
              </div>
              <nav className="flex flex-col gap-2 p-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  if (link.submenu.length === 0) {
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                          "rounded-lg px-4 py-3 text-sm hover:bg-muted",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                        onClick={closeMobileMenu}
                      >
                        {link.name}
                      </Link>
                    );
                  }

                  const isOpenSub = openSubmenu === link.name;

                  return (
                    <div key={link.name}>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSubmenu(isOpenSub ? null : link.name)
                        }
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm hover:bg-muted",
                          isActive ? "text-primary" : "text-foreground",
                        )}
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
                              className="rounded-lg px-4 py-2 text-sm hover:bg-muted"
                              onClick={closeMobileMenu}
                            >
                              <span className="block text-foreground">
                                {sub.name}
                              </span>
                              <span className="block text-xs text-primary">
                                {sub.subTitle}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <Link href="/booking" onClick={closeMobileMenu}>
                  <Button className="w-full mt-3 rounded-none">
                    Explore Fleet
                  </Button>
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
