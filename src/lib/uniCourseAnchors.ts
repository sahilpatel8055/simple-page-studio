import type { CourseSectionKey } from "@/lib/courseSections";

/**
 * Phase A consolidation map.
 *
 * Every `/universities/{u}/courses/{c}/{section}` URL used to render the same
 * body as its parent pillar, which split ranking signals across 9 duplicate
 * URLs per programme. Those URLs now 301 to the single pillar page, jumping to
 * the matching section anchor. The anchor ids come from `ContentSection`,
 * which slugifies its own title.
 */
export const UNI_COURSE_SECTION_ANCHORS: Record<CourseSectionKey, string> = {
  fees: "fee-structure",
  eligibility: "eligibility",
  admission: "admission-process",
  syllabus: "curriculum",
  specialisations: "specialisations",
  "exam-pattern": "examination-pattern",
  placement: "placement-support",
  scholarships: "scholarships",
  faq: "faqs",
};
