import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { initials, ROLE_LABELS } from "@/lib/utils";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { ChangePasswordForm } from "./forms";
import { logout } from "./actions";

export const metadata: Metadata = { title: "Më shumë" };

export default async function MorePage() {
  const user = await requireStaff();

  return (
    <>
      <PageHeader title="Më shumë" />
      <main className="flex flex-col gap-5 p-4">
        <section className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-lg font-bold text-ink">
            {initials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="font-semibold">{user.name}</p>
            <p className="truncate text-sm text-ink-muted">
              {ROLE_LABELS[user.role]} · {user.email}
            </p>
          </div>
        </section>

        {user.role === "ADMIN" && (
          <Link
            href="/admin/me-shume/llogarite"
            className="flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5 font-semibold"
          >
            <span>
              Llogaritë e stafit
              <span className="block text-sm font-normal text-ink-muted">Shto trajner, rivendos fjalëkalime</span>
            </span>
            <ChevronRight className="size-5 text-line-strong" />
          </Link>
        )}

        <section id="fjalekalimi" className="rounded-xl border bg-card p-4">
          <h2 className="eyebrow mb-3 text-ink-muted">Ndrysho fjalëkalimin</h2>
          <ChangePasswordForm />
        </section>

        <section className="rounded-xl border bg-card p-4">
          <h2 className="eyebrow mb-2 text-ink-muted">Si funksionon</h2>
          <p className="text-sm text-ink-muted">
            Një faqe e shkurtër udhëzimesh për panelin shtohet në fazën e fundit të ndërtimit.
          </p>
        </section>

        <form action={logout}>
          <Button type="submit" variant="outline" className="h-11 w-full border-2 border-navy font-semibold">
            <LogOut className="size-4" /> Dil
          </Button>
        </form>
      </main>
    </>
  );
}
