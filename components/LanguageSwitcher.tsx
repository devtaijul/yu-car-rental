"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

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

  function changeLanguage(locale: string) {
    // save cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    // replace locale in URL
    const segments = pathname.split("/");
    segments[1] = locale;

    router.push(segments.join("/"));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 h-auto flex items-center gap-1 bg-primary text-primary-foreground"
        >
          <span>{active.flag}</span>
          <span className="uppercase">{active.code}</span>
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
