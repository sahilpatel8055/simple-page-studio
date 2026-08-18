/**
 * Part 8 — content gap engine.
 *
 * For every important course + university combination it reports which of the
 * 22 decision topics students search for are actually backed by data in this
 * project. It never invents facts: a topic is "covered" only when a real
 * dataset field carries a value, so the audit output is the authoritative list
 * of what still needs research.
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
import { getCourseMaster, getUniversityCourse } from "@/lib/courseMaster";
import { getCourseInfo, getUniversityInfo } from "@/lib/insightsData";
import { articles } from "@/lib/content";

export const AUDIT_TOPICS = [
  "fees",
  "eligibility",
  "admission",
  "duration",
  "syllabus",
  "subjects",
  "specialisations",
  "scholarships",
  "examination",
  "learningModel",
  "placement",
  "career",
  "salary",
  "recruiters",
  "internships",
  "projects",
  "studentSupport",
  "prosCons",
  "whoShouldChoose",
  "whoShouldAvoid",
  "comparison",
  "faqs",
] as const;

export type AuditTopic = (typeof AUDIT_TOPICS)[number];

export interface TopicCoverage {
  topic: AuditTopic;
  covered: boolean;
  /** Where the value comes from — empty when the topic is a gap. */
  source: string;
}

export interface GapReport {
  path: string;
  label: string;
  pageType: "universityCourse" | "coursePillar";
  coverage: TopicCoverage[];
  gaps: AuditTopic[];
  coveredCount: number;
  score: number;
}

const has = (v: unknown): boolean =>
  Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim().length > 0 : v !== null && v !== undefined;

const cov = (topic: AuditTopic, value: unknown, source: string): TopicCoverage =>
  has(value) ? { topic, covered: true, source } : { topic, covered: false, source: "" };

/** Topic-by-topic audit of one university × course page. */
export function offeringGapReport(universitySlug: string, programmeSlug: string): GapReport | null {
  const u = getUniversity(universitySlug);
  const p = getProgramme(programmeSlug);
  const offer = getOffering(universitySlug, programmeSlug);
  if (!u || !p || !offer) return null;

  const master = getUniversityCourse(universitySlug, programmeSlug);
  const course = getCourseMaster(programmeSlug);
  const info = getCourseInfo(universitySlug, programmeSlug);
  const uniInfo = getUniversityInfo(universitySlug);
  const specs = offer.specialisations.length ? offer.specialisations : listSpecialisations(programmeSlug).map((s) => s.slug);

  const coverage: TopicCoverage[] = [
    cov("fees", offer.fee.total ?? offer.fee.perSemester ?? offer.fee.perYear, "offerings.fee"),
    cov("eligibility", master.eligibility ?? p.eligibility, "research.eligibility / programme.eligibility"),
    cov("admission", u.admissionProcess, "university.admissionProcess"),
    cov("duration", offer.durationLabel || course?.duration, "offerings.durationLabel"),
    cov("syllabus", course?.semesters, "curriculum.semesters"),
    cov("subjects", course?.semesters?.flatMap((s) => s.subjects), "curriculum.semesters[].subjects"),
    cov("specialisations", specs, "offerings.specialisations"),
    cov("scholarships", master.scholarships ?? master.scholarshipNote, "research.scholarships"),
    cov("examination", master.examPattern ?? u.examPattern, "research.examPattern"),
    cov("learningModel", info?.exam_pattern?.course_specific_override?.mode ?? uniInfo?.exam?.mode, "insights.exam.mode (delivery)"),
    cov("placement", offer.placement?.supportAvailable ? "yes" : offer.placement?.note, "offerings.placement"),
    cov("career", info?.career_opportunities?.roles ?? uniInfo?.career?.roles ?? p.whoIsItFor, "insights.career_opportunities"),
    cov("salary", offer.placement?.averagePackage ?? offer.placement?.highestPackage, "offerings.placement.packages"),
    cov("recruiters", offer.placement?.recruiters, "offerings.placement.recruiters"),
    cov("internships", undefined, "needs official internship/industry-project page"),
    cov("projects", undefined, "needs official capstone/project documentation"),
    cov("studentSupport", uniInfo?.admission?.mode, "needs official learner-support page"),
    cov("prosCons", u.pros.length && u.cons.length ? "yes" : "", "university.pros/cons"),
    cov("whoShouldChoose", p.whoIsItFor, "programme.whoIsItFor"),
    cov("whoShouldAvoid", u.cons, "university.cons"),
    cov("comparison", listOfferingsByProgramme(programmeSlug).length > 1 ? "yes" : "", "comparison engine"),
    cov("faqs", articles.filter((a) => a.tags.some((t) => t.toLowerCase().includes(p.shortName.toLowerCase()))), "editorial cluster"),
  ];

  return finalise({
    path: `/universities/${universitySlug}/courses/${programmeSlug}`,
    label: `${u.shortName} ${p.name}`,
    pageType: "universityCourse",
    coverage,
  });
}

