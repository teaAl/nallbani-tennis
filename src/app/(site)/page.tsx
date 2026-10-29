import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSiteSettings, telLink, whatsappLink } from "@/lib/site";
import { getActivities, getPublishedGroups, getPublishedOfferings } from "@/lib/public-data";
import { getAvailability } from "@/lib/availability";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS_SHORT, WEEKDAYS_MON_FIRST, todayIso } from "@/lib/dates";
import { cn, formatMoney } from "@/lib/utils";
import { ActivityCard, GroupCard, OfferingCard } from "@/components/site/cards";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { MarkedHeading } from "@/components/site/mark";
import { BouncingBall } from "@/components/site/bouncing-ball";
import { Band } from "@/components/site/band";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function SectionHead({
  eyebrow,
  title,
  text,
  href,
  linkLabel,
  onNavy,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  href: string;
  linkLabel: string;
  onNavy?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className={cn("eyebrow", onNavy ? "text-lime" : "text-lime-ink")}>{eyebrow}</p>
        <h2 className="display mt-2 text-4xl md:text-5xl">{title}</h2>
        {text && <p className={cn("mt-2", onNavy ? "text-on-navy-muted" : "text-ink-muted")}>{text}</p>}
      </div>
      <Link href={href} className={cn("inline-flex items-center gap-1 font-semibold underline underline-offset-4", onNavy ? "text-lime" : "text-lime-ink")}>
        {linkLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

/** First free court hour today, for the hero badge. */
async function firstFreeHourToday() {
  const courts = await getAvailability(todayIso(), 1);
  let best: string | null = null;
  for (const c of courts) {
    for (const h of c.days[0]?.offered ?? []) {
      if (!c.days[0]!.taken.includes(h) && (best === null || h < best)) best = h;
    }
  }
  return best;
}

export default async function HomePage() {
  const [s, groups, offerings, activities, courts, freeHour] = await Promise.all([
    getSiteSettings(),
    getPublishedGroups(3),
    getPublishedOfferings(3),
    getActivities({ upcoming: true, limit: 3 }),
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { weeklyHours: true } }),
    firstFreeHourToday(),
  ]);
  const clubName = s.clubName;
  const wa = (text: string) => whatsappLink(s.whatsapp, text);
  const telHref = telLink(s.phone);
  const cards = [...groups.map((g) => ({ kind: "group" as const, g })), ...offerings.map((o) => ({ kind: "offering" as const, o }))].slice(0, 3);

  return (
    <>
      <BouncingBall />

      {/* Hero: text left, photo right (design board "Ballina"). */}
      <section data-ball-stop className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 md:pt-20 md:pb-24">
          <div className="flex flex-col gap-5">
            {s.tagline && (
              <p className="hero-item eyebrow text-lime-ink" style={stagger(0)}>
                {s.tagline}
              </p>
            )}
            <MarkedHeading text={s.heroTitle ?? clubName} className="hero-item display max-w-[14ch] text-5xl md:text-7xl" style={stagger(1)} delay={700} />
            {s.heroText && (
              <p className="hero-item max-w-[44ch] text-lg text-ink-muted md:text-xl" style={stagger(3)}>
                {s.heroText}
              </p>
            )}
            <div className="hero-item mt-2 flex flex-wrap gap-3" style={stagger(4)}>
              <Link href="/kurset" className="inline-flex h-13 items-center gap-2 rounded-lg bg-lime px-6 text-lg font-semibold text-ink hover:bg-lime/90">
                Shiko kurset
              </Link>
              <Link href="/fushat" className="inline-flex h-13 items-center gap-2 rounded-lg border-2 border-navy px-6 text-lg font-semibold text-ink hover:bg-navy hover:text-on-navy">
                Rezervo një fushë
              </Link>
            </div>
          </div>

          <div className="hero-item relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy md:aspect-[5/4]" style={stagger(2)}>
            {s.heroPhotoUrl ? (
              <Image src={s.heroPhotoUrl} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            ) : (
              <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden="true">
                <rect width="400" height="320" fill="var(--navy)" />
                <g fill="none" stroke="var(--lime)" strokeWidth="3" opacity="0.7">
                  <path d="M-40 300 L 200 -40" />
                  <path d="M60 340 L 300 -40" />
                  <path d="M-60 180 L 460 180" />
                </g>
              </svg>
            )}
            {(freeHour || wa("Përshëndetje!")) && (
              <Link
                href="/fushat"
                className="absolute bottom-5 left-5 flex flex-col rounded-xl bg-navy/95 px-4 py-3 text-on-navy shadow-lg backdrop-blur hover:bg-navy"
              >
                <span className="eyebrow text-lime">Sot</span>
                <span className="font-semibold">{freeHour ? `Fusha e lirë nga ${freeHour}` : "Shiko orët e lira"}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {cards.length > 0 && (
        <Band className="border-y bg-raised">
          <SectionHead eyebrow="Mësoni tenis" title="Kurset" text="Grupe të vogla sipas moshës dhe nivelit." href="/kurset" linkLabel="Shiko të gjitha kurset" />
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c, i) =>
              c.kind === "group" ? (
                <GroupCard key={i} g={c.g} askHref={wa(`Përshëndetje! Dua të pyes për grupin "${c.g.name}".`)} />
              ) : (
                <OfferingCard key={i} o={c.o} askHref={wa(`Përshëndetje! Dua të pyes për "${c.o.title}".`)} />
              ),
            )}
          </div>
        </Band>
      )}

      {activities.length > 0 && (
        <Band className="bg-surface">
          <SectionHead eyebrow="Çfarë ndodh" title="Aktivitetet" text="Yoga, kampe, turne dhe trajnerë të ftuar." href="/aktivitetet" linkLabel="Të gjitha aktivitetet" />
          <div className="grid gap-4 md:grid-cols-3">
            {activities.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={wa(`Përshëndetje! Dua të regjistrohem për "${a.title}".`)} />
            ))}
          </div>
        </Band>
      )}

      {courts.length > 0 && (
        <Band className="bg-navy text-on-navy">
          <SectionHead eyebrow="Luani vetë" title="Fushat" text="Rezervoni një orë fushe me WhatsApp." href="/fushat" linkLabel="Shiko orët e lira" onNavy />
          <div className="grid gap-4 sm:grid-cols-2">
            {courts.map((c) => {
              const byDay = new Map(c.weeklyHours.map((w) => [w.weekday, w.startHours]));
              const openDays = WEEKDAYS_MON_FIRST.filter((d) => (byDay.get(d) ?? []).length > 0);
              return (
                <Link key={c.id} href="/fushat" className="lift flex flex-col gap-2 rounded-2xl border border-on-navy/15 bg-navy-dark p-5 text-on-navy">
                  <span className="eyebrow text-on-navy-muted">{c.indoor ? "E mbuluar" : "E hapur"}</span>
                  <span className="font-display text-3xl leading-8 font-bold">{c.name}</span>
                  {c.description && <span className="text-sm text-on-navy-muted">{c.description}</span>}
                  {openDays.length > 0 && (
                    <span className="text-sm">
                      {openDays.length === 7 ? "Çdo ditë" : openDays.map((d) => WEEKDAYS_SHORT[d]).join(", ")} ·{" "}
                      {hoursToRanges(byDay.get(openDays[0]!) ?? [], c.slotMinutes)}
                    </span>
                  )}
                  {c.guestHourly && (
                    <span className="mt-1 flex items-baseline gap-1.5">
                      <span className="display text-3xl text-lime tabular-nums">{formatMoney(c.guestHourly)}</span>
                      <span className="text-sm text-on-navy-muted">Lekë / orë</span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </Band>
      )}

      {s.coachName && (
        <Band className="bg-raised">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-14">
            {s.coachPhotoUrl ? (
              <Image src={s.coachPhotoUrl} alt={s.coachName} width={640} height={800} className="aspect-[4/5] w-full max-w-sm rounded-3xl object-cover" />
            ) : (
              <div className="flex aspect-[4/5] w-full max-w-sm items-center justify-center rounded-3xl bg-lime-soft">
                <span className="display text-8xl text-lime-ink">{s.coachName.charAt(0)}</span>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <p className="eyebrow text-lime-ink">Trajneri</p>
              <MarkedHeading as="h2" text={s.coachName} className="display text-4xl md:text-6xl" delay={0} />
              {s.coachBio && <p className="max-w-[60ch] text-lg whitespace-pre-line text-ink-muted">{s.coachBio}</p>}
              <Link href="/kontakt" className="inline-flex items-center gap-1 font-semibold text-lime-ink underline underline-offset-4">
                Rreth klubit <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Band>
      )}

      <Band className="-mb-16 bg-lime-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="display text-3xl md:text-4xl">Keni pyetje?</h2>
            <p className="mt-1 text-ink-muted">{[s.openingHoursText, s.address].filter(Boolean).join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {wa("Përshëndetje!") && (
              <a href={wa("Përshëndetje!")!} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-lg bg-navy px-5 font-semibold text-on-navy">
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
            )}
            {telHref && (
              <a href={telHref} className="inline-flex h-12 items-center gap-2 rounded-lg border-2 border-navy px-5 font-semibold">
                <Phone className="size-5" /> {s.phone}
              </a>
            )}
          </div>
        </div>
      </Band>
    </>
  );
}
