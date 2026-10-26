import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { dateToIso } from "@/lib/dates";
import { PageHeader } from "@/components/admin/page-header";
import { StudentForm } from "../../student-form";

export const metadata: Metadata = { title: "Ndrysho nxënësin" };

export default async function EditStudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [student, groups] = await Promise.all([
    prisma.user.findUnique({ where: { id }, include: { memberships: { where: { leftAt: null }, select: { groupId: true } } } }),
    prisma.group.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!student || student.role !== "STUDENT") notFound();

  return (
    <>
      <PageHeader eyebrow="Nxënësi" title="Ndrysho" subtitle={student.name} back={{ href: `/admin/nxenesit/${student.id}`, label: "Kthehu" }} />
      <main className="p-4">
        <StudentForm
          groups={groups}
          student={{
            id: student.id,
            name: student.name,
            phone: student.phone,
            dateOfBirth: student.dateOfBirth ? dateToIso(student.dateOfBirth) : null,
            level: student.level,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
            monthlyFee: student.monthlyFee ? student.monthlyFee.toString() : null,
            notes: student.notes,
            active: student.status === "ACTIVE",
            groupIds: student.memberships.map((m) => m.groupId),
          }}
        />
      </main>
    </>
  );
}
