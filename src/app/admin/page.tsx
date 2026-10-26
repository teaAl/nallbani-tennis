import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { addDays, formatDateSq, isoToDate, todayIso, WEEKDAYS } from "@/lib/dates";
import { durationLabel, getLessonsForDate } from "@/lib/lessons";
import { cn, formatMoney } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";

export default async function TodayPage({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const { d } = await searchParams;
  const today = todayIso();
  const dateIso = d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : today;
  const date = isoToDate(dateIso);
  const offset = Math.round((date.getTime() - isoToDate(today).getTime()) / 86_400_000);

  const [lessons, activities, bookings] = await Promise.all([
    getLessonsForDate(dateIso),
    prisma.activity.findMany({
      where: { OR: [{ startDate: date }, { AND: [{ startDate: { lte: date } }, { endDate: { gte: date } }] }] },
      orderBy: { startTime: "asc" },
    }),
    prisma.courtBooking.findMany({ where: { date, status: "CONFIRMED" }, orderBy: { startTime: "asc" }, include: { court: { select: { name: true } } } }),
  ]);

  const title = offset === 0 ? `Sot, ${WEEKDAYS[date.getUTCDay()]}` : offset === 1 ? `Nesër, ${WEEKDAYS[date.getUTCDay()]}` : offset === -1 ? `Dje, ${WEEKDAYS[date.getUTCDay()]}` : formatDateSq(dateIso, { weekday: true });
  const counts = [lessons.length ? `${lessons.length} mësime` : null, bookings.length ? `${bookings.length} rezervime` : null, activities.length ? `${activities.length} aktivitet` : null]
    .filter(Boolean)
    .join(" · ");

  const navBtn = "flex size-10 items-center justify-center rounded-lg border-[1.5px] border-on-navy-muted text-on-navy hover:bg-navy-dark";

  return (
    <>
      <PageHeader eyebrow="Paneli i trajnerit" title={title} subtitle={`${formatDateSq(dateIso, { year: true })}${counts ? ` · ${counts}` : ""}`}>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Link href={`/admin?d=${addDays(dateIso, -1)}`} aria-label="Dita e kaluar" className={navBtn}>
            <ChevronLeft className="size-5" />
          </Link>
          {offset !== 0 ? (
            <Link href="/admin" className="text-sm font-semibold text-lime underline-offset-4 hover:underline">
              Kthehu te sot
            </Link>
          ) : (
            <span className="text-sm text-on-navy-muted">Rrëshqitni nëpër ditë</span>
          )}
          <Link href={`/admin?d=${addDays(dateIso, 1)}`} aria-label="Dita tjetër" className={navBtn}>
            <ChevronRight className="size-5" />
          </Link>
        </div>
      </PageHeader>

      <main className="flex flex-col gap-5 p-4">
        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Mësimet</h2>
          {lessons.length === 0 ? (
            <div className="rounded-xl border bg-card p-4 text-sm text-ink-muted">Asnjë mësim këtë ditë. Mësimet vijnë nga ditët e grupeve te Përmbajtja → Grupet.</div>
          ) : (
            lessons.map((l) => {
              const cancelled = l.status === "CANCELLED";
              return (
                <Link
                  key={l.id}
                  href={`/admin/mesimet/${l.id}`}
                  className={cn("flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3 text-ink", cancelled && "opacity-60")}
                >
                  <span className="flex w-14 shrink-0 flex-col items-center">
                    <span className="font-display text-2xl leading-6 font-extrabold tabular-nums">{l.startTime}</span>
                    <span className="text-xs text-ink-muted">{durationLabel(l.startTime, l.endTime)}</span>
                  </span>
                  <span className={cn("w-[3px] self-stretch rounded", cancelled ? "bg-danger" : l.attendanceTaken ? "bg-success" : "bg-lime")} />
                  <span className="flex min-w-0 grow flex-col">
                    <span className={cn("font-semibold", cancelled && "line-through")}>{l.groupName}</span>
                    <span className="text-sm text-ink-muted">{[l.courtName, `${l.memberCount} nxënës`].filter(Boolean).join(" · ")}</span>
                    {cancelled ? (
                      <span className="text-sm font-semibold text-danger">Anuluar</span>
                    ) : l.attendanceTaken ? (
                      <span className="text-sm font-semibold text-success">
                        Prezenca e marrë · {l.presentCount} nga {l.memberCount}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-lime-ink">Merr prezencën</span>
                    )}
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-line-strong" />
                </Link>
              );
            })
          )}
        </section>

        {activities.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="eyebrow text-ink-muted">Aktivitetet</h2>
            {activities.map((a) => (
              <Link key={a.id} href={`/admin/permbajtja/aktivitetet/${a.id}`} className="flex items-center gap-3 rounded-xl bg-lime-soft px-3.5 py-3 text-ink">
                <span className="flex min-w-0 grow flex-col">
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-sm text-ink-muted">{[a.startTime && `${a.startTime}${a.endTime ? `–${a.endTime}` : ""}`, a.place, a.category].filter(Boolean).join(" · ")}</span>
                </span>
                {!a.published && <StatusBadge kind="warning">Draft</StatusBadge>}
                <ChevronRight className="size-5 shrink-0 text-line-strong" />
              </Link>
            ))}
          </section>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Rezervimet e fushave</h2>
          {bookings.length === 0 ? (
            <div className="rounded-xl border bg-card p-4 text-sm text-ink-muted">Asnjë rezervim i shënuar. Regjistri i rezervimeve vjen në fazën 4.</div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3">
                <span className="flex w-14 shrink-0 flex-col items-center">
                  <span className="font-display text-2xl leading-6 font-extrabold tabular-nums">{b.startTime}</span>
                  <span className="text-xs text-ink-muted">{durationLabel(b.startTime, b.endTime)}</span>
                </span>
                <span className="w-[3px] self-stretch rounded bg-navy" />
                <span className="flex min-w-0 grow flex-col">
                  <span className="font-semibold">{b.name}</span>
                  <span className="text-sm text-ink-muted">{[b.court.name, b.phone].filter(Boolean).join(" · ")}</span>
                </span>
                {b.price !== null && (b.paid ? <StatusBadge kind="success">Paguar</StatusBadge> : <StatusBadge kind="warning">{formatMoney(b.price)} L</StatusBadge>)}
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}
