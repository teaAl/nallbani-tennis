// Published content shaped for the public cards.
import { prisma } from "@/lib/prisma";
import { dateToIso, isoToDate, todayIso } from "@/lib/dates";
import type { ActivityCardData, GroupCardData, OfferingCardData } from "@/components/site/cards";

export async function getPublishedGroups(limit?: number): Promise<GroupCardData[]> {
  const groups = await prisma.group.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { startTime: "asc" }],
    take: limit,
    include: { court: { select: { name: true } }, _count: { select: { members: { where: { leftAt: null } } } } },
  });
  return groups.map((g) => ({
    name: g.name,
    level: g.level,
    ageMin: g.ageMin,
    ageMax: g.ageMax,
    weekdays: g.weekdays,
    startTime: g.startTime,
    endTime: g.endTime,
    endDate: g.endDate ? dateToIso(g.endDate) : null,
    monthlyPrice: g.monthlyPrice ? g.monthlyPrice.toString() : null,
    capacity: g.capacity,
    memberCount: g._count.members,
    courtName: g.court?.name ?? null,
    description: g.description,
    photoUrl: g.photoUrl,
  }));
}

export async function getPublishedOfferings(limit?: number): Promise<OfferingCardData[]> {
  const items = await prisma.courseOffering.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    take: limit,
  });
  return items.map((o) => ({
    title: o.title,
    kind: o.kind,
    description: o.description,
    price: o.price ? o.price.toString() : null,
    priceUnit: o.priceUnit,
  }));
}

export async function getActivities(opts: { upcoming: boolean; limit?: number }): Promise<ActivityCardData[]> {
  const today = isoToDate(todayIso());
  const items = await prisma.activity.findMany({
    where: {
      published: true,
      ...(opts.upcoming
        ? { OR: [{ endDate: { gte: today } }, { AND: [{ endDate: null }, { startDate: { gte: today } }] }] }
        : { OR: [{ endDate: { lt: today } }, { AND: [{ endDate: null }, { startDate: { lt: today } }] }] }),
    },
    orderBy: { startDate: opts.upcoming ? "asc" : "desc" },
    take: opts.limit,
  });
  return items.map((a) => ({
    title: a.title,
    category: a.category,
    description: a.description,
    startDate: dateToIso(a.startDate),
    endDate: a.endDate ? dateToIso(a.endDate) : null,
    startTime: a.startTime,
    endTime: a.endTime,
    place: a.place,
    price: a.price ? a.price.toString() : null,
    guestCoachName: a.guestCoachName,
    guestCoachBio: a.guestCoachBio,
    capacity: a.capacity,
    photoUrl: a.photoUrl,
  }));
}
