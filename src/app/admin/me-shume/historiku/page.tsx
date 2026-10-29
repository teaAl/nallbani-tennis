import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Historiku" };

const PAGE = 50;

const ACTION_LABELS: Record<string, string> = {
  "student.create": "shtoi nxënësin",
  "student.update": "ndryshoi nxënësin",
  "student.delete": "fshiu nxënësin",
  "payment.create": "shënoi pagesë",
  "payment.delete": "fshiu pagesë",
  "note.create": "shtoi shënim",
  "note.delete": "fshiu shënim",
  "lesson.attendance": "mori prezencën",
  "lesson.status": "ndryshoi mësimin",
  "group.create": "krijoi grupin",
  "group.update": "ndryshoi grupin",
  "group.publish": "publikoi/fshehu grupin",
  "group.delete": "fshiu grupin",
  "offering.create": "krijoi kursin",
  "offering.update": "ndryshoi kursin",
  "offering.delete": "fshiu kursin",
  "activity.create": "krijoi aktivitetin",
  "activity.update": "ndryshoi aktivitetin",
  "activity.delete": "fshiu aktivitetin",
  "site.update": "ndryshoi faqen",
  "announcement.create": "shtoi njoftim",
  "announcement.toggle": "ndryshoi njoftim",
  "announcement.delete": "fshiu njoftim",
  "court.create": "shtoi fushë",
  "court.update": "ndryshoi fushën",
  "court.delete": "fshiu fushën",
  "court.weeklyHours": "ndryshoi orët e javës",
  "court.exception.create": "shtoi ditë të veçantë",
  "court.exception.update": "ndryshoi ditë të veçantë",
  "court.exception.delete": "fshiu ditë të veçantë",
  "booking.create": "shënoi rezervim",
  "booking.update": "ndryshoi rezervim",
  "booking.paid": "ndryshoi pagesën e rezervimit",
  "booking.delete": "fshiu rezervim",
  "account.create": "krijoi llogari",
  "account.status": "ndryshoi statusin e llogarisë",
  "account.password-reset": "rivendosi fjalëkalim",
  "password.change": "ndryshoi fjalëkalimin",
};

const fmt = new Intl.DateTimeFormat("sq-AL", { timeZone: "Europe/Tirane", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function detail(data: unknown) {
  if (!data || typeof data !== "object") return null;
  const d = data as Record<string, unknown>;
  const v = d.title ?? d.name ?? d.email ?? d.date ?? null;
  return typeof v === "string" ? v : null;
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  await requireAdmin();
  const { p } = await searchParams;
  const page = Math.max(1, Number(p) || 1);
  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE, take: PAGE, include: { actor: { select: { name: true } } } }),
    prisma.auditLog.count(),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE));

  return (
    <>
      <PageHeader eyebrow="Më shumë" title="Historiku i ndryshimeve" subtitle={`${total} veprime`} back={{ href: "/admin/me-shume", label: "Kthehu" }} />
      <main className="flex flex-col gap-4 p-4">
        {rows.length === 0 ? (
          <EmptyState title="Ende asnjë veprim." text="Çdo ndryshim nga paneli regjistrohet këtu." />
        ) : (
          <ol className="divide-y rounded-xl border bg-card">
            {rows.map((r) => {
              const extra = detail(r.data);
              return (
                <li key={r.id} className="flex items-start justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-[15px]">
                      <span className="font-semibold">{r.actor?.name ?? "Llogari e fshirë"}</span> {ACTION_LABELS[r.action] ?? r.action}
                      {extra && <span className="text-ink-muted"> · {extra}</span>}
                    </p>
                    <p className="text-xs text-ink-muted">{r.entity}{r.entityId ? ` · ${r.entityId.slice(-6)}` : ""}</p>
                  </div>
                  <time dateTime={r.createdAt.toISOString()} className="shrink-0 text-sm text-ink-muted tabular-nums">
                    {fmt.format(r.createdAt)}
                  </time>
                </li>
              );
            })}
          </ol>
        )}
        {pages > 1 && (
          <nav className="flex items-center justify-between text-sm font-semibold">
            {page > 1 ? <Link href={`?p=${page - 1}`} className="text-lime-ink underline underline-offset-4">← Më të rejat</Link> : <span />}
            <span className="text-ink-muted">{page} / {pages}</span>
            {page < pages ? <Link href={`?p=${page + 1}`} className="text-lime-ink underline underline-offset-4">Më të vjetrat →</Link> : <span />}
          </nav>
        )}
      </main>
    </>
  );
}
