import type { Prisma } from "@/generated/prisma/client";
import { projectsFixture } from "./fixtures";

export const projectSelect = {
  id: true,
  title: true,
  description: true,
  githubUrl: true,
  coverPhoto: { select: { url: true, altText: true } },
} satisfies Prisma.ProjectSelect;

export type ProjectSummary = Prisma.ProjectGetPayload<{
  select: typeof projectSelect;
}>;

export async function getPublishedProjects(): Promise<ProjectSummary[]> {
  return projectsFixture;
}

export async function getPublishedProjectCount(): Promise<number> {
  return projectsFixture.length;
}
