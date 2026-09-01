import type { ProjectSummary } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { GitHubLink } from "./GitHubLink";
import { MediaPlane } from "./MediaPlane";

// Overlap değil: 2 sütun / 1 satır grid. Kart bir bölümün tamamını doldurur,
// bu yüzden ölçüler büyük. Kartın kendisi tıklanabilir değil; tek tıklanır
// yüzey GitHub linki.
export function ProjectCard({
  project,
  className,
}: {
  project: ProjectSummary;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "grid gap-8 md:grid-cols-2 md:items-center md:gap-12 md:p-12",
        className,
      )}
    >
      <MediaPlane
        photo={project.coverPhoto}
        sizes="(min-width: 768px) 45vw, 90vw"
        className="aspect-plate"
      />
      <div>
        <h2 className="text-h1 text-ink">{project.title}</h2>
        <p className="mt-4 max-w-prose text-lead text-ink-secondary">
          {project.description}
        </p>
        <GitHubLink url={project.githubUrl} className="mt-6" />
      </div>
    </Card>
  );
}
