"use client";

import { Container } from "./Container";

// Error boundary Client Component olmak zorunda; her route'un error.tsx'i bunu yeniden dışa aktarır.
export default function RouteError({ reset }: { reset: () => void }) {
  return (
    <main className="py-section">
      <Container>
        <h1 className="text-h1 text-ink">Bir şeyler ters gitti</h1>
        <p className="mt-4 max-w-prose text-body text-ink-secondary">
          Sayfa yüklenirken bir hata oluştu. Yeniden denemek ister misin?
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 bg-raspberry-700 px-5 py-3 text-body text-ink-inverse transition-colors hover:bg-raspberry-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-700"
        >
          Yeniden dene
        </button>
      </Container>
    </main>
  );
}
