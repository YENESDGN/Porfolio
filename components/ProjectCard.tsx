import type { ProjectSummary } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { GitHubLink } from "./GitHubLink";
import { MediaPlane } from "./MediaPlane";

// Overlap değil: 5 sütunluk grid, görsel 3 / metin 2. Kart bir bölümün
// tamamını doldurur ve kabuksuz durur; tek tıklanır yüzey GitHub linki.
export function ProjectCard({
  project,
  className,
}: {
  project: ProjectSummary;
  className?: string;
}) {
  return (
    <Card
      variant="bare"
      className={cn(
        "bg-surface grid gap-8 md:grid-cols-5 md:items-center md:gap-12",
        className,
      )}
    >
      <MediaPlane
        photo={project.coverPhoto}
        sizes="(min-width: 768px) 60vw, 100vw"
        className="aspect-plate-wide md:col-span-3"
      />
      <div className="md:col-span-2">
        <h2 className="text-h2 text-ink">{project.title}</h2>
        <p className="mt-4 max-w-prose text-body text-ink-secondary">
          {project.description}
        </p>
        <GitHubLink url={project.githubUrl} className="mt-6" />
      </div>
    </Card>
  );
}
