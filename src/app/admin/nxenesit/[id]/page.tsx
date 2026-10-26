import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { dateToIso, formatDateSq, timestampToIso, todayIso } from "@/lib/dates";
import { currentMonthKey, monthLabel, monthStatus, PAYMENT_STATUS_LABELS, previousMonthKey } from "@/lib/payments";
import { whatsappLink, telLink } from "@/lib/site";
import { cn, formatMoney, initials, LEVEL_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/list-link";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { NoteForm, PaymentForm } from "./forms";
import { deleteNote, deletePayment } from "../actions";

export const metadata: Metadata = { title: "Nxënësi" };

function age(dob: Date | null) {
  if (!dob) return null;
  const today = new Date(todayIso());
  let years = today.getUTCFullYear() - dob.getUTCFullYear();
  const m = today.getUTCMonth() - dob.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < dob.getUTCDate())) years--;
  return years;
}

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const today = todayIso();
  const student = await prisma.user.findUnique({
    where: { id },
    include: {
      memberships: { where: { leftAt: null }, include: { group: { select: { id: true, name: true } } } },
      payments: { orderBy: { date: "desc" }, take: 24 },
      studentNotes: { orderBy: { createdAt: "desc" } },
      attendance: {
        include: { lesson: { include: { group: { select: { name: true } } } } },
        orderBy: { lesson: { date: "desc" } },
        take: 12,
      },
    },
  });
  if (!student || student.role !== "STUDENT") notFound();

  const fee = student.monthlyFee ? Number(student.monthlyFee) : null;
  const payments = student.payments.map((p) => ({ ...p, amount: Number(p.amount) }));
  const month = currentMonthKey();
  const joinedMonth = timestampToIso(student.createdAt).slice(0, 7);
  const months = [month, previousMonthKey(month, 1), previousMonthKey(month, 2)]
    .filter((k) => k >= joinedMonth)
    .map((k) => monthStatus(k, fee, payments));
  const now = months[0]!;
  const badgeKind = now.status === "PAID" ? "success" : now.status === "NONE" ? "muted" : "warning";

  const waStudent = whatsappLink(student.phone, `Përshëndetje ${student.name.split(" ")[0]}!`);
  const waParent = whatsappLink(student.parentPhone, `Përshëndetje${student.parentName ? ` ${student.parentName.split(" ")[0]}` : ""}! Ju shkruaj nga klubi i tenisit për ${student.name}.`);
  const tel = telLink(student.phone) ?? telLink(student.parentPhone);
  const years = age(student.dateOfBirth);
  const presentCount = student.attendance.filter((a) => a.status === "PRESENT").length;
  const absent = student.attendance.filter((a) => a.status === "ABSENT");

  return (
    <>
      <PageHeader
        eyebrow="Nxënësi"
        title={student.name}
        back={{ href: "/admin/nxenesit", label: "Kthehu te nxënësit" }}
        right={
          <Link href={`/admin/nxenesit/${student.id}/ndrysho`} className="text-sm font-semibold text-lime underline-offset-4 hover:underline">
            Ndrysho
          </Link>
        }
      >
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-lime text-xl font-bold text-ink">{initials(student.name)}</span>
          <p className="text-sm text-on-navy-muted">
            {[years !== null && `${years} vjeç`, student.level && LEVEL_LABELS[student.level], student.memberships.map((m) => m.group.name).join(", "), student.status === "INACTIVE" && "joaktiv"]
              .filter(Boolean)
              .join(" · ") || "Pa të dhëna"}
          </p>
        </div>
        {(waStudent || waParent || tel) && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(waParent ?? waStudent) && (
              <a href={(waParent ?? waStudent)!} target="_blank" rel="noopener" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-lime font-semibold text-ink">
                <WhatsAppIcon className="size-5" /> {waParent ? "Prindi" : "WhatsApp"}
              </a>
            )}
            {tel && (
              <a href={tel} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border-[1.5px] border-on-navy-muted font-semibold text-on-navy">
                <Phone className="size-5" /> Telefono
              </a>
            )}
          </div>
        )}
      </PageHeader>

      <main className="flex flex-col gap-5 p-4">
        <section className="flex flex-col gap-3 rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="eyebrow text-ink-muted">Pagesa · {monthLabel(month)}</h2>
            <StatusBadge kind={badgeKind}>{PAYMENT_STATUS_LABELS[now.status]}</StatusBadge>
          </div>
          {fee === null ? (
            <p className="text-sm text-ink-muted">Pa tarifë mujore. Vendoseni te Ndrysho nëse paguan çdo muaj.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-xs text-ink-muted">Tarifa mujore</p>
                <p className="display text-2xl tabular-nums">{formatMoney(now.due)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted">Paguar</p>
                <p className="display text-2xl text-success tabular-nums">{formatMoney(now.paid)}</p>
              </div>
              <div>
                <p className="text-xs text-ink-muted">Mbetur</p>
                <p className={cn("display text-2xl tabular-nums", now.balance > 0 && "text-danger")}>{formatMoney(now.balance)}</p>
              </div>
            </div>
          )}
          {fee !== null && (
            <div className="flex gap-2 text-xs">
              {months.slice(1).map((m) => (
                <span key={m.key} className={cn("rounded-full px-2 py-0.5", m.status === "PAID" ? "bg-success-soft text-success" : m.status === "NONE" ? "bg-sunken text-ink-muted" : "bg-warning-soft text-warning")}>
                  {monthLabel(m.key)}: {PAYMENT_STATUS_LABELS[m.status].toLowerCase()}
                </span>
              ))}
            </div>
          )}
          {payments.length > 0 && (
            <ul className="divide-y border-t">
              {payments.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 py-2">
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{formatDateSq(dateToIso(p.date), { year: true })}</span>
                    {p.note && <span className="text-xs text-ink-muted">{p.note}</span>}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold tabular-nums">{formatMoney(p.amount)} Lekë</span>
                    <form action={deletePayment}>
                      <input type="hidden" name="id" value={p.id} />
                      <Button type="submit" variant="ghost" size="xs" className="text-danger">
                        Fshi
                      </Button>
                    </form>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t pt-3">
            <PaymentForm studentId={student.id} today={today} defaultAmount={fee !== null ? String(now.balance || fee) : null} />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Prezenca · mësimet e fundit</h2>
          <div className="rounded-xl border bg-card p-4">
            {student.attendance.length === 0 ? (
              <p className="text-sm text-ink-muted">Ende pa prezencë të marrë. Merret nga skeda Sot, te çdo mësim.</p>
            ) : (
              <>
                <div className="flex gap-1.5">
                  {[...student.attendance].reverse().map((a) => (
                    <span
                      key={a.id}
                      title={`${formatDateSq(dateToIso(a.lesson.date))} · ${a.lesson.group?.name ?? ""}`}
                      className={cn("h-7 flex-1 rounded", a.status === "PRESENT" ? "bg-success" : "border-[1.5px] border-danger bg-danger-soft")}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  <b className="font-semibold text-success">{presentCount} prezent</b>
                  {absent.length > 0 && ` · ${absent.length} mungesë (${absent.slice(0, 3).map((a) => formatDateSq(dateToIso(a.lesson.date))).join(", ")})`}
                </p>
              </>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Shënimet e trajnerit</h2>
          {student.studentNotes.map((n) => (
            <div key={n.id} className="flex flex-col gap-1 rounded-xl border bg-card px-3.5 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-ink-muted">{formatDateSq(timestampToIso(n.createdAt), { year: true })}</span>
                <form action={deleteNote}>
                  <input type="hidden" name="id" value={n.id} />
                  <Button type="submit" variant="ghost" size="xs" className="text-danger">
                    Fshi
                  </Button>
                </form>
              </div>
              <p className="text-[15px] whitespace-pre-line">{n.body}</p>
            </div>
          ))}
          <div className="rounded-xl border bg-card p-4">
            <NoteForm studentId={student.id} />
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="eyebrow text-ink-muted">Të dhënat</h2>
          <dl className="divide-y rounded-xl border bg-card px-4 text-[15px]">
            {[
              ["Datëlindja", student.dateOfBirth ? formatDateSq(dateToIso(student.dateOfBirth), { year: true }) : "—"],
              ["Telefoni", student.phone ?? "—"],
              ["Prindi", student.parentName ?? "—"],
              ["Telefoni i prindit", student.parentPhone ?? "—"],
              ["Anëtar që nga", formatDateSq(timestampToIso(student.createdAt), { year: true })],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 py-2.5">
                <dt className="text-ink-muted">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {student.notes && <p className="px-1 text-sm whitespace-pre-line text-ink-muted">{student.notes}</p>}
        </section>
      </main>
    </>
  );
}
