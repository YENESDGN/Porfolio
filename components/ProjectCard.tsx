import type { ProjectSummary } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { GitHubLink } from "./GitHubLink";
import { MediaPlane } from "./MediaPlane";
import { TextLink } from "./TextLink";

// Overlap değil: 5 sütunluk grid, görsel 3 / metin 2. Kart bir bölümün
// tamamını doldurur ve kabuksuz durur. Kartın kendisi bağlantı değil:
// detaya açık bir link götürür, tıklanır yüzey yalnızca link kalır.
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
        "grid gap-8 bg-surface md:grid-cols-5 md:items-center md:gap-12",
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
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <TextLink href={`/projects/${project.slug}`}>Projeyi incele</TextLink>
          <GitHubLink url={project.githubUrl} />
        </div>
      </div>
    </Card>
  );
}
