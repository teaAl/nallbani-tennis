import type { Metadata } from "next";
import { getActiveAnnouncements, getSiteSettings, telLink, whatsappLink } from "@/lib/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AnnouncementBanner } from "@/components/site/announcement-banner";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: { default: s.seoTitle ?? s.clubName, template: `%s · ${s.clubName}` },
    description: s.seoDescription ?? undefined,
    verification: s.searchConsoleTag ? { google: s.searchConsoleTag } : undefined,
    openGraph: { siteName: s.clubName, locale: "sq_AL", type: "website" },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, announcements] = await Promise.all([getSiteSettings(), getActiveAnnouncements()]);
  const waHref = whatsappLink(s.whatsapp);

  return (
    <div className="flex min-h-dvh flex-col">
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
