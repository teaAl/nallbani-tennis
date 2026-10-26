import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { ActivityForm } from "../activity-form";

export const metadata: Metadata = { title: "Ndrysho aktivitetin" };

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, courts, cats] = await Promise.all([
    prisma.activity.findUnique({ where: { id } }),
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
    prisma.activity.findMany({ select: { category: true }, distinct: ["category"], orderBy: { category: "asc" } }),
  ]);
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Përmbajtja · Aktivitetet"
        title="Ndrysho aktivitetin"
        back={{ href: "/admin/permbajtja/aktivitetet", label: "Kthehu" }}
        right={item.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
      />
      <main className="p-4">
        <ActivityForm
          courts={courts}
          categories={cats.map((c) => c.category)}
          activity={{
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.description,
            startDate: dateToIso(item.startDate),
            endDate: item.endDate ? dateToIso(item.endDate) : null,
            startTime: item.startTime,
            endTime: item.endTime,
            place: item.place,
            courtId: item.courtId,
            price: item.price ? item.price.toString() : null,
            guestCoachName: item.guestCoachName,
            guestCoachBio: item.guestCoachBio,
            capacity: item.capacity,
            published: item.published,
            photoUrl: item.photoUrl,
          }}
        />
      </main>
    </>
  );
}
