import { cn } from "@/lib/cn";
import { Card } from "./Card";

type TextCardProps = {
  content: string;
  title?: string;
  className?: string;
};

export function TextCard({ content, title, className }: TextCardProps) {
  return (
    <Card title={title} className={cn(className)}>
      <p className="max-w-prose text-body text-ink-secondary">{content}</p>
    </Card>
  );
}
