import { Dictionary, Locale } from "@/types/utils";
import "server-only";

const dictionaries: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import("./en.json").then((m) => m.default as Dictionary),
  nl: () => import("./nl.json").then((m) => m.default as Dictionary),
  es: () => import("./es.json").then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale];

  if (!loader) {
    // throw new Error(`Dictionary not found for locale: ${locale}`);
    return dictionaries["en"]!();
  }

  return loader();
}
