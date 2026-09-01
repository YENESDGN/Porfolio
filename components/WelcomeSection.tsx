import { site } from "@/config";
import { cn } from "@/lib/cn";

type WelcomeSectionProps = {
  text: string;
  className?: string;
};

// Sayfanın odak anı isim: display yalnızca burada kullanılır.
export function WelcomeSection({ text, className }: WelcomeSectionProps) {
  return (
    <div className={cn(className)}>
      <h1 className="text-display text-ink">{site.name}</h1>
      <p className="mt-6 max-w-prose text-lead text-ink-secondary">{text}</p>
    </div>
  );
}
