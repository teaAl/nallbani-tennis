import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { CreateAccountForm, ResetPasswordForm } from "./forms";
import { toggleAccountStatus } from "./actions";

export const metadata: Metadata = { title: "Llogaritë" };

export default async function AccountsPage() {
  const admin = await requireAdmin();
  const accounts = await prisma.user.findMany({
    where: { role: { in: ["ADMIN", "COACH"] } },
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });

  return (
    <>
      <PageHeader eyebrow="Më shumë" title="Llogaritë e stafit" back={{ href: "/admin/me-shume", label: "Kthehu" }} />
      <main className="flex flex-col gap-5 p-4">
        <section className="flex flex-col gap-2">
          {accounts.map((a) => {
            const self = a.id === admin.id;
            return (
              <div key={a.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {a.name}
                      {self && <span className="ml-2 text-sm font-normal text-ink-muted">(ju)</span>}
                    </p>
                    <p className="truncate text-sm text-ink-muted">
                      {ROLE_LABELS[a.role]} · {a.email}
                    </p>
                  </div>
                  <span
                    className={
                      a.status === "ACTIVE"
                        ? "shrink-0 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold tracking-wider text-success uppercase"
                        : "shrink-0 rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold tracking-wider text-ink-muted uppercase"
                    }
                  >
                    {a.status === "ACTIVE" ? "Aktive" : "Çaktivizuar"}
                  </span>
                </div>
                {!self && (
                  <>
                    <ResetPasswordForm userId={a.id} />
                    <form action={toggleAccountStatus}>
                      <input type="hidden" name="id" value={a.id} />
                      <Button type="submit" variant="ghost" size="sm" className={a.status === "ACTIVE" ? "text-danger" : "text-success"}>
                        {a.status === "ACTIVE" ? "Çaktivizo llogarinë" : "Riaktivizo llogarinë"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            );
          })}
        </section>

        <section className="rounded-xl border bg-card p-4">
          <h2 className="eyebrow mb-3 text-ink-muted">Llogari e re</h2>
          <CreateAccountForm />
        </section>
      </main>
    </>
  );
}
