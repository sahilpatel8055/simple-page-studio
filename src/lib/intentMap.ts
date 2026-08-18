/**
 * Phase 3–4 — search-intent ownership & keyword-to-page architecture.
 *
 * ONE page owns ONE primary intent. This module is the registry that decides
 * which route owns which query shape, produces CTR-focused titles/descriptions
 * from that ownership, and lets a build-time audit detect cannibalisation.
 *
 * It never invents facts: every string it produces is built from the page's own
 * entity names plus the intent modifier the searcher used.
 */
import { getProgramme, getUniversity, listOfferingsByProgramme, listOfferingsByUniversity } from "@/data";
import type { SearchIntent } from "@/lib/searchIntent";

export type PageKind =
  | "universityHub"
  | "universityCourse"
  | "coursePillar"
  | "specialisation"
  | "comparison"
  | "blog";

/** Query modifiers students actually append. Each belongs to exactly one page kind. */
export type IntentModifier =
  | "overview"
  | "fees"
  | "eligibility"
  | "admission"
  | "syllabus"
  | "specialisations"
  | "placement"
  | "scholarship"
  | "comparison"
  | "question";

export interface IntentOwnership {
  kind: PageKind;
  intent: SearchIntent;
  /** Plain-English statement of what this page type is allowed to rank for. */
  owns: string;
  /** Query modifiers this page kind answers as the canonical destination. */
  modifiers: IntentModifier[];
  /** Query shapes this page must NOT chase (owned by another page kind). */
  defersTo: Partial<Record<IntentModifier, PageKind>>;
}

export const INTENT_OWNERSHIP: Record<PageKind, IntentOwnership> = {
  universityHub: {
    kind: "universityHub",
    intent: "commercial",
    owns: "University discovery — “<University> online”, approvals, programme list, fee range.",
    modifiers: ["overview", "admission", "scholarship", "placement"],
    defersTo: { fees: "universityCourse", syllabus: "universityCourse", specialisations: "coursePillar", comparison: "comparison" },
  },
  universityCourse: {
    kind: "universityCourse",
    intent: "transactional",
    owns: "One university + one course decision — “<University> <Course> fees / eligibility / syllabus”.",
    modifiers: ["fees", "eligibility", "admission", "syllabus", "placement"],
    defersTo: { specialisations: "specialisation", comparison: "comparison", question: "blog" },
  },
  coursePillar: {
    kind: "coursePillar",
    intent: "informational",
    owns: "Course discovery — “online <Course>”, what it is, who offers it, fee spread.",
    modifiers: ["overview", "specialisations", "eligibility"],
    defersTo: { fees: "universityCourse", admission: "universityCourse", comparison: "comparison", question: "blog" },
  },
  specialisation: {
    kind: "specialisation",
    intent: "commercial",
    owns: "One specialisation inside a course family — subjects, scope, careers.",
    modifiers: ["specialisations", "syllabus"],
    defersTo: { fees: "universityCourse", admission: "universityCourse", comparison: "comparison" },
  },
  comparison: {
    kind: "comparison",
    intent: "comparison",
    owns: "Decision between named options — “A vs B”, “best <Course> university”.",
    modifiers: ["comparison"],
    defersTo: { fees: "universityCourse", admission: "universityCourse", question: "blog" },
  },
  blog: {
    kind: "blog",
    intent: "informational",
    owns: "Question-shaped long-tail — “is …”, “can I …”, “which … for working professionals”.",
    modifiers: ["question"],
    defersTo: { fees: "universityCourse", admission: "universityCourse", comparison: "comparison" },
  },
};

/* ------------------------- query → canonical page ------------------------ */

