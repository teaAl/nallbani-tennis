import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** The single SiteSettings row, created on first read if the seed never ran. */
export const getSiteSettings = cache(async () => {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return existing ?? prisma.siteSettings.create({ data: { id: 1 } });
});

export const getActiveAnnouncements = cache(async () => {
  const now = new Date();
  return prisma.announcement.findMany({
    where: {
      active: true,
      OR: [{ startsAt: null }, { startsAt: { lte: now } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
    },
    orderBy: { createdAt: "desc" },
  });
});

/** wa.me link with prefilled text; null when the club has no WhatsApp number yet. */
export function whatsappLink(number: string | null | undefined, text?: string): string | null {
  const digits = (number ?? "").replace(/\D/g, "");
  if (!digits) return null;
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

export function telLink(phone: string | null | undefined): string | null {
  const cleaned = (phone ?? "").replace(/[^+\d]/g, "");
  return cleaned.length >= 6 ? `tel:${cleaned}` : null;
}
