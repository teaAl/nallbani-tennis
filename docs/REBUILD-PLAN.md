# Nallbani Tennis — Rebuild Plan (v6, agreed)

Status: **agreed on 2026-10-10**. Nothing is implemented yet; Phase 0 (design)
starts now. `CLAUDE.md` describes what exists; this file describes what we build.

v5: decisions closed. Navy instead of black, SEO section added, activities
kept general, roles defined, court booking log confirmed, cleanup confirmed.

v6 (2026-10-26): court availability reworked. The coach sets bookable
one-hour slots per weekday and overrides single dates; the public Fushat page
shows free slots (5.4, 6.2). Screens added in Claude Design; the Figma
prototype still shows the v5 composer.

---

## 1. Guiding constraints

1. **The coach has no laptop and is not technical.** Admin is a responsive
   web app designed phone-first: bottom tabs on small screens (sidebar on
   desktop), lists as cards not wide tables, one form per screen, big tap
   targets. A web manifest lets him add it to his home screen. Not a native
   app, not a separate codebase.
2. **You rarely touch this project.** Everything the coach needs to change
   lives in the database and is edited in admin. No deploy needed. No
   third-party APIs that expire, re-verify, or bill.
3. **The coach owns the data.** He registers students, assigns them to
   groups, records attendance and notes whether they have paid.
4. **WhatsApp as a human channel, not an API.** The site opens a WhatsApp
   chat to the coach with a prefilled message. Nothing in our code talks to
   Meta.
5. **Zero recurring cost beyond Vercel + database.**

---

## 2. Brand and theme

Source: `public/images/logo-nt.png`. Lime green square (`#c8d93a` family,
close to the existing `pear #cddc3b`), white "N", black hand-drawn border,
white outlined "T".

Direction for Phase 0:
- **Palette**: lime accent (kept exactly), **dark navy** instead of black for
  header/footer bands and headings, white and warm off-white surfaces. Lime
  is used for emphasis and actions, never as a background for long text.
  The logo's black and white may be adapted (navy, off-white) as long as the
  lime stays.
- **Logo placement**: the white "T" needs a dark background, so the logo lives
  on navy bands. Content areas are light for readability on phones in
  sunlight. Dark mode follows the system and keeps the lime/navy relationship.
- **Motif**: the hand-drawn stroke from the logo border can appear as
  underlines and card edges, sparingly.
- **Type**: one clean sans for everything (the current Poppins/Nunito pair
  can go). Decided in Phase 0.

---

## 3. What we keep vs. throw away

**Keep:** Vercel project + domain, GitHub repo, Postgres + Prisma, logo and
photos in `public/`.

**Throw away:** all of `src/`, the three auth mechanisms, zustand stores,
hand-rolled UI kit, dead pages, Lottie, the old `CourtAvailability` / `Booking` tables (replaced by 6.2),
the shared admin password, hardcoded pricing and copy, the WhatsApp API
routes and env vars, **next-intl and both message files**.

---

## 4. Language: Albanian only

- The whole site and the admin are written in Albanian. `<html lang="sq">`.
- Chrome, Safari and Edge detect the page language and offer translation
  into the visitor's browser language automatically. That covers English
  speakers and anyone else, with zero work for the coach and zero code.
- No `/en` route, no i18n library, no duplicate fields. One language in the
  database.
- I write the static UI strings in Albanian; you review them once.
- A small "Translate" hint (browser icon + one sentence) sits in the footer
  for visitors who miss the browser prompt.

If English SEO ever matters, a `/en` route can be added later without
changing the data model.

### 4.1 SEO (local, Albanian, aggressive)
Goal: rank first in Albania (Tirana first) for tennis, tennis lessons, tennis
courts, and related sport searches in Albanian.
- Per-page titles and descriptions in Albanian with location terms
  ("tenis Tiranë", "kurse tenisi", "fushë tenisi", "mësues tenisi").
  Editable by the coach in Site settings for the home page.
