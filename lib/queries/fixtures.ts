// GEÇİCİ: PostgreSQL gelene kadar sorgu gövdelerini besleyen tek dosya; Faz 2.6'da silinir.
// Metinler yer tutucudur, fotoğraf alanları null — kırık görsel yerine cam levha tek başına durur.

import type { AboutPageData } from "./about";
import type { ExperiencePageData } from "./experience";
import type { LandingPageData } from "./landing";
import type { ProjectDetail, ProjectSummary } from "./projects";

export const projectDetailsFixture: ProjectDetail[] = [
  {
    id: 1,
    slug: "portfolyo-sitesi",
    title: "Portfolyo Sitesi",
    description:
      "Şu anda okuduğun site. İçerik PostgreSQL'de, sayfalar statik üretiliyor, güncelleme sonrası ilgili route yeniden doğrulanıyor.",
    body: `Kendi siteme başlarken tek bir şey istiyordum: sonradan açıp okuyabildiğim bir kod. Bu yüzden önce kuralları yazdım, sonra bileşenleri. Hangi bloğun neden o şekilde durduğu bugün de dosyaların içinde duruyor.

Tasarımın omurgası iki malzeme: metin blokları kâğıt, görsel blokları cam. İkisi kenarlıkla değil ton farkıyla ayrılıyor. Kâğıdın camın üstüne kayması sitenin imzası; tek bir bileşende tanımlı, ikincisi hiç yazılmadı.

Tipografi tek aile ve üç ince ağırlıktan ibaret. Kalın yüz hiç yüklenmiyor, çünkü hiyerarşiyi boyut, boşluk ve renk kuruyor. Vurgu rengi tek: ahududu, ve yalnızca yön gösterdiği yerde.

Sayfalar istek başına veritabanına gitmiyor. İçerik ayda bir değişiyor; bu ritimde statik üretim ve güncelleme sonrası tek bir yeniden doğrulama yetiyor.`,
    role: "Tasarım ve geliştirme",
    startDate: new Date("2025-11-01"),
    endDate: null,
    githubUrl: "https://github.com/kullanici/portfolyo",
    liveUrl: null,
    coverPhoto: null,
    images: [],
    techStack: [
      {
        tech: {
          id: 1,
          name: "TypeScript",
          icon: "/images/tech/typescript.svg",
        },
      },
      { tech: { id: 4, name: "Next.js", icon: "/images/tech/nextjs.svg" } },
      {
        tech: {
          id: 5,
          name: "Tailwind CSS",
          icon: "/images/tech/tailwind.svg",
        },
      },
      {
        tech: {
          id: 6,
          name: "PostgreSQL",
          icon: "/images/tech/postgresql.svg",
        },
      },
      { tech: { id: 7, name: "Prisma", icon: "/images/tech/prisma.svg" } },
    ],
  },
  {
    id: 2,
    slug: "gorev-takip-panosu",
    title: "Görev Takip Panosu",
    description:
      "Küçük ekipler için sürükle bırak çalışan bir pano. Sunucu tarafında veri, istemci tarafında yalnızca etkileşim.",
    body: `Küçük bir ekipte işlerin nerede takıldığını görmek için yapıldı. Amaç tam donanımlı bir proje yönetimi aracı değildi; sütunlar, kartlar ve kartın hangi sütunda durduğu yetiyordu.

En çok uğraştığım kısım sürükleme oldu. Kart bırakıldığı anda ekranda yerini alıyor, sunucu cevabı sonra geliyor. İstek başarısız olursa kart eski sütununa geri dönüyor ve kullanıcı ne olduğunu tek satırda okuyor.

Veri sunucuda kalıyor, istemciye yalnızca etkileşimin kendisi iniyor. Böylece ilk açılışta indirilen kod, panonun büyüklüğünden bağımsız kalıyor.

Klavyeyle de çalışıyor: bir kart seçilip ok tuşlarıyla sütun değiştirebiliyor. Sürükle bırak arayüzlerinde en sık atlanan yer burası.`,
    role: "Geliştirme",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-07-31"),
    githubUrl: null,
    liveUrl: null,
    coverPhoto: null,
    images: [],
    techStack: [
      {
        tech: {
          id: 1,
          name: "TypeScript",
          icon: "/images/tech/typescript.svg",
        },
      },
      { tech: { id: 3, name: "React", icon: "/images/tech/react.svg" } },
      {
        tech: {
          id: 6,
          name: "PostgreSQL",
          icon: "/images/tech/postgresql.svg",
        },
      },
    ],
  },
  {
    id: 3,
    slug: "hava-durumu-araci",
    title: "Hava Durumu Aracı",
    description:
      "Tek ekranlık bir arayüz: konum seç, önümüzdeki günleri gör. Ölçü birimi ve dil tercihi tarayıcıda saklanıyor.",
    body: `Tek ekranda biten bir araç: konumu seç, önümüzdeki günleri gör, kapat. Sekme yok, menü yok, ayar sayfası yok.

Kısıt baştan belliydi: ilk açılışta ne kadar az iş yapılırsa o kadar iyi. Veri sunucuda alınıp sayfayla birlikte geliyor, istemci yalnızca konum değişince devreye giriyor.

Ölçü birimi ve dil tercihi tarayıcıda saklanıyor. Hesap yok, giriş yok — bir hava durumu ekranı için ikisi de fazla.

Sonradan öğrendiğim şey ölçekle ilgiliydi: sıcaklık aralığı sabit bir eksene değil o haftanın kendi aralığına oturunca, günler arasındaki fark ilk bakışta okunur oldu.`,
    role: "Tasarım ve geliştirme",
    startDate: new Date("2024-09-01"),
    endDate: new Date("2024-12-31"),
    githubUrl: "https://github.com/kullanici/hava-durumu",
    liveUrl: "https://ornek-hava-durumu.dev",
    coverPhoto: null,
    images: [],
    techStack: [
      {
        tech: {
          id: 1,
          name: "TypeScript",
          icon: "/images/tech/typescript.svg",
        },
      },
      { tech: { id: 2, name: "Python", icon: "/images/tech/python.svg" } },
      { tech: { id: 4, name: "Next.js", icon: "/images/tech/nextjs.svg" } },
    ],
  },
];

