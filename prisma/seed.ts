import type { RoadmapKind } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const portrait = {
  id: 1,
  url: "/images/profile/yagiz-dogan.webp",
  altText: "Yağız Enes Doğan'ın portresi",
};

const techStack = [
  { id: 1, name: "Python", icon: "/images/tech/python.svg" },
  { id: 2, name: "FastAPI", icon: "/images/tech/fastapi.svg" },
  { id: 3, name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
  { id: 4, name: "Docker", icon: "/images/tech/docker.svg" },
  { id: 5, name: "TypeScript", icon: "/images/tech/typescript.svg" },
  { id: 6, name: "React", icon: "/images/tech/react.svg" },
  { id: 7, name: "Next.js", icon: "/images/tech/nextjs.svg" },
  { id: 8, name: "Tailwind CSS", icon: "/images/tech/tailwind.svg" },
  { id: 9, name: "Prisma", icon: "/images/tech/prisma.svg" },
];

const tech = (...names: string[]) =>
  names.map((name) => {
    const item = techStack.find((entry) => entry.name === name);
    if (!item) throw new Error(`Tech stack'te yok: ${name}`);
    return item.id;
  });

const landing = {
  id: 1,
  welcomeText:
    "Merhaba, ben Yağız. Backend ve sistem mimarisi üzerine çalışıyorum; bir sistemi yalnızca çalıştırmakla değil, neden öyle çalıştığını anlamakla ilgileniyorum. Fırat Üniversitesi'nde Yazılım Mühendisliği 4. sınıftayım. FastAPI ve PostgreSQL ile backend'ler, React ve Next.js ile arayüzler geliştiriyorum.",
};

const aboutSections = [
  "Her iş düzgün bir planla başlıyor. Sistemi önce diyagramlarla kuruyorum; bir projede en çok keyif aldığım kısım da bu tasarım aşaması.",
  "Diyagramların ardından ihtiyaçları ve eksikleri tek tek çıkarıyorum. Kodlama evresine ancak bunlar netleştiğinde geçiyorum.",
  "Sürdürülebilir ve ölçeklenebilir kod yazmayı önemsiyorum. Yüzeysel bir proje geliştirmektense yaptığım işi en iyi şekilde yapmaya inanıyorum; çalışma biçimimi de bu inanç şekillendiriyor.",
];

const experienceSections = [
  "Şirket içi iş akışı sisteminin veritabanı şemasını tasarladım. Şemayı ekiple birlikte gözden geçirdik; mimari kararlara bu şema üzerinden katkı verdim.",
  "İş süreçlerini akış diyagramlarıyla modelledim; geliştirilecek özelliklerin iş mantığını ve algoritmik yapısını koda geçmeden önce bu diyagramlarda kurdum.",
  "Next.js, React ve Tailwind CSS tabanlı sistemde API uç noktaları, veri akışları ve arayüz bileşenleri geliştirdim. Değişikliklerim ekip içi kod incelemesinden geçti.",
  "Sorgu ve şema optimizasyonlarıyla veri işleme performansını iyileştirdim. Tasarladığım şemanın mimari kararlara yön verdiğini görmek, sağlam bir temelin önemini öğretti.",
];

const roadmap: {
  kind: RoadmapKind;
  title: string;
  description: string;
  startDate: string;
  endDate: string | null;
}[] = [
  {
    kind: "EDUCATION",
    title: "Fırat Üniversitesi · Yazılım Mühendisliği",
    description:
      "Yazılım Mühendisliği lisansı. Bu dönemde kendi projelerimde FastAPI, PostgreSQL ve React ile uçtan uca web uygulamaları geliştirdim.",
    startDate: "2023-09-01",
    endDate: "2027-06-30",
  },
  {
    kind: "WORK",
    title: "Pirantech · Yazılım Mühendisliği Stajyeri",
    description:
      "Şirket içi iş akışı sistemi; Next.js, React ve Tailwind CSS tabanlı bir kod tabanında veritabanı, API ve arayüz.",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
  },
  {
    kind: "WORK",
    title: "Uzun dönem staj · İş Yeri Eğitimi",
    description:
      "Fırat Üniversitesi İş Yeri Eğitimi programı. Haftada 5 gün çalışabileceğim, gerçek projelerde yer alabileceğim bir ekip arıyorum.",
    startDate: "2027-02-01",
    endDate: "2027-06-30",
  },
];

type Screen = { caption: string; alt: string };

type ProjectSeed = {
  slug: string;
  title: string;
  description: string;
  body: string[];
  role: string;
  startDate: string | null;
  endDate: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  tech: number[];
  screens: [Screen, Screen, Screen];
};

const projects: ProjectSeed[] = [
  {
    slug: "handpocket",
    title: "HandPocket",
    role: "Full-stack geliştirme",
    startDate: "2026-03-01",
    endDate: null,
    description:
      "Gönderici ve kuryeleri buluşturan bir kargo teslimat platformu. Talep oluşturmaktan teslimat onayına kadar bütün süreç tek uygulamada yönetiliyor.",
    githubUrl: "https://github.com/YENESDGN/HandPocket",
    liveUrl: null,
    tech: tech(
      "Python",
      "FastAPI",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Tailwind CSS",
    ),
    screens: [
      {
        caption: "Ana sayfa",
        alt: "HandPocket ana sayfası: Hızlı ve güvenli başlığı ve kurye illüstrasyonu",
      },
      {
        caption: "Teslimatlar",
        alt: "Gönderici paneli: duruma göre gruplanmış teslimatlar ve açık bildirim listesi",
      },
      {
        caption: "Cüzdan",
        alt: "Cüzdan ekranı: bakiye, harcama özeti ve işlem geçmişi",
      },
    ],
    body: [
      "Gönderici bir teslimat talebi oluşturuyor, kurye talebi kabul edip paketi teslim ediyor, gönderici de teslimat kanıtını görüp onaylıyor. Fikir yaya ya da bisikletle teslimat yapan kuryeler üzerine kurulu; hedef kitle öğrenciler ve gençler. Web sürümü demo edilebilir durumda, mobil uygulama ayrı bir dalda geliştiriliyor.",
      "Backend, FastAPI ve SQLModel ile PostgreSQL üzerinde çalışan bir REST API. Kimlik doğrulama Supabase Auth'ta; backend her istekte gelen JWT'yi Supabase'in açık anahtarlarıyla doğruluyor, rol bazlı erişim ve rate limiting uyguluyor. İş mantığı ve veri erişimi tamamen FastAPI tarafında.",
      "Teslimatın net bir yaşam döngüsü var: beklemede, kabul edildi, teslim alındı, teslim edildi, tamamlandı. Kurye fotoğraflı teslim kanıtı yüklüyor; gönderici onaylarsa ücret kuryenin cüzdanına geçiyor, onaylamazsa itiraz açıyor ve itiraz admin panelinden çözülüyor. Her durum değişikliği uygulama içi bildirim olarak düşüyor.",
      "Adresler Nominatim ile koordinata, rota OSRM ile mesafe ve süreye çevriliyor. Ücret mesafe, ağırlık ve öncelik çarpanından hesaplanıyor, backend'de yeniden hesaplanıp şimdilik simülasyon olan cüzdandan düşülüyor. Harita Mapbox GL ile çiziliyor; kurye konumunu 30 saniyede bir gönderiyor, gönderici takip ekranı 15 saniyede bir yenileniyor.",
    ],
  },
  {
    slug: "stockmaster",
    title: "StockMaster",
    role: "Full-stack geliştirme",
    startDate: null,
    endDate: null,
    description:
      "Ürünleri, stok hareketlerini, siparişleri ve tedarikçileri tek yerden yöneten bir stok ve satış yönetim sistemi. İş kurallarının bir kısmı doğrudan veritabanında çalışıyor.",
    githubUrl: "https://github.com/YENESDGN/StockMaster",
    liveUrl: null,
    tech: tech(
      "Python",
      "FastAPI",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Tailwind CSS",
    ),
    screens: [
      {
        caption: "Dashboard",
        alt: "StockMaster dashboard: stok durumu grafiği ve en çok satan ürünler",
      },
      {
        caption: "Raporlar",
        alt: "StockMaster raporları: kategori dağılımı ve müşteri tipi",
      },
      { caption: "Tedarikçiler", alt: "StockMaster tedarikçi listesi" },
    ],
    body: [
      "Bir işletmenin ürünlerini, stok hareketlerini, siparişlerini, kategorilerini ve tedarikçilerini tek yerden yönettiği bir sistem. Stok girişi, çıkışı ve düzeltmesi ayrı hareketler olarak kaydediliyor.",
      "Backend, FastAPI ve async SQLModel ile yazılmış versiyonlu bir REST API. Repository, Unit of Work ve servis katmanlarına ayrılıyor; bir servisi net katmanlara ayırmayı bu projede öğrendim.",
      "İş kurallarının bir kısmı doğrudan veritabanında: PostgreSQL trigger'ları sipariş numarasını üretiyor, sipariş toplamlarını hesaplıyor ve siparişin durumuna göre stoğu güncelliyor. Raporlama için KPI, düşük stok ve satış trendi view'ları yazdım.",
      "Kimlik doğrulama JWT ve bcrypt ile; admin, yönetici ve kullanıcı rolleri ayrı yetkilere sahip. Yönetim paneli React, TypeScript, TanStack Query ve Recharts ile satış trendlerini ve stok metriklerini gösteriyor.",
    ],
  },
  {
    slug: "kisisel-portfolyo",
    title: "Kişisel Portfolyo",
    role: "Geliştirme ve dağıtım",
    startDate: "2025-11-01",
    endDate: "2026-02-28",
    description:
      "Portfolyomun ilk sürümü: FastAPI ile sunucuda render edilen, Docker ile paketlenip DigitalOcean üzerinde yayına alınmış bir site.",
    githubUrl: "https://github.com/YENESDGN/Personal-Portfolio",
    liveUrl: "https://yagizenesdogan.me",
    tech: tech("Python", "FastAPI", "Docker"),
    screens: [
      {
        caption: "Giriş",
        alt: "İlk portfolyonun girişi: portre, ad ve unvan, yan şeritte sosyal bağlantılar",
      },
      {
        caption: "Projeler",
        alt: "İlk portfolyonun proje kartları: CineFlow, StockMaster, VisData, CoLearn",
      },
      {
        caption: "Proje sayfası",
        alt: "İlk portfolyoda StockMaster proje sayfası: açıklama ve ekran görüntüsü",
      },
    ],
    body: [
      "Portfolyomun ilk sürümü. Projeler ve metinler veritabanında duruyor, sayfalar sunucuda Jinja2 şablonlarıyla üretiliyor. Site Türkçe ve İngilizce okunabiliyor.",
      "Backend FastAPI ile yazıldı. İçerik SQLAlchemy modelleri üzerinden SQLite veritabanında yönetiliyor; projeler bir seed betiğiyle yükleniyor.",
      "Uygulamayı Docker ve Docker Compose ile konteynerize ettim. Böylece geliştirme ortamında çalışan şey prodüksiyonda da aynı şekilde çalışıyor.",
      "DigitalOcean'daki sunucuda Nginx reverse proxy olarak önde duruyor, SSL/TLS sertifikası Let's Encrypt ile alındı. Şu an okuduğun site bunun ikinci sürümü: Next.js, Prisma ve PostgreSQL ile yeniden yazıldı.",
    ],
  },
  {
    slug: "cineflow",
    title: "CineFlow",
    role: "Full-stack geliştirme",
    startDate: "2025-05-01",
    endDate: "2025-10-31",
    description:
      "Dizi ve filmleri keşfedip izleme listesine ekleyebildiğin, inceleme yazıp puan verebildiğin full-stack bir uygulama.",
    githubUrl: "https://github.com/YENESDGN/CineFlow",
    liveUrl: null,
    tech: tech("Python", "TypeScript", "React", "Tailwind CSS"),
    screens: [
      {
        caption: "Ana sayfa",
        alt: "CineFlow ana sayfası: film ve dizi arşivi listeleri",
      },
      {
        caption: "Katalog",
        alt: "CineFlow kataloğu: film ve dizi kartları, listeye ekle düğmeleri",
      },
      {
        caption: "İçerik detayı",
        alt: "CineFlow içerik detayı: fragman, oyuncular ve yorumlar",
      },
    ],
    body: [
      "Dizi ve filmleri keşfedip izleme listesine ekleyebildiğin, inceleme yazıp puan verebildiğin bir uygulama. Katalog verisi ve fragmanlar TMDB API'sinden geliyor.",
      "Arayüz Vite, React, TypeScript ve Tailwind CSS ile yazılmış responsive bir SPA. Backend Flask ile; kayıt, giriş, profil ve profil fotoğrafı yükleme uç noktaları burada.",
      "İnceleme sisteminde kullanıcılar, izleme listeleri ve incelemeler ilişkisel veritabanında ayrı tablolar olarak modellendi. Bir kullanıcı inceleme ekleyip düzenleyebiliyor ya da silebiliyor; yazdıkları profilinde listeleniyor.",
      "TMDB'den gelen dizi ve film listeleri bir saatlik önbellekte tutuluyor, böylece her sayfa açılışında dış servise gidilmiyor. Bir de Gemini API'ye bağlanan küçük bir sohbet asistanı var.",
    ],
  },
  {
    slug: "eduai",
    title: "EduAI Platform",
    role: "Katkı: ders, takvim ve dashboard modülleri",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
    description:
      "Üniversite öğrencileri için yapay zekâ destekli bir ders ve çalışma yönetim platformu. Arkadaşlarımın TÜBİTAK 2209-A projesinde ders takibi, çalışma takvimi ve dashboard istatistiklerini geliştirdim.",
    githubUrl: "https://github.com/batuhannozkan1/Tubitak-2209-2",
    liveUrl: null,
    tech: tech("Python", "Tailwind CSS"),
    screens: [
      {
        caption: "Dashboard",
        alt: "EduAI dashboard: haftalık pomodoro, tamamlanan dersler, deneme başarısı ve bugünkü çalışma planı",
      },
      {
        caption: "Derslerim",
        alt: "Derslerim sayfası: durumlara göre ders sayıları ve ders listesi",
      },
      {
        caption: "Çalışma Takvimi",
        alt: "Haftalık çalışma takvimi: derslere bağlı çalışma blokları",
      },
    ],
    body: [
      "Öğrencilerin sınava hazırlanırken dağınık kullandığı araçları (ders takibi, çalışma planı, soru çözümü, zaman yönetimi, not paylaşımı) tek platformda birleştiren bir proje. TÜBİTAK 2209-A kapsamında arkadaşlarım tarafından yürütülüyor; ben belirli modüllerle katkı verdim.",
      "Benim payım ders ve plan tarafıydı. Course ve CalendarEvent modellerini kurdum: her ders kod, kredi, AKTS ve durum (başlanmadı, devam ediyor, tamamlandı) taşıyor, çalışma planları bir derse bağlanıyor. Derslerim sayfasında ders ekleme, durum güncelleme ve silme bu modellerin üstünde çalışıyor.",
      "Çalışma Takvimi haftalık bir görünüm: planlar tarih ve saat aralığıyla ekleniyor, haftalar arasında gezilebiliyor; ekleme, silme ve listeleme sayfa yenilenmeden JSON uç noktalarıyla yapılıyor. Dashboard'a deneme, ders ve pomodoro istatistikleri için çubuk grafikler ekledim; grafikler sonradan ekipte gerçek veriye bağlandı.",
      "Platformun geri kalanı (AI sohbet asistanı, deneme sınavları, pomodoro, WebSocket ile not paylaşımı, rozet ve sıralama) ekip arkadaşlarımın işi. Backend Django 5.2 ve MySQL üzerinde, gerçek zamanlı kısım Django Channels ile çalışıyor. Arayüz Temmuz 2026'da ekipte yenilendi; ekran görüntüleri güncel hâlini gösteriyor.",
    ],
  },
  {
    slug: "safety40",
    title: "Efo Konveyör · Safety 4.0",
    role: "Analiz, modelleme ve raporlama",
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    description:
      "Bir yonga hattındaki besleme bandı ve titreşimli konveyör için emniyet ve OT siber güvenlik analizi: zafiyetler bulundu, risk kaydında sınıflandırıldı, nasıl kapatılacakları yazıldı.",
    githubUrl: "https://github.com/YENESDGN/safety40-efo-konveyor",
    liveUrl: null,
    tech: tech("Python"),
    screens: [
      {
        caption: "Ana sayfa",
        alt: "Analizin web arayüzü: başlık, uyarı ve öne çıkan dört bulgu",
      },
      {
        caption: "Figürler",
        alt: "Simülasyon figürleri: zone/conduit diyagramları, risk ısı haritası, saldırı grafları",
      },
      {
        caption: "Risk register",
        alt: "LAB 3 Threat and Risk Register raporunun görüntüleyicide açılmış ilk sayfası",
      },
    ],
    body: [
      "Safety 4.0 Bootcamp ödevi olarak Efo Makina'nın yonga hattındaki besleme bandı ve sarsak (titreşimli konveyör) incelendi. Firmayla bağlantısı olmayan bağımsız bir akademik çalışma: bilgiler kamuya açık kaynaklardan derlendi, her biri doğrulanmış, sektör tipik, çıkarım ya da varsayım olarak etiketlendi.",
      "Dört laboratuvar föyü üzerinden ilerliyor: emniyet fonksiyonu haritası ve gerekli performans seviyesi (LAB 1), IEC 62443'e göre bölge ve conduit diyagramı (LAB 2), tehdit ve risk kaydıyla ısı haritası (LAB 3), güvenli uzaktan erişim mimarisi (LAB 4). Her lab'a zafiyetlerin nasıl kapatılacağı eklendi; sonda SWOT ve on beş varsayımın her biri yanlışsa sonucun nasıl değişeceği var.",
      "Lab'lardaki iddialar Python modellerine çevrildi ve her biri bir testle doğrulanıyor: 109 test geçiyor, 4 beklenen kalma var. Sayısal değerlerin tamamı etiket ve kaynakla tek bir parametre dosyasında; PDF'lerdeki tablo, grafik ve diyagramlar doğrudan bu çıktılardan üretiliyor.",
      "Öne çıkan bulgu siberden fiziksele geçiş: emniyet invertöre bağımlıyken tek bir rampa parametresi, acil stoptaki durma mesafesini 0,50 m'den 2,875 m'ye çıkarıyor; güvenli sınır 1,50 m. Saldırı grafında emniyet fonksiyonuna giden 19 yol, hedef mimaride VPN ve MFA aşılsa bile sıfıra iniyor.",
    ],
  },
  {
    slug: "visdata",
    title: "VisData",
    role: "Full-stack geliştirme",
    startDate: "2025-10-01",
    endDate: "2025-11-30",
    description:
      "CSV ve Excel dosyalarını okunur grafiklere çeviren bir veri görselleştirme uygulaması. Sütunlar otomatik sınıflanıyor, grafik tipi ve eksenler yapay zekâ ile öneriliyor.",
    githubUrl: "https://github.com/YENESDGN/VisData",
    liveUrl: null,
    tech: tech("Python", "FastAPI", "TypeScript", "React", "Tailwind CSS"),
    screens: [
      {
        caption: "Çalışma alanı",
        alt: "VisData çalışma alanı: son dosyalar, dosya yükleme alanı ve asistan paneli",
      },
      {
        caption: "Çubuk grafik",
        alt: "Kategoriye göre satılan adetleri gösteren çubuk grafik ve grafik ayarları",
      },
      {
        caption: "Alan grafiği",
        alt: "Günlük ziyaretçi sayısını gösteren alan grafiği",
      },
    ],
    body: [
      "CSV ya da Excel dosyası yükleyip grafiğe çeviren bir uygulama. Dosya yüklenince sütunlar okunuyor ve sayısal, tarih ya da kategorik olarak ayrılıyor; grafik tipi ve eksenler buna göre öneriliyor.",
      "Backend FastAPI ile yazıldı. Dosyalar pandas ve openpyxl ile okunuyor, SQLAlchemy ile kullanıcıya bağlı saklanıyor. Kimlik doğrulama JWT ile, parolalar Argon2 ile hashleniyor; her kullanıcı yalnızca kendi dosyalarına erişebiliyor.",
      "Yapay zekâ tarafı OpenAI API'ye bağlı: dosyanın sütun özetinden en uygun grafik tipini ve X/Y eksenlerini öneriyor, sohbet asistanı da yüklenen dosyalarla ilgili soruları yanıtlıyor. Anahtar tanımlı değilse grafikler elle ayarlanarak kullanılmaya devam ediyor.",
      "Ekim 2026'da arayüzü yeniden tasarladım: tek vurgu rengine dayanan koyu ve sade bir tema. Çubuk, çizgi, alan, dağılım, halka ve tablo görünümleri harici bir grafik kütüphanesi olmadan SVG ile çiziliyor; kaydedilen görselleştirmeler kütüphanede tarayıcıda tutuluyor.",
    ],
  },
];

const toDate = (value: string | null) => (value ? new Date(value) : null);

// Kimlikler sabit verilir ki upsert her çalıştırmada aynı satırı bulsun;
// sondaki setval de Studio'dan girilecek yeni satırların bu kimliklerle çakışmasını önler.
async function main() {
  await prisma.media.upsert({
    where: { id: portrait.id },
    update: portrait,
    create: portrait,
  });

  for (const [index, item] of techStack.entries()) {
    const data = { ...item, order: index };
    await prisma.techStackItem.upsert({
      where: { id: item.id },
      update: data,
      create: data,
    });
  }

  const landingData = { ...landing, photoId: portrait.id };
  await prisma.landingPage.upsert({
    where: { id: landing.id },
    update: landingData,
    create: landingData,
  });

  for (const [index, content] of aboutSections.entries()) {
    const data = {
      id: index + 1,
      content,
      order: index,
      photoId: index === 0 ? portrait.id : null,
    };
    await prisma.aboutSection.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const [index, content] of experienceSections.entries()) {
    const data = { id: index + 1, content, order: index };
    await prisma.experienceSection.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const [index, item] of roadmap.entries()) {
    const data = {
      ...item,
      id: index + 1,
      order: index,
      startDate: new Date(item.startDate),
      endDate: toDate(item.endDate),
    };
    await prisma.roadmapItem.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const [index, project] of projects.entries()) {
    const projectId = index + 1;
    const mediaIds = project.screens.map((screen, n) => {
      const id = 100 + projectId * 10 + n + 1;
      return {
        id,
        url: `/images/projects/${project.slug}-${n + 1}.webp`,
        altText: screen.alt,
      };
    });
    for (const media of mediaIds) {
      await prisma.media.upsert({
        where: { id: media.id },
        update: media,
        create: media,
      });
    }

    const data = {
      id: projectId,
      slug: project.slug,
      title: project.title,
      description: project.description,
      body: project.body.join("\n\n"),
      role: project.role,
      startDate: toDate(project.startDate),
      endDate: toDate(project.endDate),
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      coverPhotoId: mediaIds[0].id,
      isPublished: true,
      order: index,
    };
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: data,
      create: data,
    });

    const imageOrder = [1, 0, 2];
    for (const [order, n] of imageOrder.entries()) {
      const image = {
        id: projectId * 10 + n + 1,
        projectId,
        mediaId: mediaIds[n].id,
        caption: project.screens[n].caption,
        order,
      };
      await prisma.projectImage.upsert({
        where: { id: image.id },
        update: image,
        create: image,
      });
    }

    await prisma.projectTech.deleteMany({
      where: { projectId, techId: { notIn: project.tech } },
    });
    for (const [order, techId] of project.tech.entries()) {
      await prisma.projectTech.upsert({
        where: { projectId_techId: { projectId, techId } },
        update: { order },
        create: { projectId, techId, order },
      });
    }
  }

  for (const table of [
    "media",
    "tech_stack_items",
    "landing_page",
    "about_sections",
    "experience_sections",
    "roadmap_items",
    "projects",
    "project_images",
  ]) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), (SELECT MAX(id) FROM "${table}"))`,
    );
  }

  console.log(
    `Seed: ${projects.length} proje, ${techStack.length} teknoloji yazıldı.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
