import { cn } from "@/lib/cn";

type ContainerWidth = "default" | "wide" | "full";

type ContainerProps = {
  children: React.ReactNode;
  width?: ContainerWidth;
  className?: string;
};

const widths: Record<ContainerWidth, string> = {
  default: "max-w-5xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

// Sayfa ölçüsünün tek tanımı. header ve main tam genişlikte durur, içeriği
// bu sarar; tam ekran bölümler `wide`, kenara taşan kompozisyon `full` kullanır.
export function Container({
  children,
  width = "default",
  className,
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6", widths[width], className)}>
      {children}
    </div>
  );
}