- Structured data: `SportsActivityLocation` / `LocalBusiness` for the club,
  `Event` for every published activity, `Course` for groups and offerings,
  `Product`/`Offer` for court pricing. Generated automatically from content.
- `sitemap.xml` and `robots.txt` generated from published content;
  canonical URLs; Open Graph and Twitter cards with the hero photo.
- Fast pages: server-rendered, optimized images, no client-side data loading
  on public pages. Core Web Vitals green on mobile.
- Human-readable Albanian slugs for groups and activities.
- Outside the code, once: Google Business Profile with the same name,
  address, phone and photos, and a Google Search Console verification tag
  stored in Site settings so you never need to redeploy for it.

---

## 5. The two surfaces

### 5.1 Public site (visitors, mobile-first)
Rendered entirely from admin-managed content.

- **Ballina (Home)**: hero (editable headline + photo), next upcoming
  activities, highlights, "Na shkruani në WhatsApp" button.
- **Kurse (Coaching)**: published groups (age range, level, days + time,
  monthly price, spots left) and individual course offerings (price per hour
  or per package). Each has an **Ask on WhatsApp** button with a prefilled
  message naming the item.
- **Aktivitete (Activities)**: anything special the coach organizes: yoga,
  pilates, clinics with guest coaches, camps, tournaments, or whatever he
  thinks of. Each with a free-text category, date(s), time, place, price,
  guest coach name and photo, capacity, description. Upcoming first, past
  ones in an archive. Ask/register via WhatsApp link.
- **Fushat (Courts)**: each court with surface, indoor/outdoor, hourly price,
  bundle discounts. The page shows, for the next 7 days, the **free one-hour
  slots** the coach has set (see 5.4): tap a day, tap a free slot (or 2–3 in a
  row), and the request opens ready-typed in WhatsApp. Slots the coach has
  logged as booked, and hours taken by group lessons on that court, show as
  "e zënë". A day with no slots says so. No backend approval, no payment.
- **Rreth nesh / Kontakt**: coach bio and photo, address with map link, phone,
  WhatsApp button, opening hours, social links. Announcement banner site-wide.

### 5.2 Admin (the coach, responsive, phone-first)
Tabs: **Sot (Today) · Nxënësit (Students) · Përmbajtja (Content) · Fushat (Courts) · Më shumë (More)**.

- **Today**: today's lessons from group schedules and today's activities,
  plus court bookings he logged (if he uses the log). Swipe to other days.
  Quick attendance.
- **Students**: searchable list. Add: name, phone, date of birth, level,
  parent name/phone, group, notes. Student page: attendance history, notes,
  and the **payment section**: "amount due this month", list of payments he
  typed in (date, amount, note), computed balance, paid/unpaid badge.
  "Message on WhatsApp" opens a chat with student or parent.
- **Content**: four sub-sections, each a list with Add / Edit / Publish toggle:
  - Groups (name, age range, level, days + time, start/end, monthly price, capacity, description, photo)
  - Course offerings (title, type, price unit, price, description)
  - Activities (title, type, date/time or date range, place, price, guest coach, capacity, description, photo)
  - Site (hero text/photo, about text, coach bio/photo, phone, WhatsApp number, address, socials, announcements)
- **Courts**: per court: name, surface, indoor, prices, active, plus
  **Orët e javës**: for each weekday the coach taps the hours the court can be
  reserved (one-hour slots, e.g. Mon–Fri 18, 19, 20, 21; Sat 9–12). Copy a day
  to Mon–Fri or to the whole week. **Ditë e veçantë** (exception): pick a date
  and a court, tap the hours for that date only (or "closed all day"), with an
  optional reason shown on the site. After that date the weekly hours apply
  again. The **booking log** (5.4) is reachable from Today and from here.
- **More**: change password, the one-page how-to, logout. Admins also see
  **Accounts** here (see 5.3).

### 5.3 Roles
- **COACH**: everything in Today, Students, Content, Courts. Cannot see or
  manage accounts. This is the screen the coach uses daily.
- **ADMIN** (you): everything a coach can do, plus Accounts: create another
  coach or admin, deactivate one, reset a password. Also sees the audit log.
