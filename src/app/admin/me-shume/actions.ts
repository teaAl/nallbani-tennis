"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { destroySession, requireStaff } from "@/lib/auth";
import { hashPassword, passwordSchema, verifyPassword } from "@/lib/password";

export type FormState = { error?: string; success?: string };

const changeSchema = z
  .object({
    current: z.string().min(1, "Shkruani fjalëkalimin aktual."),
    next: passwordSchema,
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, { message: "Fjalëkalimi i ri nuk përputhet.", path: ["confirm"] });

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireStaff();
  const parsed = changeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Të dhëna të pavlefshme." };

  if (!user.password || !(await verifyPassword(parsed.data.current, user.password))) {
    return { error: "Fjalëkalimi aktual është i gabuar." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(parsed.data.next), mustChangePassword: false },
  });
  await prisma.auditLog.create({
    data: { actorId: user.id, action: "password.change", entity: "user", entityId: user.id },
  });
  return { success: "Fjalëkalimi u ndryshua." };
}

export async function logout() {
  await destroySession();
  redirect("/hyr");
}
