import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Sayfa ölçüsünün tek tanımı. header ve main tam genişlikte durur, içeriği
// bu sarar; tam genişlikte bir zemin gerektiğinde yer hazır.
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-6", className)}>
      {children}
    </div>
  );
}
