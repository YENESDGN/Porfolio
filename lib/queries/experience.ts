import type { Prisma } from "@/generated/prisma/client";
import { experienceFixture } from "./fixtures";
import type { RoadmapEntry } from "./roadmap";

export const experienceSectionSelect = {
  id: true,
  content: true,
} satisfies Prisma.ExperienceSectionSelect;

type ExperienceSectionEntry = Prisma.ExperienceSectionGetPayload<{
  select: typeof experienceSectionSelect;
}>;

export type ExperiencePageData = {
  sections: ExperienceSectionEntry[];
  // Yalnızca WORK kayıtları; EDUCATION tarafı /about'a ait.
  roadmap: RoadmapEntry[];
};

export async function getExperiencePage(): Promise<ExperiencePageData | null> {
  return experienceFixture;
}
