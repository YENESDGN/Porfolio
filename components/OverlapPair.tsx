import { cn } from "@/lib/cn";

type OverlapPairProps = {
  media: React.ReactNode;
  content: React.ReactNode;
  reverse?: boolean;
  className?: string;
};

export function OverlapPair({
  media,
  content,
  reverse = false,
  className,
}: OverlapPairProps) {
  return (
    <div
      className={cn(
        // Taşma payı grid satırına yazılır ki blok kendi yüksekliğini kapsasın —
        // transform ya da negatif margin bunu yapmaz, sarkan kısım sonraki Section'ın üstüne biner.
        "grid gap-6 py-16 md:grid-rows-[auto_5rem] md:items-end md:gap-0",
        reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]",
        className,
      )}
    >
      <div
        className={cn(
          "md:row-start-1",
          reverse ? "md:col-start-2" : "md:col-start-1",
        )}
      >
        {media}
      </div>
      <div
        className={cn(
          "relative md:row-span-2 md:row-start-1 md:grid md:min-h-80 md:shadow-contact",
          reverse
            ? "md:col-start-1 md:-mr-overlap"
            : "md:col-start-2 md:-ml-overlap",
        )}
      >
        {content}
      </div>
    </div>
  );
}
