import type { Metadata } from "next";
import { getActiveAnnouncements, getSiteSettings, telLink, whatsappLink } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AnnouncementBanner } from "@/components/site/announcement-banner";
import { StructuredData } from "@/components/site/structured-data";
import { prisma } from "@/lib/prisma";

// Public pages are cached and re-rendered at most every 10 minutes; every admin save
// also calls revalidatePath, so edits show up immediately.
export const revalidate = 600;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nallbani-tennis.com";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: { default: s.seoTitle ?? s.clubName, template: `%s · ${s.clubName}` },
    description: s.seoDescription ?? undefined,
    verification: s.searchConsoleTag ? { google: s.searchConsoleTag } : undefined,
    openGraph: { siteName: s.clubName, locale: "sq_AL", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, announcements, pricedCourt] = await Promise.all([
    getSiteSettings(),
    getActiveAnnouncements(),
    prisma.court.findFirst({ where: { active: true, guestHourly: { not: null } }, orderBy: { sortOrder: "asc" }, select: { guestHourly: true } }),
  ]);
  const waHref = whatsappLink(s.whatsapp);

  return (
    <div className="flex min-h-dvh flex-col">
      <StructuredData s={s} base={BASE} courtPrice={pricedCourt?.guestHourly ? Number(pricedCourt.guestHourly) : null} />
      <AnnouncementBanner items={announcements} />
      <SiteHeader clubName={s.clubName} waHref={waHref} />
      <main className="grow">{children}</main>
      <SiteFooter
        clubName={s.clubName}
        phone={s.phone}
        address={s.address}
        mapUrl={s.mapUrl}
        openingHoursText={s.openingHoursText}
        waHref={waHref}
        telHref={telLink(s.phone)}
        instagram={s.instagram}
        facebook={s.facebook}
      />
    </div>
  );
}
