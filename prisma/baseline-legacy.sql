-- Runs before `prisma migrate deploy` (see the Vercel build command).
-- The first version of the app created its tables with `prisma db push`, so the
-- database has tables but no migration history, and `migrate deploy` refuses to
-- start (P3005). When that is the case, and only then, drop the legacy tables so
-- the baseline migration can run on an empty schema. Once `_prisma_migrations`
-- exists this block does nothing.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = '_prisma_migrations'
  ) THEN
    DROP TABLE IF EXISTS
      "_BookingToCourt", "user_achievements", "achievements", "progress_updates",
      "user_progress", "user_packages", "packages", "bookings", "court_availability",
      "lesson_attendees", "lessons", "group_members", "groups", "courts", "staff",
      "users", "settings"
    CASCADE;
    DROP TYPE IF EXISTS
      "UserRole", "MemberStatus", "PreferedPlayTime", "StaffRole", "CourtType",
      "LessonType", "SkillLevel", "DayOfWeek", "BookingState", "PaymentStatus",
      "PackageStatus", "BookerType"
    CASCADE;
  END IF;
END $$;
