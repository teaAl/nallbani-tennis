import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { initials, LEVEL_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Nxënësit" };

export default async function StudentsPage() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { name: "asc" },
    include: { memberships: { where: { leftAt: null }, include: { group: { select: { name: true } } } } },
  });
  const active = students.filter((s) => s.status === "ACTIVE").length;

  return (
    <>
      <PageHeader title="Nxënësit" right={<span className="text-sm text-on-navy-muted">{active} aktivë</span>} />
      <main className="flex flex-col gap-2 p-4">
        {students.length === 0 ? (
          <div className="rounded-xl border bg-card p-6 text-center">
            <p className="font-semibold">Ende asnjë nxënës.</p>
            <p className="mt-1 text-sm text-ink-muted">Regjistrimi i nxënësve shtohet në fazën 3.</p>
          </div>
        ) : (
          students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-lime-soft text-sm font-bold text-lime-ink">
                {initials(s.name)}
              </span>
              <span className="flex min-w-0 grow flex-col">
                <span className="font-semibold">{s.name}</span>
                <span className="truncate text-sm text-ink-muted">
                  {[s.memberships[0]?.group.name, s.level && LEVEL_LABELS[s.level]].filter(Boolean).join(" · ") || "Pa grup"}
                </span>
              </span>
            </div>
          ))
        )}
      </main>
    </>
  );
}
