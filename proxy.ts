import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const defaultLocale = "nl";
const locales = ["en", "nl", "es"];

type Locale = (typeof locales)[number];

function getLocale(request: NextRequest): Locale {
  // 1️⃣ First priority: cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2️⃣ Second priority: device language
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale) as Locale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public assets and static files
  if (
    pathname.startsWith("/_next") || // Next.js internal files
    pathname.startsWith("/public") || // Public folder
    pathname.includes(".") || // Files with extensions (e.g., .jpg, .css, .js)
    pathname.startsWith("/api") // API routes if any
  ) {
    return NextResponse.next();
  }

  const pathNameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`),
  );

  if (pathNameIsMissingLocale) {
    // detect user's preference & redirect with a locale with a path eg: /en/about
    const locale = getLocale(request);

    const url = new URL(request.url);
    url.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    "/((?!_next|public|api|favicon.ico).*)",
  ],
};
