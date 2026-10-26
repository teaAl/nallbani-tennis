import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSiteSettings, telLink, whatsappLink } from "@/lib/site";
import { getActivities, getPublishedGroups, getPublishedOfferings } from "@/lib/public-data";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS_SHORT, WEEKDAYS_MON_FIRST } from "@/lib/dates";
import { formatMoney } from "@/lib/utils";
import { ActivityCard, GroupCard, OfferingCard } from "@/components/site/cards";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { MarkedHeading } from "@/components/site/mark";
import { Reveal } from "@/components/site/reveal";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

function SectionHead({ title, text, href, linkLabel }: { title: string; text?: string; href: string; linkLabel: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="display text-4xl md:text-5xl">{title}</h2>
        {text && <p className="mt-2 text-ink-muted">{text}</p>}
      </div>
      <Link href={href} className="inline-flex items-center gap-1 font-semibold text-lime-ink underline underline-offset-4">
        {linkLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [s, groups, offerings, activities, courts] = await Promise.all([
    getSiteSettings(),
    getPublishedGroups(3),
    getPublishedOfferings(3),
    getActivities({ upcoming: true, limit: 3 }),
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { weeklyHours: true } }),
  ]);
  const clubName = s.clubName;
  const wa = (text: string) => whatsappLink(s.whatsapp, text);
  const telHref = telLink(s.phone);
  const cards = [...groups.map((g) => ({ kind: "group" as const, g })), ...offerings.map((o) => ({ kind: "offering" as const, o }))].slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-on-navy">
        {s.heroPhotoUrl && (
          <>
            <Image src={s.heroPhotoUrl} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" aria-hidden="true" />
          </>
        )}
        <div className="relative mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-14 pb-16 md:pt-24 md:pb-24">
          {s.tagline && (
            <p className="hero-item eyebrow text-lime" style={stagger(0)}>
              {s.tagline}
            </p>
          )}
          <MarkedHeading text={s.heroTitle ?? clubName} className="hero-item display max-w-[14ch] text-5xl md:text-7xl" style={stagger(1)} delay={700} />
          {s.heroText && (
            <p className="hero-item max-w-[44ch] text-lg text-on-navy-muted md:text-xl" style={stagger(3)}>
              {s.heroText}
            </p>
          )}
          <div className="hero-item mt-2 flex flex-wrap gap-3" style={stagger(4)}>
            {wa("Përshëndetje! Dua të pyes për tenis te " + clubName + ".") && (
              <a
                href={wa("Përshëndetje! Dua të pyes për tenis te " + clubName + ".")!}
                target="_blank"
                rel="noopener"
                className="inline-flex h-13 items-center gap-2 rounded-lg bg-lime px-5 text-lg font-semibold text-ink"
              >
                <WhatsAppIcon className="size-5" /> Na shkruani në WhatsApp
              </a>
            )}
            <Link href="/kurset" className="inline-flex h-13 items-center gap-2 rounded-lg border-2 border-on-navy-muted px-5 text-lg font-semibold">
              Shiko kurset
            </Link>
          </div>
        </div>
      </section>

      {cards.length > 0 && (
        <Reveal><section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-14">
          <SectionHead title="Kurset" text="Grupe të vogla sipas moshës dhe nivelit." href="/kurset" linkLabel="Shiko të gjitha kurset" />
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c, i) =>
              c.kind === "group" ? (
                <GroupCard key={i} g={c.g} askHref={wa(`Përshëndetje! Dua të pyes për grupin "${c.g.name}".`)} />
              ) : (
                <OfferingCard key={i} o={c.o} askHref={wa(`Përshëndetje! Dua të pyes për "${c.o.title}".`)} />
              ),
            )}
          </div>
        </section></Reveal>
      )}

      {activities.length > 0 && (
        <Reveal><section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-14">
          <SectionHead title="Aktivitetet" text="Yoga, kampe, turne dhe trajnerë të ftuar." href="/aktivitetet" linkLabel="Të gjitha aktivitetet" />
          <div className="grid gap-4 md:grid-cols-3">
            {activities.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={wa(`Përshëndetje! Dua të regjistrohem për "${a.title}".`)} />
            ))}
          </div>
        </section></Reveal>
      )}

      {courts.length > 0 && (
        <Reveal><section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-14">
          <SectionHead title="Fushat" text="Rezervoni një orë fushe me WhatsApp." href="/fushat" linkLabel="Shiko orët e lira" />
          <div className="grid gap-4 sm:grid-cols-2">
            {courts.map((c) => {
              const byDay = new Map(c.weeklyHours.map((w) => [w.weekday, w.startHours]));
              const openDays = WEEKDAYS_MON_FIRST.filter((d) => (byDay.get(d) ?? []).length > 0);
              return (
                <Link key={c.id} href="/fushat" className="lift flex flex-col gap-2 rounded-2xl border bg-card p-5 text-ink">
                  <span className="eyebrow text-ink-muted">{c.indoor ? "E mbuluar" : "E hapur"}</span>
                  <span className="font-display text-3xl leading-8 font-bold">{c.name}</span>
                  {c.description && <span className="text-sm text-ink-muted">{c.description}</span>}
                  {openDays.length > 0 && (
                    <span className="text-sm">
                      {openDays.length === 7 ? "Çdo ditë" : openDays.map((d) => WEEKDAYS_SHORT[d]).join(", ")} ·{" "}
                      {hoursToRanges(byDay.get(openDays[0]!) ?? [], c.slotMinutes)}
                    </span>
                  )}
                  {c.guestHourly && (
                    <span className="mt-1 flex items-baseline gap-1.5">
                      <span className="display text-3xl text-lime-ink tabular-nums">{formatMoney(c.guestHourly)}</span>
                      <span className="text-sm text-ink-muted">Lekë / orë</span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </section></Reveal>
      )}

      <Reveal><section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="flex flex-col gap-4 rounded-2xl bg-lime-soft p-6 md:flex-row md:items-center md:justify-between md:p-8">
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
      </section></Reveal>
    </>
  );
}
