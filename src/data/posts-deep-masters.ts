/**
 * Deep master layer for the eight course-family guides.
 *
 * Each entry takes the base guide from `posts-course-guides.ts` and deepens it
 * with dataset-driven tables (fees, extras, eligibility, specialisations) built
 * by `src/lib/blogFeeTables.ts`, plus the extra sections and FAQs carried over
 * from the research documents. Nothing here restates a fee by hand — every
 * number is read from the same records that power `/courses/{family}`, so a
 * blog table can never drift from its pillar page. Missing values stay labelled.
 */
import type { PostContent, PostSection } from "./posts";
import { courseGuidePosts } from "./posts-course-guides";
import {
  familyEligibilityTable,
  familyExtrasTable,
  familyFeeRangeSentence,
  familyFeeTable,
  familySpecialisationTable,
} from "@/lib/blogFeeTables";

type Faq = { question: string; answer: string };

/** Append deepening sections + FAQs to a base guide without losing its body. */
function deepen(
  slug: string,
  extra: { sections: PostSection[]; faqs?: Faq[]; insertAfter?: string },
): PostContent {
  const bases = courseGuidePosts[slug];
  if (!bases) throw new Error(`Unknown course guide: ${slug}`);
  const idx = extra.insertAfter
    ? bases.sections.findIndex((s) => s.heading === extra.insertAfter)
    : -1;
  const sections =
    idx >= 0
      ? [...bases.sections.slice(0, idx + 1), ...extra.sections, ...bases.sections.slice(idx + 1)]
      : [...bases.sections, ...extra.sections];
  return { ...bases, sections, faqs: [...bases.faqs, ...(extra.faqs ?? [])] };
}

/** Standard "what the dataset says" block set for a family. */
function feeSection(family: string, heading = "University-wise fees, verified from our dataset"): PostSection {
  const sentence = familyFeeRangeSentence(family);
  return {
    heading,
    blocks: [
      ...(sentence ? ([{ kind: "p", text: sentence }] as const) : []),
      familyFeeTable(family),
      familyExtrasTable(family),
      {
        kind: "note",
        text: "Figures are transcribed from each university's published fee record and re-checked on the date shown. Where a university shares a number only with applicants, the cell reads “Shared by the university” rather than an estimate.",
      },
    ],
  };
}

function eligibilitySection(family: string, heading = "Eligibility and duration, university by university"): PostSection {
  return {
    heading,
    blocks: [
      familyEligibilityTable(family),
      {
        kind: "note",
        text: "Reserved-category relaxation, bridge routes for diploma holders and work-experience waivers are decided by each admission cell — confirm in writing before you pay.",
      },
    ],
  };
}

function specSection(family: string, heading = "Specialisations offered, per university"): PostSection {
  return {
    heading,
    blocks: [
      familySpecialisationTable(family),
      {
        kind: "p",
        text: "Specialisation availability changes each session. Treat the count as the width of choice on offer, and confirm your exact track is open for the session you are joining.",
      },
    ],
  };
}

const REG_FAQ: Faq = {
  question: "How do I confirm the university is entitled for this programme?",
  answer:
    "Search the university on the UGC Distance Education Bureau portal, open its entitlement record for the current session, and confirm your exact programme and mode are listed. An aggregator listing — including ours — is a research aid, not proof.",
};

export const deepMasterPosts: Record<string, PostContent> = {
  "online-mba-fees-2026": deepen("online-mba-fees-2026", {
    insertAfter: "Fee bands across university types",
    sections: [feeSection("online-mba"), eligibilitySection("online-mba")],
    faqs: [
      {
        question: "Is the fee shown here the full cost of an online MBA?",
        answer:
          "The total programme fee covers tuition. Registration, examination and convocation charges are billed separately where the university publishes them — those are listed in the extras table above.",
      },
      REG_FAQ,
    ],
  }),

  "online-mba-specialisations-guide": deepen("online-mba-specialisations-guide", {
    insertAfter: "The tracks you will actually find",
    sections: [specSection("online-mba"), feeSection("online-mba", "Fee by university for each MBA track")],
    faqs: [
      {
        question: "Does the specialisation change the fee?",
        answer:
          "At almost every university the fee is set for the MBA itself, not the track. Where a track carries an industry certification or an extra module, the university states the difference separately at admission.",
      },
    ],
  }),

  "online-mca-guide-2026": deepen("online-mca-guide-2026", {
    insertAfter: "Eligibility and admission",
    sections: [eligibilitySection("online-mca"), feeSection("online-mca"), specSection("online-mca")],
    faqs: [
      {
        question: "Can a non-computer-science graduate join an online MCA?",
        answer:
          "Yes at most universities, provided you studied mathematics at Class 12 or graduation level. Several universities run a bridge course in the first semester instead of refusing the application — check the eligibility table above for the exact wording.",
      },
      REG_FAQ,
    ],
  }),

  "online-mca-vs-mtech-vs-pgdca": deepen("online-mca-vs-mtech-vs-pgdca", {
    insertAfter: "Time and cost trade-off",
    sections: [feeSection("online-mca", "What the online MCA actually costs across universities")],
    faqs: [
      {
        question: "Is an online M.Tech available in the same way?",
        answer:
          "No. M.Tech carries a mandatory laboratory component and sits outside online-mode entitlement, so the realistic online choice is between MCA and a PG diploma.",
      },
    ],
  }),

  "online-bba-admission-guide": deepen("online-bba-admission-guide", {
    insertAfter: "Step-by-step admission",
    sections: [eligibilitySection("online-bba"), feeSection("online-bba"), specSection("online-bba")],
    faqs: [
      {
        question: "Do I need an entrance test for an online BBA?",
        answer:
          "No national entrance test applies. Admission is on Class 12 marks; a few universities run a short internal proficiency check, which the admission cell tells you about before the fee payment stage.",
      },
      REG_FAQ,
    ],
  }),

  "online-bba-vs-bcom": deepen("online-bba-vs-bcom", {
    insertAfter: "Curriculum difference in one table",
    sections: [
      feeSection("online-bba", "Online BBA fees across universities"),
      feeSection("online-bcom", "Online B.Com fees across universities"),
    ],
    faqs: [
      {
        question: "Which of the two is cheaper?",
        answer:
          "B.Com is usually the lower-cost route at the same university, but the gap narrows at private universities where both run on the same fee grid. Compare the two tables above for the universities on your shortlist.",
      },
    ],
  }),

  "online-bca-career-guide": deepen("online-bca-career-guide", {
    insertAfter: "The three-year arc",
    sections: [eligibilitySection("online-bca"), feeSection("online-bca"), specSection("online-bca")],
    faqs: [
      {
        question: "Is an online BCA accepted for an MCA admission later?",
        answer:
          "Yes, when the BCA is from a UGC-entitled university and the programme was listed for your session. The degree carries the same standing as its on-campus equivalent under the 2020 equivalence notification.",
      },
      REG_FAQ,
    ],
  }),

  "online-bcom-guide-2026": deepen("online-bcom-guide-2026", {
    insertAfter: "Programme structure",
    sections: [eligibilitySection("online-bcom"), feeSection("online-bcom"), specSection("online-bcom")],
    faqs: [
      {
        question: "Can I study for CA or CS alongside an online B.Com?",
        answer:
          "That is the most common reason learners choose the online route — attendance is asynchronous, so the professional-exam calendar stays clear. Confirm the university's examination window does not clash with your attempt month.",
      },
      REG_FAQ,
    ],
  }),
};
