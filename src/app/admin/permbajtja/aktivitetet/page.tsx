import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { dateToIso, formatDateSq, isoToDate, todayIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Aktivitetet" };

export default async function ActivitiesPage() {
  const today = isoToDate(todayIso());
  const items = await prisma.activity.findMany({ orderBy: { startDate: "desc" } });
  const upcoming = items.filter((a) => (a.endDate ?? a.startDate) >= today).reverse();
  const past = items.filter((a) => (a.endDate ?? a.startDate) < today);

  const row = (a: (typeof items)[number]) => (
    <ListLink
      key={a.id}
      href={`/admin/permbajtja/aktivitetet/${a.id}`}
      title={a.title}
      meta={[a.category, formatDateSq(dateToIso(a.startDate), { weekday: true }), a.startTime].filter(Boolean).join(" · ")}
      badge={a.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
    />
  );

  return (
    <>
      <PageHeader eyebrow="Përmbajtja" title="Aktivitetet" subtitle="Yoga, kampe, turne, trajnerë të ftuar…" back={{ href: "/admin/permbajtja", label: "Kthehu" }} />
      <main className="relative flex min-h-[60vh] flex-col gap-5 p-4">
        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Të ardhshme</h2>
          {upcoming.length === 0 ? <EmptyState title="Asnjë aktivitet i ardhshëm." text="Shtoni një me butonin më poshtë." /> : upcoming.map(row)}
        </section>
        {past.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="eyebrow text-ink-muted">Të kaluara</h2>
            {past.map(row)}
          </section>
        )}
        <Fab href="/admin/permbajtja/aktivitetet/i-ri" label="Shto aktivitet" />
      </main>
    </>
  );
}
