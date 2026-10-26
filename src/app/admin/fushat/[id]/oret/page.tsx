import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { WeeklyEditor } from "./weekly-editor";

export const metadata: Metadata = { title: "Orët e javës" };

export default async function WeeklyHoursPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const court = await prisma.court.findUnique({ where: { id }, include: { weeklyHours: true } });
  if (!court) notFound();

  const initial: Record<number, string[]> = {};
  for (let d = 0; d < 7; d++) initial[d] = court.weeklyHours.find((w) => w.weekday === d)?.startHours ?? [];

  return (
    <>
      <PageHeader eyebrow={`Fushat · ${court.name}`} title="Orët e javës" back={{ href: "/admin/fushat", label: "Kthehu" }} />
      <main className="flex flex-col gap-4 p-4">
        <p className="text-sm text-ink-muted">
          Për çdo ditë të javës, prekni orët kur fusha mund të rezervohet. Kaq shfaqet në faqe çdo javë. Për një datë të vetme përdorni{" "}
          <Link href="/admin/fushat/perjashtimet/i-ri" className="font-semibold text-lime-ink underline underline-offset-4">
            Ditë e veçantë
          </Link>
          .
        </p>
        <WeeklyEditor courtId={court.id} initial={initial} />
      </main>
    </>
  );
}
