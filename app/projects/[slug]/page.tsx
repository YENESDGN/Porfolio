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

// Adres kümesi derlemede sabitlenir: bilinmeyen slug istek anında
// üretilmez, doğrudan 404 olur. Route böylece tamamen statik kalır.
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

  // Gövde boş satırdan bölünür: veri düz metin taşır, biçimlendirme burada.
  const paragraphs = project.body.split(/\n\s*\n/).filter(Boolean);
  const techStack = project.techStack.map((entry) => entry.tech);
  // Anlatı ilk kareyi alır, galeri kalanları çizer: aynı görsel iki kez durmaz.
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

      {/* Künyenin aynası: aynı overlap, ters yön. Zemin derinleşir, çünkü üst
          üste binen tam ekran bölümler ancak böyle geçiş olarak okunuyor. */}
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
              <h2 className="mb-8 text-h2 text-ink">Kullanılan teknolojiler</h2>
              <TechStack items={techStack} />
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
