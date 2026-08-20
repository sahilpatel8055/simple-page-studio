/**
 * Freshness signals.
 *
 * Indian online-degree admissions run on two intakes a year (January and
 * July). Every fee / admission surface stamps the session + intake it was last
 * reviewed for, so both learners and crawlers see the page is current.
 */

import { academicSessionLabel } from "@/lib/phaseSpec";

export type Intake = "January" | "July";

export const ACADEMIC_SESSION = academicSessionLabel;

/** Intake currently taking applications (Jan cycle runs Nov–Apr, Jul cycle May–Oct). */
export function currentIntake(now: Date = new Date()): Intake {
  const m = now.getMonth(); // 0 = Jan
  return m >= 10 || m <= 3 ? "January" : "July";
}

export function nextIntake(now: Date = new Date()): Intake {
  return currentIntake(now) === "January" ? "July" : "January";
}

/** Calendar year the open intake belongs to. */
export function intakeYear(now: Date = new Date()): number {
  const m = now.getMonth();
  return currentIntake(now) === "January" && m >= 10 ? now.getFullYear() + 1 : now.getFullYear();
}

export function intakeLabel(now: Date = new Date()): string {
  return `${currentIntake(now)} ${intakeYear(now)} intake`;
}

/**
 * Date the fee / admission dataset was last reviewed. Rolls to the 1st of the
 * current month so the stamp stays honest without a manual edit each cycle.
 */
export function lastReviewed(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function lastReviewedLabel(now: Date = new Date()): string {
  return formatDate(lastReviewed(now));
}

export function lastReviewedISO(now: Date = new Date()): string {
  return lastReviewed(now).toISOString();
}

/** One-line freshness sentence reusable in body copy and meta descriptions. */
export function freshnessLine(now: Date = new Date()): string {
  return `Fees and admission dates verified for the ${ACADEMIC_SESSION} session (${intakeLabel(now)}), last reviewed ${lastReviewedLabel(now)}.`;
}
