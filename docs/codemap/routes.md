# Codemap — route katmanı

Genel bakış → `docs/codemap.md`.

## Dosyalar

- `app/layout.tsx` — Server. html/body, IBM Plex Serif (`latin`+`latin-ext`),
  `metadataBase` ve başlık şablonu `config/site.ts`'ten. (Faz 2) Navbar.
  Navigasyonda remount olmaz.
- `app/template.tsx` — Client, **Faz 2**. Sayfa geçişi (Door FadeIn-Up&Down).
  `layout` değil `template`, çünkü giriş animasyonunun her gezinmede
  tetiklenmesi lazım.
- `app/page.tsx` (LandingPage) · `app/projects/` · `app/about/` · `app/experience/`
- `app/not-found.tsx` — sayfa yok + ana sayfaya dönüş, Navbar korunur.
- Her route'ta `loading.tsx` ve `error.tsx`.

## loading / error deseni

Sekiz kopya yerine tek implementasyon: route dosyaları ortak bileşeni
yeniden dışa aktarır.

```
app/<route>/loading.tsx  →  export { default } from "@/components/RouteLoading";
app/<route>/error.tsx    →  "use client"; export { default } from "@/components/RouteError";
```

`RouteError` Client Component (error boundary zorunluluğu), `RouteLoading`
Server.

## Render stratejisi

Beş route da statik prerender ediliyor (`○`). İçerik ayda bir değiştiği için
her istekte DB'ye gidilmez; Faz 2'de `revalidate` + elle güncelleme sonrası
on-demand revalidate eklenecek.

## Sayfa → veri eşlemesi

Her sayfa kendi Server Component'inde `lib/queries/` üzerinden çeker.

- `/` — proje sayısı (COUNT), hoşgeldin metni + fotoğraf, tech stack
- `/projects` — yayınlanmış proje listesi (`order`)
- `/about` — about bölümleri (foto+metin) + `EDUCATION` roadmap
- `/experience` — experience metin blokları + `WORK` roadmap
