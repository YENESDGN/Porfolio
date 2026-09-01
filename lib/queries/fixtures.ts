// GEÇİCİ. PostgreSQL gelene kadar sorgu gövdelerini besleyen tek dosya;
// Faz 2.6'da silinir ve içerik prisma/seed.ts'e taşınır. "İçerik hardcode
// edilmez" kuralından bilinçli ve tek dosyayla sınırlı sapma.
//
// Metinler yer tutucudur: gerçek kurum, şirket ve tarih iddiası taşımaz.
// Fotoğraf alanları null — public/images/ henüz boş ve kırık görsel
// bırakmaktansa cam levha tek başına duruyor.

import type { AboutPageData } from "./about";
import type { ExperiencePageData } from "./experience";
import type { LandingPageData } from "./landing";
import type { ProjectSummary } from "./projects";

export const landingFixture: LandingPageData = {
  content: {
    welcomeText:
      "Merhaba, ben Yağız. Arayüz tarafında çalışıyorum; işin görünen yüzünü kurmayı, yavaş ve okunur şeyler yapmayı seviyorum. Burada ne yaptığımı, nasıl öğrendiğimi ve nerelerde çalıştığımı bulacaksın.",
    photo: null,
  },
  techStack: [
    { id: 1, name: "TypeScript", icon: "/images/tech/typescript.svg" },
    { id: 2, name: "React", icon: "/images/tech/react.svg" },
    { id: 3, name: "Next.js", icon: "/images/tech/nextjs.svg" },
    { id: 4, name: "Tailwind CSS", icon: "/images/tech/tailwind.svg" },
    { id: 5, name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
    { id: 6, name: "Prisma", icon: "/images/tech/prisma.svg" },
  ],
  projectCount: 3,
};

export const projectsFixture: ProjectSummary[] = [
  {
    id: 1,
    title: "Portfolyo Sitesi",
    description:
      "Şu anda okuduğun site. İçerik PostgreSQL'de, sayfalar statik üretiliyor, güncelleme sonrası ilgili route yeniden doğrulanıyor.",
    githubUrl: "https://github.com/kullanici/portfolyo",
    coverPhoto: null,
  },
  {
    id: 2,
    title: "Görev Takip Panosu",
    description:
      "Küçük ekipler için sürükle bırak çalışan bir pano. Sunucu tarafında veri, istemci tarafında yalnızca etkileşim.",
    githubUrl: null,
    coverPhoto: null,
  },
  {
    id: 3,
    title: "Hava Durumu Aracı",
    description:
      "Tek ekranlık bir arayüz: konum seç, önümüzdeki günleri gör. Ölçü birimi ve dil tercihi tarayıcıda saklanıyor.",
    githubUrl: "https://github.com/kullanici/hava-durumu",
    coverPhoto: null,
  },
];

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
