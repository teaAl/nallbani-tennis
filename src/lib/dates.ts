// Dates are club-local (Europe/Tirane). Date-only columns are stored as UTC midnight.
export const TZ = "Europe/Tirane";

export const WEEKDAYS = ["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"];
export const WEEKDAYS_SHORT = ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"];
/** Monday-first order of JS weekday numbers, for pickers. */
export const WEEKDAYS_MON_FIRST = [1, 2, 3, 4, 5, 6, 0];
export const MONTHS = [
  "janar", "shkurt", "mars", "prill", "maj", "qershor",
  "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor",
];

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's calendar date in Tirana as "YYYY-MM-DD". */
export function todayIso(now: Date = new Date()): string {
  return isoFormatter.format(now);
}

/** "YYYY-MM-DD" → Date at UTC midnight, the form Prisma expects for @db.Date. */
export function isoToDate(iso: string): Date {
  return new Date(`${iso}T00:00:00.000Z`);
}

/** Date from a @db.Date column (UTC midnight) → "YYYY-MM-DD". */
export function dateToIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const d = isoToDate(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return dateToIso(d);
}

/** JS weekday (0 = Sunday) of a date-only value. */
export function weekdayOf(iso: string): number {
  return isoToDate(iso).getUTCDay();
}

/** "2026-10-13" → "e hënë, 13 tetor" (or "13 tetor 2026" with year). */
export function formatDateSq(iso: string, opts: { weekday?: boolean; year?: boolean } = {}): string {
  const d = isoToDate(iso);
  const day = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
  const withYear = opts.year ? `${day} ${d.getUTCFullYear()}` : day;
  return opts.weekday ? `${WEEKDAYS[d.getUTCDay()]}, ${withYear}` : withYear;
}

/** Current time of day in Tirana as "HH:mm". */
export function nowTimeTirana(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false }).format(now);
}
