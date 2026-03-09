# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Yu Car Rental — a car rental platform for Bonaire, built with Next.js 16 (App Router), Prisma 7, NextAuth v5, Stripe payments, and Tailwind CSS v4.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run db:generate` — generate Prisma client
- `npm run db:push` — push schema to database
- `npm run db:studio` — open Prisma Studio
- `npm run db:prepare` — generate + push (use after schema changes)
- `npm run db:seed` — seed database (runs `tsx prisma/seed.ts`)

## Architecture

### Routing & i18n

All pages live under `app/[lang]/` with a dynamic locale segment. Supported locales: `en`, `nl` (default), `es`. The locale proxy in `proxy.ts` redirects requests missing a locale prefix using cookie (`NEXT_LOCALE`) then browser `Accept-Language` header. Translation dictionaries are in `app/[lang]/dictionaries/{en,nl,es}.json`, loaded via `getDictionary(locale)` from `dictionaries.ts`.

### Database (Prisma + PostgreSQL)

- Schema: `prisma/schema.prisma`
- Generated client output: `generated/prisma/client` (import from `@/generated/prisma/client`)
- Enums importable from `@/generated/prisma/enums`
- Prisma singleton: `lib/prisma.ts` (uses `@prisma/adapter-pg` for PostgreSQL)
- Config: `prisma.config.ts`
- Key models: User, Car, Booking, Payment, Review, Coupon, Driver, CarAvailability, PlatformSettings, StripeAccount

### Auth (NextAuth v5)

- Config in `auth.ts` — credentials provider (email/password with bcryptjs)
- JWT strategy with custom claims: `id`, `firstname`, `lastname`, `role`
- Type extensions in `types/next-auth.d.ts`
- Session provider wraps the app via `providers/index.tsx`

### Server Actions & Data

- `actions/` — server actions split into `query.ts` (reads), `mutation.ts` (writes), `register.ts` (user registration), `clientSecretGenerator.ts` (Stripe)
- `server/` — React Server Components that fetch data and pass to client components (e.g., `AdminDashboardServer.tsx`, `SelectCarServer.tsx`)
- `data/` — static data (car lists, features, services)

### Booking Flow

Multi-step reservation flow at `/reserve-a-car/`:
1. Location/dates selection → 2. Car selection → 3. Protection package (`/[car_slug]/protection-package`) → 4. Summary/checkout (`/[car_slug]/summary-checkout`) → 5. Confirmation

State managed via `BookingContext` (`context/BookingContext.tsx`) and URL query params (synced by `hooks/useSyncBookingFromQuery.ts`).

### UI

- shadcn/ui (new-york style) — components in `components/ui/`
- Tailwind CSS v4 with CSS variables for theming
- Fonts: Roboto + Poppins (via `next/font`)
- Icons: Lucide React + custom SVG icons in `components/icons/`
- Images hosted on Cloudinary (via `next-cloudinary`)

### Payments

Stripe integration with `@stripe/react-stripe-js`. Payment intent created via API route `app/api/create-payment-intent/route.ts`. StripeAccount model supports TEST/LIVE environments.

### Key Config

- `config/business.config.ts` — business constants (coverage pricing, tax rate)
- `config/pages.config.ts` — page configuration
- `config/icons.config.ts` — icon mappings
- Path alias: `@/*` maps to project root

### Environment Variables

Requires: `DATABASE_URL` (PostgreSQL connection string). Stripe keys stored in database via PlatformSettings/StripeAccount models.
