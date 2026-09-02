import { site } from "@/config";

type WelcomeSectionProps = {
  className?: string;
};

// Sayfanın odak anı isim: display yalnızca burada kullanılır. Karşılama
// metni artık kendi bölümünde duruyor, isim tek başına ilk ekranı taşıyor.
export function WelcomeSection({ className }: WelcomeSectionProps) {
  return (
    <div className={className}>
      <h1 className="text-display text-ink">{site.name}</h1>
      <p className="mt-4 text-lead text-ink-secondary">— {site.role}</p>
    </div>
  );
}
