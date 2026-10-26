# Nallbani Tennis — Project Guide

Web app for a tennis club in Tirana. Two surfaces: the public site (Albanian
only, SEO matters, browser translation for other languages) and the admin
panel the coach runs from his phone. The product plan, agreed decisions and
phases live in `docs/REBUILD-PLAN.md`; read it before changing behaviour.

This is the rebuilt codebase (branch `rebuild`, started 2026-10-26). The first
version of the app was removed; only Vercel, the Postgres database and the
domain concepts were kept.

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict |
| Styling | Tailwind v4 + shadcn/ui. Brand tokens in `src/app/globals.css` (`:root` vars, mapped into `@theme inline`). Utilities `display` and `eyebrow` for the two type styles. |
| Database | PostgreSQL via Prisma 6. Schema `prisma/schema.prisma`, migrations in `prisma/migrations/` (**always `prisma migrate dev`, never `db push`**). |
| Auth | Own signed-cookie session: `jose` HS256 JWT in an httpOnly cookie, `bcryptjs` passwords. See section 4. |
| Validation | zod 4 inside every server action. |
| Hosting | Vercel project `nallbani-tennis`, repo github.com/teaAl/nallbani-tennis, `main` = production. |

### Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Prisma |
| `AUTH_SECRET` | Signs session cookies (≥16 chars; `openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | Optional, canonical URL for metadata/robots |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, `SEED_COACH_EMAIL`, `SEED_COACH_PASSWORD` | Read only by `prisma db seed` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob photo uploads (phase 2) |

Locally everything is in `.env` (gitignored; `.env.example` lists the keys).
Both Next.js and the Prisma CLI read `.env`. Production values are in Vercel.

### Commands

```bash
npm run dev            # next dev on :3000
npm run build          # prisma generate && next build
npm run typecheck      # tsc --noEmit
npm run lint           # eslint .
npm run db:migrate     # prisma migrate dev (creates + applies a migration)
npm run db:deploy      # prisma migrate deploy (production / CI)
npm run db:seed        # prisma db seed  → prisma/seed.ts (idempotent)
npm run db:studio
```

Local database for development: `docker run -d --name nallbani-pg -e POSTGRES_PASSWORD=nallbani -e POSTGRES_DB=nallbani -p 5433:5432 postgres:17-alpine`
(matches the `DATABASE_URL` in `.env.example` style: `postgresql://postgres:nallbani@localhost:5433/nallbani`).

---

## 2. Data model (Prisma)

- **User** — one table for everyone. `role` ADMIN | COACH | STUDENT, `status`
  ACTIVE | INACTIVE. Staff have `password` (bcrypt) and `mustChangePassword`;
  students have `password = null` and never log in. Student fields: level,
  date of birth, parent name/phone, notes, `monthlyFee`.
- **StudentNote**, **Payment** (typed-in payments; balance is computed in the UI).
- **Court** + **CourtWeeklyHours** (one row per court and weekday 0–6, `startHours`
  like `["18:00","19:00"]`) + **CourtDateException** (replaces one date's hours,
  empty = closed) + **CourtBooking** (the coach's log; CONFIRMED rows mark slots
  taken on the public site). Free slots are computed, never stored.
- **Group** (weekdays, times, dates, price, capacity, coach, court, `published`),
  **GroupMember**, **Lesson** (one session of a group), **LessonAttendee**.
- **CourseOffering** (private lessons, packages…), **Activity** (free-text
  `category`), **SiteSettings** (single row id 1), **Announcement**, **MediaAsset**,
  **AuditLog**.

Dates: date-only columns are `@db.Date`, stored as UTC midnight. Use
`src/lib/dates.ts` (`todayIso`, `isoToDate`, `formatDateSq`, Albanian weekday
and month names). Club time zone is Europe/Tirane.

---

## 3. Code layout

```
src/
  app/
    layout.tsx            root layout: fonts Barlow + Barlow Condensed, lang="sq"
    page.tsx              public home (reads SiteSettings)
    hyr/                  staff login (page, login-form, actions)
    admin/                coach panel, guarded by requireStaff() in layout.tsx
      page.tsx            Sot (today)
      nxenesit/           students
      permbajtja/         content (groups, offerings, activities, site)
      fushat/             courts: weekly hours, date exceptions, booking log
      me-shume/           change password, logout; llogarite/ = accounts (ADMIN only)
    api/health/route.ts   DB ping for monitoring
    robots.ts, not-found.tsx
  proxy.ts                Next 16 "proxy" (was middleware): redirects /admin/* without a valid cookie to /hyr
  lib/
    prisma.ts             PrismaClient singleton
    session-token.ts      sign/verify the JWT (no next/headers import, usable in proxy)
    auth.ts               getSession, createSession, destroySession, getCurrentUser, requireStaff, requireAdmin
    password.ts           hash/verify + passwordSchema
    dates.ts, courts.ts, utils.ts (cn, formatMoney, labels)
  components/
    ui/                   shadcn components (generated; `cn` comes from the `cn` package there)
    admin/                AdminNav (bottom tabs on phone, sidebar on md+), PageHeader
prisma/
  schema.prisma, migrations/, seed.ts
docs/REBUILD-PLAN.md      the agreed product plan
```

Conventions:
- Pages are Server Components that read Prisma directly. Mutations are Server
  Actions in an `actions.ts` next to the page: `"use server"`, zod-parse the
  `FormData`, call `requireStaff()`/`requireAdmin()` **inside the action**,
  write an `AuditLog` row for anything that changes data, `revalidatePath`.
- Forms are small client components using `useActionState`; `FormState` is
  `{ error?, success? }`.
- Public pages that read the database use `export const dynamic = "force-dynamic"`
  until caching is tuned in phase 5.
- All UI copy is Albanian, written inline. No i18n library.
- Keep the schema the source of truth; UI labels for enums live in `lib/utils.ts`.

---

## 4. Auth and access control

- `/hyr` posts to the `login` server action: finds the user by email, requires
  role ADMIN or COACH and status ACTIVE, bcrypt-compares, then `createSession`
  sets cookie `nt_session` (JWT: sub = user id, role, name; 30 days; httpOnly,
  sameSite lax, secure in production). Failed attempts wait 700 ms and return a
  generic message.
- `src/proxy.ts` verifies the cookie signature for `/admin/*` and redirects to
  `/hyr?next=…` otherwise. It never trusts the payload alone.
- `requireStaff()` (admin layout and every action) re-reads the user from the
  DB, so deactivating an account locks it out immediately. `requireAdmin()`
  additionally requires role ADMIN (accounts page).
- Roles: COACH manages everything except accounts; ADMIN also manages staff
  accounts (create, deactivate, reset password). Reset sets `mustChangePassword`,
  which shows a banner in the admin until the person changes it.
- There is no public self-registration and no email sending.

---

## 5. Deploying

- Vercel build command should be `prisma migrate deploy && npm run build` so
  migrations run before the build. The first deploy of the rebuild runs
  `20261026120000_rebuild`, which **drops the legacy tables** (`users`, `staff`,
  `courts`, `bookings`, …) before creating the new schema. Do this knowingly.
- After the first deploy run the seed once with the real `SEED_*` values set
  in Vercel (`npx prisma db seed` with `vercel env pull`), then rotate the
  temporary passwords from the admin panel.
- `/api/health` returns `{ ok, db }`; use it for uptime checks.

---

## 6. Status

Phase 1 (foundation) is done: schema + baseline migration, seed, session auth,
admin shell with the five tabs, accounts management, public home reading
SiteSettings. Phases 2–5 (content editing + public pages, students, booking
log, polish/SEO) follow the plan in `docs/REBUILD-PLAN.md` section 9.
