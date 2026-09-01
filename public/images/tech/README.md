# Tech stack işaretleri

`TechStackItem.icon` kolonu buradaki dosyanın yolunu tutar
(`/images/tech/react.svg`). Bileşen `next/image` ile `unoptimized` çizer —
vektörde optimizasyon kazancı yok.

## Şu an hepsi YER TUTUCU

Buradaki altı dosya resmi logo **değil**; hiçbiri kırık görsel kalmasın diye
elle çizilmiş tek renk yaklaşımlar. Resmi işaretlerle değiştirilmeli.

| Dosya            | Karşılığı    | Yer tutucunun durumu                |
| ---------------- | ------------ | ----------------------------------- |
| `react.svg`      | React        | Biçim doğru (atom)                  |
| `typescript.svg` | TypeScript   | Biçim doğru (kare + TS)             |
| `nextjs.svg`     | Next.js      | Yakın                               |
| `tailwind.svg`   | Tailwind CSS | Yaklaşık                            |
| `postgresql.svg` | PostgreSQL   | **Yanlış** — fil işareti çizilemedi |
| `prisma.svg`     | Prisma       | **Yaklaşık** — üçgen kabaca         |

Resmi SVG'ler: <https://simpleicons.org> — dosya adlarını değiştirmeden
üzerine yaz, kod dokunmadan çalışır.

## Değiştirirken

- **Tek renk.** `stroke` ya da `fill` değeri `#5c5c58` (`ink-secondary`)
  olmalı. `next/image` bir `<img>` çizer, CSS rengi SVG'ye geçmez —
  renk dosyanın içinde durur.
- **`viewBox="0 0 24 24"`.** Bileşen 24×24 çiziyor; farklı viewBox işareti
  komşularına göre büyük ya da küçük gösterir.
- Genişlik/yükseklik özniteliği koyma; `viewBox` yeter.
- Marka renkleri kullanılmaz: sitede tek vurgu rengi var (ahududu) ve altı
  ayrı marka rengi onu boğar. Bkz. `DESIGN.md`, The Ink Rarity Rule.
