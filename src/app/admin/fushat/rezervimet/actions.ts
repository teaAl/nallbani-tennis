"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { formatDateSq, isoToDate } from "@/lib/dates";
import { toHHmm } from "@/lib/courts";
import type { FormState } from "@/components/admin/form-message";
import { checkbox, dateField, entries, firstIssue, optionalMoney, optionalText, requiredText, timeField } from "@/lib/validation";

const LIST = "/admin/fushat/rezervimet";

function revalidate(dateIso?: string) {
  revalidatePath(LIST, "layout");
  revalidatePath("/admin");
  revalidatePath("/fushat");
  if (dateIso) revalidatePath(`/admin?d=${dateIso}`);
}

const schema = z.object({
  id: optionalText(64),
  courtId: z.string().min(1, "Zgjidhni fushën."),
  date: dateField("Data"),
  startTime: timeField("Ora e fillimit"),
  hours: z.coerce.number().min(0.5).max(6),
  name: requiredText("Emri", 80),
  phone: optionalText(40),
  price: optionalMoney,
  paid: checkbox,
  notes: optionalText(300),
  force: checkbox,
});

function toMinutes(h: string) {
  const [hh, mm] = h.split(":").map(Number);
  return hh * 60 + mm;
}

export async function saveBooking(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = schema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;

  const start = toMinutes(d.startTime);
  const end = start + Math.round(d.hours * 60);
  if (end > 24 * 60) return { error: "Rezervimi kalon mesnatën." };
  const endTime = toHHmm(end);
  const date = isoToDate(d.date);

  const court = await prisma.court.findUnique({ where: { id: d.courtId } });
  if (!court) return { error: "Fusha nuk u gjet." };

  // Double-booking check against other confirmed bookings and scheduled lessons on the same court.
  if (!d.force) {
    const [bookings, lessons] = await Promise.all([
      prisma.courtBooking.findMany({ where: { courtId: court.id, date, status: "CONFIRMED", NOT: d.id ? { id: d.id } : undefined } }),
      prisma.lesson.findMany({ where: { courtId: court.id, date, status: "SCHEDULED" }, include: { group: { select: { name: true } } } }),
    ]);
    const overlaps = (s: string, e: string) => toMinutes(s) < end && toMinutes(e) > start;
    const clash = [
      ...bookings.filter((b) => overlaps(b.startTime, b.endTime)).map((b) => `${b.name} ${b.startTime}–${b.endTime}`),
      ...lessons.filter((l) => overlaps(l.startTime, l.endTime)).map((l) => `mësimi ${l.group?.name ?? ""} ${l.startTime}–${l.endTime}`),
    ];
    if (clash.length > 0) {
      return {
        error: `Mbivendoset me: ${clash.join(", ")} (${court.name}, ${formatDateSq(d.date)}). Shënoni "Ruaje gjithsesi" nëse është në rregull.`,
      };
    }
  }

  const data = {
    courtId: court.id,
    date,
    startTime: d.startTime,
    endTime,
    name: d.name,
    phone: d.phone,
    price: d.price,
    paid: d.paid,
    notes: d.notes,
    status: "CONFIRMED" as const,
  };

  if (d.id) {
    const existing = await prisma.courtBooking.findUnique({ where: { id: d.id } });
    if (!existing) return { error: "Rezervimi nuk u gjet." };
    await prisma.courtBooking.update({ where: { id: d.id }, data });
    await audit(user.id, "booking.update", "courtBooking", d.id, { name: d.name, date: d.date, startTime: d.startTime });
  } else {
    const created = await prisma.courtBooking.create({ data: { ...data, createdById: user.id } });
    await audit(user.id, "booking.create", "courtBooking", created.id, { name: d.name, date: d.date, startTime: d.startTime });
  }

  revalidate(d.date);
  redirect(`/admin?d=${d.date}`);
}

export async function deleteBooking(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const booking = await prisma.courtBooking.findUnique({ where: { id } });
  if (!booking) return;
  await prisma.courtBooking.delete({ where: { id } });
  await audit(user.id, "booking.delete", "courtBooking", id, { name: booking.name });
  const dateIso = booking.date.toISOString().slice(0, 10);
  revalidate(dateIso);
  redirect(`/admin?d=${dateIso}`);
}

export async function toggleBookingPaid(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const booking = await prisma.courtBooking.findUnique({ where: { id } });
  if (!booking) return;
  await prisma.courtBooking.update({ where: { id }, data: { paid: !booking.paid } });
  await audit(user.id, "booking.paid", "courtBooking", id, { paid: !booking.paid });
  revalidate(booking.date.toISOString().slice(0, 10));
}
