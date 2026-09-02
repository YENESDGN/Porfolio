type StatCardProps = {
  value: number;
  label: string;
  className?: string;
};

// Kabuksuz: hero'da kâğıt yüzey istenmiyor, sayı üstte etiket altta.
export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={className}>
      <p className="text-h1 text-ink">{value}</p>
      <p className="mt-1 text-small text-ink-muted">{label}</p>
    </div>
  );
}
