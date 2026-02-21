import { HeroContent } from "./dictionary";

export type Locale = "en" | "nl" | "es";
export type Dictionary = {
  home: {
    hero: HeroContent;
  };
};

export type LocationData = {
  pickupDate?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
};

export type LocationDataAndPackage = LocationData & {
  package?: string;
};
