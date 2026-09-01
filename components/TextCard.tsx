import { cn } from "@/lib/cn";
import { Card, type CardVariant } from "./Card";

type TextCardProps = {
  content: string;
  title?: string;
  variant?: CardVariant;
  className?: string;
};

export function TextCard({
  content,
  title,
  variant = "surface",
  className,
}: TextCardProps) {
  return (
    <Card title={title} variant={variant} className={cn(className)}>
      <p className="max-w-prose text-body text-ink-secondary">{content}</p>
    </Card>
  );
}
