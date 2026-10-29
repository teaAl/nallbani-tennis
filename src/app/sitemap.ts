import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nallbani-tennis.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/kurset`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/fushat`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/aktivitetet`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
