"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";

export type LoginState = { error?: string; email?: string };

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const email = formData.get("email");
    return { error: "Shkruani email-in dhe fjalëkalimin.", email: typeof email === "string" ? email : undefined };
  }

  const { email, password, next } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

  const allowed =
    user?.password &&
    user.status === "ACTIVE" &&
    (user.role === "ADMIN" || user.role === "COACH") &&
    (await verifyPassword(password, user.password));

  if (!allowed || !user) {
    await sleep(700); // keeps guessing slow; the generic message gives nothing away
    return { error: "Email ose fjalëkalim i gabuar.", email };
  }

  await createSession({ id: user.id, role: user.role as "ADMIN" | "COACH", name: user.name });
  await prisma.auditLog.create({
    data: { actorId: user.id, action: "login", entity: "user", entityId: user.id },
  });

  redirect(next && next.startsWith("/admin") ? next : "/admin");
}
