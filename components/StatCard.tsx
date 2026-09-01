import { cn } from "@/lib/cn";
import { Card } from "./Card";

type StatCardProps = {
  value: number;
  label: string;
  className?: string;
};

// Sayı ve etiket aynı satırda, taban hizalı: blok geniş ve alçak.
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card className={cn("flex items-baseline gap-4", className)}>
      <span className="text-h1 text-ink">{value}</span>
      <span className="text-lead text-ink-secondary">{label}</span>
    </Card>
  );
}
