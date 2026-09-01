import { cn } from "@/lib/cn";

export type CardVariant = "surface" | "bare";

type CardProps = {
  title?: string;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
};

// Kenarlık yok: ayrım bg-page ile bg-surface arasındaki ton farkından okunur.
// bare kabuğu kapatır; başlık ve içerik tek yerde kalsın diye ayrı bileşen
// değil, StatCard'daki gibi varyant.
export function Card({
  title,
  variant = "surface",
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        variant === "surface" && "bg-surface p-6 md:p-8",
        className,
      )}
    >
      {title ? <h2 className="mb-4 text-h2 text-ink">{title}</h2> : null}
      {children}
    </div>
  );
}
