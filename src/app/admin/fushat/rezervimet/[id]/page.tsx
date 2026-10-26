import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { BookingForm } from "../booking-form";

export const metadata: Metadata = { title: "Rezervimi" };

function hoursBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em - (sh * 60 + sm)) / 60;
}

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [booking, courts] = await Promise.all([
    prisma.courtBooking.findUnique({ where: { id } }),
    prisma.court.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!booking) notFound();

  return (
    <>
      <PageHeader eyebrow="Fushat · Rezervimet" title={booking.name} back={{ href: "/admin/fushat/rezervimet", label: "Kthehu" }} />
      <main className="p-4">
        <BookingForm
          courts={courts.map((c) => ({ id: c.id, name: c.name, guestHourly: c.guestHourly ? Number(c.guestHourly) : null }))}
          defaults={{ date: dateToIso(booking.date) }}
          booking={{
            id: booking.id,
            courtId: booking.courtId,
            date: dateToIso(booking.date),
            startTime: booking.startTime,
            hours: hoursBetween(booking.startTime, booking.endTime),
            name: booking.name,
            phone: booking.phone,
            price: booking.price ? booking.price.toString() : null,
            paid: booking.paid,
            notes: booking.notes,
          }}
        />
      </main>
    </>
  );
}
