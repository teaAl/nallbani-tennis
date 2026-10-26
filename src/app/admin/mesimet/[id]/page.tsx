import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso, formatDateSq } from "@/lib/dates";
import { durationLabel } from "@/lib/lessons";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { Button } from "@/components/ui/button";
import { AttendanceList } from "./attendance-list";
import { setLessonStatus } from "./actions";

export const metadata: Metadata = { title: "Mësimi" };

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      group: { include: { members: { where: { leftAt: null }, include: { user: { select: { id: true, name: true, status: true } } } } } },
      court: { select: { name: true } },
      attendees: true,
    },
  });
  if (!lesson) notFound();

  const dateIso = dateToIso(lesson.date);
  const members = (lesson.group?.members ?? [])
    .map((m) => m.user)
    .filter((u) => u.status === "ACTIVE")
    .sort((a, b) => a.name.localeCompare(b.name));
  const rows = members.map((u) => ({
    userId: u.id,
    name: u.name,
    status: (lesson.attendees.find((a) => a.userId === u.id)?.status ?? null) as "PRESENT" | "ABSENT" | null,
  }));
  const cancelled = lesson.status === "CANCELLED";

  return (
    <>
      <PageHeader
        eyebrow={formatDateSq(dateIso, { weekday: true })}
        title={lesson.group?.name ?? "Mësim"}
        subtitle={[`${lesson.startTime}–${lesson.endTime}`, durationLabel(lesson.startTime, lesson.endTime), lesson.court?.name].filter(Boolean).join(" · ")}
        back={{ href: `/admin?d=${dateIso}`, label: "Kthehu te dita" }}
        right={cancelled ? <StatusBadge kind="danger">Anuluar</StatusBadge> : undefined}
      />
      <main className="flex flex-col gap-5 p-4">
        {cancelled ? (
          <div className="rounded-xl bg-danger-soft p-4 text-sm text-danger">
            Ky mësim është anuluar. Nuk zë fushën dhe nuk llogaritet në prezencë.
          </div>
        ) : (
          <section className="flex flex-col gap-2">
            <h2 className="eyebrow text-ink-muted">Prezenca</h2>
            {rows.length === 0 ? (
              <div className="rounded-xl border bg-card p-4 text-sm text-ink-muted">
                Grupi nuk ka ende nxënës. Shtoni nxënës dhe zgjidhni këtë grup te{" "}
                <Link href="/admin/nxenesit" className="font-semibold text-lime-ink underline underline-offset-4">
                  Nxënësit
                </Link>
                .
              </div>
            ) : (
              <AttendanceList lessonId={lesson.id} rows={rows} />
            )}
            <p className="text-xs text-ink-muted">Çdo prekje ruhet menjëherë. Pa shenjë = ende pa marrë.</p>
          </section>
        )}

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Mësimi</h2>
          <form action={setLessonStatus} className="flex flex-col gap-2 rounded-xl border bg-card p-4">
            <input type="hidden" name="id" value={lesson.id} />
            <input type="hidden" name="status" value={cancelled ? "SCHEDULED" : "CANCELLED"} />
            <p className="text-sm text-ink-muted">
              {cancelled ? "Riktheje nëse mësimi do të mbahet." : "Anuloje nëse mësimi nuk mbahet këtë ditë (shi, festë…). Ora e fushës lirohet në faqe."}
            </p>
            <Button type="submit" variant="outline" className={cancelled ? "h-11 border-2 border-success font-semibold text-success" : "h-11 border-2 border-danger font-semibold text-danger"}>
              {cancelled ? "Rikthe mësimin" : "Anulo mësimin e kësaj dite"}
            </Button>
          </form>
          {lesson.group && (
            <Link href={`/admin/permbajtja/grupet/${lesson.group.id}`} className="px-1 text-sm font-semibold text-lime-ink underline underline-offset-4">
              Hap grupin
            </Link>
          )}
        </section>
      </main>
    </>
  );
}
