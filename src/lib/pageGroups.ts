/**
 * Group definitions for the tabbed reading experience.
 *
 * The sticky bar shows a handful of group names instead of every section
 * title. Each group id is used as the panel id, the tab id and the hash
 * fragment; the individual section anchors inside a group are unchanged, so
 * existing in-page links and structured data keep working.
 */
export type PageGroup = { id: string; label: string };

export const COURSE_GROUPS = [
  { id: "overview", label: "Overview" },
  { id: "universities-fees", label: "Universities & Fees" },
  { id: "eligibility-admission", label: "Eligibility & Admission" },
  { id: "syllabus-specialisations", label: "Syllabus & Specialisations" },
  { id: "career-salary", label: "Career & Salary" },
  { id: "validity-worth-it", label: "Validity & Worth It" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
] as const satisfies readonly PageGroup[];

export type CourseGroupId = (typeof COURSE_GROUPS)[number]["id"];

export const UNIVERSITY_GROUPS = [
  { id: "overview", label: "Overview" },
  { id: "courses-fees", label: "Courses & Fees" },
  { id: "admission", label: "Admission" },
  { id: "exams-learning", label: "Exams & Learning" },
  { id: "placement", label: "Placement" },
  { id: "approvals-validity", label: "Approvals & Validity" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
] as const satisfies readonly PageGroup[];
