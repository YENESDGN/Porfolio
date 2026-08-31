import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Üzerinde çalıştığım projeler.",
};

export default function ProjectsPage() {
  return (
    <main className="px-6 py-section">
      <h1 className="text-h1 text-ink">Projeler</h1>
      <p className="mt-4 max-w-prose text-body text-ink-secondary">
        Proje kartları bu sayfaya gelecek.
      </p>
    </main>
  );
}
