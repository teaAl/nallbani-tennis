import bcrypt from "bcryptjs";
import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Fjalëkalimi duhet të ketë të paktën 8 karaktere.")
  .max(100, "Fjalëkalimi është shumë i gjatë.");

export function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
