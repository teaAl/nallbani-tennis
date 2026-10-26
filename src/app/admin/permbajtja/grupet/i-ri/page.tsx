import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { GroupForm } from "../group-form";

export const metadata: Metadata = { title: "Grup i ri" };

export default async function NewGroupPage() {
  const courts = await prisma.court.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <>
      <PageHeader eyebrow="Përmbajtja · Grupet" title="Grup i ri" back={{ href: "/admin/permbajtja/grupet", label: "Kthehu" }} />
      <main className="p-4">
        <GroupForm courts={courts} />
      </main>
    </>
  );
}
