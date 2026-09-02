import { cn } from "@/lib/cn";

export type CardVariant = "surface" | "bare";

type CardProps = {
  title?: string;
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
};

// Kenarlık yok: ayrım bg-page ile bg-surface arasındaki ton farkından okunur.
// bare kabuğu kapatır; başlık ve içerik StatCard'daki gibi ayrı bileşen değil varyant.
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
      {title ? <h2 className="mb-6 text-h2 text-ink">{title}</h2> : null}
      {children}
    </div>
  );
}
