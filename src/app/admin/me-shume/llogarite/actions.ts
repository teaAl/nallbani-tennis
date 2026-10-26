"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { hashPassword, passwordSchema } from "@/lib/password";

export type FormState = { error?: string; success?: string };

const PATH = "/admin/me-shume/llogarite";

const createSchema = z.object({
  name: z.string().trim().min(2, "Shkruani emrin.").max(80),
  email: z.email("Email i pavlefshëm."),
  role: z.enum(["ADMIN", "COACH"]),
  password: passwordSchema,
});

export async function createAccount(_prev: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Të dhëna të pavlefshme." };

  const email = parsed.data.email.toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) {
    return { error: "Ekziston një llogari me këtë email." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      role: parsed.data.role,
      password: await hashPassword(parsed.data.password),
      mustChangePassword: true,
    },
  });
  await prisma.auditLog.create({
    data: { actorId: admin.id, action: "account.create", entity: "user", entityId: user.id, data: { role: user.role } },
  });
  revalidatePath(PATH);
  return { success: `Llogaria për ${user.name} u krijua. Jepini fjalëkalimin e përkohshëm.` };
}

const idSchema = z.object({ id: z.string().min(1) });

export async function toggleAccountStatus(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const parsed = idSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || parsed.data.id === admin.id) return;

  const user = await prisma.user.findUnique({ where: { id: parsed.data.id } });
  if (!user || user.role === "STUDENT") return;

  const status = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  await prisma.user.update({ where: { id: user.id }, data: { status } });
  await prisma.auditLog.create({
    data: { actorId: admin.id, action: "account.status", entity: "user", entityId: user.id, data: { status } },
  });
  revalidatePath(PATH);
}

const resetSchema = z.object({ id: z.string().min(1), password: passwordSchema });

export async function resetPassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Të dhëna të pavlefshme." };

  const user = await prisma.user.findUnique({ where: { id: parsed.data.id } });
  if (!user || user.role === "STUDENT") return { error: "Llogaria nuk u gjet." };

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(parsed.data.password), mustChangePassword: true },
  });
  await prisma.auditLog.create({
    data: { actorId: admin.id, action: "account.password-reset", entity: "user", entityId: user.id },
  });
  revalidatePath(PATH);
  return { success: `Fjalëkalimi i ${user.name} u rivendos. Do t'i kërkohet ta ndryshojë.` };
}
