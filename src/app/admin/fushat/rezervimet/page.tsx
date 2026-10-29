import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { dateToIso, formatDateSq, isoToDate, todayIso } from "@/lib/dates";
import { durationLabel } from "@/lib/lessons";
import { formatMoney } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Rezervimet" };

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ te?: string }> }) {
  const { te } = await searchParams;
  const past = te === "kaluara";
  const today = isoToDate(todayIso());
  const bookings = await prisma.courtBooking.findMany({
    where: past ? { date: { lt: today } } : { date: { gte: today } },
    orderBy: past ? [{ date: "desc" }, { startTime: "desc" }] : [{ date: "asc" }, { startTime: "asc" }],
    take: past ? 60 : 200,
    include: { court: { select: { name: true } } },
  });

  const byDate = new Map<string, typeof bookings>();
  for (const b of bookings) {
    const key = dateToIso(b.date);
    byDate.set(key, [...(byDate.get(key) ?? []), b]);
  }

  return (
    <>
      <PageHeader eyebrow="Fushat" title="Rezervimet" subtitle="Regjistri i rezervimeve që keni konfirmuar" back={{ href: "/admin/fushat", label: "Kthehu" }}>
        <div className="mt-3 flex gap-2">
          {[
            { href: "/admin/fushat/rezervimet", label: "Të ardhshme", on: !past },
            { href: "/admin/fushat/rezervimet?te=kaluara", label: "Të kaluara", on: past },
          ].map((t) => (
            <a key={t.href} href={t.href} className={t.on ? "inline-flex h-8 items-center rounded-full bg-lime px-3 text-sm font-semibold text-ink" : "inline-flex h-8 items-center rounded-full border border-[#4a5b85] px-3 text-sm font-semibold text-on-navy"}>
              {t.label}
            </a>
          ))}
        </div>
      </PageHeader>
      <main className="relative flex min-h-[60vh] flex-col gap-5 p-4">
        {bookings.length === 0 ? (
          <EmptyState title={past ? "Asnjë rezervim i kaluar." : "Asnjë rezervim i ardhshëm."} text="Kur konfirmoni një rezervim në WhatsApp, shënojeni këtu: shfaqet te Sot dhe ora zihet në faqe." />
        ) : (
          [...byDate.entries()].map(([date, items]) => (
            <section key={date} className="flex flex-col gap-2">
              <h2 className="eyebrow text-ink-muted capitalize">{formatDateSq(date, { weekday: true })}</h2>
              {items.map((b) => (
                <ListLink
                  key={b.id}
                  href={`/admin/fushat/rezervimet/${b.id}`}
                  title={b.name}
                  meta={[b.court.name, `${b.startTime}–${b.endTime}`, durationLabel(b.startTime, b.endTime), b.phone].filter(Boolean).join(" · ")}
                  leading={<span className="w-14 shrink-0 font-display text-2xl font-extrabold tabular-nums">{b.startTime}</span>}
                  badge={b.price === null ? undefined : b.paid ? <StatusBadge kind="success">Paguar</StatusBadge> : <StatusBadge kind="warning">{formatMoney(b.price)} L</StatusBadge>}
                />
              ))}
            </section>
          ))
        )}
        <Fab href="/admin/fushat/rezervimet/i-ri" label="Shëno rezervim" />
      </main>
    </>
  );
}
