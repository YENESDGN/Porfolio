import type { Prisma } from "@/generated/prisma/client";
import { projectDetailsFixture, projectsFixture } from "./fixtures";

export const projectSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  githubUrl: true,
  coverPhoto: { select: { url: true, altText: true } },
} satisfies Prisma.ProjectSelect;

export type ProjectSummary = Prisma.ProjectGetPayload<{
  select: typeof projectSelect;
}>;

// Sıralama iki ilişkide de veriden gelir, kodda yeniden dizilmez.
export const projectDetailSelect = {
  id: true,
  slug: true,
  title: true,
  description: true,
  body: true,
  role: true,
  startDate: true,
  endDate: true,
  githubUrl: true,
  liveUrl: true,
  coverPhoto: { select: { url: true, altText: true } },
  images: {
    select: {
      id: true,
      caption: true,
      media: { select: { url: true, altText: true } },
    },
    orderBy: { order: "asc" },
  },
  techStack: {
    select: { tech: { select: { id: true, name: true, icon: true } } },
    orderBy: { order: "asc" },
  },
} satisfies Prisma.ProjectSelect;

export type ProjectDetail = Prisma.ProjectGetPayload<{
  select: typeof projectDetailSelect;
}>;

export async function getPublishedProjects(): Promise<ProjectSummary[]> {
  return projectsFixture;
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  return projectDetailsFixture.find((project) => project.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<
  Pick<ProjectDetail, "slug">[]
> {
  return projectDetailsFixture.map(({ slug }) => ({ slug }));
}
