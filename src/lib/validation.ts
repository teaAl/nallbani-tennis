// zod helpers for FormData coming from the admin forms. Empty strings become null.
import { z } from "zod";

const blankToNull = (v: unknown) => (v === undefined || v === null || (typeof v === "string" && v.trim() === "") ? null : v);

export const optionalText = (max = 2000) =>
  z.preprocess(blankToNull, z.string().trim().max(max).nullable());

export const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label}: e detyrueshme.`).max(max, `${label}: shumë e gjatë.`);

/** "9.000", "9 000", "9000" → 9000 */
export const optionalMoney = z.preprocess((v) => {
  if (typeof v !== "string" || v.trim() === "") return null;
  const n = Number(v.replace(/[.\s]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}, z.number("Shuma duhet të jetë numër.").min(0).max(10_000_000).nullable());

export const optionalInt = z.preprocess((v) => {
  if (typeof v !== "string" || v.trim() === "") return null;
  const n = Number(v);
  return Number.isInteger(n) ? n : NaN;
}, z.number("Duhet të jetë numër i plotë.").int().min(0).max(1000).nullable());

export const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean());

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
export const timeField = (label: string) => z.string().regex(TIME, `${label}: ora duhet si 18:00.`);
export const optionalTime = z.preprocess(blankToNull, z.string().regex(TIME, "Ora duhet si 18:00.").nullable());

const DATE = /^\d{4}-\d{2}-\d{2}$/;
export const dateField = (label: string) => z.string().regex(DATE, `${label}: zgjidhni një datë.`);
export const optionalDate = z.preprocess(blankToNull, z.string().regex(DATE, "Data e pavlefshme.").nullable());

/** Multiple values of the same field name, e.g. weekdays[] or startHours[]. */
export function getAll(formData: FormData, name: string): string[] {
  return formData.getAll(name).filter((v): v is string => typeof v === "string");
}

export const weekdayList = z.array(z.coerce.number().int().min(0).max(6)).max(7);
export const hourList = z.array(z.string().regex(TIME)).max(24);

/** First zod issue as a readable message. */
export function firstIssue(error: z.ZodError, fallback = "Të dhëna të pavlefshme."): string {
  return error.issues[0]?.message ?? fallback;
}

export function entries(formData: FormData): Record<string, FormDataEntryValue> {
  const out: Record<string, FormDataEntryValue> = {};
  for (const [k, v] of formData.entries()) if (!(k in out)) out[k] = v;
  return out;
}
