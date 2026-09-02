import { Container } from "./Container";

// Her route'un loading.tsx'i bunu yeniden dışa aktarır; statik sayfalarda nadiren görünür, yine de eksik bırakılmaz.
export function RouteLoading() {
  return (
    <main className="py-section">
      <Container>
        <p className="text-body text-ink-muted">Yükleniyor…</p>
      </Container>
    </main>
  );
}
