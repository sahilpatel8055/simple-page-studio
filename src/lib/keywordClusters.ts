/**
 * Phase 5 — keyword cluster + search-intent classification system.
 *
 * This module does NOT create pages. It declares, for every course family and
 * every university already in the dataset, the semantic keyword groups that
 * exist in real search, classifies each group by search intent, and states
 * which page kind is allowed to own it. `intentMap` remains the router
 * (query -> single canonical page); this module is the vocabulary layer that
 * feeds meta keywords, internal-link copy and the cannibalisation audit.
 */
import { getProgramme, getUniversity, listOfferingsByUniversity, programmes, universities } from "@/data";
import type { IntentModifier, PageKind } from "@/lib/intentMap";

/** Google-style intent taxonomy used for page ownership decisions. */
export type KeywordIntent =
  | "informational"
  | "commercial-investigation"
  | "transactional"
  | "navigational"
  | "comparison";

export type ClusterId =
  | "core"
  | "fees"
  | "eligibility"
  | "admission"
  | "duration"
  | "syllabus"
  | "specialisation"
  | "career"
  | "salary"
  | "placement"
  | "comparison"
  | "informational";

export interface ClusterRule {
  id: ClusterId;
  intent: KeywordIntent;
  modifier: IntentModifier;
  /** Page kind that is allowed to primarily target this cluster. */
  owner: PageKind;
  /** Page kinds that may mention the cluster in a section, never in the title. */
  supporting: PageKind[];
  /** Query templates; `[course]` is replaced with the course name. */
  templates: string[];
}

/** Course-level clusters. Owner = the ONE page kind allowed to target them. */
export const COURSE_CLUSTERS: ClusterRule[] = [
  {
    id: "core",
    intent: "commercial-investigation",
    modifier: "overview",
    owner: "coursePillar",
    supporting: ["universityCourse", "comparison"],
    templates: ["online [course]", "[course] online", "online [course] degree", "online [course] program"],
  },
  {
    id: "fees",
    intent: "commercial-investigation",
    modifier: "fees",
    owner: "coursePillar",
    supporting: ["universityCourse"],
    templates: ["online [course] fees", "[course] fees", "online [course] fee structure", "online [course] fees per semester"],
  },
  {
    id: "eligibility",
    intent: "informational",
    modifier: "eligibility",
    owner: "coursePillar",
    supporting: ["universityCourse", "blog"],
    templates: ["online [course] eligibility", "eligibility for online [course]", "online [course] qualification"],
  },
  {
    id: "admission",
    intent: "transactional",
    modifier: "admission",
    owner: "universityCourse",
    supporting: ["coursePillar"],
    templates: ["online [course] admission", "online [course] admission process", "online [course] admission 2026"],
  },
  {
    id: "duration",
    intent: "informational",
    modifier: "overview",
    owner: "coursePillar",
    supporting: ["universityCourse"],
    templates: ["online [course] duration", "online [course] how many years"],
  },
  {
    id: "syllabus",
    intent: "informational",
    modifier: "syllabus",
    owner: "universityCourse",
    supporting: ["coursePillar", "specialisation"],
    templates: ["online [course] syllabus", "online [course] subjects"],
  },
  {
    id: "specialisation",
    intent: "commercial-investigation",
    modifier: "specialisations",
    owner: "specialisation",
    supporting: ["coursePillar"],
    templates: ["online [course] specializations", "best [course] specialization"],
  },
  {
    id: "career",
    intent: "informational",
    modifier: "placement",
    owner: "blog",
    supporting: ["coursePillar", "universityCourse"],
    templates: ["jobs after online [course]", "career after online [course]", "[course] career opportunities"],
  },
  {
    id: "salary",
    intent: "informational",
    modifier: "placement",
    owner: "coursePillar",
    supporting: ["universityCourse", "blog"],
    templates: ["online [course] salary", "salary after [course]"],
  },
  {
    id: "placement",
    intent: "commercial-investigation",
    modifier: "placement",
    owner: "universityCourse",
    supporting: ["universityHub"],
    templates: ["online [course] placement", "best online [course] placement"],
  },
  {
    id: "comparison",
    intent: "comparison",
    modifier: "comparison",
    owner: "comparison",
    supporting: ["coursePillar"],
    templates: [
      "best online [course]",
      "online [course] vs regular [course]",
      "best university for online [course]",
      "online [course] comparison",
    ],
  },
  {
    id: "informational",
    intent: "informational",
    modifier: "question",
    owner: "blog",
    supporting: ["coursePillar"],
    templates: [
      "is online [course] worth it",
      "who should do online [course]",
      "online [course] for working professionals",
      "online [course] after graduation",
      "online [course] advantages and disadvantages",
    ],
  },
];

export interface KeywordEntry {
  keyword: string;
  cluster: ClusterId;
  intent: KeywordIntent;
  owner: PageKind;
}

