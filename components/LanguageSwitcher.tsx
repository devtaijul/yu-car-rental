"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split("/")[1] || "en";
  const active = locales.find((l) => l.code === currentLocale) || locales[0];

  const [selectedLocale, setSelectedLocale] = useState(active.code);

  // run side-effect when locale changes
  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${selectedLocale}; path=/; max-age=31536000`;
  }, [selectedLocale]);

  function changeLanguage(locale: string) {
    setSelectedLocale(locale); // ✅ trigger useEffect
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-none px-4 py-2 h-auto flex items-center gap-1 bg-primary text-primary-foreground"
        >
          <span>{locales.find((l) => l.code === selectedLocale)?.flag}</span>
          <span className="uppercase">{selectedLocale}</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 p-1">
        <div className="flex flex-col">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