const MODIFIER_PATTERNS: Array<[IntentModifier, RegExp]> = [
  ["fees", /\b(fee|fees|cost|price|emi|instal?ment)\b/i],
  ["eligibility", /\b(eligibility|eligible|criteria|percentage|qualification)\b/i],
  ["admission", /\b(admission|apply|application|last date|form)\b/i],
  ["syllabus", /\b(syllabus|curriculum|subjects|semester)\b/i],
  ["specialisations", /\b(specialisation|specialization|elective|stream)\b/i],
  ["placement", /\b(placement|recruiter|salary|package|career|job)\b/i],
  ["scholarship", /\b(scholarship|discount|concession)\b/i],
  ["comparison", /\b(vs|versus|compare|comparison|better|best)\b/i],
  ["question", /\b(is|can|should|how|why|worth|which|valid)\b/i],
];

export function modifierOf(query: string): IntentModifier {
  for (const [mod, re] of MODIFIER_PATTERNS) if (re.test(query)) return mod;
  return "overview";
}

export interface QueryRoute {
  kind: PageKind;
  path: string;
  reason: string;
  modifier: IntentModifier;
}

/**
 * Maps a raw search query to the single page that should own it.
 * Used by the audit script and by internal-link helpers so we never point two
 * pages at the same query.
 */
export function routeForQuery(query: string): QueryRoute | null {
  const q = query.toLowerCase();
  const modifier = modifierOf(q);
  const uni = universityMatch(q);
  const prog = programmeMatch(q);

  if (uni && prog) {
    const offer = listOfferingsByUniversity(uni).find((o) => o.programmeSlug === prog);
    if (offer)
      return {
        kind: "universityCourse",
        path: `/universities/${uni}/courses/${prog}`,
        reason: "University + course named — the specific decision page owns every modifier on it.",
        modifier,
      };
  }
  if (modifier === "comparison" && (uni || prog)) {
    return {
      kind: "comparison",
      path: prog ? `/compare/${prog}` : `/compare`,
      reason: "Comparison intent — decision pages own “vs”, “best” and “which is better”.",
      modifier,
    };
  }
  if (uni)
    return {
      kind: "universityHub",
      path: `/universities/${uni}`,
      reason: "University discovery intent.",
      modifier,
    };
  if (prog)
    return {
      kind: "coursePillar",
      path: `/courses/${prog}`,
      reason: "Course discovery intent — the pillar owns the head term.",
      modifier,
    };
  if (modifier === "question")
    return { kind: "blog", path: "/blogs", reason: "Question-shaped long-tail belongs to editorial.", modifier };
  return null;
}

function universityMatch(q: string): string | null {
  let best: { slug: string; len: number } | null = null;
  for (const slug of universitySlugs()) {
    const u = getUniversity(slug)!;
    for (const alias of [u.name, u.shortName, slug.replace(/-/g, " ")]) {
      const a = alias.toLowerCase();
      if (a.length > 2 && q.includes(a) && (!best || a.length > best.len)) best = { slug, len: a.length };
    }
  }
  return best?.slug ?? null;
}

function programmeMatch(q: string): string | null {
  let best: { slug: string; len: number } | null = null;
  for (const slug of programmeSlugs()) {
    const p = getProgramme(slug)!;
    const a = p.name.toLowerCase();
    if (q.includes(a) && (!best || a.length > best.len)) best = { slug, len: a.length };
  }
  return best?.slug ?? null;
}

let uniSlugCache: string[] | null = null;
let progSlugCache: string[] | null = null;

function universitySlugs(): string[] {
  if (!uniSlugCache) {
    const { universities } = require("@/data") as { universities: Array<{ slug: string }> };
    uniSlugCache = universities.map((u) => u.slug);
  }
  return uniSlugCache;
}

function programmeSlugs(): string[] {
  if (!progSlugCache) {
    const { programmes } = require("@/data") as { programmes: Array<{ slug: string }> };
    progSlugCache = programmes.map((p) => p.slug);
  }
  return progSlugCache;
}

/* ---------------------------- CTR meta builders --------------------------- */

export interface CtrMeta {
  title: string;
  description: string;
  keywords: string[];
}

const clampDesc = (s: string) => (s.length <= 158 ? s : `${s.slice(0, 155).trimEnd()}…`);

