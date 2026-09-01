import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
};

export default function NotFound() {
  return (
    <main className="py-section">
      <h1 className="text-h1 text-ink">Sayfa bulunamadı</h1>
      <p className="mt-4 max-w-prose text-body text-ink-secondary">
        Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-body text-raspberry-700 underline underline-offset-4"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
