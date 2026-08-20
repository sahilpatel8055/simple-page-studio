/**
 * Deep-master blog blueprint.
 *
 * The seven long-form editorial masters uploaded under `src/data/blogs data/`
 * are extracted verbatim into `blog-masters/deep-masters.json` (headings,
 * paragraphs, lists and tables). This module turns that JSON into the site's
 * `PostContent` shape and applies one consistent blueprint to every guide:
 *
 *  1. the document's own sections, in the author's sequence (drives the TOC);
 *  2. a "University-wise fees" section built from the same dataset that powers
 *     `/courses/{family}` — never a hand-typed fee;
 *  3. enquiry CTAs placed between sections (early, mid and before the close);
 *  4. the document's FAQs.
 */
import type { PostBlock, PostContent, PostSection } from "./posts";
import master from "./blog-masters/deep-masters.json";
import {
  familyEligibilityTable,
  familyExtrasTable,
  familyFeeRangeSentence,
  familyFeeTable,
} from "@/lib/blogFeeTables";

type RawSection = { heading: string; blocks: PostBlock[] };
type RawDoc = {
  family?: string | null;
  intro?: string;
  sections: RawSection[];
  faqs: { question: string; answer: string }[];
};

const docs = master as unknown as Record<string, RawDoc>;

const isFeeHeading = (h: string) => /\bfees?\b/i.test(h) && !/comparison checklist/i.test(h);

/** University-wise fee tables, read live from the course-pillar dataset. */
function feeBlocks(family: string): PostBlock[] {
  const sentence = familyFeeRangeSentence(family);
  const blocks: PostBlock[] = [];
  if (sentence) blocks.push({ kind: "p", text: sentence });
  blocks.push(familyFeeTable(family, "University-wise fees for this programme (2026-27 session)"));
  blocks.push(familyExtrasTable(family));
  blocks.push({
    kind: "note",
    text: "Every figure above is transcribed from the university's own published fee record and re-checked on the date shown. Where a university shares a number only with applicants, the cell reads “Shared by the university” instead of an estimate.",
  });
  return blocks;
}

const cta = (title: string, body: string): PostBlock => ({
  kind: "cta",
  title,
  body,
  buttonLabel: "Get a free fee & eligibility check",
});

/** Build the blueprint for one guide. */
function build(slug: string, base: PostContent): PostContent {
  const doc = docs[slug];
  if (!doc) return base;

  const sections: PostSection[] = doc.sections.map((s) => ({
    heading: s.heading,
    blocks: [...s.blocks],
  }));

  // 1. Fee section — append the dataset tables to the document's fee section,
  //    or add a dedicated one just before the closing sections.
  if (doc.family) {
    const idx = sections.findIndex((s) => isFeeHeading(s.heading));
    if (idx >= 0) {
      sections[idx] = {
        heading: sections[idx]!.heading,
        blocks: [...sections[idx]!.blocks, ...feeBlocks(doc.family)],
      };
    } else {
      sections.splice(Math.max(1, sections.length - 2), 0, {
        heading: "University-wise fees",
        blocks: feeBlocks(doc.family),
      });
    }
    const eIdx = sections.findIndex((s) => /eligibilit/i.test(s.heading));
    if (eIdx >= 0) {
      sections[eIdx] = {
        heading: sections[eIdx]!.heading,
        blocks: [...sections[eIdx]!.blocks, familyEligibilityTable(doc.family)],
      };
    }
  }

  // 2. Enquiry CTAs between sections.
  const spots = [
    Math.min(2, sections.length - 1),
    Math.floor(sections.length / 2),
    Math.max(0, sections.length - 2),
  ];
  const copy: [string, string][] = [
    [
      "Not sure which university fits you?",
      "Share your details and a counsellor will send verified fees, eligibility and the current admission window.",
    ],
    [
      "Want a shortlist built around your budget?",
      "We compare researched fee records across universities and send you the two or three that match.",
    ],
    [
      "Ready to apply for the 2026 session?",
      "Get document help, scholarship options and admission deadlines for the programmes you shortlist.",
    ],
  ];
  spots.forEach((pos, i) => {
    const s = sections[pos];
    const line = copy[i];
    if (!s || !line) return;
    if (s.blocks.some((b) => b.kind === "cta")) return;
    s.blocks = [...s.blocks, cta(line[0], line[1])];
  });

  return {
    ...base,
    intro: doc.intro || base.intro,
    sections,
    faqs: doc.faqs.length ? doc.faqs : base.faqs,
  };
}

/** Apply the blueprint to every guide that has an uploaded master document. */
export function applyDeepMasters(
  content: Record<string, PostContent>,
): Record<string, PostContent> {
  const out = { ...content };
  for (const slug of Object.keys(docs)) {
    const base = out[slug];
    if (base) out[slug] = build(slug, base);
  }
  return out;
}
