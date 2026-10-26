import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { CourtForm } from "../court-form";

export const metadata: Metadata = { title: "Të dhënat e fushës" };

export default async function EditCourtPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const court = await prisma.court.findUnique({ where: { id } });
  if (!court) notFound();

  const bundles = Array.isArray(court.bundles)
    ? (court.bundles as { hours?: unknown; price?: unknown }[])
        .filter((b) => typeof b.hours === "number" && typeof b.price === "number")
        .map((b) => ({ hours: b.hours as number, price: b.price as number }))
    : [];

  return (
    <>
      <PageHeader eyebrow={`Fushat · ${court.name}`} title="Të dhënat" back={{ href: "/admin/fushat", label: "Kthehu" }} />
      <main className="p-4">
        <CourtForm
          court={{
            id: court.id,
            name: court.name,
            surface: court.surface,
            indoor: court.indoor,
            active: court.active,
            guestHourly: court.guestHourly ? court.guestHourly.toString() : null,
            memberHourly: court.memberHourly ? court.memberHourly.toString() : null,
            description: court.description,
            sortOrder: court.sortOrder,
            bundles,
          }}
        />
      </main>
    </>
  );
}
