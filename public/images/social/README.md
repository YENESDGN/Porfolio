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

- **Hover: ahududu dolgu.** Dinlenirken şeffaf; üzerine gelindiğinde
  ahududu daireyi alttan doldurur. İşaret hiç değişmez, kendi rengini
  korur; dolgu onun arkasında kalır.
- **İşarete dokunulmuyor, iki yol denenip bırakıldı.** `brightness-0 invert`
  filtresi diski de glifi de aynı beyaza çevirdiği için LinkedIn ve Gmail
  tek parça beyaz lekeye dönüşüyordu. İşaretin arkasına konan beyaz disk de
  görsel olarak tutmadı.
- **Ahududu üzerinde kontrast.** Beyaz parçalar 6.95:1, GitHub'ın siyah
  glifi 3.02:1 (grafik eşiği 3:1, sınırda geçiyor). LinkedIn'in mavi diski
  1.42:1 ve Gmail'in kırmızısı 1.77:1 — bunlar dekoratif dolgu, okunması
  gereken bilgi taşımıyorlar; işaretin silueti beyaz parçalardan okunuyor.
- **Gmail zemini daire yapıldı.** Resmi işaret yuvarlatılmış kare (squircle)
  zemin taşır; LinkedIn diskiyle aynı aileye girsin diye daireye çevrildi
  (`<circle cx="16" cy="16" r="14.93">`, LinkedIn ile aynı oran: yarıçap /
  kutu = 20/48). Zarf şeklinin en uç köşesi 13.97 yarıçapta, kırpılmıyor.
  Resmi işaretten bilinçli tek sapma budur.
- `GitHubLink` (proje kartındaki metin linki) bu dosyayı **kullanmaz**:
  orada ikon metnin rengini alması gerektiği için `components/BrandIcons.tsx`
  içindeki `currentColor` sürümü çiziliyor.
