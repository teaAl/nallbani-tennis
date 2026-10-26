import type { Metadata } from "next";
import { MarkedHeading } from "@/components/site/mark";
import { getSiteSettings, whatsappLink } from "@/lib/site";
import { getActivities } from "@/lib/public-data";
import { ActivityCard } from "@/components/site/cards";

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
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-12">
      <header className="flex flex-col gap-3">
        <p className="eyebrow text-lime-ink">Më shumë se tenis</p>
        <MarkedHeading text="Aktivitetet" className="display text-5xl md:text-7xl" />
        <p className="max-w-[48ch] text-lg text-ink-muted">Yoga, kampe, turne dhe trajnerë të ftuar. Regjistrohuni me një mesazh në WhatsApp.</p>
      </header>

      <section className="flex flex-col gap-5">
        <h2 className="display text-3xl">Së shpejti</h2>
        {upcoming.length === 0 ? (
          <p className="rounded-2xl border bg-card p-6 text-ink-muted">Asnjë aktivitet i planifikuar për momentin. Kthehuni së shpejti ose na shkruani.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={wa(`Përshëndetje! Dua të regjistrohem për "${a.title}".`)} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="display text-3xl text-ink-muted">Të kaluara</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {past.map((a, i) => (
              <ActivityCard key={i} a={a} askHref={null} past />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
