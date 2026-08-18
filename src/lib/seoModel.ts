/**
 * Part 18 — reusable SEO data model.
 *
 * One record per indexable page, derived from the datasets and the intent
 * registry (`@/lib/intentMap`) so metadata, canonicals, schema and internal
 * links stay consistent and non-duplicated as universities and courses are
 * added. Nothing here is rendered as an admin UI — it powers the head() layer
 * and the internal audit script only.
 */
import {
  getOffering,
  getProgramme,
  getUniversity,
  listOfferingsByProgramme,
  listOfferingsByUniversity,
  listSpecialisations,
  programmes,
  universities,
} from "@/data";
import { articles } from "@/lib/content";
import { universityPairs } from "@/lib/entities";
import {
  canonicalProgrammeSlug,
  comparisonCtrMeta,
  offeringCtrMeta,
  pillarCtrMeta,
  type PageKind,
} from "@/lib/intentMap";
import { ownedCourseKeywords, ownedUniversityKeywords } from "@/lib/keywordClusters";
import type { SearchIntent } from "@/lib/searchIntent";
import { abs } from "@/lib/seo";

export type SeoPriority = "P0" | "P1" | "P2" | "P3";

export interface SeoRecord {
  path: string;
  pageType: PageKind | "listing" | "editorialHub" | "tool" | "legal" | "home";
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  canonicalUrl: string;
  seoTitle: string;
  metaDescription: string;
  indexable: boolean;
  schemaType: string[];
  parentPage?: string;
  childPages: string[];
  internalLinks: string[];
  contentCluster: string;
  priority: SeoPriority;
}

