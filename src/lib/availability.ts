// Free court slots for the public site (see docs/REBUILD-PLAN.md 5.4).
// For a date: exception hours if one exists, else the weekday's hours,
// minus hours covered by confirmed bookings and scheduled group lessons.
import { prisma } from "@/lib/prisma";
import { addDays, isoToDate, nowTimeTirana, todayIso, weekdayOf } from "@/lib/dates";

export type DaySlots = {
  date: string;
  /** all offered start hours for the day, sorted */
  offered: string[];
  /** offered hours that are already taken */
  taken: string[];
  /** reason from a date exception, if any */
  note: string | null;
  closedByException: boolean;
};

export type CourtAvailability = {
  id: string;
  name: string;
  slotMinutes: number;
  guestHourly: number | null;
  memberHourly: number | null;
  bundles: { hours: number; price: number }[];
  description: string | null;
  indoor: boolean;
  days: DaySlots[];
};

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Hours (start times) in `offered` that overlap the interval [start, end). */
function coveredHours(offered: string[], start: string, end: string, slotMinutes: number) {
  const s = toMinutes(start);
  const e = toMinutes(end);
  return offered.filter((h) => {
    const hs = toMinutes(h);
    return hs < e && hs + slotMinutes > s;
  });
}

export async function getAvailability(fromIso: string, dayCount = 7): Promise<CourtAvailability[]> {
  const toIso = addDays(fromIso, dayCount - 1);
  const from = isoToDate(fromIso);
  const to = isoToDate(toIso);

  const courts = await prisma.court.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: {
      weeklyHours: true,
      exceptions: { where: { date: { gte: from, lte: to } } },
      bookings: { where: { date: { gte: from, lte: to }, status: "CONFIRMED" } },
      lessons: { where: { date: { gte: from, lte: to }, status: "SCHEDULED" } },
    },
  });

  return courts.map((court) => {
    const weekly = new Map(court.weeklyHours.map((w) => [w.weekday, [...w.startHours].sort()]));
    const exceptions = new Map(court.exceptions.map((x) => [x.date.toISOString().slice(0, 10), x]));
    const days: DaySlots[] = [];

    for (let i = 0; i < dayCount; i++) {
      const date = addDays(fromIso, i);
      const exception = exceptions.get(date);
      let offered = exception ? [...exception.startHours].sort() : (weekly.get(weekdayOf(date)) ?? []);
      // Today: hours that already started are gone.
      if (date === todayIso()) {
        const now = nowTimeTirana();
        offered = offered.filter((h) => h > now);
      }
      const busy = [
        ...court.bookings.filter((b) => b.date.toISOString().slice(0, 10) === date),
        ...court.lessons.filter((l) => l.date.toISOString().slice(0, 10) === date),
      ];
      const taken = new Set<string>();
      for (const b of busy) for (const h of coveredHours(offered, b.startTime, b.endTime, court.slotMinutes)) taken.add(h);

      days.push({
        date,
        offered,
        taken: [...taken].sort(),
        note: exception?.reason ?? null,
        closedByException: !!exception && exception.startHours.length === 0,
      });
    }

    const bundles = Array.isArray(court.bundles)
      ? (court.bundles as { hours?: unknown; price?: unknown }[])
          .filter((b) => typeof b.hours === "number" && typeof b.price === "number")
          .map((b) => ({ hours: b.hours as number, price: b.price as number }))
      : [];

    return {
      id: court.id,
      name: court.name,
      slotMinutes: court.slotMinutes,
      guestHourly: court.guestHourly ? Number(court.guestHourly) : null,
      memberHourly: court.memberHourly ? Number(court.memberHourly) : null,
      bundles,
      description: court.description,
      indoor: court.indoor,
      days,
    };
  });
}
