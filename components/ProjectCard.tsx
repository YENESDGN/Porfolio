import type { ProjectSummary } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { GitHubLink } from "./GitHubLink";
import { MediaPlane } from "./MediaPlane";

type ProjectCardProps = {
  project: ProjectSummary;
  className?: string;
};

// Overlap değil: 2 sütun / 1 satır grid. Solda küçük görsel, sağda kısa
// açıklama. Kartın kendisi tıklanabilir değil; tek tıklanır yüzey GitHub linki.
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Card className={cn("grid gap-4 md:grid-cols-2", className)}>
      <MediaPlane
        photo={project.coverPhoto}
        sizes="(min-width: 768px) 30vw, 90vw"
        className="aspect-plate"
      />
      <div>
        <h3 className="text-h3 text-ink">{project.title}</h3>
        <p className="mt-2 max-w-prose text-body text-ink-secondary">
          {project.description}
        </p>
        <GitHubLink url={project.githubUrl} className="mt-3" />
      </div>
    </Card>
  );
}
