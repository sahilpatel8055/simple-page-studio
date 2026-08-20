/**
 * Phase 2 — search-intent mapping.
 *
 * Every important SEO page is assigned ONE primary intent. Titles, H1s,
 * introductions and CTAs are derived from that intent so a comparison page
 * does not read like a transactional page, and an informational open-university
 * page does not read like a private-university sales page.
 *
 * Nothing here invents facts: it only decides framing and CTA wording.
 */

export type SearchIntent = "informational" | "commercial" | "comparison" | "transactional";

export interface IntentProfile {
  intent: SearchIntent;
  /** What the searcher is actually trying to decide. */
  question: string;
  /** Primary call to action label matching that intent. */
  cta: string;
  /** Secondary, lower-commitment action. */
  secondaryCta: string;
}

const PROFILES: Record<SearchIntent, Pick<IntentProfile, "cta" | "secondaryCta">> = {
  informational: {
    cta: "Read the admission guide",
    secondaryCta: "Check official source",
  },
  commercial: {
    cta: "Check fees & eligibility",
    secondaryCta: "Compare with other universities",
  },
  comparison: {
    cta: "Compare side by side",
    secondaryCta: "See full fee breakdown",
  },
  transactional: {
    cta: "Get admission help",
    secondaryCta: "Download fee details",
  },
};

export function intentProfile(intent: SearchIntent, question: string): IntentProfile {
  return { ...PROFILES[intent], intent, question };
}

/** Page-type defaults. Individual pages can override where the data justifies it. */
export const pageIntent = {
  universityHub: "commercial" as SearchIntent,
  /** Open / government universities are researched, not shopped. */
  openUniversityHub: "informational" as SearchIntent,
  coursePillar: "informational" as SearchIntent,
  universityCourse: "transactional" as SearchIntent,
  comparison: "comparison" as SearchIntent,
  specialisation: "commercial" as SearchIntent,
  blog: "informational" as SearchIntent,
};
