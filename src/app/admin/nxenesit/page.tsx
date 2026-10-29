import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { currentMonthKey, monthStatus } from "@/lib/payments";
import { cn, initials, LEVEL_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { EmptyState, Fab, ListLink, StatusBadge } from "@/components/admin/list-link";

export const metadata: Metadata = { title: "Nxënësit" };

export default async function StudentsPage({ searchParams }: { searchParams: Promise<{ q?: string; f?: string }> }) {
  const { q = "", f = "" } = await searchParams;
  const month = currentMonthKey();
  const monthStart = new Date(`${month}-01T00:00:00.000Z`);

  const [students, groups] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: "STUDENT",
        ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { phone: { contains: q } }, { parentName: { contains: q, mode: "insensitive" } }] } : {}),
        ...(f.startsWith("grupi:") ? { memberships: { some: { groupId: f.slice(6), leftAt: null } } } : {}),
      },
      orderBy: [{ status: "asc" }, { name: "asc" }],
      include: {
        memberships: { where: { leftAt: null }, include: { group: { select: { name: true } } } },
        payments: { where: { date: { gte: monthStart } }, select: { date: true, amount: true } },
      },
    }),
    prisma.group.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  const rows = students
    .map((s) => ({
      ...s,
      month: monthStatus(month, s.monthlyFee ? Number(s.monthlyFee) : null, s.payments.map((p) => ({ date: p.date, amount: Number(p.amount) }))),
    }))
    .filter((s) => (f === "papaguar" ? s.status === "ACTIVE" && (s.month.status === "UNPAID" || s.month.status === "PARTIAL") : true));

  const active = students.filter((s) => s.status === "ACTIVE").length;
  const filterLink = (value: string, label: string) => (
    <Link
      key={value}
      href={{ pathname: "/admin/nxenesit", query: { ...(q ? { q } : {}), ...(value ? { f: value } : {}) } }}
      className={cn(
        "inline-flex h-8 shrink-0 items-center rounded-full px-3 text-sm font-semibold",
        f === value ? "bg-lime text-ink" : "border border-[#4a5b85] text-on-navy",
      )}
    >
      {label}
    </Link>
  );

  return (
    <>
      <PageHeader title="Nxënësit" right={<span className="text-sm text-on-navy-muted">{active} aktivë</span>}>
        <form action="/admin/nxenesit" className="mt-3 flex flex-col gap-2.5">
          {f && <input type="hidden" name="f" value={f} />}
          <label className="flex h-11 items-center gap-2.5 rounded-lg border-[1.5px] border-[#4a5b85] bg-navy-dark px-3 text-on-navy">
            <Search className="size-5 shrink-0 text-on-navy-muted" aria-hidden="true" />
            <span className="sr-only">Kërko nxënës</span>
            <input name="q" type="search" defaultValue={q} placeholder="Kërko sipas emrit ose telefonit" className="min-w-0 grow bg-transparent text-base outline-none placeholder:text-on-navy-muted" />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {filterLink("", "Të gjithë")}
            {filterLink("papaguar", "Pa paguar")}
            {groups.map((g) => filterLink(`grupi:${g.id}`, g.name))}
          </div>
        </form>
      </PageHeader>

      <main className="relative flex min-h-[60vh] flex-col gap-2 p-4">
        {rows.length === 0 ? (
          <EmptyState title={students.length === 0 && !q && !f ? "Ende asnjë nxënës." : "Asnjë rezultat."} text={students.length === 0 && !q && !f ? "Regjistroni të parin me butonin më poshtë." : "Provoni një kërkim ose filtër tjetër."} />
        ) : (
          rows.map((s) => (
            <ListLink
              key={s.id}
              href={`/admin/nxenesit/${s.id}`}
              title={s.name}
              meta={[
                s.memberships.map((m) => m.group.name).join(", ") || null,
                s.level && LEVEL_LABELS[s.level],
                s.parentName && `prindi: ${s.parentName}`,
                s.status === "INACTIVE" && "joaktiv",
              ]
                .filter(Boolean)
                .join(" · ")}
              leading={
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold", s.status === "ACTIVE" ? "bg-lime-soft text-lime-ink" : "bg-sunken text-ink-muted")}>
                  {initials(s.name)}
                </span>
              }
              badge={
                s.status !== "ACTIVE" || s.month.status === "NONE" ? undefined : s.month.status === "PAID" ? (
                  <StatusBadge kind="success">Paguar</StatusBadge>
                ) : s.month.status === "PARTIAL" ? (
                  <StatusBadge kind="warning">Pjesërisht</StatusBadge>
                ) : (
                  <StatusBadge kind="warning">Pa paguar</StatusBadge>
                )
              }
            />
          ))
        )}
        <Fab href="/admin/nxenesit/i-ri" label="Shto nxënës" />
      </main>
    </>
  );
}
