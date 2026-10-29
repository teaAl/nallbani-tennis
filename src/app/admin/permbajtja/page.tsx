import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { todayIso, isoToDate } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { ListLink } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Përmbajtja" };

export default async function ContentPage() {
  const today = isoToDate(todayIso());
  const [groups, groupsPublished, offerings, offeringsPublished, activities, announcements] = await prisma.$transaction([
    prisma.group.count(),
    prisma.group.count({ where: { published: true } }),
    prisma.courseOffering.count(),
    prisma.courseOffering.count({ where: { published: true } }),
    prisma.activity.count({ where: { published: true, OR: [{ startDate: { gte: today } }, { endDate: { gte: today } }] } }),
    prisma.announcement.count({ where: { active: true } }),
  ]);

  return (
    <>
      <PageHeader title="Përmbajtja" subtitle="Çfarë shfaqet në faqen publike" />
      <main className="flex flex-col gap-3 p-4">
        <ListLink href="/admin/permbajtja/grupet" title="Grupet" meta={`${groupsPublished} të publikuara nga ${groups}`} />
        <ListLink href="/admin/permbajtja/kurset" title="Kurset" meta={`${offeringsPublished} të publikuara nga ${offerings} · mësime private, paketa`} />
        <ListLink href="/admin/permbajtja/aktivitetet" title="Aktivitetet" meta={`${activities} të ardhshme në faqe`} />
        <ListLink href="/admin/permbajtja/faqja" title="Faqja" meta={`Tekstet, kontakti, Google · ${announcements} njoftim aktiv`} />
        <p className="px-1 pt-2 text-sm text-ink-muted">
          Çdo ndryshim këtu shfaqet menjëherë në faqe. Fushat dhe orët e tyre i gjeni te skeda Fushat.
        </p>
      </main>
    </>
  );
}