export const projectsFixture: ProjectSummary[] = projectDetailsFixture.map(
  ({ id, slug, title, description, githubUrl, coverPhoto }) => ({
    id,
    slug,
    title,
    description,
    githubUrl,
    coverPhoto,
  }),
);

export const landingFixture: LandingPageData = {
  content: {
    welcomeText:
      "Merhaba, ben Yağız. Arayüz tarafında çalışıyorum; işin görünen yüzünü kurmayı, yavaş ve okunur şeyler yapmayı seviyorum. Burada ne yaptığımı, nasıl öğrendiğimi ve nerelerde çalıştığımı bulacaksın.",
    photo: null,
  },
  techStack: [
    { id: 1, name: "TypeScript", icon: "/images/tech/typescript.svg" },
    { id: 2, name: "Python", icon: "/images/tech/python.svg" },
    { id: 3, name: "React", icon: "/images/tech/react.svg" },
    { id: 4, name: "Next.js", icon: "/images/tech/nextjs.svg" },
    { id: 5, name: "Tailwind CSS", icon: "/images/tech/tailwind.svg" },
    { id: 6, name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
    { id: 7, name: "Prisma", icon: "/images/tech/prisma.svg" },
  ],
  projectCount: projectDetailsFixture.length,
};

export const aboutFixture: AboutPageData = {
  sections: [
    {
      id: 1,
      content:
        "Yazılıma ekranda bir şeyin yerini değiştirip sonucu anında görmenin verdiği histen başladım. O his hiç geçmedi; bugün de en çok arayüzün davranışıyla uğraşırken keyif alıyorum.",
      photo: null,
    },
    {
      id: 2,
      content:
        "Çalışma biçimim yavaş ve tekrarlı. Bir şeyi bitirmeden ikincisine geçmemeye, ne yaptığımı sonradan okuyabileceğim kadar açık bırakmaya çalışıyorum.",
      photo: null,
    },
    {
      id: 3,
      content:
        "Öğrenmeyi sıraya koymayı seviyorum: önce neyi bilmediğimi yazıyorum, sonra tek tek üstünü çiziyorum. Yandaki liste tam olarak bu — bitmiş bir yol değil, hâlâ süren bir sıra.",
      photo: null,
    },
  ],
  roadmap: [
    {
      id: 1,
      title: "Lisans eğitimi",
      description:
        "Bilgisayar bilimleri temelleri; algoritma, veri yapıları, veritabanı.",
      startDate: new Date("2019-09-01"),
      endDate: new Date("2023-06-30"),
    },
    {
      id: 2,
      title: "Web geliştirme üzerine yoğunlaşma",
      description:
        "Modern JavaScript, React ve tip sistemleri üzerine kendi başıma çalışma.",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2022-12-31"),
    },
    {
      id: 3,
      title: "Sunucu tarafı ve veritabanı",
      description:
        "İlişkisel modelleme, PostgreSQL ve Prisma ile veri katmanı kurma.",
      startDate: new Date("2023-01-01"),
      endDate: null,
    },
  ],
};

export const experienceFixture: ExperiencePageData = {
  sections: [
    {
      id: 1,
      content:
        "Çalıştığım yerlerde işin çoğu arayüz tarafındaydı: mevcut bir ürünü hızlandırmak, dağınık bir ekranı toparlamak, tekrar eden parçaları tek bileşene indirmek.",
    },
    {
      id: 2,
      content:
        "Ekip içinde en çok gözden geçirme kısmını seviyorum. Bir değişikliğin neden öyle yazıldığını anlatabilmek, yazmak kadar işin parçası.",
    },
    {
      id: 3,
      content:
        "Ürün tarafıyla doğrudan konuşmayı tercih ediyorum. İhtiyacı ilk ağızdan duyduğumda ortaya çıkan çözüm genellikle daha küçük oluyor.",
    },
    {
      id: 4,
      content:
        "Şu an ilgimi çeken şey performans: sayfanın ilk açılışında ne kadar az iş yapılırsa o kadar iyi. Statik üretim ve ölçülü istemci kodu bu yüzden.",
    },
  ],
  roadmap: [
    {
      id: 11,
      title: "Stajyer geliştirici",
      description:
        "Mevcut bir arayüzün bakımı; ilk kez başkasının kodunda çalışmak.",
      startDate: new Date("2022-07-01"),
      endDate: new Date("2022-09-30"),
    },
    {
      id: 12,
      title: "Junior frontend geliştirici",
      description: "Bileşen kütüphanesi ve erişilebilirlik iyileştirmeleri.",
      startDate: new Date("2023-02-01"),
      endDate: new Date("2024-08-31"),
    },
    {
      id: 13,
      title: "Frontend geliştirici",
      description:
        "Ürün ekibiyle birlikte arayüz mimarisi ve performans çalışmaları.",
      startDate: new Date("2024-09-01"),
      endDate: null,
    },
  ],
};
