"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { deletePhoto, uploadPhotoField } from "@/lib/blob";
import { getSiteSettings } from "@/lib/site";
import type { FormState } from "@/components/admin/form-message";
import { checkbox, entries, firstIssue, optionalText, requiredText } from "@/lib/validation";

const PATH = "/admin/permbajtja/faqja";

function revalidateSite() {
  revalidatePath(PATH);
  revalidatePath("/", "layout");
}

const settingsSchema = z.object({
  clubName: requiredText("Emri i klubit", 80),
  tagline: optionalText(120),
  heroTitle: optionalText(120),
  heroText: optionalText(400),
  aboutText: optionalText(4000),
  coachName: optionalText(80),
  coachBio: optionalText(2000),
  phone: optionalText(40),
  whatsapp: optionalText(40),
  email: optionalText(120),
  address: optionalText(200),
  mapUrl: optionalText(500),
  instagram: optionalText(200),
  facebook: optionalText(200),
  openingHoursText: optionalText(200),
  seoTitle: optionalText(120),
  seoDescription: optionalText(300),
  searchConsoleTag: optionalText(200),
  removePhoto: checkbox,
  removeHeroPhoto: checkbox,
});

export async function saveSiteSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = settingsSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const { removePhoto, removeHeroPhoto, ...d } = parsed.data;

  if (d.whatsapp && d.whatsapp.replace(/\D/g, "").length < 8) {
    return { error: "Numri i WhatsApp duhet me prefiks shteti, p.sh. +355 69 123 4567." };
  }

  const current = await getSiteSettings();
  const photo = await uploadPhotoField(formData, "site");
  if (photo && "error" in photo) return { error: photo.error };
  let coachPhotoUrl = current.coachPhotoUrl;
  if (photo) {
    await deletePhoto(coachPhotoUrl);
    coachPhotoUrl = photo.url;
  } else if (removePhoto) {
    await deletePhoto(coachPhotoUrl);
    coachPhotoUrl = null;
  }

  const hero = await uploadPhotoField(formData, "site", "heroPhoto");
  if (hero && "error" in hero) return { error: hero.error };
  let heroPhotoUrl = current.heroPhotoUrl;
  if (hero) {
    await deletePhoto(heroPhotoUrl);
    heroPhotoUrl = hero.url;
  } else if (removeHeroPhoto) {
    await deletePhoto(heroPhotoUrl);
    heroPhotoUrl = null;
  }

  await prisma.siteSettings.update({
    where: { id: 1 },
    data: { ...d, whatsapp: d.whatsapp ? d.whatsapp.replace(/\D/g, "") : null, coachPhotoUrl, heroPhotoUrl },
  });
  await audit(user.id, "site.update", "siteSettings", "1");
  revalidateSite();
  return { success: "Faqja u përditësua." };
}

const announcementSchema = z.object({
  text: requiredText("Teksti i njoftimit", 200),
  startsAt: optionalText(10),
  endsAt: optionalText(10),
});

export async function addAnnouncement(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = announcementSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const { text, startsAt, endsAt } = parsed.data;
  const created = await prisma.announcement.create({
    data: {
      text,
      startsAt: startsAt ? new Date(`${startsAt}T00:00:00.000Z`) : null,
      endsAt: endsAt ? new Date(`${endsAt}T23:59:59.000Z`) : null,
    },
  });
  await audit(user.id, "announcement.create", "announcement", created.id, { text });
  revalidateSite();
  return { success: "Njoftimi u shtua." };
}

export async function toggleAnnouncement(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const item = await prisma.announcement.findUnique({ where: { id } });
  if (!item) return;
  await prisma.announcement.update({ where: { id }, data: { active: !item.active } });
  await audit(user.id, "announcement.toggle", "announcement", id, { active: !item.active });
  revalidateSite();
}

export async function deleteAnnouncement(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await prisma.announcement.deleteMany({ where: { id } });
  await audit(user.id, "announcement.delete", "announcement", id);
  revalidateSite();
}
