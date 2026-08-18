/**
 * Editorial comparison packs.
 *
 * These are hand-researched university-vs-university comparisons for one
 * course. They sit on top of the generated comparison dataset
 * (`university-comparison-master-2026-27.json`) and add the narrative,
 * factor-by-factor detail and verdicts that the generated snapshots cannot
 * express. Every value here must come from the source research file.
 */

/** One row of the side-by-side board: University A | factor | University B. */
export interface PackFactor {
  label: string;
  a: string;
  b: string;
}

/** A narrative block below the board. */
export interface PackSection {
  heading: string;
  body?: string;
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
  /** Short editorial call-out, e.g. a fee verdict. */
  verdict?: string;
}

export interface ComparisonPack {
  /** Course slug as produced by `courseSlug()` — "mba", "mca", "bca", "bba". */
  course: string;
  /** University slugs, matching the comparison master dataset. */
  aSlug: string;
  bSlug: string;
  aLabel: string;
  bLabel: string;
  title: string;
  metaDescription: string;
  intro: string;
  /** Optional scope caveat printed above the board. */
  scopeNote?: string;
  factors: PackFactor[];
  sections: PackSection[];
  aBestFor: string[];
  bBestFor: string[];
  verdict: string;
  faqs: { question: string; answer: string }[];
}