/** Topic-by-topic audit of one course pillar page. */
export function pillarGapReport(programmeSlug: string): GapReport | null {
  const p = getProgramme(programmeSlug);
  if (!p) return null;
  const offers = listOfferingsByProgramme(programmeSlug);
  const course = getCourseMaster(programmeSlug);
  const specs = listSpecialisations(programmeSlug);
  const related = articles.filter((a) => a.tags.some((t) => t.toLowerCase().includes(p.shortName.toLowerCase())));

  const coverage: TopicCoverage[] = [
    cov("fees", offers.filter((o) => o.fee.total).length ? "yes" : "", "offerings fee spread"),
    cov("eligibility", p.eligibility, "programme.eligibility"),
    cov("admission", offers.some((o) => getUniversity(o.universitySlug)?.admissionProcess.length) ? "yes" : "", "university.admissionProcess"),
    cov("duration", p.durationYears ? String(p.durationYears) : "", "programme.durationYears"),
    cov("syllabus", course?.semesters, "curriculum.semesters"),
    cov("subjects", course?.semesters?.flatMap((s) => s.subjects), "curriculum subjects"),
    cov("specialisations", specs, "specialisations dataset"),
    cov("scholarships", offers.map((o) => o.universitySlug).filter((s) => getUniversityCourse(s, programmeSlug).scholarships), "research.scholarships"),
    cov("examination", offers.map((o) => o.universitySlug).filter((s) => getUniversityCourse(s, programmeSlug).examPattern), "research.examPattern"),
    cov("learningModel", offers.map((o) => getCourseInfo(o.universitySlug, programmeSlug)?.learningModel).filter(Boolean), "insights.learningModel"),
    cov("placement", offers.filter((o) => o.placement).length ? "yes" : "", "offerings.placement"),
    cov("career", specs.flatMap((s) => s.careerPaths), "specialisation.careerPaths"),
    cov("salary", offers.map((o) => o.placement?.averagePackage).filter(Boolean), "offerings.placement.packages"),
    cov("recruiters", offers.flatMap((o) => o.placement?.recruiters ?? []), "offerings.placement.recruiters"),
    cov("internships", offers.map((o) => getCourseInfo(o.universitySlug, programmeSlug)?.internships).filter(Boolean), "insights.internships"),
    cov("projects", offers.map((o) => getCourseInfo(o.universitySlug, programmeSlug)?.projects).filter(Boolean), "insights.projects"),
    cov("studentSupport", offers.map((o) => getCourseInfo(o.universitySlug, programmeSlug)?.studentSupport).filter(Boolean), "insights.studentSupport"),
    cov("prosCons", offers.filter((o) => getUniversity(o.universitySlug)?.pros.length).length ? "yes" : "", "university.pros/cons"),
    cov("whoShouldChoose", p.whoIsItFor, "programme.whoIsItFor"),
    cov("whoShouldAvoid", offers.flatMap((o) => getUniversity(o.universitySlug)?.cons ?? []), "university.cons"),
    cov("comparison", offers.length > 1 ? "yes" : "", "comparison engine"),
    cov("faqs", related, "editorial cluster"),
  ];

  return finalise({ path: `/courses/${programmeSlug}`, label: p.name, pageType: "coursePillar", coverage });
}

function finalise(r: Omit<GapReport, "gaps" | "coveredCount" | "score">): GapReport {
  const gaps = r.coverage.filter((c) => !c.covered).map((c) => c.topic);
  const coveredCount = r.coverage.length - gaps.length;
  return { ...r, gaps, coveredCount, score: Math.round((coveredCount / r.coverage.length) * 100) };
}

/** Every audited page, worst coverage first — the research backlog. */
export function siteGapReports(): GapReport[] {
  const reports: GapReport[] = [];
  for (const p of programmes) {
    const pillar = pillarGapReport(p.slug);
    if (pillar) reports.push(pillar);
  }
  for (const u of universities) {
    for (const o of listOfferingsByUniversity(u.slug)) {
      const r = offeringGapReport(u.slug, o.programmeSlug);
      if (r) reports.push(r);
    }
  }
  return reports.sort((a, b) => a.score - b.score);
}

/** How often each topic is missing across the whole site. */
export function topicGapFrequency(reports = siteGapReports()) {
  const counts = new Map<AuditTopic, number>();
  for (const r of reports) for (const g of r.gaps) counts.set(g, (counts.get(g) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([topic, missing]) => ({ topic, missing }));
}
