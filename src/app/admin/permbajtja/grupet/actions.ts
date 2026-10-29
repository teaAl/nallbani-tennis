"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { deletePhoto, uploadPhotoField } from "@/lib/blob";
import { isoToDate } from "@/lib/dates";
import { slugify, uniqueSlug } from "@/lib/slug";
import type { FormState } from "@/components/admin/form-message";
import {
  checkbox, entries, firstIssue, getAll, optionalDate, optionalInt, optionalMoney,
  optionalText, requiredText, timeField, weekdayList,
} from "@/lib/validation";

const LIST = "/admin/permbajtja/grupet";

const schema = z
  .object({
    id: optionalText(64),
    name: requiredText("Emri i grupit", 80),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", ""]).transform((v) => (v === "" ? null : v)),
    ageMin: optionalInt,
    ageMax: optionalInt,
    startTime: timeField("Nga ora"),
    endTime: timeField("Deri në orën"),
    startDate: optionalDate,
    endDate: optionalDate,
    monthlyPrice: optionalMoney,
    capacity: optionalInt,
    courtId: optionalText(64),
    description: optionalText(2000),
    published: checkbox,
    removePhoto: checkbox,
  })
  .refine((v) => v.endTime > v.startTime, { message: "Ora e mbarimit duhet të jetë pas fillimit.", path: ["endTime"] })
  .refine((v) => v.ageMin === null || v.ageMax === null || v.ageMax >= v.ageMin, { message: "Mosha deri duhet të jetë ≥ mosha nga.", path: ["ageMax"] })
  .refine((v) => !v.startDate || !v.endDate || v.endDate >= v.startDate, { message: "Data e mbarimit duhet të jetë pas fillimit.", path: ["endDate"] });

function revalidate() {
  revalidatePath(LIST);
  revalidatePath("/");
  revalidatePath("/kurset");
}

export async function saveGroup(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = schema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const weekdays = weekdayList.safeParse(getAll(formData, "weekdays"));
  if (!weekdays.success) return { error: "Ditët e javës janë të pavlefshme." };

  const d = parsed.data;
  const existing = d.id ? await prisma.group.findUnique({ where: { id: d.id } }) : null;
  if (d.id && !existing) return { error: "Grupi nuk u gjet." };

  const photo = await uploadPhotoField(formData, "groups");
  if (photo && "error" in photo) return { error: photo.error };

  let photoUrl = existing?.photoUrl ?? null;
  if (photo) {
    await deletePhoto(photoUrl);
    photoUrl = photo.url;
  } else if (d.removePhoto) {
    await deletePhoto(photoUrl);
    photoUrl = null;
  }

  const data = {
    name: d.name,
    level: d.level,
    ageMin: d.ageMin,
    ageMax: d.ageMax,
    weekdays: [...new Set(weekdays.data)].sort(),
    startTime: d.startTime,
    endTime: d.endTime,
    startDate: d.startDate ? isoToDate(d.startDate) : null,
    endDate: d.endDate ? isoToDate(d.endDate) : null,
    monthlyPrice: d.monthlyPrice,
    capacity: d.capacity,
    courtId: d.courtId || null,
    description: d.description,
    published: d.published,
    photoUrl,
  };

  if (existing) {
    await prisma.group.update({ where: { id: existing.id }, data });
    await audit(user.id, "group.update", "group", existing.id, { name: d.name, published: d.published });
  } else {
    const slug = await uniqueSlug(slugify(d.name), async (s) => !!(await prisma.group.findUnique({ where: { slug: s } })));
    const created = await prisma.group.create({ data: { ...data, slug, coachId: user.role === "COACH" ? user.id : null } });
    await audit(user.id, "group.create", "group", created.id, { name: d.name });
  }

  revalidate();
  redirect(LIST);
}

export async function deleteGroup(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const group = await prisma.group.findUnique({ where: { id } });
  if (!group) return;
  await deletePhoto(group.photoUrl);
  await prisma.group.delete({ where: { id } });
  await audit(user.id, "group.delete", "group", id, { name: group.name });
  revalidate();
  redirect(LIST);
}

export async function toggleGroupPublished(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const group = await prisma.group.findUnique({ where: { id } });
  if (!group) return;
  await prisma.group.update({ where: { id }, data: { published: !group.published } });
  await audit(user.id, "group.publish", "group", id, { published: !group.published });
  revalidate();
}
