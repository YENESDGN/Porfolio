# Sosyal işaretler

`config/social.ts` her bağlantının `icon` alanında buradaki dosyanın yolunu
tutar. `SocialLinks` bileşeni `next/image` ile `unoptimized` çizer.

| Dosya          | Karşılığı       | viewBox                   |
| -------------- | --------------- | ------------------------- |
| `github.svg`   | GitHub          | `0 0 20 20`               |
| `linkedin.svg` | LinkedIn        | `0 0 48 48`               |
| `gmail.svg`    | E-posta (Gmail) | `-1.92 -1.92 35.84 35.84` |

Hepsi resmi marka işareti, kendi renkleriyle. `DESIGN.md`, The Borrowed Ink
Exception kapsamındalar.

## Bilinmesi gerekenler

- **Hover: ahududu dolgu + beyaz disk.** Dinlenirken şeffaf; üzerine
  gelindiğinde ahududu daireyi alttan doldurur ve işaretin arkasında beyaz
  bir disk belirir (`group-hover:bg-white`, görselin kutusu `size-7 p-1` =
  28px disk, görselin kendisi 20px). İşaret kendi rengini korur.
- **İşareti filtreyle beyazlatma.** `brightness-0 invert` denendi ve
  bırakıldı: filtre diski de glifi de aynı beyaza çevirdiği için LinkedIn ve
  Gmail işaretleri tek parça beyaz lekeye dönüşüyordu. Çok renkli bir
  logoda iç kontrast filtreyle korunamaz.
- **Gmail zemini daire yapıldı.** Resmi işaret yuvarlatılmış kare (squircle)
  zemin taşır; LinkedIn diskiyle aynı aileye girsin diye daireye çevrildi
  (`<circle cx="16" cy="16" r="14.93">`, LinkedIn ile aynı oran: yarıçap /
  kutu = 20/48). Zarf şeklinin en uç köşesi 13.97 yarıçapta, kırpılmıyor.
  Resmi işaretten bilinçli tek sapma budur.
- `GitHubLink` (proje kartındaki metin linki) bu dosyayı **kullanmaz**:
  orada ikon metnin rengini alması gerektiği için `components/BrandIcons.tsx`
  içindeki `currentColor` sürümü çiziliyor.
