"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { deletePhoto, uploadPhotoField } from "@/lib/blob";
import { slugify, uniqueSlug } from "@/lib/slug";
import type { FormState } from "@/components/admin/form-message";
import { checkbox, entries, firstIssue, optionalInt, optionalMoney, optionalText, requiredText } from "@/lib/validation";

const LIST = "/admin/permbajtja/kurset";

const schema = z.object({
  id: optionalText(64),
  title: requiredText("Titulli", 80),
  kind: optionalText(40),
  description: optionalText(2000),
  price: optionalMoney,
  priceUnit: z.enum(["PER_HOUR", "PER_SESSION", "PER_MONTH", "PER_PACKAGE"]),
  sortOrder: optionalInt,
  published: checkbox,
  removePhoto: checkbox,
});

function revalidate() {
  revalidatePath(LIST);
  revalidatePath("/");
  revalidatePath("/kurset");
}

export async function saveOffering(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = schema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;
  const existing = d.id ? await prisma.courseOffering.findUnique({ where: { id: d.id } }) : null;
  if (d.id && !existing) return { error: "Kursi nuk u gjet." };

  const photo = await uploadPhotoField(formData, "offerings");
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
    kind: d.kind,
    description: d.description,
    price: d.price,
    priceUnit: d.priceUnit,
    sortOrder: d.sortOrder ?? 0,
    published: d.published,
    photoUrl,
  };

  if (d.id) {
    await prisma.courseOffering.update({ where: { id: d.id }, data });
    await audit(user.id, "offering.update", "courseOffering", d.id, { title: d.title });
  } else {
    const slug = await uniqueSlug(slugify(d.title), async (s) => !!(await prisma.courseOffering.findUnique({ where: { slug: s } })));
    const created = await prisma.courseOffering.create({ data: { ...data, slug } });
    await audit(user.id, "offering.create", "courseOffering", created.id, { title: d.title });
  }

  revalidate();
  redirect(LIST);
}

export async function deleteOffering(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const item = await prisma.courseOffering.findUnique({ where: { id } });
  if (!item) return;
  await prisma.courseOffering.delete({ where: { id } });
  await deletePhoto(item.photoUrl);
  await audit(user.id, "offering.delete", "courseOffering", id, { title: item.title });
  revalidate();
  redirect(LIST);
}
