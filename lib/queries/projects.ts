import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

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
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    select: projectSelect,
  });
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  return prisma.project.findFirst({
    where: { slug, isPublished: true },
    select: projectDetailSelect,
  });
}

export async function getProjectSlugs(): Promise<
  Pick<ProjectDetail, "slug">[]
> {
  return prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    select: { slug: true },
  });
}
