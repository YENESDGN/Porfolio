import type { Prisma } from "@/generated/prisma/client";
import { aboutFixture } from "./fixtures";
import type { RoadmapEntry } from "./roadmap";

export const aboutSectionSelect = {
  id: true,
  content: true,
  photo: { select: { url: true, altText: true } },
} satisfies Prisma.AboutSectionSelect;

export type AboutSectionEntry = Prisma.AboutSectionGetPayload<{
  select: typeof aboutSectionSelect;
}>;

export type AboutPageData = {
  sections: AboutSectionEntry[];
  // Yalnızca EDUCATION kayıtları; WORK tarafı /experience'a ait.
  roadmap: RoadmapEntry[];
};

export async function getAboutPage(): Promise<AboutPageData | null> {
  return aboutFixture;
}
