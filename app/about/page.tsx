import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Kim olduğum ve öğrenim yolculuğum.",
};

export default function AboutPage() {
  return (
    <main className="px-6 py-section">
      <h1 className="text-h1 text-ink">Hakkımda</h1>
      <p className="mt-4 max-w-prose text-body text-ink-secondary">
        Fotoğraf + metin blokları ve öğrenim roadmap&apos;i bu sayfaya gelecek.
      </p>
    </main>
  );
}
