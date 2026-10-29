import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { addDays, todayIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { ExceptionForm } from "../../exception-form";

export const metadata: Metadata = { title: "Ditë e veçantë" };

export default async function NewExceptionPage() {
  const courts = await prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { weeklyHours: true } });
  return (
    <>
      <PageHeader eyebrow="Fushat · Përjashtim" title="Ditë e veçantë" back={{ href: "/admin/fushat", label: "Kthehu" }} />
      <main className="p-4">
        <ExceptionForm
          defaultDate={addDays(todayIso(), 1)}
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
