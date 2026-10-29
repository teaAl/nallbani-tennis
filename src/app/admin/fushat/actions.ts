"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { isoToDate } from "@/lib/dates";
import type { FormState } from "@/components/admin/form-message";
import {
  checkbox, dateField, entries, firstIssue, getAll, hourList, optionalInt, optionalMoney, optionalText, requiredText,
} from "@/lib/validation";

const LIST = "/admin/fushat";

function revalidate() {
  revalidatePath(LIST, "layout");
  revalidatePath("/fushat");
  revalidatePath("/");
}

// ---------- Court details ----------

const courtSchema = z.object({
  id: optionalText(64),
  name: requiredText("Emri i fushës", 60),
  surface: z.enum(["CLAY", "HARD", "GRASS", "CARPET"]),
  indoor: checkbox,
  active: checkbox,
  guestHourly: optionalMoney,
  memberHourly: optionalMoney,
  description: optionalText(400),
  sortOrder: optionalInt,
  bundle1Hours: optionalInt,
  bundle1Price: optionalMoney,
  bundle2Hours: optionalInt,
  bundle2Price: optionalMoney,
  bundle3Hours: optionalInt,
  bundle3Price: optionalMoney,
});

export async function saveCourt(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = courtSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;

  const bundles = [
    [d.bundle1Hours, d.bundle1Price],
    [d.bundle2Hours, d.bundle2Price],
    [d.bundle3Hours, d.bundle3Price],
  ]
    .filter(([h, p]) => h && p)
    .map(([hours, price]) => ({ hours, price }));

  const data = {
    name: d.name,
    surface: d.surface,
    indoor: d.indoor,
    active: d.active,
    guestHourly: d.guestHourly,
    memberHourly: d.memberHourly,
    description: d.description,
    sortOrder: d.sortOrder ?? 0,
    bundles,
  };

  if (d.id) {
    const existing = await prisma.court.findUnique({ where: { id: d.id } });
    if (!existing) return { error: "Fusha nuk u gjet." };
    await prisma.court.update({ where: { id: d.id }, data });
    await audit(user.id, "court.update", "court", d.id, { name: d.name });
  } else {
    const created = await prisma.court.create({
      data: { ...data, weeklyHours: { create: Array.from({ length: 7 }, (_, weekday) => ({ weekday, startHours: [] })) } },
    });
    await audit(user.id, "court.create", "court", created.id, { name: d.name });
    revalidate();
    redirect(`/admin/fushat/${created.id}/oret`);
  }

  revalidate();
  redirect(LIST);
}

export async function deleteCourt(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const court = await prisma.court.findUnique({ where: { id } });
  if (!court) return;
  await prisma.court.delete({ where: { id } });
  await audit(user.id, "court.delete", "court", id, { name: court.name });
  revalidate();
  redirect(LIST);
}

// ---------- Weekly hours ----------

export async function saveWeeklyHours(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const courtId = formData.get("courtId");
  if (typeof courtId !== "string") return { error: "Fusha mungon." };
  const court = await prisma.court.findUnique({ where: { id: courtId } });
  if (!court) return { error: "Fusha nuk u gjet." };

  const week: Record<number, string[]> = {};
  for (let weekday = 0; weekday < 7; weekday++) {
    const hours = hourList.safeParse(getAll(formData, `hours_${weekday}`));
    if (!hours.success) return { error: "Orët janë të pavlefshme." };
    week[weekday] = [...new Set(hours.data)].sort();
  }

  await prisma.$transaction(
    Object.entries(week).map(([weekday, startHours]) =>
      prisma.courtWeeklyHours.upsert({
        where: { courtId_weekday: { courtId, weekday: Number(weekday) } },
        update: { startHours },
        create: { courtId, weekday: Number(weekday), startHours },
      }),
    ),
  );
  await audit(user.id, "court.weeklyHours", "court", courtId, week);
  revalidate();
  return { success: "Orët e javës u ruajtën. Vlejnë menjëherë në faqe." };
}

// ---------- Date exceptions ----------

const exceptionSchema = z.object({
  id: optionalText(64),
  courtId: z.string().min(1, "Zgjidhni fushën."),
  date: dateField("Data"),
  closed: checkbox,
  reason: optionalText(120),
});

export async function saveException(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = exceptionSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;
  const hours = hourList.safeParse(getAll(formData, "startHours"));
  if (!hours.success) return { error: "Orët janë të pavlefshme." };
  const startHours = d.closed ? [] : [...new Set(hours.data)].sort();
  const date = isoToDate(d.date);

  const courtIds =
    d.courtId === "all"
      ? (await prisma.court.findMany({ where: { active: true }, select: { id: true } })).map((c) => c.id)
      : [d.courtId];
  if (courtIds.length === 0) return { error: "Nuk ka fusha aktive." };

  if (d.id) {
    const existing = await prisma.courtDateException.findUnique({ where: { id: d.id } });
    if (!existing) return { error: "Përjashtimi nuk u gjet." };
    const clash = await prisma.courtDateException.findFirst({
      where: { courtId: courtIds[0], date, NOT: { id: d.id } },
    });
    if (clash) return { error: "Ekziston një përjashtim tjetër për këtë fushë dhe datë." };
    await prisma.courtDateException.update({
      where: { id: d.id },
      data: { courtId: courtIds[0], date, startHours, reason: d.reason },
    });
    await audit(user.id, "court.exception.update", "courtDateException", d.id, { date: d.date, startHours });
  } else {
    await prisma.$transaction(
      courtIds.map((courtId) =>
        prisma.courtDateException.upsert({
          where: { courtId_date: { courtId, date } },
          update: { startHours, reason: d.reason },
          create: { courtId, date, startHours, reason: d.reason, createdById: user.id },
        }),
      ),
    );
    await audit(user.id, "court.exception.create", "courtDateException", null, { date: d.date, courts: courtIds.length, startHours });
  }

  revalidate();
  redirect(LIST);
}

export async function deleteException(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await prisma.courtDateException.deleteMany({ where: { id } });
  await audit(user.id, "court.exception.delete", "courtDateException", id);
  revalidate();
  redirect(LIST);
}
