import { prisma } from "@/lib/prisma";
import { todayIso, isoToDate, formatDateSq, WEEKDAYS } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";

export default async function TodayPage() {
  const today = todayIso();
  const [students, groups, courts, bookings] = await prisma.$transaction([
    prisma.user.count({ where: { role: "STUDENT", status: "ACTIVE" } }),
    prisma.group.count({ where: { published: true } }),
    prisma.court.count({ where: { active: true } }),
    prisma.courtBooking.count({ where: { date: isoToDate(today), status: "CONFIRMED" } }),
  ]);

  const stats = [
    { label: "Nxënës aktivë", value: students },
    { label: "Grupe të publikuara", value: groups },
    { label: "Fusha aktive", value: courts },
    { label: "Rezervime sot", value: bookings },
  ];

  return (
    <>
      <PageHeader eyebrow="Paneli i trajnerit" title={`Sot, ${WEEKDAYS[isoToDate(today).getUTCDay()]}`} subtitle={formatDateSq(today, { year: true })} />
      <main className="flex flex-col gap-5 p-4">
        <section className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4">
              <p className="text-sm text-ink-muted">{s.label}</p>
              <p className="display mt-1 text-4xl">{s.value}</p>
            </div>
          ))}
        </section>
        <section className="rounded-xl bg-lime-soft p-4 text-sm">
          <p className="font-semibold">Çfarë vjen këtu</p>
          <p className="mt-1 text-ink-muted">
            Mësimet e ditës me prezencën, aktivitetet dhe rezervimet e fushave. Shtohen në fazat 2–4 të ndërtimit.
          </p>
        </section>
      </main>
    </>
  );
}
