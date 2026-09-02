import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Card,
  Container,
  MediaPlane,
  OverlapPair,
  ProjectGallery,
  ProjectHeader,
  Reveal,
  Section,
  TechStack,
} from "@/components";
import { getProjectBySlug, getProjectSlugs } from "@/lib/queries";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const paragraphs = project.body.split(/\n\s*\n/).filter(Boolean);
  const techStack = project.techStack.map((entry) => entry.tech);
  const [leadImage, ...restImages] = project.images;

  return (
    <main>
      <Section>
        <Container>
          <Reveal direction="left">
            <OverlapPair
              media={
                <MediaPlane
                  photo={project.coverPhoto}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  preload
                  className="aspect-plate-wide"
                />
              }
              content={<ProjectHeader project={project} />}
            />
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-page-deep">
        <Container>
          <Reveal direction="right">
            <OverlapPair
              reverse
              media={
                <MediaPlane
                  photo={leadImage?.media ?? null}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="aspect-plate"
                />
              }
              content={
                <Card className="md:p-10">
                  <div className="flex flex-col gap-6">
                    {paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="max-w-prose text-body text-ink-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              }
            />
          </Reveal>
        </Container>
      </Section>

      {techStack.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <Card variant="bare" title="Kullanılan teknolojiler">
                <TechStack items={techStack} />
              </Card>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {restImages.length > 0 ? (
        // Zemin bir önceki bölüme göre seçilir: teknoloji bölümü çizilmediyse
        // buradaki derin zemin anlatının zeminiyle bitişip geçişi siliyor.
        <Section className={techStack.length > 0 ? "bg-page-deep" : undefined}>
          <Container>
            <Reveal>
              <ProjectGallery images={restImages} title="Ekranlar" />
            </Reveal>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
