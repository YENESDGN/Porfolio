import { cn } from "@/lib/cn";

type OverlapPairProps = {
  media: React.ReactNode;
  content: React.ReactNode;
  reverse?: boolean;
  className?: string;
};

// Sitedeki tek overlap uygulaması. DOM sırası her zaman media → content;
// `reverse` yalnızca masaüstü sütununu değiştirir, mobil yığın sırası sabit kalır.
export function OverlapPair({
  media,
  content,
  reverse = false,
  className,
}: OverlapPairProps) {
  return (
    <div
      className={cn(
        // Sütunlar eşit değil: görsel geniş, levha dar. İkinci satır levhanın
        // alt taşma payıdır: pay grid'e yazılır ki blok kendi yüksekliğine
        // dahil olsun — transform ya da negatif margin ile verilseydi yer
        // kaplamaz, sarkan kısım sonraki Section'ın üstüne binerdi.
        "grid gap-6 md:grid-rows-[auto_5rem] md:items-end md:gap-0 py-16",
        reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]",
        className,
      )}
    >
      <div
        className={cn(
          "md:row-start-1",
          reverse ? "md:col-start-2" : "md:col-start-1",
        )}
      >
        {media}
      </div>
      {/* Yatay pay negatif margin: yüzde, grid alanının genişliğine çözülür,
          levha görselin %25'ine girer. Dikeyde levha iki satıra yayılır ve
          alta hizalanır; taban görselden bir satır aşağıda kalır. */}
      <div
        className={cn(
          // md:grid: çocuk kabuk min yüksekliği kendi doldursun, sarıcıda
          // kalan boşluk levhanın zemini olarak görünmesin.
          "relative md:row-span-2 md:row-start-1 md:grid md:min-h-80 md:shadow-contact",
          reverse
            ? "md:col-start-1 md:-mr-overlap"
            : "md:col-start-2 md:-ml-overlap",
        )}
      >
        {content}
      </div>
    </div>
  );
}