const fill = (t: string, course: string) => t.replace(/\[course\]/g, course).replace(/\s+/g, " ").trim();

/** Every keyword in the course family cluster, already classified. */
export function courseKeywordCluster(programmeSlug: string): KeywordEntry[] {
  const p = getProgramme(programmeSlug);
  if (!p) return [];
  const name = p.name.replace(/^online\s+/i, "");
  return COURSE_CLUSTERS.flatMap((c) =>
    c.templates.map((t) => ({ keyword: fill(t, name), cluster: c.id, intent: c.intent, owner: c.owner })),
  );
}

/** Only the keywords a given page kind is allowed to target in title/meta. */
export function ownedCourseKeywords(programmeSlug: string, kind: PageKind, limit = 8): string[] {
  return courseKeywordCluster(programmeSlug)
    .filter((k) => k.owner === kind)
    .slice(0, limit)
    .map((k) => k.keyword);
}

/* ------------------------- university clusters -------------------------- */

export interface UniversityCluster {
  core: string[];
  course: string[];
  commercial: string[];
  decision: string[];
}

/** University keyword map built only from courses the university actually offers. */
export function universityKeywordCluster(universitySlug: string): UniversityCluster | null {
  const u = getUniversity(universitySlug);
  if (!u) return null;
  const short = u.shortName;
  const offers = listOfferingsByUniversity(universitySlug)
    .map((o) => getProgramme(o.programmeSlug)?.name)
    .filter((n): n is string => Boolean(n));
  const first = offers[0];
  return {
    core: [`${short} Online`, `${short} Online University`, `${short} online courses`],
    course: offers.map((n) => `${short} ${n}`),
    commercial: offers.flatMap((n) => [`${short} ${n} fees`, `${short} ${n} admission`, `${short} ${n} eligibility`]).slice(0, 18),
    decision: first
      ? [`${short} ${first} review`, `${short} ${first} worth it`, `${short} online courses comparison`]
      : [`${short} online review`, `${short} online courses comparison`],
  };
}

/** Keywords a university hub may own (course-specific ones belong to offering pages). */
export function ownedUniversityKeywords(universitySlug: string, limit = 6): string[] {
  const c = universityKeywordCluster(universitySlug);
  if (!c) return [];
  return [...c.core, ...c.decision].slice(0, limit);
}

/* ------------------------ keyword classification ------------------------ */

const NAV_HINT = /\b(login|portal|official|website)\b/i;

/** Ordered signal patterns — the first match wins, most specific first. */
const CLUSTER_SIGNALS: Array<[ClusterId, RegExp]> = [
  ["comparison", /\b(vs|versus|compare|comparison|better|best)\b/i],
  ["informational", /\b(is|are|worth|who should|should i|can i|why|advantages|disadvantages|after graduation|working professional)\b/i],
  ["fees", /\b(fee|fees|cost|price|emi|fee structure)\b/i],
  ["eligibility", /\b(eligibility|eligible|qualification|criteria)\b/i],
  ["admission", /\b(admission|apply|application|form|last date)\b/i],
  ["duration", /\b(duration|how many years|years)\b/i],
  ["syllabus", /\b(syllabus|subjects|curriculum|semester)\b/i],
  ["specialisation", /\b(specialis|specializ|elective|stream)\b/i],
  ["salary", /\b(salary|package|ctc)\b/i],
  ["placement", /\b(placement|recruiter|hiring)\b/i],
  ["career", /\b(job|jobs|career|scope)\b/i],
];

const CLUSTER_INTENT = Object.fromEntries(COURSE_CLUSTERS.map((c) => [c.id, c.intent])) as Record<ClusterId, KeywordIntent>;

/** Classifies a raw query into the Phase 5 intent taxonomy. */
export function classifyKeyword(query: string): { intent: KeywordIntent; cluster: ClusterId } {
  const q = query.toLowerCase();
  const named = universities.some((u) => q.includes(u.shortName.toLowerCase()) || q.includes(u.name.toLowerCase()));
  if (NAV_HINT.test(q) && named) return { intent: "navigational", cluster: "core" };
  const hit = CLUSTER_SIGNALS.find(([, re]) => re.test(q));
  if (!hit) return { intent: named ? "navigational" : "commercial-investigation", cluster: "core" };
  const [cluster] = hit;
  // A named university turns fee/admission research into a transactional decision.
  if (named && (cluster === "fees" || cluster === "admission")) return { intent: "transactional", cluster };
  return { intent: CLUSTER_INTENT[cluster], cluster };
}


/** Full site keyword map — used by the audit script, not rendered anywhere. */
export function siteKeywordMap() {
  return {
    courses: programmes.map((p) => ({ slug: p.slug, keywords: courseKeywordCluster(p.slug) })),
    universities: universities.map((u) => ({ slug: u.slug, cluster: universityKeywordCluster(u.slug) })),
  };
}
