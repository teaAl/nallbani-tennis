import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { GroupForm } from "../group-form";

export const metadata: Metadata = { title: "Ndrysho grupin" };

export default async function EditGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [group, courts] = await Promise.all([
    prisma.group.findUnique({
      where: { id },
      include: { members: { where: { leftAt: null }, include: { user: { select: { id: true, name: true, status: true } } }, orderBy: { user: { name: "asc" } } } },
    }),
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!group) notFound();
  const members = group.members.map((m) => m.user);

  return (
    <>
      <PageHeader
        eyebrow="Përmbajtja · Grupet"
        title="Ndrysho grupin"
        back={{ href: "/admin/permbajtja/grupet", label: "Kthehu" }}
        right={group.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
      />
      <main className="flex flex-col gap-5 p-4">
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="eyebrow text-ink-muted">
              Nxënësit e grupit · {members.length}
              {group.capacity ? ` nga ${group.capacity}` : ""}
            </h2>
            <Link href="/admin/nxenesit/i-ri" className="text-sm font-semibold text-lime-ink underline underline-offset-4">
              Shto nxënës
            </Link>
          </div>
          {members.length === 0 ? (
            <p className="rounded-xl border bg-card p-4 text-sm text-ink-muted">Ende asnjë nxënës. Te çdo nxënës zgjidhni këtë grup.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <Link key={m.id} href={`/admin/nxenesit/${m.id}`} className="inline-flex h-9 items-center rounded-full border bg-card px-3 text-sm font-semibold text-ink">
                  {m.name}
                </Link>
              ))}
            </div>
          )}
        </section>
        <GroupForm
          courts={courts}
          group={{
            id: group.id,
            name: group.name,
            level: group.level,
            ageMin: group.ageMin,
            ageMax: group.ageMax,
            weekdays: group.weekdays,
            startTime: group.startTime,
            endTime: group.endTime,
            startDate: group.startDate ? dateToIso(group.startDate) : null,
            endDate: group.endDate ? dateToIso(group.endDate) : null,
            monthlyPrice: group.monthlyPrice ? group.monthlyPrice.toString() : null,
            capacity: group.capacity,
            courtId: group.courtId,
            description: group.description,
            published: group.published,
            photoUrl: group.photoUrl,
          }}
        />
      </main>
    </>
  );
}
