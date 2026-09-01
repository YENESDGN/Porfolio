import type { RoadmapEntry } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { formatDateRange } from "@/lib/formatDate";

type RoadMapProps = {
  items: RoadmapEntry[];
  title?: string;
  className?: string;
};

// Öğrenim ve iş hayatı için tek uygulama; ayıran şey yalnızca gelen liste.
// Dikey ray line-strong'un ayrıldığı iki yerden biri.
export function RoadMap({ items, title, className }: RoadMapProps) {
  if (items.length === 0) return null;

  return (
    <section className={cn(className)}>
      {title ? <h2 className="text-h2 text-ink">{title}</h2> : null}
      <ol className={cn("border-l border-line-strong", title && "mt-6")}>
        {items.map((item) => (
          <li key={item.id} className="relative pb-8 pl-6 last:pb-0">
            {/* Dekoratif dolgu, üzerine metin gelmiyor: raspberry-500 burada
                AA sınırına takılmaz. */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 size-2 -translate-x-1/2 bg-raspberry-500"
            />
            <p className="text-caption text-ink-muted">
              {formatDateRange(item.startDate, item.endDate)}
            </p>
            <h3 className="mt-1 text-h3 text-ink">{item.title}</h3>
            {item.description ? (
              <p className="mt-2 max-w-prose text-body text-ink-secondary">
                {item.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
