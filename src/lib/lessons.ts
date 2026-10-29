// Lessons are the dated sessions of a group. They are materialised lazily:
// whenever a day is looked at, the sessions every group has on that weekday
// are created if missing (unique on group + date + start time).
import { prisma } from "@/lib/prisma";
import { addDays, isoToDate, weekdayOf } from "@/lib/dates";

export async function ensureLessonsForDate(dateIso: string) {
  const date = isoToDate(dateIso);
  const weekday = weekdayOf(dateIso);
  const groups = await prisma.group.findMany({
    where: {
      weekdays: { has: weekday },
      OR: [{ startDate: null }, { startDate: { lte: date } }],
      AND: [{ OR: [{ endDate: null }, { endDate: { gte: date } }] }],
    },
    select: { id: true, startTime: true, endTime: true, courtId: true },
  });
  if (groups.length === 0) return;
  await prisma.$transaction(
    groups.map((g) =>
      prisma.lesson.upsert({
        where: { groupId_date_startTime: { groupId: g.id, date, startTime: g.startTime } },
        update: {},
        create: { groupId: g.id, date, startTime: g.startTime, endTime: g.endTime, courtId: g.courtId },
      }),
    ),
  );
}

export async function ensureLessonsForRange(fromIso: string, days: number) {
  for (let i = 0; i < days; i++) await ensureLessonsForDate(addDays(fromIso, i));
}

export type DayLesson = Awaited<ReturnType<typeof getLessonsForDate>>[number];

export async function getLessonsForDate(dateIso: string) {
  await ensureLessonsForDate(dateIso);
  const lessons = await prisma.lesson.findMany({
    where: { date: isoToDate(dateIso) },
    orderBy: { startTime: "asc" },
    include: {
      group: { select: { id: true, name: true, _count: { select: { members: { where: { leftAt: null } } } } } },
      court: { select: { name: true } },
      _count: { select: { attendees: true } },
      attendees: { select: { status: true } },
    },
  });
  return lessons.map((l) => ({
    id: l.id,
    startTime: l.startTime,
    endTime: l.endTime,
    status: l.status,
    groupId: l.group?.id ?? null,
    groupName: l.group?.name ?? "Mësim",
    courtName: l.court?.name ?? null,
    memberCount: l.group?._count.members ?? 0,
    presentCount: l.attendees.filter((a) => a.status === "PRESENT").length,
    attendanceTaken: l.attendees.length > 0,
  }));
}

export function durationLabel(startTime: string, endTime: string) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const minutes = eh * 60 + em - (sh * 60 + sm);
  return minutes % 60 === 0 ? `${minutes / 60} orë` : `${minutes} min`;
}
