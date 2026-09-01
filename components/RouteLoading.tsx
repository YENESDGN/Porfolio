import { Container } from "./Container";

// Her route'un loading.tsx'i bunu yeniden dışa aktarır; sayfalar statik
// render edildiği için nadiren görünür, yine de eksik bırakılmaz.
export default function RouteLoading() {
  return (
    <main className="py-section">
      <Container>
        <p className="text-body text-ink-muted">Yükleniyor…</p>
      </Container>
    </main>
  );
}
