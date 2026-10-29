// Monthly fee bookkeeping: due = the student's monthly fee, paid = payments dated in that month.
import { MONTHS, todayIso } from "@/lib/dates";

/** "YYYY-MM" of a date-only value */
export function monthKey(iso: string) {
  return iso.slice(0, 7);
}

export function currentMonthKey() {
  return monthKey(todayIso());
}

export function monthLabel(key: string, withYear = false) {
  const [y, m] = key.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${y}` : MONTHS[m - 1]!;
}

export function previousMonthKey(key: string, back = 1) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 - back, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export type MonthStatus = { key: string; due: number; paid: number; balance: number; status: "PAID" | "PARTIAL" | "UNPAID" | "NONE" };

export function monthStatus(
  key: string,
  monthlyFee: number | null,
  payments: { date: Date; amount: number }[],
): MonthStatus {
  const paid = payments
    .filter((p) => p.date.toISOString().slice(0, 7) === key)
    .reduce((sum, p) => sum + p.amount, 0);
  const due = monthlyFee ?? 0;
  const balance = Math.max(0, due - paid);
  const status = due === 0 ? "NONE" : balance === 0 ? "PAID" : paid > 0 ? "PARTIAL" : "UNPAID";
  return { key, due, paid, balance, status };
}

export const PAYMENT_STATUS_LABELS: Record<MonthStatus["status"], string> = {
  PAID: "Paguar",
  PARTIAL: "Pjesërisht",
  UNPAID: "Pa paguar",
  NONE: "Pa tarifë",
};
