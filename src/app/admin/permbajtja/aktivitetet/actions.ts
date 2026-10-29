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
  checkbox, dateField, entries, firstIssue, optionalDate, optionalInt, optionalMoney, optionalText, optionalTime, requiredText,
} from "@/lib/validation";

const LIST = "/admin/permbajtja/aktivitetet";

const schema = z
  .object({
    id: optionalText(64),
    title: requiredText("Titulli", 80),
    category: requiredText("Kategoria", 40),
    description: optionalText(3000),
    startDate: dateField("Data"),
    endDate: optionalDate,
    startTime: optionalTime,
    endTime: optionalTime,
    place: optionalText(80),
    courtId: optionalText(64),
    price: optionalMoney,
    guestCoachName: optionalText(80),
    guestCoachBio: optionalText(300),
    capacity: optionalInt,
    published: checkbox,
    removePhoto: checkbox,
  })
  .refine((v) => !v.endDate || v.endDate >= v.startDate, { message: "Data e mbarimit duhet të jetë pas fillimit.", path: ["endDate"] })
  .refine((v) => !v.startTime || !v.endTime || v.endTime > v.startTime, { message: "Ora e mbarimit duhet të jetë pas fillimit.", path: ["endTime"] });

function revalidate() {
  revalidatePath(LIST);
  revalidatePath("/");
  revalidatePath("/aktivitetet");
}

export async function saveActivity(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = schema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;

  const existing = d.id ? await prisma.activity.findUnique({ where: { id: d.id } }) : null;
  if (d.id && !existing) return { error: "Aktiviteti nuk u gjet." };

  const photo = await uploadPhotoField(formData, "activities");
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
    title: d.title,
    category: d.category,
    description: d.description,
    startDate: isoToDate(d.startDate),
    endDate: d.endDate ? isoToDate(d.endDate) : null,
    startTime: d.startTime,
    endTime: d.endTime,
    place: d.place,
    courtId: d.courtId || null,
    price: d.price,
    guestCoachName: d.guestCoachName,
    guestCoachBio: d.guestCoachBio,
    capacity: d.capacity,
    published: d.published,
    photoUrl,
  };

  if (existing) {
    await prisma.activity.update({ where: { id: existing.id }, data });
    await audit(user.id, "activity.update", "activity", existing.id, { title: d.title, published: d.published });
  } else {
    const slug = await uniqueSlug(slugify(d.title), async (s) => !!(await prisma.activity.findUnique({ where: { slug: s } })));
    const created = await prisma.activity.create({ data: { ...data, slug } });
    await audit(user.id, "activity.create", "activity", created.id, { title: d.title });
  }

  revalidate();
  redirect(LIST);
}

export async function deleteActivity(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const item = await prisma.activity.findUnique({ where: { id } });
  if (!item) return;
  await deletePhoto(item.photoUrl);
  await prisma.activity.delete({ where: { id } });
  await audit(user.id, "activity.delete", "activity", id, { title: item.title });
  revalidate();
  redirect(LIST);
}
