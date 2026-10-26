import type { Metadata } from "next";
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
    prisma.group.findUnique({ where: { id } }),
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!group) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Përmbajtja · Grupet"
        title="Ndrysho grupin"
        back={{ href: "/admin/permbajtja/grupet", label: "Kthehu" }}
        right={group.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
      />
      <main className="p-4">
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
