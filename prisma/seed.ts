// What the coach sees on day one. Safe to re-run: everything is upserted.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Locally the values come from .env; on Vercel from the project settings.
try {
  process.loadEnvFile(".env");
} catch {
  /* no .env file: rely on the environment */
}

const prisma = new PrismaClient();

function need(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Seed needs ${name} in the environment`);
  return value;
}

async function upsertStaff(opts: { email: string; password: string; name: string; role: "ADMIN" | "COACH" }) {
  const hash = await bcrypt.hash(opts.password, 12);
  return prisma.user.upsert({
    where: { email: opts.email.toLowerCase() },
    update: { name: opts.name, role: opts.role, status: "ACTIVE" },
    create: {
      email: opts.email.toLowerCase(),
      name: opts.name,
      role: opts.role,
      password: hash,
      mustChangePassword: true,
    },
  });
}

async function upsertCourt(name: string, sortOrder: number, weekly: Record<number, string[]>) {
  const existing = await prisma.court.findFirst({ where: { name } });
  const court =
    existing ??
    (await prisma.court.create({
      data: { name, sortOrder, surface: "HARD", guestHourly: 1500, memberHourly: 1000, bundles: [{ hours: 10, price: 12000 }] },
    }));
  for (let weekday = 0; weekday < 7; weekday++) {
    await prisma.courtWeeklyHours.upsert({
      where: { courtId_weekday: { courtId: court.id, weekday } },
      update: {},
      create: { courtId: court.id, weekday, startHours: weekly[weekday] ?? [] },
    });
  }
  return court;
}

async function main() {
  const admin = await upsertStaff({
    email: need("SEED_ADMIN_EMAIL"),
    password: need("SEED_ADMIN_PASSWORD"),
    name: "Administratori",
    role: "ADMIN",
  });
  const coach = await upsertStaff({
    email: need("SEED_COACH_EMAIL"),
    password: need("SEED_COACH_PASSWORD"),
    name: "Trajneri",
    role: "COACH",
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      clubName: "Tennis Nallbani",
      tagline: "Klub tenisi në Tiranë",
      heroTitle: "Tenis për të gjithë",
      heroText: "Kurse për fëmijë dhe të rritur, fusha me orë dhe aktivitete gjatë gjithë vitit.",
      aboutText: "[Shkruani këtu disa fjali për klubin.]",
      coachName: "[Emri i trajnerit]",
      coachBio: "[Një paragraf për trajnerin.]",
      phone: "[+355 6X XXX XXXX]",
      whatsapp: "",
      address: "[Adresa], Tiranë",
      openingHoursText: "Çdo ditë 08:00–22:00",
      seoTitle: "Tennis Nallbani – kurse tenisi dhe fusha në Tiranë",
      seoDescription: "Kurse tenisi për fëmijë dhe të rritur, rezervim fushash me orë dhe aktivitete sportive në Tiranë.",
    },
  });

  const evening = ["18:00", "19:00", "20:00", "21:00"];
  const morning = ["09:00", "10:00", "11:00", "12:00"];
  const court1 = await upsertCourt("Fusha 1", 1, { 0: morning, 1: evening, 2: evening, 3: evening, 4: evening, 5: evening, 6: morning });
  await upsertCourt("Fusha 2", 2, { 0: [], 1: evening, 2: evening, 3: evening, 4: evening, 5: evening, 6: morning });

  await prisma.group.upsert({
    where: { slug: "grupi-i-femijeve" },
    update: {},
    create: {
      name: "Grupi i fëmijëve",
      slug: "grupi-i-femijeve",
      description: "Shembull: bazat e tenisit me lojë dhe ushtrime të shkurtra. Ndryshojeni ose fshijeni.",
      level: "BEGINNER",
      ageMin: 8,
      ageMax: 12,
      weekdays: [1, 3],
      startTime: "17:00",
      endTime: "18:00",
      monthlyPrice: 9000,
      capacity: 8,
      coachId: coach.id,
      courtId: court1.id,
      published: false,
    },
  });

  await prisma.courseOffering.upsert({
    where: { slug: "mesim-privat" },
    update: {},
    create: {
      title: "Mësim privat",
      slug: "mesim-privat",
      kind: "1 me 1",
      description: "Shembull: 60 minuta me trajnerin, orar sipas jush.",
      price: 3000,
      priceUnit: "PER_HOUR",
      published: false,
    },
  });

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  await prisma.activity.upsert({
    where: { slug: "yoga-ne-fushe" },
    update: {},
    create: {
      title: "Yoga në fushë",
      slug: "yoga-ne-fushe",
      category: "Yoga",
      description: "Shembull aktiviteti. Ndryshojeni ose fshijeni.",
      startDate: nextMonth,
      startTime: "09:00",
      endTime: "10:30",
      place: "Fusha 2",
      price: 1500,
      capacity: 12,
      published: false,
    },
  });

  await prisma.auditLog.create({
    data: { actorId: admin.id, action: "seed", entity: "system", data: { version: 2 } },
  });

  console.log("Seeded: admin, coach, site settings, 2 courts, 1 example group / offering / activity.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
