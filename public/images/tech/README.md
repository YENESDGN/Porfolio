# Tech stack işaretleri

`TechStackItem.icon` kolonu buradaki dosyanın yolunu tutar
(`/images/tech/react.svg`). `TechStack` bileşeni `next/image` ile
`unoptimized` çizer — vektörde optimizasyon kazancı yok ve `unoptimized`
Next'in SVG kısıtını da atlar.

## Dosyalar

Hepsi resmi marka işareti, kendi marka renkleriyle.

| Dosya            | Karşılığı    | viewBox         |
| ---------------- | ------------ | --------------- |
| `typescript.svg` | TypeScript   | `0 0 32 32`     |
| `python.svg`     | Python       | `0 0 32 32`     |
| `react.svg`      | React        | `0 -14 256 256` |
| `nextjs.svg`     | Next.js      | `0 0 24 24`     |
| `tailwind.svg`   | Tailwind CSS | `0 -51 256 256` |
| `postgresql.svg` | PostgreSQL   | `-4 0 264 264`  |
| `prisma.svg`     | Prisma       | `0 0 32 32`     |
| `fastapi.svg`    | FastAPI      | `0 0 24 24`     |
| `docker.svg`     | Docker       | `0 0 24 24`     |

viewBox'lar birbirinden farklı; sorun değil, `preserveAspectRatio` varsayılanı
her işareti 28×28 kutuya ortalayarak sığdırıyor.

## Yeni işaret eklerken

- **Renk dosyanın içinde durur.** `next/image` bir `<img>` çizer; CSS rengi
  SVG'ye geçmez, `currentColor` çalışmaz.
- Kök `<svg>` üzerinde genişlik/yükseklik verme, `viewBox` yeter.
- Gradient ve `clipPath` id'leri dosyaya özel olmalı (`pyA`, `twGradient`,
  `nextClip` gibi). Her dosya ayrı belge olarak yüklendiği için çakışma
  olmuyor, ama tek harfli id'ler (`a`, `b`) ileride inline kullanımda çakışır.
- İndirilen dosyalardaki `SVGRepo_bgCarrier` / `SVGRepo_tracerCarrier` /
  `SVGRepo_iconCarrier` grupları ve `<title>` etiketi gereksiz; temizlenir.

## Renk istisnası

Bu işaretler sitedeki tek yerdir ki marka renkleri taşır. `DESIGN.md`'deki
The Ink Rarity Rule'un kapsamı dışında; gerekçesi orada yazılı.
