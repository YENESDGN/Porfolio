### **Route Katmanı (App Router)**

- `app/layout.tsx` — Server. html/body, IBM Plex Serif, Navbar. Navigasyonda remount olmaz
- `app/template.tsx` — Client. Sayfa geçişi burada (Door FadeIn-Up&Down). `layout` değil `template`, çünkü giriş animasyonunun her gezinmede tetiklenmesi lazım
- `app/page.tsx` — LandingPage
- `app/projects/page.tsx` · `app/about/page.tsx` · `app/experience/page.tsx`
- `app/not-found.tsx` — sayfa yok + ana sayfaya dönüş, Navbar korunur
- Her route'ta `loading.tsx` ve `error.tsx`

### **Navbar**

- `Navbar` — Server. Solda NavLink'ler, sağ üstte SocialLinks, mobilde MobileMenu tetikleyicisi
- `NavLink` — Client. `usePathname` ile aktif durum ve `aria-current`. Navbar'ın client olması gereken tek parçası bu
- `SocialLinks` — Server. GitHub + LinkedIn, lucide ikonları, `src/config/`'ten okur
- `MobileMenu` — Client. Radix Dialog üzerine kurulu

### **Ortak UI**

- `Card` — Server. Tüm kutuların kabuğu, `title` opsiyonel
- `OverlapPair` — Server. `media`, `content`, `reverse`. Tek overlap implementasyonu
- `Reveal` — Client. Motion `whileInView` + `once: true`. `children` aldığı için içine konan Server Component'ler sunucuda kalır; bu, "use client" yaprakta kuralının çalışma şekli
- `PageTransition` — Client. `template.tsx` içinde kullanılır

### **İçerik Bileşenleri**

Hepsi Server Component:

- `RoadMap` — `title`, `items[]`
- `TextCard` — `title`, `body`
- `ProjectCard` — `OverlapPair` + opsiyonel `GitHubLink` sarmalayıcısı
- `GitHubLink` — `url` yoksa hiç render edilmez, boş kutu bırakmaz
- `TechStack` — `items[{name, icon}]`
- `StatCard` — `label`, `count`
- `WelcomeSection` — başlık + `TechStack`
- `ProfileImage` — `next/image`, `priority` ile

### **Listeden Düşenler**

- `App` ve `Outlet` — React Router kavramları, App Router'da karşılıkları `layout.tsx` ve dosya sistemi
- `Layout` — `app/layout.tsx` oldu
- `OverlapText` — ayrı bir overlap implementasyonuydu, `OverlapPair`'e gömüldü. DRY kuralının ilk uygulaması
- `TechIcons` — `TechStack` ile birleşti, ikisi aynı veriyi kullanıyordu
- `Image` — `next/image` doğrudan kullanılıyor, sarmalayıcıya gerek yok

### **Sayfa → Veri Eşlemesi**

Her sayfa kendi Server Component'inde `src/lib/queries/` üzerinden çeker:

- LandingPage — proje sayısı, hoşgeldin metni, tech stack
- `/projects` — proje listesi (`order` alanına göre sıralı)
- `/about` — öğrenim roadmap + metin blokları
- `/experience` — iş hayatı roadmap + metin blokları