const clamp = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 3).trimEnd()}…`);

/* ------------------------------ page builders ----------------------------- */

export function universityHubSeo(slug: string): SeoRecord | null {
  const u = getUniversity(slug);
  if (!u) return null;
  const offers = listOfferingsByUniversity(slug);
  const path = `/universities/${slug}`;
  return {
    path,
    pageType: "universityHub",
    primaryKeyword: `${u.shortName} online`,
    secondaryKeywords: ownedUniversityKeywords(slug, 6),
    searchIntent: "commercial",
    canonicalUrl: abs(path),
    seoTitle: `${u.name} Online 2026: Approvals, Programmes, Fee Range & Admission`,
    metaDescription: clamp(
      `${u.name} online degrees — ${offers.length} programmes, ${u.feeRangeLabel} published fee range, UGC-DEB status, admission steps and learner support, verified against official sources.`,
    ),
    indexable: true,
    schemaType: ["CollegeOrUniversity", "BreadcrumbList", "WebPage"],
    parentPage: "/universities",
    childPages: offers.map((o) => `${path}/courses/${o.programmeSlug}`),
    internalLinks: [
      "/universities",
      ...offers.slice(0, 6).map((o) => `${path}/courses/${o.programmeSlug}`),
      ...universityPairs()
        .filter((pr) => pr.left.record.slug === slug || pr.right.record.slug === slug)
        .slice(0, 3)
        .map((pr) => pr.path),
    ],
    contentCluster: `university:${slug}`,
    priority: "P1",
  };
}

export function universityCourseSeo(universitySlug: string, programmeSlug: string): SeoRecord | null {
  const u = getUniversity(universitySlug);
  const p = getProgramme(programmeSlug);
  const offer = getOffering(universitySlug, programmeSlug);
  const meta = offeringCtrMeta(universitySlug, programmeSlug);
  if (!u || !p || !offer || !meta) return null;
  const path = `/universities/${universitySlug}/courses/${programmeSlug}`;
  return {
    path,
    pageType: "universityCourse",
    primaryKeyword: `${u.shortName} ${p.name}`,
    secondaryKeywords: meta.keywords.slice(1),
    searchIntent: "transactional",
    canonicalUrl: abs(path),
    seoTitle: meta.title,
    metaDescription: meta.description,
    indexable: true,
    schemaType: ["Course", "BreadcrumbList", "FAQPage?"],
    parentPage: `/universities/${universitySlug}`,
    childPages: [],
    internalLinks: [
      `/universities/${universitySlug}`,
      `/courses/${canonicalProgrammeSlug(programmeSlug)}`,
      ...articles.slice(0, 2).map((a) => `/blogs/${a.slug}`),
    ],
    contentCluster: `course:${canonicalProgrammeSlug(programmeSlug)}`,
    priority: "P1",
  };
}

export function coursePillarSeo(programmeSlug: string): SeoRecord | null {
  const p = getProgramme(programmeSlug);
  const meta = pillarCtrMeta(programmeSlug);
  if (!p || !meta) return null;
  const canonicalSlug = canonicalProgrammeSlug(programmeSlug);
  const isCanonical = canonicalSlug === programmeSlug;
  const path = `/courses/${programmeSlug}`;
  const offers = listOfferingsByProgramme(programmeSlug);
  return {
    path,
    pageType: "coursePillar",
    primaryKeyword: p.name.toLowerCase(),
    secondaryKeywords: ownedCourseKeywords(programmeSlug, "coursePillar", 8),
    searchIntent: "informational",
    // A duplicate programme slug points its canonical at the shortest slug.
    canonicalUrl: abs(`/courses/${canonicalSlug}`),
    seoTitle: meta.title,
    metaDescription: meta.description,
    indexable: isCanonical,
    schemaType: ["Course", "BreadcrumbList", "ItemList"],
    parentPage: "/courses",
    childPages: [
      ...listSpecialisations(programmeSlug).map((s) => `${path}/specialisation/${s.slug}`),
      ...offers.map((o) => `/universities/${o.universitySlug}/courses/${programmeSlug}`),
    ],
    internalLinks: [
      "/courses",
      ...offers.slice(0, 8).map((o) => `/universities/${o.universitySlug}/courses/${programmeSlug}`),
      `/compare/${canonicalSlug}`,
    ],
    contentCluster: `course:${canonicalSlug}`,
    priority: "P1",
  };
}

export function specialisationSeo(programmeSlug: string, specSlug: string): SeoRecord | null {
  const p = getProgramme(programmeSlug);
  const spec = listSpecialisations(programmeSlug).find((s) => s.slug === specSlug);
  if (!p || !spec) return null;
  const path = `/courses/${programmeSlug}/specialisation/${specSlug}`;
  return {
    path,
    pageType: "specialisation",
    primaryKeyword: `${p.name} in ${spec.name}`.toLowerCase(),
    secondaryKeywords: [`${spec.name} specialisation subjects`, `${spec.name} career scope`],
    searchIntent: "commercial",
    canonicalUrl: abs(path),
    seoTitle: `${p.name} in ${spec.name} 2026: Subjects, Scope & Career Paths`,
    metaDescription: clamp(
      `${spec.name} as a ${p.name} specialisation — elective subjects, the roles it maps to, who it suits and which universities publish it.`,
    ),
    indexable: true,
    schemaType: ["Course", "BreadcrumbList"],
    parentPage: `/courses/${programmeSlug}`,
    childPages: [],
    internalLinks: [`/courses/${programmeSlug}`, `/compare/${canonicalProgrammeSlug(programmeSlug)}`],
    contentCluster: `course:${canonicalProgrammeSlug(programmeSlug)}`,
    priority: "P2",
  };
}

export function comparisonSeo(pairPath: string, leftShort: string, rightShort: string): SeoRecord {
  const meta = comparisonCtrMeta(leftShort, rightShort);
  return {
    path: pairPath,
    pageType: "comparison",
    primaryKeyword: `${leftShort} vs ${rightShort}`.toLowerCase(),
    secondaryKeywords: meta.keywords.slice(1),
    searchIntent: "comparison",
    canonicalUrl: abs(pairPath),
    seoTitle: meta.title,
    metaDescription: meta.description,
    indexable: true,
    schemaType: ["BreadcrumbList", "WebPage", "FAQPage?"],
    parentPage: "/compare",
    childPages: [],
    internalLinks: ["/compare"],
    contentCluster: "comparison",
    priority: "P2",
  };
}

export function blogSeo(slug: string): SeoRecord | null {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return null;
  const path = `/blogs/${slug}`;
  return {
    path,
    pageType: "blog",
    primaryKeyword: a.title.toLowerCase(),
    secondaryKeywords: a.tags,
    searchIntent: "informational",
    canonicalUrl: abs(path),
    seoTitle: a.title,
    metaDescription: clamp(a.excerpt),
    indexable: true,
    schemaType: ["Article", "BreadcrumbList"],
    parentPage: "/blogs",
    childPages: [],
    internalLinks: ["/blogs", `/categories/${a.categorySlug}`, `/authors/${a.authorSlug}`],
    contentCluster: `editorial:${a.categorySlug}`,
    priority: "P2",
  };
}

/* -------------------------------- registry -------------------------------- */

/** Every indexable page as an SEO record — the input for the audit dashboard. */
export function siteSeoRecords(): SeoRecord[] {
  const out: SeoRecord[] = [];
  for (const u of universities) {
    const hub = universityHubSeo(u.slug);
    if (hub) out.push(hub);
    for (const o of listOfferingsByUniversity(u.slug)) {
      const rec = universityCourseSeo(u.slug, o.programmeSlug);
      if (rec) out.push(rec);
    }
  }
  for (const p of programmes) {
    const pillar = coursePillarSeo(p.slug);
    if (pillar) out.push(pillar);
    for (const s of listSpecialisations(p.slug)) {
      const rec = specialisationSeo(p.slug, s.slug);
      if (rec) out.push(rec);
    }
  }
  for (const pair of universityPairs()) {
    out.push(comparisonSeo(pair.path, pair.left.record.shortName, pair.right.record.shortName));
  }
  for (const a of articles) {
    const rec = blogSeo(a.slug);
    if (rec) out.push(rec);
  }
  return out;
}

/** Pages nothing links to — they never accumulate internal authority. */
export function orphanPages(records = siteSeoRecords()): string[] {
  const linked = new Set<string>();
  for (const r of records) for (const l of [...r.internalLinks, ...r.childPages]) linked.add(l);
  return records.filter((r) => r.indexable && !linked.has(r.path)).map((r) => r.path);
}
