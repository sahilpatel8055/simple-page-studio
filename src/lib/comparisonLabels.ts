/**
 * Central course-label and pair-orientation formatting for every comparison
 * surface. One place decides how a course is worded so the URL, breadcrumb,
 * title, H1, tables and schema never disagree — and "Online" is never repeated.
 */

/** "Online MBA" / "MBA" -> "Online MBA". Never produces "Online Online MBA". */
export function onlineCourseLabel(course: string | undefined): string | undefined {
  if (!course) return undefined;
  const clean = course.trim().replace(/^(online|distance)\s+/i, "");
  return `Online ${clean}`;
}

/** Course name without any leading mode word — "Online MBA" -> "MBA". */
export function bareCourseLabel(course: string | undefined): string | undefined {
  if (!course) return undefined;
  return course.trim().replace(/^(online|distance)\s+/i, "");
}

/** Canonical page title for a pair, with or without a course. */
export function pairTitle(aName: string, bName: string, course?: string, session = "2026-27") {
  if (!course) return `${aName} vs ${bName}: Online University Comparison ${session}`;
  // "LPU Online" + "Online MBA" must never read "LPU Online Online MBA".
  const label = /online$/i.test(bName.trim())
    ? bareCourseLabel(course)
    : onlineCourseLabel(course);
  return `${aName} vs ${bName} ${label}: Fees, Eligibility & Comparison ${session}`;
}
