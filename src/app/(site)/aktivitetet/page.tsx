import type { Metadata } from "next";
import { getSiteSettings, whatsappLink } from "@/lib/site";
import { getActivities } from "@/lib/public-data";
import { ActivityCard } from "@/components/site/cards";
import { Band, BandHead, PageIntro } from "@/components/site/band";

export const metadata: Metadata = {
  title: "Aktivitetet",
  description: "Yoga, pilates, kampe tenisi, turne dhe trajnerë të ftuar në Tiranë.",
};

export default async function ActivitiesPage() {
  const [s, upcoming, past] = await Promise.all([
    getSiteSettings(),
    getActivities({ upcoming: true }),
    getActivities({ upcoming: false, limit: 9 }),
  ]);
  const wa = (text: string) => whatsappLink(s.whatsapp, text);

  return (
    <>
      <PageIntro eyebrow="Më shumë se tenis" title="Aktivitetet" text="Yoga, kampe, turne dhe trajnerë të ftuar. Regjistrohuni me një mesazh në WhatsApp." />

      <Band className="border-y bg-raised">
        <BandHead eyebrow="Kalendari" title="Së shpejti" text="Aktivitetet e radhës në klub. Vendet janë të kufizuara." />
        {upcoming.length === 0 ? (
          <p className="rounded-2xl border bg-surface p-6 text-ink-muted">Asnjë aktivitet i planifikuar për momentin. Kthehuni së shpejti ose na shkruani.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={wa(`Përshëndetje! Dua të regjistrohem për "${a.title}".`)} />
            ))}
          </div>
        )}
      </Band>

      {past.length > 0 && (
        <Band className="bg-sunken">
          <BandHead eyebrow="Arkivi" title="Të kaluara" text="Çfarë kemi bërë deri tani." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={null} past />
            ))}
          </div>
        </Band>
      )}
    </>
  );
}
