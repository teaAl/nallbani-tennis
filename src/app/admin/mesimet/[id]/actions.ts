"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";
import { audit } from "@/lib/audit";

const schema = z.object({
  lessonId: z.string().min(1),
  userId: z.string().min(1),
  status: z.enum(["PRESENT", "ABSENT", "CLEAR"]),
});

export async function setAttendance(input: { lessonId: string; userId: string; status: "PRESENT" | "ABSENT" | "CLEAR" }) {
  await requireStaff();
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false as const };
  const { lessonId, userId, status } = parsed.data;

  if (status === "CLEAR") {
    await prisma.lessonAttendee.deleteMany({ where: { lessonId, userId } });
  } else {
    await prisma.lessonAttendee.upsert({
      where: { lessonId_userId: { lessonId, userId } },
      update: { status },
      create: { lessonId, userId, status },
    });
  }
  revalidatePath(`/admin/mesimet/${lessonId}`);
  revalidatePath("/admin");
  revalidatePath(`/admin/nxenesit/${userId}`);
  return { ok: true as const };
}

export async function setLessonStatus(formData: FormData): Promise<void> {
  const user = await requireStaff();
  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || (status !== "SCHEDULED" && status !== "CANCELLED")) return;
  await prisma.lesson.update({ where: { id }, data: { status } });
  await audit(user.id, "lesson.status", "lesson", id, { status });
  revalidatePath(`/admin/mesimet/${id}`);
  revalidatePath("/admin");
  revalidatePath("/fushat");
}
