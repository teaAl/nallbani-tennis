import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        status: "ACTIVE",
      },
      {
        id: "user2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "securepassword",
        status: "ACTIVE",
      },
    ],
  });

  // Seed Staff
  const staff = await prisma.staff.createMany({
    data: [
      {
        id: "staff1",
        name: "Coach Mike",
        email: "coach.mike@example.com",
        role: "COACH",
      },
      {
        id: "staff2",
        name: "Admin Alice",
        email: "admin.alice@example.com",
        role: "ADMIN",
      },
    ],
  });

  // Seed Courts
  const courts = await prisma.court.createMany({
    data: [
      { id: "court1", name: "Court 1", type: "CLAY", indoor: false },
      { id: "court2", name: "Court 2", type: "HARD", indoor: true },
    ],
  });

  // Seed Groups
  const groups = await prisma.group.createMany({
    data: [
      {
        id: "group1",
        name: "Beginner Group",
        level: "BEGINNER",
        startTime: "10:00",
        endTime: "12:00",
        startDate: new Date("2023-01-01"),
        maxCapacity: 10,
        coachId: "staff1",
      },
      {
        id: "group2",
        name: "Advanced Group",
        level: "ADVANCED",
        startTime: "14:00",
        endTime: "16:00",
        startDate: new Date("2023-01-01"),
        maxCapacity: 8,
        coachId: "staff1",
      },
    ],
  });

  // Seed Lessons
  const lessons = await prisma.lesson.createMany({
    data: [
      {
        id: "lesson1",
        title: "Forehand Basics",
        startTime: new Date("2023-01-02T10:00:00Z"),
        endTime: new Date("2023-01-02T11:00:00Z"),
        type: "PRIVATE",
        level: "BEGINNER",
        maxCapacity: 1,
        coachId: "staff1",
        courtId: "court1",
      },
      {
        id: "lesson2",
        title: "Advanced Serve Techniques",
        startTime: new Date("2023-01-03T14:00:00Z"),
        endTime: new Date("2023-01-03T15:00:00Z"),
        type: "GROUP",
        level: "ADVANCED",
        maxCapacity: 8,
        coachId: "staff1",
        courtId: "court2",
      },
    ],
  });

  // Seed Bookings
  const bookings = await prisma.booking.createMany({
    data: [
      {
        id: "booking1",
        startTime: new Date("2023-01-02T10:00:00Z"),
        endTime: new Date("2023-01-02T11:00:00Z"),
        status: "CONFIRMED",
        userId: "user1",
        courtId: "court1",
      },
      {
        id: "booking2",
        startTime: new Date("2023-01-03T14:00:00Z"),
        endTime: new Date("2023-01-03T15:00:00Z"),
        status: "PENDING",
        userId: "user2",
        courtId: "court2",
      },
    ],
  });

  // Seed Packages
  const packages = await prisma.package.createMany({
    data: [
      {
        id: "package1",
        name: "Beginner Package",
        price: 100.0,
        duration: 30,
        lessonCount: 10,
        level: "BEGINNER",
      },
      {
        id: "package2",
        name: "Advanced Package",
        price: 200.0,
        duration: 60,
        lessonCount: 20,
        level: "ADVANCED",
      },
    ],
  });

  // Seed User Packages
  const userPackages = await prisma.userPackage.createMany({
    data: [
      {
        id: "userPackage1",
        userId: "user1",
        packageId: "package1",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-03-01"),
        lessonsRemaining: 10,
        status: "ACTIVE",
      },
      {
        id: "userPackage2",
        userId: "user2",
        packageId: "package2",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-06-01"),
        lessonsRemaining: 20,
        status: "ACTIVE",
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });