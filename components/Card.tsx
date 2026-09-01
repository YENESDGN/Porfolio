import { cn } from "@/lib/cn";

type CardProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

// Kenarlık yok: ayrım bg-page ile bg-surface arasındaki ton farkından okunur.
export function Card({ title, className, children }: CardProps) {
  return (
    <div className={cn("bg-surface p-6 md:p-8", className)}>
      {title ? <h2 className="mb-4 text-h2 text-ink">{title}</h2> : null}
      {children}
    </div>
  );
}
