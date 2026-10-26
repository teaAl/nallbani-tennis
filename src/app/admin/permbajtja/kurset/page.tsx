import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";
import { PRICE_UNITS } from "./offering-form";

export const metadata: Metadata = { title: "Kurset" };

export default async function OfferingsPage() {
  const items = await prisma.courseOffering.findMany({ orderBy: [{ sortOrder: "asc" }, { title: "asc" }] });

  return (
    <>
      <PageHeader eyebrow="Përmbajtja" title="Kurset" subtitle="Mësime private, paketa, prova" back={{ href: "/admin/permbajtja", label: "Kthehu" }} />
      <main className="relative flex min-h-[60vh] flex-col gap-2 p-4">
        {items.length === 0 ? (
          <EmptyState title="Ende asnjë kurs." text="Grupet jetojnë te Grupet; këtu shtoni mësimet private, paketat dhe provat." />
        ) : (
          items.map((o) => (
            <ListLink
              key={o.id}
              href={`/admin/permbajtja/kurset/${o.id}`}
              title={o.title}
              meta={[o.kind, o.price ? `${formatMoney(o.price)} ${PRICE_UNITS[o.priceUnit]}` : "pa çmim"].filter(Boolean).join(" · ")}
              badge={o.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
            />
          ))
        )}
        <Fab href="/admin/permbajtja/kurset/i-ri" label="Shto kurs" />
      </main>
    </>
  );
}
