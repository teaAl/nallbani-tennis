import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="eyebrow text-lime-ink">404</p>
      <h1 className="display text-5xl">Faqja nuk u gjet</h1>
      <p className="max-w-[36ch] text-ink-muted">Lidhja mund të jetë e vjetër ose e shkruar gabim.</p>
      <Link href="/" className="inline-flex h-12 items-center rounded-lg bg-lime px-5 font-semibold text-ink">
        Kthehu në ballinë
      </Link>
    </main>
  );
}
