import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { OfferingForm } from "../offering-form";

export const metadata: Metadata = { title: "Ndrysho kursin" };

export default async function EditOfferingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.courseOffering.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Përmbajtja · Kurset"
        title="Ndrysho kursin"
        back={{ href: "/admin/permbajtja/kurset", label: "Kthehu" }}
        right={item.published ? <StatusBadge kind="success">Publikuar</StatusBadge> : <StatusBadge kind="warning">Draft</StatusBadge>}
      />
      <main className="p-4">
        <OfferingForm
          offering={{
            id: item.id,
            title: item.title,
            kind: item.kind,
            description: item.description,
            price: item.price ? item.price.toString() : null,
            priceUnit: item.priceUnit,
            sortOrder: item.sortOrder,
            published: item.published,
            photoUrl: item.photoUrl,
          }}
        />
      </main>
    </>
  );
}
