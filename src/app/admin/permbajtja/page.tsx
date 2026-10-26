import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { todayIso, isoToDate } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Përmbajtja" };

export default async function ContentPage() {
  const today = isoToDate(todayIso());
  const [groups, groupsPublished, offerings, activities, announcements] = await prisma.$transaction([
    prisma.group.count(),
    prisma.group.count({ where: { published: true } }),
    prisma.courseOffering.count(),
    prisma.activity.count({ where: { OR: [{ startDate: { gte: today } }, { endDate: { gte: today } }] } }),
    prisma.announcement.count({ where: { active: true } }),
  ]);

  const sections = [
    { title: "Grupet", detail: `${groupsPublished} të publikuara nga ${groups}` },
    { title: "Kurset", detail: `${offerings} oferta` },
    { title: "Aktivitetet", detail: `${activities} të ardhshme` },
    { title: "Faqja", detail: `Tekstet, kontakti, ${announcements} njoftim aktiv` },
  ];

  return (
    <>
      <PageHeader title="Përmbajtja" subtitle="Çfarë shfaqet në faqen publike" />
      <main className="flex flex-col gap-3 p-4">
        {sections.map((s) => (
          <div key={s.title} className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5">
            <div>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-ink-muted">{s.detail}</p>
            </div>
            <span className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold tracking-wider text-ink-muted uppercase">
              Faza 2
            </span>
          </div>
        ))}
        <p className="px-1 text-sm text-ink-muted">Shtimi dhe ndryshimi i përmbajtjes hapen në fazën 2 të ndërtimit.</p>
      </main>
    </>
  );
}
