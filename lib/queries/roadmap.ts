import type { Prisma } from "@/generated/prisma/client";

// Öğrenim ve iş hayatı roadmap'i aynı tabloda, aynı şekilde okunuyor:
// select tek yerde durur, ayıran alan yalnızca `kind`.
export const roadmapItemSelect = {
  id: true,
  title: true,
  description: true,
  startDate: true,
  endDate: true,
} satisfies Prisma.RoadmapItemSelect;

export type RoadmapEntry = Prisma.RoadmapItemGetPayload<{
  select: typeof roadmapItemSelect;
}>;
