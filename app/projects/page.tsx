import type { Metadata } from "next";
import { ProjectCard, Reveal } from "@/components";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Üzerinde çalıştığım projeler.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="py-section">
      <h1 className="text-h1 text-ink">Projeler</h1>

      {projects.length === 0 ? (
        <p className="mt-8 max-w-prose text-body text-ink-secondary">
          Yayına alınmış proje henüz yok. Yakında burada olacak.
        </p>
      ) : (
        <ul className="mt-12 flex flex-col gap-6">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Reveal delay={index * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
