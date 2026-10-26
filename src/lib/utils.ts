import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "9000" → "9.000" (Albanian thousands separator). */
export function formatMoney(value: number | string | { toString(): string } | null | undefined) {
  if (value === null || value === undefined) return "";
  const n = Number(value.toString());
  if (!Number.isFinite(n)) return "";
  return new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(n);
}

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  COACH: "Trajner",
  STUDENT: "Nxënës",
};

export const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "Fillestar",
  INTERMEDIATE: "Mesatar",
  ADVANCED: "Avancuar",
};

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
