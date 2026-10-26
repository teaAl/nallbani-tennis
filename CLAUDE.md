# Nallbani Tennis — Project Overview

Web app for a tennis club in Albania (Nallbani Tennis Club). Three audiences:
public visitors (marketing + enquiries), members (profile, bookings, progress),
and club staff (admin panel). Languages: English and Albanian.

This file documents how the project is wired **as it exists today**. The app
layer is being rebuilt from scratch; the infrastructure below is what we keep.

---

## 1. Stack and hosting

| Layer | What | Notes |
|---|---|---|
| Framework | Next.js 15.2 (App Router, Turbopack dev), React 19, TypeScript | `src/app` |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` | Theme tokens live in `src/app/globals.css` under `@theme`. `tailwind.config.ts` is a leftover v3 file whose export is commented out; it is dead. |
| Database | PostgreSQL via Prisma 5 | `prisma/schema.prisma`. No `migrations/` folder, so the schema is applied with `prisma db push`. No seed file (deleted in git history). |
| Auth | NextAuth v4 (Credentials provider, JWT strategy) + a separate password-gate for admin | See section 4. |
| State | Zustand stores in `src/stores` (some persisted to localStorage) | |
| i18n | `next-intl` with a cookie-based locale (`NEXT_LOCALE`), no URL prefix | Messages in `src/messages/{en,al}.json`. `src/i18n/config.ts` wrongly lists `['en','de']`; the real locales are `en` and `al`. |
| Messaging | Meta WhatsApp Cloud API (direct `fetch`) | `src/utils/sendwpMessage.tsx` |
| Hosting | Vercel, project `nallbani-tennis` | Live: https://nallbani-tennis.vercel.app. Repo: github.com/teaAl/nallbani-tennis (`main` is production). |

Unused dependencies that can be dropped in the rebuild: `twilio`,
`@vercel/postgres`, `i18next`, `react-i18next`, `next-i18next`,
`react-calendar`, `react-datepicker`, `react-phone-input-2`, `lottie-react`
(only used on a dead thank-you page), the browserify polyfills in
`next.config.ts`, `tailwindcss-animate`, `tailwindcss-animated`.

### Environment variables

There is no `.env` in the repo; values live in Vercel project settings.
Pull them with `vercel env pull .env.local` when working locally.

| Variable | Used by |
|---|---|
| `DATABASE_URL` | Prisma |
| `NEXTAUTH_SECRET`, `NEXTAUTH_URL` | NextAuth, middleware `getToken`, and the hand-rolled JWT in `/api/auth/login` |
| `ADMIN_PASSWORD` | `/api/admin/login` password gate |
| `API_SECRET_KEY` | Middleware API-key check on `/api/*` (see section 4, this is currently blocking the app's own calls) |
| `META_WHATSAPP_ACCESS_TOKEN`, `META_WHATSAPP_PHONE_ID`, `WHATSAPP_API_URL`, `WHATSAPP_API_VERSION` | Outbound WhatsApp messages |
| `VERIFY_TOKEN` | WhatsApp webhook verification handshake (`GET /api/whatsapp-api`) |

### Commands

```bash
npm run dev          # next dev --turbopack
npm run build        # next build
npx prisma generate  # regenerate client after schema edits
npx prisma db push   # apply schema to the database (no migrations in use)
npx prisma studio    # browse data
```

---

## 2. Data model (Prisma)

The database is considerably wider than the UI. Tables marked **(no API, no UI)**
exist in Postgres but nothing in the app reads or writes them.

**People**
- `User` — members. `role: UserRole[]` (STUDENT | PARENT | MEMBER), `status: MemberStatus`
  (PENDING default | ACTIVE | INACTIVE | UNCOMPLETE), profile fields (avatar, bio,
  level, phone, DOB, preferedPlayTime, notesForCoach), self-relation `parent`/`children`.
- `Staff` — coaches/admins (`StaffRole` ADMIN | COACH). **(no API, no UI)**. The
  admin panel does not use Staff accounts at all; it uses one shared password.

**Courts and bookings**
- `Court` — name, `type` (CLAY|HARD|GRASS|CARPET), `indoor`, `active`.
- `CourtAvailability` — a bookable slot: `courtId`, `dayOfWeek`, optional `date`,
  `startTime`/`endTime` as `"HH:mm"` strings, `price` (Decimal, default 10),
  `bookingState` (PENDING|CONFIRMED|CANCELED|COMPLETED). Slots are *weekly
  recurring by weekday* unless `date` is set.
- `Booking` — a request for one `CourtAvailability`. `bookerType` GUEST (name/email/phone
  on the row) or MEMBER (`userId`). `status` uses `BookingState`. `needsEquipment`.
  Also has an implicit many-to-many `Court[]` relation that nothing uses.
  Several bookings can target the same slot; admin "approves" one, the rest are cancelled.

**Coaching**
- `Lesson` (PRIVATE|GROUP|CAMP, level, capacity, coach, court, group) + `LessonAttendee`. **(no API, no UI)**
- `Group` (level, `dayOfWeek[]`, times, dates, price, capacity, coach) + `GroupMember`. **(no API, no UI)**
- `Package` + `UserPackage` (lesson bundles / subscriptions). **(no API, no UI)**
- `UserProgress` (per-skill percentages, streaks) + `ProgressUpdate` (coach notes per lesson). **(no API, no UI)**
- `Achievement` + `UserAchievement`. **(no API, no UI)**
- `Setting` key/value. **(no API, no UI)**

Enum `PaymentStatus` exists but is referenced by no model.

---

## 3. Application structure

```
src/
  app/
    (front)/      public site: /, /about, /services, /pricing, /book (dead), /thank-you (dead)
    (auth)/       /login, /signup (shows "Registration closed"), /admin-auth
    (member)/     /profile, /pending, /complete-profile (flow commented out, renders empty)
    (admin)/admin/ dashboard, members, members/[id], groups, groups/new, groups/[id],
                  lessons, lessons/new, courts, court-availability, bookings
    api/          route handlers (section 5)
    globals.css   Tailwind v4 theme tokens + third-party widget overrides
  components/     admin/, member/, booking/, home/, services/, common/, ui/ (hand-rolled shadcn-style)
  stores/         zustand: authStore (persisted), memberStore, courtStore, courtAvailabilityStore, bookingStore, adminFilterStore
  lib/            prisma.ts (singleton), authOpts.ts (NextAuth config), auth.ts (getServerSession helpers), cn.tsx
  i18n/ + services/locale.ts   next-intl request config, cookie get/set
  messages/       en.json, al.json
  middleware.ts   routing + auth gate (section 4)
  interfaces/, constants/, utils/, services/api/   assorted types, helpers, fetch wrappers
public/           images, Lottie JSON animations, icons as .tsx components
```

Each of the four route groups has its **own root layout** rendering `<html>` and
`<body>`, each re-declaring the Google fonts (Poppins, Nunito) and the
`NextIntlClientProvider`. There is no shared root layout.

### Current look

Dark theme: near-black backgrounds (`gray-900` / `#0a0a0a`), lime accent
`pear #cddc3b`, cream `pana #fff0db` for the admin content area, grey text
`foreground #afafaf`. Fonts Poppins (headings) and Nunito (body). Lots of
photo backgrounds with dark gradient overlays and Lottie animations.

---

## 4. Auth and access control (how it is wired today)

There are **three unrelated auth mechanisms**, and they do not fit together.

**A. NextAuth (members)** — `src/lib/authOpts.ts`
- Credentials provider checks `User.email` + bcrypt password.
- JWT session; the `jwt` callback re-reads `status` and `role` from the DB on every call.
- Session exposes `user.id`, `user.status`, `user.role[]`.
- Route handler at `/api/auth/[...nextauth]`.
- **Nothing in the UI calls `signIn()`**. The login form posts to a custom
  `/api/auth/login` that returns a hand-signed `jsonwebtoken` and the user row,
  which the form stores in the persisted zustand `authStore`. No NextAuth cookie
  is ever created, so `getServerSession` and the middleware's `getToken` see no
  user. Result: `/profile` always bounces to `/login`. **Member login is broken.**

**B. Admin password gate** — `/api/admin/login`, `/admin-auth`, middleware
- One shared `ADMIN_PASSWORD`. On success sets cookie `admin-session=true`
  (httpOnly, 8 h). Middleware lets `/admin/*` through if that cookie's value is
  literally `"true"`.
- The cookie is **not signed**, so anyone who sets `admin-session=true` in their
  browser gets in. Brute-force limiting is also cookie-based and therefore
  client-controlled. This must be replaced.

**C. API key on `/api/*`** — middleware
- Every `/api/*` request except `/api/auth/*`, `/api/admin/*`, `/api/webhook/*`
  must carry `x-api-key` equal to `API_SECRET_KEY`.
- **The app's own client code never sends it**, so every store `fetch("/api/...")`
  returns 401 in production. Admin data pages are effectively non-functional.

**Member status routing** (middleware, on NextAuth token — so currently never triggers):
`UNCOMPLETE` → `/complete-profile`, `PENDING` → `/pending`, `ACTIVE` → `/profile`.
Intended journey: admin creates account → member completes profile → admin
approves → member is active. Public self-registration is disabled (`/signup`
shows "Registration Closed"), and there is no admin UI to create a member
(`/admin/members/new` is linked but does not exist).

---

## 5. API routes

Handlers under `src/app/api`. ⚠ = starts with `redirect("/")`, i.e. deliberately
disabled ("quick commented code to pass the build" era) and dead in production.

| Route | Methods | Purpose / state |
|---|---|---|
| `auth/[...nextauth]` | GET POST | NextAuth. Works but unused by UI. |
| `auth/login` | POST | Custom login, returns self-signed JWT + user. Used by login form. |
| `auth/register` | POST | Creates user (status defaults PENDING). No UI calls it. |
| `auth/refresh` | GET | Returns fresh status/role for a NextAuth session. |
| `auth/session` | GET ⚠ | Dead. |
| `admin/login`, `admin/logout` | POST, POST/GET | Password gate (section 4B). |
| `courts` | GET POST | List / create court. GET blocked by API-key rule in practice. |
| `courts/[id]` | GET PUT DELETE | Court CRUD. |
| `court-availability` | GET ⚠ POST | List (dead) / create slot. |
| `court-availability/[id]` | GET PUT DELETE | Slot CRUD. |
| `bookings` | GET ⚠ | Dead. |
| `bookings/guest`, `bookings/member` | POST | Create booking. Guest route rejects `needsEquipment: false` because it validates with `!needsEquipment`. |
| `bookings/approve` | POST | Confirms one booking on a slot, cancels the others, marks slot CONFIRMED. |
| `users` | GET ⚠ | Dead. |
| `users/[id]` | GET | Single user. |
| `users/[id]/complete-profile` | PUT | Sets profile fields and `status: ACTIVE`. |
| `users/[id]/update-profile` | PUT | Partial profile update. |
| `users/update-role`, `users/update-status` | PUT | Admin actions. |
| `reset-password` | PUT | Change password (NextAuth session required, so unreachable today). |
| `whatsapp-api` | GET POST | GET = Meta webhook verify. POST = both the inbound webhook receiver *and* the handler for the Services contact form. Sends a confirmation message to a **hardcoded phone number**, not the enquirer's. |
| `create-session.ts` | — | Pages-router file in the App Router folder; compares plaintext passwords. Dead. |

No input validation (zod is installed but every schema is commented out). No
authorization checks inside handlers; protection is only the middleware rules above.

---

## 6. Feature inventory: what actually works

| Area | State |
|---|---|
| Marketing pages (home, about, services, pricing) | Render. Copy partly placeholder (fake prices, fake phone). EN/AL switch works. |
| Services enquiry form → WhatsApp | Works, but message goes to the club's hardcoded number only. |
| Member login / profile | Broken (section 4A). Profile tabs (membership card, bookings, progress, network) are static JSX with no data. |
| Complete-profile wizard | Components exist, page renders nothing (flow commented out). |
| Public court booking (`/book`) | Entire page commented out and redirects home. |
| Admin: dashboard, lessons, groups | Hardcoded arrays, no API. |
| Admin: members list / detail, courts, availability, bookings | Wired to zustand stores and real routes, but calls fail (API key + dead GETs). |
| Lessons, groups, packages, progress, achievements, staff | Schema only. |

GitHub issues #2–#20 are all small "button does nothing / add real data /
translate" items from a review pass. Open PRs #15 and #22 are minor copy and
navbar tweaks on branches `nadia-main` and `nadia-testing`.

---

## 7. Working conventions for the rebuild

- Keep: Vercel project, Postgres database, Prisma, the domain concepts in the
  schema, EN/AL bilingual requirement, WhatsApp as the club's preferred channel.
- Replace: everything under `src/`. One root layout. One auth system. Route
  handlers or server actions with zod validation and real authorization.
- Schema changes are allowed but go through Prisma migrations from now on
  (`prisma migrate dev`), not `db push`.
- Secrets never go in the repo; use `vercel env pull`.
- Don't fix the legacy code; it is being removed.
