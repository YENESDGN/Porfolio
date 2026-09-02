import type { ProjectDetail } from "@/lib/queries";
import { cn } from "@/lib/cn";
import { formatDateRange } from "@/lib/formatDate";
import { Card } from "./Card";
import { GitHubLink } from "./GitHubLink";
import { TextLink } from "./TextLink";

// Boş alan yazılmaz — rol, tarih ve linkler yalnızca doluysa çizilir.
export function ProjectHeader({
  project,
  className,
}: {
  project: ProjectDetail;
  className?: string;
}) {
  const period = project.startDate
    ? formatDateRange(project.startDate, project.endDate)
    : null;
  const meta = [project.role, period].filter(Boolean).join(" · ");

  return (
    <Card className={cn("md:p-10", className)}>
      <TextLink href="/projects" className="text-small">
        ← Projeler
      </TextLink>

      <h1 className="mt-6 text-h1 text-ink">{project.title}</h1>

      <p className="mt-4 max-w-prose text-lead text-ink-secondary">
        {project.description}
      </p>

      {meta ? <p className="mt-6 text-caption text-ink-muted">{meta}</p> : null}

      {project.githubUrl || project.liveUrl ? (
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <GitHubLink url={project.githubUrl} />
          {project.liveUrl ? (
            <TextLink href={project.liveUrl} external>
              Canlı site
            </TextLink>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
