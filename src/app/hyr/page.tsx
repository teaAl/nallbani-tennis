import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Hyrja", robots: { index: false, follow: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/admin") ? next : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-navy">
      <main className="flex grow items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg">
          <Image src="/images/logo-nt.png" alt="Tennis Nallbani" width={160} height={48} className="mb-6 h-12 w-auto" priority />
          <p className="eyebrow text-ink-muted">Paneli i klubit</p>
          <h1 className="display mt-1 mb-6 text-3xl">Hyrja për stafin</h1>
          <LoginForm next={safeNext} />
          <p className="mt-6 text-sm text-ink-muted">
            Keni harruar fjalëkalimin? Administratori mund ta rivendosë nga paneli.
          </p>
        </div>
      </main>
      <footer className="p-4 text-center">
        <Link href="/" className="text-sm text-on-navy-muted underline-offset-4 hover:underline">
          ← Kthehu te faqja
        </Link>
      </footer>
    </div>
  );
}
