import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { hoursToRanges } from "@/lib/courts";
import { WEEKDAYS, WEEKDAYS_MON_FIRST, WEEKDAYS_SHORT, dateToIso, formatDateSq, isoToDate, todayIso } from "@/lib/dates";
import { formatMoney } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Fushat" };

/** Groups consecutive weekdays with identical hours: "Hën–Pre 18:00–22:00". */
function summarize(byDay: Map<number, string[]>, slotMinutes: number) {
  const rows: { from: number; to: number; text: string }[] = [];
  for (const d of WEEKDAYS_MON_FIRST) {
    const text = hoursToRanges(byDay.get(d) ?? [], slotMinutes);
    const last = rows[rows.length - 1];
    if (last && last.text === text) last.to = d;
    else rows.push({ from: d, to: d, text });
  }
  return rows.map((r) => ({
    label: r.from === r.to ? WEEKDAYS_SHORT[r.from] : `${WEEKDAYS_SHORT[r.from]}–${WEEKDAYS_SHORT[r.to]}`,
    text: r.text,
  }));
}

export default async function CourtsPage() {
  const today = isoToDate(todayIso());
  const [courts, exceptions] = await Promise.all([
    prisma.court.findMany({ orderBy: { sortOrder: "asc" }, include: { weeklyHours: true } }),
    prisma.courtDateException.findMany({ where: { date: { gte: today } }, orderBy: { date: "asc" }, include: { court: { select: { name: true } } } }),
  ]);

  return (
    <>
      <PageHeader
        title="Fushat"
        right={
          <Link href="/admin/fushat/i-re" className="text-sm font-semibold text-lime underline-offset-4 hover:underline">
            Shto fushë
          </Link>
        }
      />
      <main className="relative flex min-h-[60vh] flex-col gap-5 p-4">
        <div className="rounded-xl bg-lime-soft p-3.5 text-sm">
          Orët që zgjidhni këtu shfaqen në faqe si <b className="font-semibold">orë të lira</b>. Rezervimet që shënoni dhe mësimet e grupeve i zënë vetë.
        </div>
        <ListLink href="/admin/fushat/rezervimet" title="Regjistri i rezervimeve" meta="Shënoni rezervimet e konfirmuara; zënë orën në faqe" />


        <section className="flex flex-col gap-3">
          {courts.length === 0 && <EmptyState title="Ende asnjë fushë." text="Shtoni fushën e parë nga lidhja lart djathtas." />}
          {courts.map((court) => {
            const byDay = new Map(court.weeklyHours.map((w) => [w.weekday, w.startHours]));
            return (
              <article key={court.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold">{court.name}</h2>
                    <p className="text-sm text-ink-muted">
                      {[court.indoor ? "E mbuluar" : "E hapur", court.guestHourly && `${formatMoney(court.guestHourly)} / ${formatMoney(court.memberHourly)} Lekë`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  {court.active ? <StatusBadge kind="success">Aktive</StatusBadge> : <StatusBadge kind="muted">Joaktive</StatusBadge>}
                </div>
                <dl className="divide-y border-t text-[15px]">
                  {summarize(byDay, court.slotMinutes).map((r) => (
                    <div key={r.label} className="flex justify-between gap-3 py-2">
                      <dt className="text-ink-muted">{r.label}</dt>
                      <dd className={r.text === "Mbyllur" ? "text-ink-muted" : "font-semibold tabular-nums"}>{r.text}</dd>
                    </div>
                  ))}
                </dl>
                <div className="grid grid-cols-2 gap-2">
                  <Link href={`/admin/fushat/${court.id}/oret`} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-navy text-[15px] font-semibold text-on-navy">
                    <Clock className="size-4" /> Orët e javës
                  </Link>
                  <Link href={`/admin/fushat/${court.id}`} className="flex h-11 items-center justify-center rounded-lg border-2 border-navy text-[15px] font-semibold">
                    Të dhënat
                  </Link>
                </div>
              </article>
            );
          })}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Përjashtimet · ditë të veçanta</h2>
          {exceptions.length === 0 ? (
            <EmptyState title="Asnjë ditë e veçantë e ardhshme." text="Përdoreni kur një datë ka orë të tjera nga zakonisht, ose është e mbyllur." />
          ) : (
            exceptions.map((x) => {
              const iso = dateToIso(x.date);
              return (
                <ListLink
                  key={x.id}
                  href={`/admin/fushat/perjashtimet/${x.id}`}
                  title={`${x.court.name} · ${x.startHours.length ? hoursToRanges(x.startHours) : "mbyllur"}`}
                  meta={[`${WEEKDAYS[x.date.getUTCDay()]}, ${formatDateSq(iso)}`, x.reason].filter(Boolean).join(" · ")}
                  leading={
                    <span className="flex w-12 shrink-0 flex-col items-center">
                      <span className="font-display text-2xl leading-6 font-extrabold">{x.date.getUTCDate()}</span>
                      <span className="text-[11px] text-ink-muted">{formatDateSq(iso).split(" ")[1]}</span>
                    </span>
                  }
                  badge={x.startHours.length ? undefined : <StatusBadge kind="danger">Mbyllur</StatusBadge>}
                />
              );
            })
          )}
          <p className="text-sm text-ink-muted">Një përjashtim vlen vetëm për atë datë. Pas saj fusha kthehet te orët e javës.</p>
        </section>

        <Fab href="/admin/fushat/perjashtimet/i-ri" label="Ditë e veçantë" />
      </main>
    </>
  );
}
