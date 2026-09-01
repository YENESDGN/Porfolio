import { cn } from "@/lib/cn";
import { Card } from "./Card";

type StatCardVariant = "card" | "bare";

type StatCardProps = {
  value: number;
  label: string;
  variant?: StatCardVariant;
  className?: string;
};

// card: sayı ve etiket aynı satırda, taban hizalı — blok geniş ve alçak.
// bare: kabuksuz, sayı üstte etiket altta; hero'da kâğıt yüzey istenmiyor.
export function StatCard({
  value,
  label,
  variant = "card",
  className,
}: StatCardProps) {
  if (variant === "bare") {
    return (
      <div className={cn(className)}>
        <p className="text-h1 text-ink">{value}</p>
        <p className="mt-1 text-small text-ink-muted">{label}</p>
      </div>
    );
  }

  return (
    <Card className={cn("flex items-baseline gap-4", className)}>
      <span className="text-h1 text-ink">{value}</span>
      <span className="text-lead text-ink-secondary">{label}</span>
    </Card>
  );
}
