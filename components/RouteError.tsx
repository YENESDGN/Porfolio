"use client";

// Error boundary Client Component olmak zorunda; her route'un error.tsx'i bunu yeniden dışa aktarır.
export default function RouteError({ reset }: { reset: () => void }) {
  return (
    <main className="px-6 py-section">
      <h1 className="text-h1 text-ink">Bir şeyler ters gitti</h1>
      <p className="mt-4 max-w-prose text-body text-ink-secondary">
        Sayfa yüklenirken bir hata oluştu. Yeniden denemek ister misin?
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded bg-raspberry-700 px-5 py-3 text-body text-ink-inverse"
      >
        Yeniden dene
      </button>
    </main>
  );
}
