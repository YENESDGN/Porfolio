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
        "grid gap-6 md:grid-cols-2 md:items-end md:gap-0",
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
      {/* Negatif kenar boşluğu bitişik sütuna taşar; overlap payı budur. */}
      <div
        className={cn(
          "relative md:row-start-1",
          reverse
            ? "md:col-start-1 md:-mr-overlap lg:-mr-overlap-lg"
            : "md:col-start-2 md:-ml-overlap lg:-ml-overlap-lg",
        )}
      >
        {content}
      </div>
    </div>
  );
}
