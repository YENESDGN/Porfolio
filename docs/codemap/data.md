# Codemap — veri katmanı

Genel bakış → `docs/codemap.md`. Kurallar → `.claude/rules/data.md`.

## Prisma 7 kurulumu

Prisma 7, 6.x'ten belirgin biçimde farklı. Üç nokta:

1. **Bağlantı adresi şemada durmaz.** `datasource db` yalnızca `provider`
   tutar. `url = env(...)` yazılırsa şema doğrulaması patlar (P1012).
2. **CLI ayarı `prisma.config.ts`'te** — schema yolu, migrations yolu ve
   `migrations.seed` komutu orada. `package.json` içindeki `prisma.seed`
   alanı ARTIK KULLANILMAZ.
3. **Çalışma zamanı adapter ister.** `lib/prisma.ts`, `PrismaClient`'a
   `@prisma/adapter-pg`'den `PrismaPg` verir. Adapter olmadan client
   çalışmaz — bu yüzden `@prisma/adapter-pg` onaylı listeye eklendi.

`.env` okuması `dotenv` yerine Node'un yerleşik `process.loadEnvFile()`'ı
ile; Prisma 7 `.env`'i kendiliğinden yüklemez.

### Üretilen client

Generator `prisma-client` (eski `prisma-client-js` değil), çıktı
`generated/prisma/` — `node_modules` içine değil. Import:
`@/generated/prisma/client`.

Klasör gitignore'da ve `npm run build` (`prisma generate && next build`)
her seferinde yeniden üretir; temiz checkout'ta ayrı adım gerekmez.
ESLint ve Prettier `generated/`'ı yok sayar.

### Sürüm tuzağı

npm'in `prisma` için `latest` etiketi **8.0.0-rc**'yi gösteriyor. RC,
client 7 ile uyumsuz ve `hono`/`workerd` dahil ~386 paket getiriyor.
`prisma` ve `@prisma/client` ikisi de **7.10.0**'a sabit.

Kalan 3 yüksek npm audit uyarısı prisma CLI'ın `deepmerge-ts`
bağımlılığından; dev-only, üretime çıkmıyor, düzeltmesi 6.12'ye
gerilemek olduğu için bırakıldı.

## Veri modeli — `prisma/schema.prisma`

Model PascalCase, tablo snake_case (`@@map`). Sıralama veriye yazılır
(`order`); dizi kodda yeniden sıralanmaz.

| Model               | Tablo               | Not                                                              |
| ------------------- | ------------------- | ---------------------------------------------------------------- |
| `Media`             | media               | Tüm fotoğraf blokları buradan beslenir                           |
| `LandingPage`       | landing_page        | Tek satır; proje sayısı COUNT ile, kolon yok                     |
| `TechStackItem`     | tech_stack_items    | LandingPage tech stack                                           |
| `AboutSection`      | about_sections      | Foto+metin çiftleri, `order` ile sıralı                          |
| `ExperienceSection` | experience_sections | /experience metin blokları                                       |
| `RoadmapItem`       | roadmap_items       | `kind` (EDUCATION/WORK) ile öğrenim ve iş roadmap'i aynı tabloda |
| `Project`           | projects            | `githubUrl` nullable, `isPublished`, `order`                     |

Şema notundaki 4 tabloya, sayfa-veri eşlemesinin gerektirdiği üçü
(`TechStackItem`, `ExperienceSection`, `RoadmapItem`) eklendi.

**Diyagramdan bilinçli sapma:** `media` ilişkileri dbdiagram'da bire-bir
(`-`) çizilmişti, şemada bire-çok. Aynı görselin birden çok blokta
kullanılabilmesi için; gereksiz unique kısıtı doğurmasın diye.

## Sorgular

Tüm Prisma çağrıları `lib/queries/` içinde isimlendirilmiş fonksiyonlar
olarak, dışarıya `lib/queries/index.ts` ile açılır. Şu an iskelet;
sorgular Faz 2'de sayfa başına eklenecek.

## Durum

**(Sonra bakılacak)** — PostgreSQL yok: `prisma migrate` ve seed
çalıştırılmadı, `prisma/migrations/` boş. Şema `prisma validate`'ten
geçiyor, client üretiliyor, seed hattı uçtan uca çalışıyor
(`npm run db:seed` env'i okuyup tsx'i çalıştırıyor) — sadece DB'ye
bağlanılmadı. DB ayağa kalkınca ilk migration üretilecek;
`db push` kullanılmayacak.
