import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { WEEKDAYS_SHORT } from "@/lib/dates";
import { LEVEL_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Grupet" };

export default async function GroupsPage() {
  const groups = await prisma.group.findMany({
    orderBy: [{ published: "desc" }, { name: "asc" }],
    include: { _count: { select: { members: { where: { leftAt: null } } } } },
  });

  return (
    <>
      <PageHeader eyebrow="Përmbajtja" title="Grupet" back={{ href: "/admin/permbajtja", label: "Kthehu" }} />
      <main className="relative flex min-h-[60vh] flex-col gap-2 p-4">
        {groups.length === 0 ? (
          <EmptyState title="Ende asnjë grup." text="Shtoni grupin e parë me butonin më poshtë." />
        ) : (
          groups.map((g) => (
            <ListLink
              key={g.id}
              href={`/admin/permbajtja/grupet/${g.id}`}
              title={g.name}
              meta={[
                g.level && LEVEL_LABELS[g.level],
                g.ageMin !== null || g.ageMax !== null ? `${g.ageMin ?? "?"}–${g.ageMax ?? "?"} vjeç` : null,
                g.weekdays.length ? `${g.weekdays.map((d) => WEEKDAYS_SHORT[d]).join(", ")} ${g.startTime}` : "pa ditë",
                g.capacity ? `${g._count.members}/${g.capacity} vende` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
              badge={g.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
            />
          ))
        )}
        <Fab href="/admin/permbajtja/grupet/i-ri" label="Shto grup" />
      </main>
    </>
  );
}
