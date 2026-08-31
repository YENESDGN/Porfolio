import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tecrübe",
  description: "İş hayatı yolculuğum.",
};

export default function ExperiencePage() {
  return (
    <main className="px-6 py-section">
      <h1 className="text-h1 text-ink">Tecrübe</h1>
      <p className="mt-4 max-w-prose text-body text-ink-secondary">
        İş hayatı roadmap&apos;i ve metin blokları bu sayfaya gelecek.
      </p>
    </main>
  );
}
