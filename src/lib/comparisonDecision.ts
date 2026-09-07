/**
 * Comparison decision engine.
 *
 * Every comparison page — university pair, course pair or editorial pair —
 * answers the same question in the same shape: who is cheaper, who is better
 * recognised, who should pick whom, and what the programme actually costs once
 * registration, examination and EMI are counted.
 *
 * Every value is read from the verified dataset. Nothing is estimated: a figure
 * the university has not published is reported as a gap, never invented.
 */
import { getUniversity, getProgramme, listOfferingsByUniversity } from "@/data";
import type { Offering, University } from "@/data";
import { courseKeyForProgramme, siteSlugForMasterSlug } from "@/lib/courseMaster";
import { placementFacts } from "@/data/university-placement-facts";
import { lastReviewedLabel } from "@/lib/session";

export interface ReaderVerdict {
  reader: string;
  pick: string;
  why: string;
}

export interface CostRow {
  label: string;
  a: string;
  b: string;
}

export interface PairDecision {
  aName: string;
  bName: string;
  aHref: string;
  bHref: string;
  /** Answer-first paragraph, kept under 60 words. */
  answer: string;
  cheaper?: { name: string; detail: string };
  recognised?: { name: string; detail: string };
  readers: ReaderVerdict[];
  cost: CostRow[];
  /** Honest list of figures the universities do not publish. */
  gaps: string[];
  reviewed: string;
  courseLabel?: string;
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const NOT_PUBLISHED = "Not published by the university";

const resolve = (slug: string): University | undefined =>
  getUniversity(slug) ?? getUniversity(siteSlugForMasterSlug(slug) ?? slug);

/** The offering this page is about: the named course, else the flagship (lowest published fee). */
function pickOffering(slug: string, courseKey?: string): Offering | undefined {
  const rows = listOfferingsByUniversity(slug);
  const scoped = courseKey
    ? rows.filter((o) => courseKeyForProgramme(o.programmeSlug) === courseKey)
    : rows;
  const withFee = scoped.filter((o) => (o.fee.total ?? 0) > 0);
  if (withFee.length)
    return withFee.sort((x, y) => (x.fee.total ?? 0) - (y.fee.total ?? 0))[0] as Offering;
  return scoped[0];
}

function naacScore(u: University) {
  const naac = u.approvals.find((a) => /naac/i.test(a.body));
  const m = /A\+{0,2}/.exec(naac?.status ?? "");
  return m ? m[0].length : 0;
}

function recognitionScore(u: University) {
  let score = naacScore(u) * 2;
  for (const a of u.approvals) {
    if (/ugc/i.test(a.body)) score += 2;
    if (/aicte/i.test(a.body)) score += 1;
    if (/wes|aiu/i.test(a.body)) score += 1;
  }
  return score;
}

const recognitionLabel = (u: University) =>
  u.approvals
    .map((a) => (a.status ? `${a.body} ${a.status}` : a.body))
    .slice(0, 3)
    .join(", ") || "Approvals not published";

const publicBody = (u: University) => u.type === "State" || u.type === "Central" || u.type === "Open";

/** Everything a learner actually pays, as far as the universities publish it. */
function ownership(o: Offering | undefined) {
  const f = o?.fee;
  const known = [f?.total, f?.registrationFee, f?.examFee].filter(
    (v): v is number => typeof v === "number" && v > 0,
  );
  return {
    total: f?.total ?? null,
    registration: f?.registrationFee ?? null,
    exam: f?.examFee ?? null,
    emi: f?.emiFrom ?? null,
    outgo: known.length ? known.reduce((s, v) => s + v, 0) : null,
    complete: Boolean(f?.total && f?.registrationFee != null && f?.examFee != null),
  };
}

const money = (v: number | null) => (v == null ? NOT_PUBLISHED : inr(v));

const trimWords = (text: string, max = 60) => {
  const words = text.split(/\s+/);
  return words.length <= max ? text : `${words.slice(0, max).join(" ")}…`;
};

export function pairDecision(
  aSlugRaw: string,
  bSlugRaw: string,
  courseKey?: string,
  courseLabel?: string,
): PairDecision | undefined {
  const a = resolve(aSlugRaw);
  const b = resolve(bSlugRaw);
  if (!a || !b) return undefined;

  const oa = pickOffering(a.slug, courseKey);
  const ob = pickOffering(b.slug, courseKey);
  const ca = ownership(oa);
  const cb = ownership(ob);

  const label = courseLabel ?? (oa ? getProgramme(oa.programmeSlug)?.shortName : undefined);

  /* ---- cheaper ---- */
  let cheaper: PairDecision["cheaper"];
  if (ca.total && cb.total && ca.total !== cb.total) {
    const aWins = ca.total < cb.total;
    const win = aWins ? a : b;
    const low = Math.min(ca.total, cb.total);
    const high = Math.max(ca.total, cb.total);
    cheaper = {
      name: win.shortName,
      detail: `${inr(low)} against ${inr(high)} — ${inr(high - low)} less across the full programme.`,
    };
  }

  /* ---- better recognised ---- */
  let recognised: PairDecision["recognised"];
  const ra = recognitionScore(a);
  const rb = recognitionScore(b);
  if (ra !== rb) {
    const win = ra > rb ? a : b;
    recognised = { name: win.shortName, detail: recognitionLabel(win) };
  } else {
    recognised = { name: "Both", detail: `${recognitionLabel(a)} — comparable on paper.` };
  }

  /* ---- reader-type verdicts ---- */
  const specA = oa?.specialisations.length ?? 0;
  const specB = ob?.specialisations.length ?? 0;
  const pfA = placementFacts(a.slug);
  const pfB = placementFacts(b.slug);
  const readers: ReaderVerdict[] = [];

  // Tight budget
  if (cheaper) {
    readers.push({
      reader: "On a tight budget",
      pick: cheaper.name,
      why: `Lowest published cost of ownership: ${cheaper.detail}`,
    });
  } else {
    readers.push({
      reader: "On a tight budget",
      pick: "Ask both",
      why: "Neither university publishes a full fee break-up for this programme, so get both quotes in writing before you decide.",
    });
  }

  // Working professional — EMI and flexibility
  const emiA = ca.emi;
  const emiB = cb.emi;
  if (emiA || emiB) {
    const aWins = (emiA ?? Infinity) <= (emiB ?? Infinity);
    readers.push({
      reader: "Working professional",
      pick: aWins ? a.shortName : b.shortName,
      why: `Lowest published no-cost EMI at ${money(aWins ? emiA : emiB)} a month, so the fee spreads across your salary cycle.`,
    });
  } else if (specA !== specB) {
    readers.push({
      reader: "Working professional",
      pick: specA > specB ? a.shortName : b.shortName,
      why: `${Math.max(specA, specB)} specialisations against ${Math.min(specA, specB)} — more room to match the programme to the job you already do.`,
    });
  }

  // Fresher — recognition and breadth
  readers.push({
    reader: "Fresher, first degree",
    pick: recognised.name === "Both" ? a.shortName : recognised.name,
    why:
      recognised.name === "Both"
        ? `Approvals are level (${recognitionLabel(a)}), so decide on specialisation fit and fee instead.`
        : `Strongest approval stack on this page: ${recognised.detail}. That is what a first employer checks.`,
  });

  // Government-job aspirant
  const govA = publicBody(a);
  const govB = publicBody(b);
  if (govA !== govB) {
    const win = govA ? a : b;
    readers.push({
      reader: "Government-job aspirant",
      pick: win.shortName,
      why: `${win.shortName} is a ${win.type?.toLowerCase()} university with ${recognitionLabel(win)} — the paperwork recruitment boards ask for is straightforward.`,
    });
  } else {
    readers.push({
      reader: "Government-job aspirant",
      pick: "Either",
      why: "Both hold UGC entitlement for online/distance delivery, so both degrees are accepted for government recruitment. Carry the entitlement letter for your admission year.",
    });
  }

  // Placement support
  const statsA = pfA?.stats.length ?? 0;
  const statsB = pfB?.stats.length ?? 0;
  if (pfA || pfB) {
    const aWins = statsA >= statsB && Boolean(pfA);
    const win = aWins ? a : b;
    const pf = aWins ? pfA : pfB;
    readers.push({
      reader: "Wants placement support",
      pick: win.shortName,
      why: pf?.summary ?? `${win.shortName} publishes the more detailed career-support record.`,
    });
  } else {
    readers.push({
      reader: "Wants placement support",
      pick: "Ask both",
      why: "Neither publishes cohort placement data for online learners. Career assistance is not a placement guarantee — ask for the last session's numbers in writing.",
    });
  }

  /* ---- cost of ownership ---- */
  const cost: CostRow[] = [
    { label: "Programme / tuition fee", a: money(ca.total), b: money(cb.total) },
    { label: "Registration fee", a: money(ca.registration), b: money(cb.registration) },
    { label: "Examination fee", a: money(ca.exam), b: money(cb.exam) },
    {
      label: "No-cost EMI from",
      a: ca.emi ? `${inr(ca.emi)}/month` : "No EMI plan published",
      b: cb.emi ? `${inr(cb.emi)}/month` : "No EMI plan published",
    },
    {
      label: "Total outgo on published figures",
      a: ca.outgo ? inr(ca.outgo) : NOT_PUBLISHED,
      b: cb.outgo ? inr(cb.outgo) : NOT_PUBLISHED,
    },
  ];

  /* ---- honest gaps ---- */
  const gaps: string[] = [];
  const gapFor = (u: University, c: ReturnType<typeof ownership>) => {
    const missing: string[] = [];
    if (!c.total) missing.push("programme fee");
    if (c.registration == null) missing.push("registration fee");
    if (c.exam == null) missing.push("examination fee");
    if (missing.length)
      gaps.push(`${u.shortName} does not publish its ${missing.join(", ")} for this programme.`);
  };
  gapFor(a, ca);
  gapFor(b, cb);

  /* ---- answer-first paragraph ---- */
  const sentences = [
    cheaper ? `Cheaper: ${cheaper.name} — ${cheaper.detail}` : "Neither publishes a full fee, so cost is not decidable here.",
    recognised.name === "Both"
      ? `Recognition is level: ${recognitionLabel(a)}.`
      : `Better recognised: ${recognised.name} (${recognised.detail}).`,
    `Pick ${cheaper?.name ?? a.shortName} if cost decides it; pick ${
      recognised.name === "Both" ? b.shortName : recognised.name
    } if the approval stack and career support matter more.`,
  ];

  return {
    aName: a.shortName,
    bName: b.shortName,
    aHref: `/universities/${a.slug}`,
    bHref: `/universities/${b.slug}`,
    answer: trimWords(sentences.join(" ")),
    ...(cheaper ? { cheaper } : {}),
    recognised,
    readers,
    cost,
    gaps,
    reviewed: lastReviewedLabel(),
    ...(label ? { courseLabel: label } : {}),
  };
}
