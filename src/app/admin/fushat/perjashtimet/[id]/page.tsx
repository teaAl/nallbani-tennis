import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso, todayIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { ExceptionForm } from "../../exception-form";

export const metadata: Metadata = { title: "Ndrysho ditën e veçantë" };

export default async function EditExceptionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [exception, courts] = await Promise.all([
    prisma.courtDateException.findUnique({ where: { id } }),
    prisma.court.findMany({ orderBy: { sortOrder: "asc" }, include: { weeklyHours: true } }),
  ]);
  if (!exception) notFound();

  return (
    <>
      <PageHeader eyebrow="Fushat · Përjashtim" title="Ditë e veçantë" back={{ href: "/admin/fushat", label: "Kthehu" }} />
      <main className="p-4">
        <ExceptionForm
          defaultDate={todayIso()}
          exception={{
            id: exception.id,
            courtId: exception.courtId,
            date: dateToIso(exception.date),
            startHours: exception.startHours,
            reason: exception.reason,
          }}
          courts={courts.map((c) => ({
            id: c.id,
            name: c.name,
            weekly: Object.fromEntries(c.weeklyHours.map((w) => [w.weekday, w.startHours])),
          }))}
        />
      </main>
    </>
  );
}
