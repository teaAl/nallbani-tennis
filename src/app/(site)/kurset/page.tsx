import type { Metadata } from "next";
import { MarkedHeading } from "@/components/site/mark";
import { getSiteSettings, whatsappLink } from "@/lib/site";
import { getPublishedGroups, getPublishedOfferings } from "@/lib/public-data";
import { GroupCard, OfferingCard } from "@/components/site/cards";

export const metadata: Metadata = {
  title: "Kurset e tenisit",
  description: "Grupe tenisi për fëmijë dhe të rritur sipas moshës dhe nivelit, mësime private dhe paketa në Tiranë.",
};

export default async function CoursesPage() {
  const [s, groups, offerings] = await Promise.all([getSiteSettings(), getPublishedGroups(), getPublishedOfferings()]);
  const wa = (text: string) => whatsappLink(s.whatsapp, text);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-12">
      <header className="flex flex-col gap-3">
        <p className="eyebrow text-lime-ink">Mësoni tenis</p>
        <MarkedHeading text="Kurset" className="display text-5xl md:text-7xl" />
        <p className="max-w-[48ch] text-lg text-ink-muted">Grupe të vogla sipas moshës dhe nivelit, mësime private dhe paketa. Pyesni në WhatsApp për një provë.</p>
      </header>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Grupet</h2>
        {groups.length === 0 ? (
          <p className="rounded-2xl border bg-card p-6 text-ink-muted">Grupet e reja shpallen së shpejti. Na shkruani për t&apos;u njoftuar.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => (
              <GroupCard key={i} g={g} askHref={wa(`Përshëndetje! Dua të pyes për grupin "${g.name}".`)} />
            ))}
          </div>
        )}
      </section>

      {offerings.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="display text-3xl">Mësime private dhe paketa</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <OfferingCard key={i} o={o} askHref={wa(`Përshëndetje! Dua të pyes për "${o.title}".`)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
