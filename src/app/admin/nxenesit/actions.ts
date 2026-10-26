"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";
import { isoToDate } from "@/lib/dates";
import type { FormState } from "@/components/admin/form-message";
import { checkbox, dateField, entries, firstIssue, getAll, optionalDate, optionalMoney, optionalText, requiredText } from "@/lib/validation";

const LIST = "/admin/nxenesit";

function revalidateStudent(id?: string) {
  revalidatePath(LIST);
  if (id) revalidatePath(`${LIST}/${id}`);
  revalidatePath("/admin");
  revalidatePath("/kurset");
}

// ---------- Student ----------

const studentSchema = z.object({
  id: optionalText(64),
  name: requiredText("Emri", 80),
  phone: optionalText(40),
  dateOfBirth: optionalDate,
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", ""]).transform((v) => (v === "" ? null : v)),
  parentName: optionalText(80),
  parentPhone: optionalText(40),
  monthlyFee: optionalMoney,
  notes: optionalText(2000),
  active: checkbox,
});

export async function saveStudent(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = studentSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;
  const groupIds = [...new Set(getAll(formData, "groups"))];

  const data = {
    name: d.name,
    phone: d.phone,
    dateOfBirth: d.dateOfBirth ? isoToDate(d.dateOfBirth) : null,
    level: d.level,
    parentName: d.parentName,
    parentPhone: d.parentPhone,
    monthlyFee: d.monthlyFee,
    notes: d.notes,
    status: d.active ? ("ACTIVE" as const) : ("INACTIVE" as const),
  };

  let id = d.id;
  if (id) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing || existing.role !== "STUDENT") return { error: "Nxënësi nuk u gjet." };
    await prisma.user.update({ where: { id }, data });
    await audit(user.id, "student.update", "user", id, { name: d.name });
  } else {
    const created = await prisma.user.create({ data: { ...data, role: "STUDENT" } });
    id = created.id;
    await audit(user.id, "student.create", "user", id, { name: d.name });
  }

  // Group memberships: open the chosen ones, close the rest.
  const current = await prisma.groupMember.findMany({ where: { userId: id, leftAt: null } });
  const now = new Date();
  await prisma.$transaction([
    ...current.filter((m) => !groupIds.includes(m.groupId)).map((m) => prisma.groupMember.update({ where: { id: m.id }, data: { leftAt: now } })),
    ...groupIds
      .filter((g) => !current.some((m) => m.groupId === g))
      .map((groupId) =>
        prisma.groupMember.upsert({
          where: { groupId_userId: { groupId, userId: id } },
          update: { leftAt: null, joinedAt: now },
          create: { groupId, userId: id },
        }),
      ),
  ]);

  revalidateStudent(id);
  redirect(`${LIST}/${id}`);
}

export async function deleteStudent(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const student = await prisma.user.findUnique({ where: { id } });
  if (!student || student.role !== "STUDENT") return;
  await prisma.user.delete({ where: { id } });
  await audit(user.id, "student.delete", "user", id, { name: student.name });
  revalidateStudent();
  redirect(LIST);
}

// ---------- Payments ----------

const paymentSchema = z.object({
  studentId: z.string().min(1),
  date: dateField("Data"),
  amount: optionalMoney,
  note: optionalText(120),
});

export async function addPayment(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = paymentSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  const d = parsed.data;
  if (!d.amount || d.amount <= 0) return { error: "Shkruani shumën e paguar." };
  const student = await prisma.user.findUnique({ where: { id: d.studentId } });
  if (!student || student.role !== "STUDENT") return { error: "Nxënësi nuk u gjet." };

  const payment = await prisma.payment.create({
    data: { userId: student.id, date: isoToDate(d.date), amount: d.amount, note: d.note, recordedById: user.id },
  });
  await audit(user.id, "payment.create", "payment", payment.id, { student: student.name, amount: d.amount, date: d.date });
  revalidateStudent(student.id);
  return { success: "Pagesa u shënua." };
}

export async function deletePayment(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment) return;
  await prisma.payment.delete({ where: { id } });
  await audit(user.id, "payment.delete", "payment", id, { amount: Number(payment.amount) });
  revalidateStudent(payment.userId);
}

// ---------- Notes ----------

const noteSchema = z.object({ studentId: z.string().min(1), body: requiredText("Shënimi", 1000) });

export async function addNote(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = noteSchema.safeParse(entries(formData));
  if (!parsed.success) return { error: firstIssue(parsed.error) };
  await prisma.studentNote.create({ data: { studentId: parsed.data.studentId, authorId: user.id, body: parsed.data.body } });
  revalidateStudent(parsed.data.studentId);
  return { success: "Shënimi u ruajt." };
}

export async function deleteNote(formData: FormData): Promise<void> {
  await requireStaff();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  const note = await prisma.studentNote.findUnique({ where: { id } });
  if (!note) return;
  await prisma.studentNote.delete({ where: { id } });
  revalidateStudent(note.studentId);
}
