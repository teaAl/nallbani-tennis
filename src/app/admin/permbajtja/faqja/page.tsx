import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/site";
import { formatDateSq } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { Button } from "@/components/ui/button";
import { SiteForm } from "./site-form";
import { AddAnnouncementForm } from "./announcements";
import { deleteAnnouncement, toggleAnnouncement } from "./actions";

export const metadata: Metadata = { title: "Faqja" };

export default async function SitePage() {
  const [s, announcements] = await Promise.all([
    getSiteSettings(),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <PageHeader eyebrow="Përmbajtja" title="Faqja" subtitle="Tekstet, kontakti, njoftimet" back={{ href: "/admin/permbajtja", label: "Kthehu" }} />
      <main className="flex flex-col gap-6 p-4">
        <section className="flex flex-col gap-3">
          <h2 className="eyebrow text-ink-muted">Njoftimet (shiriti në krye të faqes)</h2>
          {announcements.map((a) => (
            <div key={a.id} className="flex flex-col gap-2 rounded-xl border bg-card p-3.5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px]">{a.text}</p>
                {a.active ? <StatusBadge kind="success">Aktiv</StatusBadge> : <StatusBadge kind="muted">Fshehur</StatusBadge>}
              </div>
              {(a.startsAt || a.endsAt) && (
                <p className="text-sm text-ink-muted">
                  {a.startsAt ? `nga ${formatDateSq(a.startsAt.toISOString().slice(0, 10))}` : ""}
                  {a.endsAt ? ` deri ${formatDateSq(a.endsAt.toISOString().slice(0, 10))}` : ""}
                </p>
              )}
              <div className="flex gap-2">
                <form action={toggleAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <Button type="submit" variant="ghost" size="sm">
                    {a.active ? "Fshihe" : "Shfaqe"}
                  </Button>
                </form>
                <form action={deleteAnnouncement}>
                  <input type="hidden" name="id" value={a.id} />
                  <Button type="submit" variant="ghost" size="sm" className="text-danger">
                    Fshi
                  </Button>
                </form>
              </div>
            </div>
          ))}
          <div className="rounded-xl border bg-card p-4">
            <AddAnnouncementForm />
          </div>
        </section>

        <SiteForm
          s={{
            clubName: s.clubName,
            tagline: s.tagline,
            heroTitle: s.heroTitle,
            heroText: s.heroText,
            aboutText: s.aboutText,
            coachName: s.coachName,
            coachBio: s.coachBio,
            coachPhotoUrl: s.coachPhotoUrl,
            phone: s.phone,
            whatsapp: s.whatsapp,
            email: s.email,
            address: s.address,
            mapUrl: s.mapUrl,
            instagram: s.instagram,
            facebook: s.facebook,
            openingHoursText: s.openingHoursText,
            seoTitle: s.seoTitle,
            seoDescription: s.seoDescription,
            searchConsoleTag: s.searchConsoleTag,
          }}
        />
      </main>
    </>
  );
}
