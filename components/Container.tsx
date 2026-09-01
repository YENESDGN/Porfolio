import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// Sayfa ölçüsünün tek tanımı. Genişlik sınırı yok: her blok ekranı boydan
// boya doldurur, ölçüyü yalnızca oluk tutar. Uzun metnin satır uzunluğunu
// Container değil, metnin kendi max-w-prose'u sınırlar.
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("w-full px-16", className)}>{children}</div>;
}
