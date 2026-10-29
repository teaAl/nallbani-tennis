import type { SiteSettings } from "@prisma/client";

/**
 * schema.org description of the club for Google's local results.
 * Only fields the coach has filled in are emitted.
 */
export function StructuredData({ s, base, courtPrice }: { s: SiteSettings; base: string; courtPrice: number | null }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${base}/#club`,
    name: s.clubName,
    url: base,
    logo: `${base}/images/logo-nt.png`,
    image: s.heroPhotoUrl ?? `${base}/opengraph-image`,
    description: s.seoDescription ?? s.heroText ?? undefined,
    telephone: s.phone ?? undefined,
    email: s.email ?? undefined,
    sport: "Tennis",
    address: s.address
      ? { "@type": "PostalAddress", streetAddress: s.address, addressLocality: "Tiranë", addressCountry: "AL" }
      : { "@type": "PostalAddress", addressLocality: "Tiranë", addressCountry: "AL" },
    hasMap: s.mapUrl ?? undefined,
    sameAs: [s.instagram, s.facebook].filter(Boolean),
    priceRange: courtPrice ? `${courtPrice} Lekë / orë` : undefined,
  };
  if (s.openingHoursText) data.openingHours = s.openingHoursText;
  const clean = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0)));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clean) }} />;
}
