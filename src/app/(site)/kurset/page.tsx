import type { Metadata } from "next";
import { getSiteSettings, whatsappLink } from "@/lib/site";
import { getPublishedGroups, getPublishedOfferings } from "@/lib/public-data";
import { GroupCard, OfferingCard } from "@/components/site/cards";
import { Band, BandHead, PageIntro } from "@/components/site/band";

export const metadata: Metadata = {
  title: "Kurset e tenisit",
  description: "Grupe tenisi për fëmijë dhe të rritur sipas moshës dhe nivelit, mësime private dhe paketa në Tiranë.",
};

export default async function CoursesPage() {
  const [s, groups, offerings] = await Promise.all([getSiteSettings(), getPublishedGroups(), getPublishedOfferings()]);
  const wa = (text: string) => whatsappLink(s.whatsapp, text);

  return (
    <>
      <PageIntro eyebrow="Mësoni tenis" title="Kurset" text="Grupe të vogla sipas moshës dhe nivelit, mësime private dhe paketa. Pyesni në WhatsApp për një provë." />

      <Band className="border-y bg-raised">
        <BandHead eyebrow="Në grup" title="Grupet" text="Me trajnerin, në grupe të vogla sipas moshës dhe nivelit." />
        {groups.length === 0 ? (
          <p className="rounded-2xl border bg-surface p-6 text-ink-muted">Grupet e reja shpallen së shpejti. Na shkruani për t&apos;u njoftuar.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g, i) => (
              <GroupCard key={i} g={g} askHref={wa(`Përshëndetje! Dua të pyes për grupin "${g.name}".`)} />
            ))}
          </div>
        )}
      </Band>

      {offerings.length > 0 && (
        <Band className="bg-surface">
          <BandHead eyebrow="Individualisht" title="Mësime private dhe paketa" text="Orar sipas jush, vetëm ose me një partner." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o, i) => (
              <OfferingCard key={i} o={o} askHref={wa(`Përshëndetje! Dua të pyes për "${o.title}".`)} />
            ))}
          </div>
        </Band>
      )}
    </>
  );
}
