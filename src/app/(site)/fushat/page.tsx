import type { Metadata } from "next";
import { MarkedHeading } from "@/components/site/mark";
import { getAvailability } from "@/lib/availability";
import { getSiteSettings } from "@/lib/site";
import { hoursToRanges } from "@/lib/courts";
import { todayIso } from "@/lib/dates";
import { formatMoney } from "@/lib/utils";
import { SlotPicker } from "./slot-picker";

export const metadata: Metadata = {
  title: "Fushat e tenisit, rezervim me orë",
  description: "Rezervoni një fushë tenisi me orë në Tiranë. Shikoni orët e lira dhe dërgoni kërkesën në WhatsApp.",
  alternates: { canonical: "/fushat" },
};

export default async function CourtsPage() {
  const today = todayIso();
  const [s, courts] = await Promise.all([getSiteSettings(), getAvailability(today, 7)]);
  const withPrice = courts.find((c) => c.guestHourly !== null);
  const bundles = withPrice?.bundles ?? [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-12">
      <header className="flex flex-col gap-3">
        <p className="eyebrow text-lime-ink">Rezervim me orë</p>
        <MarkedHeading text="Fushat" className="display text-5xl md:text-7xl" />
        <p className="max-w-[48ch] text-lg text-ink-muted">Orët e lira i vendos klubi. Zgjidhni ditën dhe orën, dhe kërkesa hapet gati në WhatsApp.</p>
      </header>

      {courts.length === 0 ? (
        <p className="rounded-2xl border bg-card p-6 text-ink-muted">Fushat nuk janë në dispozicion për momentin.</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {courts.map((c) => {
                const weekdaySample = c.days.find((d) => d.offered.length > 0 && !d.closedByException);
                return (
                  <article key={c.id} className="flex flex-col gap-2 rounded-2xl border bg-card p-5">
                    <span className="eyebrow text-ink-muted">{c.indoor ? "E mbuluar" : "E hapur"}</span>
                    <h2 className="font-display text-3xl leading-8 font-bold">{c.name}</h2>
                    {c.description && <p className="text-sm text-ink-muted">{c.description}</p>}
                    {weekdaySample && <p className="text-sm">Zakonisht {hoursToRanges(weekdaySample.offered, c.slotMinutes)}</p>}
                  </article>
                );
              })}
            </div>

            {withPrice && (
              <section className="flex flex-col gap-3">
                <h2 className="eyebrow text-ink-muted">Çmimet</h2>
                <div className="divide-y overflow-hidden rounded-2xl border bg-card">
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <span>1 orë</span>
                    <span className="font-semibold tabular-nums">{formatMoney(withPrice.guestHourly)} Lekë</span>
                  </div>
                  {bundles.map((b) => {
                    const discount = withPrice.guestHourly ? Math.round((1 - b.price / (b.hours * withPrice.guestHourly)) * 100) : 0;
                    return (
                      <div key={b.hours} className="flex items-center justify-between gap-3 px-4 py-3">
                        <span>Paketë {b.hours} orë</span>
                        <span className="flex items-center gap-2">
                          {discount > 0 && <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">−{discount}%</span>}
                          <span className="font-semibold tabular-nums">{formatMoney(b.price)} Lekë</span>
                        </span>
                      </div>
                    );
                  })}
                  {withPrice.memberHourly !== null && (
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <span>Nxënësit e klubit</span>
                      <span className="font-semibold tabular-nums">{formatMoney(withPrice.memberHourly)} Lekë / orë</span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <SlotPicker courts={courts} todayIso={today} whatsapp={s.whatsapp} />
        </div>
      )}
    </div>
  );
}
