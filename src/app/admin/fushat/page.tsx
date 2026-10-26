import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS, WEEKDAYS_MON_FIRST } from "@/lib/dates";
import { formatMoney } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Fushat" };

export default async function CourtsPage() {
  const courts = await prisma.court.findMany({
    orderBy: { sortOrder: "asc" },
    include: { weeklyHours: true },
  });

  return (
    <>
      <PageHeader title="Fushat" right={<span className="text-sm text-on-navy-muted">{courts.filter((c) => c.active).length} aktive</span>} />
      <main className="flex flex-col gap-4 p-4">
        <div className="rounded-xl bg-lime-soft p-3.5 text-sm">
          Orët që zgjidhni këtu shfaqen në faqe si <b className="font-semibold">orë të lira</b>. Ndryshimi i tyre hapet në fazën 2.
        </div>
        {courts.map((court) => {
          const byDay = new Map(court.weeklyHours.map((w) => [w.weekday, w.startHours]));
          return (
            <section key={court.id} className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold">{court.name}</h2>
                  <p className="text-sm text-ink-muted">
                    {[court.indoor ? "E mbyllur" : "E hapur", court.guestHourly && `${formatMoney(court.guestHourly)} Lekë/orë`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <span
                  className={
                    court.active
                      ? "rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold tracking-wider text-success uppercase"
                      : "rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold tracking-wider text-ink-muted uppercase"
                  }
                >
                  {court.active ? "Aktive" : "Joaktive"}
                </span>
              </div>
              <dl className="mt-3 divide-y border-t text-[15px]">
                {WEEKDAYS_MON_FIRST.map((weekday) => (
                  <div key={weekday} className="flex justify-between gap-3 py-2">
                    <dt className="text-ink-muted capitalize">{WEEKDAYS[weekday]}</dt>
                    <dd className="font-semibold tabular-nums">{hoursToRanges(byDay.get(weekday) ?? [], court.slotMinutes)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </main>
    </>
  );
}
