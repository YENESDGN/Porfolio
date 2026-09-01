import type { Metadata } from "next";
import { Container, ProjectCard, Reveal, Section } from "@/components";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Üzerinde çalıştığım projeler.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main>
      {/* Her proje bir ekran: liste değil, sırayla gelen bloklar. */}
      {projects.map((project) => (
        <Section key={project.id}>
          <Container>
            <Reveal>
              <ProjectCard project={project} />
            </Reveal>
          </Container>
        </Section>
      ))}
    </main>
  );
}