- Both roles log in on the same page; the app shows what the role allows.
  Adding a second coach later is one form, not a code change.

### 5.4 Court availability and the booking log (confirmed, revised 2026-10-26)
Availability is **slot-based and set by the coach**, not a time range:
1. **Weekly hours** per court: a set of one-hour start times per weekday.
   This is the default and repeats every week.
2. **Exceptions** per court and date: a replacement set of hours for that one
   date (possibly empty = closed) with an optional reason. One date only; the
   weekly hours take over again afterwards.
3. **Public slots** for a date = the exception's hours if one exists, else that
   weekday's hours, minus hours already taken. Taken = logged bookings with
   status CONFIRMED + group lessons scheduled on that court at that hour.
4. **Booking log**: when someone confirms over WhatsApp, the coach adds a
   booking in admin (name, phone, court, date, start, hours, paid or not).
   It shows on Today, warns on double-booking, and marks the slot "e zënë"
   on the site. If he doesn't log it, the slot stays visible as free and
   nothing breaks; it's still his notebook, just one the site can read.

Slot length is one hour. A `slotMinutes` column on the court allows 90-minute
slots later without a redesign.
---

## 6. Schema changes

### 6.1 People
- Merge `Staff` into `User` with `role` ADMIN | COACH | STUDENT.
- Students have `password` null, `status` ACTIVE | INACTIVE, `level`,
  `dateOfBirth`, `phone`, parent name/phone (plain fields; the parent/child
  self-relation is dropped to keep forms simple).
- `monthlyFee` (Decimal, nullable) on the student.
- `Payment`: `userId`, `date`, `amount`, `note`, `recordedBy`. Balance is
  computed in the UI; no accounting logic.
- Drop `PENDING` / `UNCOMPLETE` statuses, `UserRole[]`, `preferedPlayTime`, `notesForCoach` (folded into `notes`).

### 6.2 Courts
- `Court`: name, surface, indoor, active, `sortOrder`, `slotMinutes` (default 60),
  `guestHourly`, `memberHourly`, `bundles` (JSON `[{hours, price}]`).
- `CourtWeeklyHours`: `courtId`, `weekday` (0–6), `startHours` (`String[]` of
  `"HH:mm"`). One row per court and weekday; unique on (`courtId`, `weekday`).
- `CourtDateException`: `courtId`, `date`, `startHours` (`String[]`, empty =
  closed), `reason`, `createdBy`. Unique on (`courtId`, `date`).
- `CourtBooking` (the log): `courtId`, `date`, `startTime`, `endTime`, `name`,
  `phone`, `userId?`, `price?`, `paid`, `status` CONFIRMED | CANCELLED,
  `notes`, `createdBy`.
- Free slots for a date are computed in one server function (weekly hours →
  exception → minus bookings and lessons), never stored.
- Drop `CourtAvailability`, old `Booking`, `BookerType`, `BookingState`.

### 6.3 Coaching and activities
- `Group`: + `ageMin`, `ageMax`, `published`, `photoUrl`. Keep `dayOfWeek[]`, times, dates, price, capacity, coach.
- `GroupMember`, `Lesson`, `LessonAttendee` kept. Lessons are generated from
  group schedules for the visible week; attendance per lesson.
- `CourseOffering` (new): title, `kind` free text, `priceUnit`, price, description, `photoUrl`, published.
- `Activity` (new): title, `category` (free text with suggestion chips:
  Yoga, Pilates, Klinikë, Kamp, Turne), `startsAt`, `endsAt`, place, price,
  `guestCoachName`, `guestCoachBio`, capacity, description, `photoUrl`,
  `slug`, published.
- Drop `Package`, `UserPackage`, `UserProgress`, `ProgressUpdate`,
  `Achievement`, `UserAchievement`, `Setting`. Notes per student replace
  progress tracking.

### 6.4 Content and ops
- `SiteSettings` (single row), `Announcement`, `MediaAsset`.
- `AuditLog` (who changed what, when).

All text columns single-language.

---

## 7. Technical choices

