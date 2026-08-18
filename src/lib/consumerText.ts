/**
 * Consumer-text sanitiser.
 *
 * The research datasets carry editorial notes written for the data team
 * ("do not publish a percentage until…", "College Vidya reports…", meta
 * sentences about where content lives). Those must never reach a visitor, but
 * they must stay in the JSON for internal traceability. This module strips
 * them at render time only.
 */

/** Editorial instructions aimed at the data team, not at the reader. */
const EDITORIAL = [
  /do not (state|publish|invent|copy)/i,
  /verify before publishing/i,
  /should be verified from/i,
  /until the current official/i,
  /without a current .* (notification|notice)/i,
  /pending official verification/i,
  /derived_from/i,
  /reference research/i,
];

/** Meta sentences that describe the site architecture rather than the university. */
const META = [
  /course-specific career opportunities (are|is) /i,
  /this university-level layer provides/i,
  /are published on each (programme|course) page/i,
  /primary source for course pages/i,
  /an aggregator listing/i,
];

const AGGREGATOR = /college\s*vidya|collegevidya/i;

function cleanSegment(seg: string): string | null {
  const s = seg.trim();
  if (!s) return null;
  if (EDITORIAL.some((r) => r.test(s))) return null;
  if (META.some((r) => r.test(s))) return null;
  if (AGGREGATOR.test(s)) return null;
  return s;
}

/**
 * Returns reader-safe prose, or undefined when nothing publishable remains.
 * Sentences and semicolon clauses are evaluated independently so a useful
 * half of a sentence survives an internal note attached to it.
 */
export function consumerText(input?: string | null): string | undefined {
  if (!input) return undefined;
  const sentences = input.split(/(?<=[.!?])\s+/);
  const kept: string[] = [];
  for (const sentence of sentences) {
    const clauses = sentence.split(/;\s*/).map(cleanSegment).filter((s): s is string => Boolean(s));
    if (!clauses.length) continue;
    let text = clauses.join("; ");
    if (!/[.!?]$/.test(text)) text += ".";
    kept.push(text.charAt(0).toUpperCase() + text.slice(1));
  }
  const out = kept.join(" ").trim();
  return out.length > 1 ? out : undefined;
}

/** Same rules, applied to a list; empty entries are dropped. */
export function consumerList(items?: (string | null | undefined)[] | null): string[] {
  if (!items) return [];
  return items.map((i) => consumerText(i)).filter((s): s is string => Boolean(s));
}

/** Aggregator/competitor URLs are never linked out to. */
export function consumerLink(href?: string | null): string | undefined {
  if (!href) return undefined;
  if (AGGREGATOR.test(href)) return undefined;
  return href;
}
