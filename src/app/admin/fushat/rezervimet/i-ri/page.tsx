import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { todayIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { BookingForm } from "../booking-form";

export const metadata: Metadata = { title: "Rezervim i ri" };

export default async function NewBookingPage({ searchParams }: { searchParams: Promise<{ d?: string; fusha?: string }> }) {
  const { d, fusha } = await searchParams;
  const courts = await prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" } });
  const date = d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : todayIso();

  return (
    <>
      <PageHeader eyebrow="Fushat · Rezervimet" title="Shëno rezervim" back={{ href: "/admin/fushat/rezervimet", label: "Kthehu" }} />
      <main className="p-4">
        <BookingForm
          courts={courts.map((c) => ({ id: c.id, name: c.name, guestHourly: c.guestHourly ? Number(c.guestHourly) : null }))}
          defaults={{ date, courtId: fusha }}
        />
      </main>
    </>
  );
}
