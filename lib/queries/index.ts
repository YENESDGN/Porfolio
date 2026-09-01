// Sayfaların veri kapısı. Tüm Prisma çağrıları bu modülün içinde kalır;
// bileşenler ne istediğini bilir, nasıl istendiğini bilmez.
export {
  getAboutPage,
  type AboutPageData,
  type AboutSectionEntry,
} from "./about";
export {
  getExperiencePage,
  type ExperiencePageData,
  type ExperienceSectionEntry,
} from "./experience";
export {
  getLandingPage,
  type LandingPageData,
  type LandingContent,
  type TechStackEntry,
} from "./landing";
export {
  getPublishedProjects,
  getPublishedProjectCount,
  type ProjectSummary,
} from "./projects";
export { type RoadmapEntry } from "./roadmap";