/** University × course: the page that owns fees / eligibility / syllabus queries. */
export function offeringCtrMeta(universitySlug: string, programmeSlug: string, year = 2026): CtrMeta | null {
  const u = getUniversity(universitySlug);
  const p = getProgramme(programmeSlug);
  if (!u || !p) return null;
  const offer = listOfferingsByUniversity(universitySlug).find((o) => o.programmeSlug === programmeSlug);
  const feeBit = offer?.fee.total ? `₹${offer.fee.total.toLocaleString("en-IN")} total fee, ` : "";
  return {
    title: `${u.shortName} ${p.name} ${year}: Fees, Eligibility, Syllabus & Admission`,
    description: clampDesc(
      `${u.name} ${p.name} — ${feeBit}eligibility, semester-wise syllabus, specialisations, admission steps and what the university actually publishes about learner support.`,
    ),
    keywords: [
      `${u.shortName} ${p.name}`,
      `${u.shortName} ${p.name} fees`,
      `${u.shortName} ${p.name} eligibility`,
      `${u.shortName} ${p.name} admission`,
    ],
  };
}

/** Course pillar: owns the head term, defers fee/admission specifics to offering pages. */
export function pillarCtrMeta(programmeSlug: string, year = 2026): CtrMeta | null {
  const p = getProgramme(programmeSlug);
  if (!p) return null;
  const providers = listOfferingsByProgramme(programmeSlug).length;
  return {
    title: `${p.name} in India ${year}: Universities, Fee Range & How to Choose`,
    description: clampDesc(
      `${p.name} explained for Indian students — ${providers} universities compared, ${p.feeRangeLabel} published fee range, eligibility, specialisations and how to pick the right one.`,
    ),
    keywords: [p.name, `${p.name} universities`, `${p.name} fee range`, `${p.name} eligibility`],
  };
}

/** Comparison: owns “A vs B”; never claims a winner. */
export function comparisonCtrMeta(leftShort: string, rightShort: string, year = 2026): CtrMeta {
  return {
    title: `${leftShort} vs ${rightShort} ${year}: Fees, Approvals & Which Suits You`,
    description: clampDesc(
      `${leftShort} and ${rightShort} side by side — published fees, UGC-DEB recognition, programmes, delivery mode and learner support, so you can decide on facts rather than marketing.`,
    ),
    keywords: [`${leftShort} vs ${rightShort}`, `${leftShort} or ${rightShort}`, `${leftShort} ${rightShort} comparison`],
  };
}

/* ------------------------- cannibalisation control ------------------------ */

export interface IntentClaim {
  path: string;
  kind: PageKind;
  primaryQuery: string;
}

/** Two pages claiming the same normalised query is a cannibalisation defect. */
export function findCannibalisation(claims: IntentClaim[]) {
  const byQuery = new Map<string, IntentClaim[]>();
  for (const c of claims) {
    const key = c.primaryQuery.trim().toLowerCase().replace(/\s+/g, " ");
    byQuery.set(key, [...(byQuery.get(key) ?? []), c]);
  }
  return [...byQuery.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([query, pages]) => ({ query, pages }));
}

/** The canonical primary query each live page claims. */
export function siteIntentClaims(): IntentClaim[] {
  const claims: IntentClaim[] = [];
  for (const slug of universitySlugs()) {
    const u = getUniversity(slug)!;
    claims.push({ path: `/universities/${slug}`, kind: "universityHub", primaryQuery: `${u.shortName} online` });
    for (const o of listOfferingsByUniversity(slug)) {
      const p = getProgramme(o.programmeSlug);
      if (!p) continue;
      claims.push({
        path: `/universities/${slug}/courses/${o.programmeSlug}`,
        kind: "universityCourse",
        primaryQuery: `${u.shortName} ${p.name}`,
      });
    }
  }
  for (const slug of programmeSlugs()) {
    const p = getProgramme(slug)!;
    claims.push({ path: `/courses/${slug}`, kind: "coursePillar", primaryQuery: p.name });
  }
  return claims;
}