| Concern | Choice |
|---|---|
| Framework | Next.js 16, React 19, Tailwind v4, shadcn/ui, Prisma 6, zod 4 |
| Data | Server Components + Server Actions, zod validation, authorization per action |
| Auth | Own signed-cookie session (jose HS256 + bcrypt), email + password, 30-day cookie, re-checked against the DB on every request. Chosen over Auth.js v5 because that is still a beta. Password reset by an admin from the More tab; no email vendor |
| Files | Vercel Blob for photos (free tier) |
| WhatsApp | `wa.me` links with prefilled text only |
| Dates | `date-fns` + tz, store UTC, show Europe/Tirane |
| Language | Albanian strings in code; `lang="sq"`; browser translation |
| Tests | Playwright: coach adds a student; coach publishes a group and it appears on the site; courts page builds the right WhatsApp link |
| Monitoring | Vercel logs + `/api/health` |

Env vars after the rebuild: `DATABASE_URL`, `AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`
(phase 2), optional `NEXT_PUBLIC_SITE_URL`. Seeding also reads `SEED_ADMIN_EMAIL`,
`SEED_ADMIN_PASSWORD`, `SEED_COACH_EMAIL`, `SEED_COACH_PASSWORD`.

---

## 8. Seed (what the coach sees on day one)

- Courts: "Fusha 1" and "Fusha 2" (surface, hours, prices left as sensible
  defaults he edits).
- Accounts: you as ADMIN, the coach as COACH.
- Site settings prefilled with the club name, logo, placeholder phone.
- One **unpublished** example each of a group, a course offering and an
  activity, so he sees what the forms produce and can edit or delete them.
- No students.

---

## 9. Phases

0. **Design (Claude Design).** Design system from the logo + screens: home,
   coaching, activities, courts with free slots + WhatsApp, admin Today,
   admin Courts (weekly hours, date exception),
   admin Students (list + add + student page with payments), admin Group form,
   admin Activity form.
1. **Foundation.** Fresh `src/`, one root layout, session auth with roles, Prisma
   migration baseline, seed, shadcn/ui, admin shell with tabs. **Done 2026-10-26**
   on branch `rebuild`.
2. **Admin content + public site.** Site settings, groups, courses,
   activities, courts with weekly hours and date exceptions, announcements,
   photos. Public pages render from them.
   WhatsApp links. After this phase the coach can run the site alone.
   **Done 2026-10-26** on branch `rebuild` (photos need a Vercel Blob store).
3. **Students.** Roster, groups → weekly lessons, attendance, notes,
   payments, Today tab. **Done 2026-10-27** on branch `rebuild`.
4. **Court booking log.** Logged bookings (and group lessons) mark public
   slots as taken. **Done 2026-10-27** on branch `rebuild`.
5. **Polish.** Audit log, SEO, health route, in-app how-to, cleanup of old
   branches/PRs/issues.

---

## 10. Closed decisions (2026-10-10)

- Theme: lime kept, navy replaces black, logo colors adaptable.
- Albanian only, no `/en`; browser translation; strong local SEO (4.1).
- Court booking log: yes.
- Court availability (2026-10-26): coach-set one-hour slots per weekday plus
  per-date exceptions; the site shows free slots, never a free-text time.
- Money: manual monthly fee + typed payments + balance, nothing more.
- Activities: general, free-text category.
- Roles: COACH edits everything but accounts; ADMIN manages accounts.
- Old branches, PRs #15/#22 and UI issues: delete/close once the rebuild lands.

## 11. Next steps

1. Phase 0 in Claude Design (done, awaiting review):
   - Design system: https://claude.ai/artifact/A5pnNTndZmLLZ79DRaPZmg
   - Screens: https://claude.ai/artifact/Ad37oe5iXW8rHX24EwxFVP
   - Figma clickable prototype (transitions + motion): https://www.figma.com/design/iWy76KoAPXvlJMauJchR0s
2. Branch `rebuild`; Phase 1 foundation in a fresh `src/`.
3. Prisma migration baseline from production before any schema change.
