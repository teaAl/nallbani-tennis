// What the coach sees on day one. Runs on every deploy (see vercel.json), so it
// must be safe to repeat: staff accounts are created only if their email is new,
// and the starter content is created only once, on an empty database.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Locally the values come from .env; on Vercel from the project settings.
try {
  process.loadEnvFile(".env");
} catch {
  /* no .env file: rely on the environment */
}

const prisma = new PrismaClient();

async function ensureStaff(opts: { email: string | undefined; password: string | undefined; name: string; role: "ADMIN" | "COACH" }) {
  if (!opts.email || !opts.password) {
    console.log(`Skipping ${opts.role}: SEED_* variables not set.`);
    return null;
  }
  const email = opts.email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  const created = await prisma.user.create({
    data: { email, name: opts.name, role: opts.role, password: await bcrypt.hash(opts.password, 12), mustChangePassword: true },
  });
  console.log(`Created ${opts.role} account for ${email}.`);
  return created;
}

async function createCourt(name: string, sortOrder: number, weekly: Record<number, string[]>) {
  return prisma.court.create({
    data: {
      name,
      sortOrder,
      surface: "HARD",
      guestHourly: 1500,
      memberHourly: 1000,
      bundles: [{ hours: 10, price: 12000 }],
      weeklyHours: { create: Array.from({ length: 7 }, (_, weekday) => ({ weekday, startHours: weekly[weekday] ?? [] })) },
    },
  });
}

async function main() {
  const admin = await ensureStaff({ email: process.env.SEED_ADMIN_EMAIL, password: process.env.SEED_ADMIN_PASSWORD, name: "Administratori", role: "ADMIN" });
  const coach = await ensureStaff({ email: process.env.SEED_COACH_EMAIL, password: process.env.SEED_COACH_PASSWORD, name: "Trajneri", role: "COACH" });

  const fresh = !(await prisma.siteSettings.findUnique({ where: { id: 1 } }));
  if (!fresh) {
    console.log("Starter content already present; nothing else to do.");
    return;
  }

  await prisma.siteSettings.create({
    data: {
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
  const court1 = await createCourt("Fusha 1", 1, { 0: morning, 1: evening, 2: evening, 3: evening, 4: evening, 5: evening, 6: morning });
  await createCourt("Fusha 2", 2, { 0: [], 1: evening, 2: evening, 3: evening, 4: evening, 5: evening, 6: morning });

  await prisma.group.create({
    data: {
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
      coachId: coach?.id ?? null,
      courtId: court1.id,
      published: false,
    },
  });

  await prisma.courseOffering.create({
    data: {
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
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);
  nextMonth.setUTCHours(0, 0, 0, 0);
  await prisma.activity.create({
    data: {
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

  await prisma.auditLog.create({ data: { actorId: admin?.id ?? null, action: "seed", entity: "system", data: { version: 2 } } });
  console.log("Seeded starter content: site settings, 2 courts, 1 example group / offering / activity.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
