import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { ActivityForm } from "../activity-form";

export const metadata: Metadata = { title: "Aktivitet i ri" };

export default async function NewActivityPage() {
  const [courts, cats] = await Promise.all([
    prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
    prisma.activity.findMany({ select: { category: true }, distinct: ["category"], orderBy: { category: "asc" } }),
  ]);
  return (
    <>
      <PageHeader eyebrow="Përmbajtja · Aktivitetet" title="Aktivitet i ri" back={{ href: "/admin/permbajtja/aktivitetet", label: "Kthehu" }} />
      <main className="p-4">
        <ActivityForm courts={courts} categories={cats.map((c) => c.category)} />
      </main>
    </>
  );
}
