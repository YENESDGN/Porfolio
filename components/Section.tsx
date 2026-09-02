import { cn } from "@/lib/cn";

type SectionAlign = "start" | "center";

type SectionProps = {
  children: React.ReactNode;
  align?: SectionAlign;
  className?: string;
};

const alignments: Record<SectionAlign, string> = {
  start: "justify-start",
  center: "justify-center",
};

// h değil min-h: içerik bir ekrandan uzunsa bölüm büyür, kırpılmaz.
export function Section({
  children,
  align = "center",
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        "flex min-h-viewport flex-col",
        alignments[align],
        className,
      )}
    >
      {children}
    </section>
  );
}
