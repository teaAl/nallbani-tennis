import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/page-header";
import { StudentForm } from "../student-form";

export const metadata: Metadata = { title: "Nxënës i ri" };

export default async function NewStudentPage() {
  const groups = await prisma.group.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
  return (
    <>
      <PageHeader eyebrow="Nxënësit" title="Nxënës i ri" back={{ href: "/admin/nxenesit", label: "Kthehu" }} />
      <main className="p-4">
        <StudentForm groups={groups} />
      </main>
    </>
  );
}
