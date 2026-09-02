import type { Metadata } from "next";
import { Container, TextLink } from "@/components";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
};

export default function NotFound() {
  return (
    <main className="py-section">
      <Container>
        <h1 className="text-h1 text-ink">Sayfa bulunamadı</h1>
        <p className="mt-4 max-w-prose text-body text-ink-secondary">
          Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
        </p>
        <TextLink href="/" className="mt-8">
          Ana sayfaya dön
        </TextLink>
      </Container>
    </main>
  );
}
