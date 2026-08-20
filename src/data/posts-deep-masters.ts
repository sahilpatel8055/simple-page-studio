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
function feeSection(
  family: string,
  heading = "University-wise fees, verified from our dataset",
): PostSection {
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

function eligibilitySection(
  family: string,
  heading = "Eligibility and duration, university by university",
): PostSection {
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

function specSection(
  family: string,
  heading = "Specialisations offered, per university",
): PostSection {
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
    sections: [
      specSection("online-mba"),
      feeSection("online-mba", "Fee by university for each MBA track"),
    ],
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
    sections: [
      {
        heading: "Who should pursue an online MCA?",
        blocks: [
          {
            kind: "p",
            text: "The online MCA pays off for people who already work with software and need the postgraduate qualification that their next role, promotion or government application demands. It is a credential-plus-depth degree, not a first entry route into coding.",
          },
          {
            kind: "list",
            items: [
              "Working IT professionals in support, testing or operations who need a PG degree to move into development, data or cloud engineering.",
              "BCA, B.Sc. (CS/IT) and B.Sc. (Maths) graduates who want a two-year PG without leaving their job or city.",
              "Candidates targeting government and PSU posts where MCA is a listed qualification for programmer, systems analyst and IT officer roles.",
              "Teachers and trainers who need a PG computing degree for eligibility at college or polytechnic level.",
              "Career switchers from non-IT streams who already study programming on their own and want a recognised structure around it.",
            ],
          },
        ],
      },
      {
        heading: "Who should think carefully before choosing it?",
        blocks: [
          {
            kind: "p",
            text: "An honest filter saves two years and a fee. The online mode removes the campus, the daily lab supervision and the placement drive — if any of those are the reason you are enrolling, reconsider.",
          },
          {
            kind: "list",
            items: [
              "Absolute beginners with no coding exposure: self-paced video lectures rarely build the first-year fundamentals on their own.",
              "Anyone expecting a campus placement drive — online cohorts get portals, resume support and virtual drives, not guaranteed on-campus recruitment.",
              "Candidates applying for roles or foreign study routes that specifically demand a full-time, on-campus attendance record.",
              "Learners who cannot protect eight to ten study hours a week alongside work — the fourth semester project is the usual casualty.",
              "Anyone choosing a university that is not DEB-listed for online MCA in the joining session, however attractive the fee looks.",
            ],
          },
          {
            kind: "note",
            text: "If two or more of these describe you, a part-time or weekend on-campus MCA, or a PG diploma followed by lateral entry, is usually the better route.",
          },
        ],
      },
      eligibilitySection("online-mca"),
      {
        heading: "Online MCA admission: documents checklist",
        blocks: [
          {
            kind: "table",
            caption: "Documents commonly required at the application stage",
            head: ["Document", "Accepted form", "Why it is asked"],
            rows: [
              ["Class 10 marksheet", "Scanned PDF or JPG", "Date of birth and name verification"],
              ["Class 12 marksheet", "Scanned PDF or JPG", "Mathematics eligibility check"],
              [
                "Graduation marksheets, all years",
                "Scanned PDF",
                "Aggregate percentage calculation",
              ],
              ["Degree or provisional certificate", "Scanned PDF", "Proof of programme completion"],
              [
                "Photo ID (Aadhaar / passport)",
                "Scanned PDF or JPG",
                "Identity and address record",
              ],
              [
                "Passport-size photograph",
                "JPG, white background",
                "ID card and examination records",
              ],
              ["Signature scan", "JPG", "Examination and result verification"],
              [
                "Category certificate, if applicable",
                "Scanned PDF",
                "Fee concession and mark relaxation",
              ],
              [
                "Work-experience letter, if claimed",
                "Scanned PDF on letterhead",
                "Waivers and lateral consideration",
              ],
            ],
          },
          {
            kind: "note",
            text: "Keep every scan under the size limit stated on the portal, in the same name spelling as your Class 10 certificate. Mismatched names are the single most common cause of a held-up admission.",
          },
        ],
      },
      feeSection("online-mca"),
      {
        heading: "Online MCA syllabus: what you may study",
        blocks: [
          {
            kind: "p",
            text: "Curricula differ by university, but the four-semester spine is consistent: foundations first, systems and data next, then electives and a capstone project that is assessed and carries credit.",
          },
          {
            kind: "table",
            caption: "Indicative semester-wise structure",
            head: ["Semester", "Core subjects", "Practical work"],
            rows: [
              [
                "Semester 1",
                "Programming in C/Python, discrete mathematics, computer organisation, database systems",
                "Programming and DBMS lab",
              ],
              [
                "Semester 2",
                "Data structures and algorithms, operating systems, object-oriented programming (Java), software engineering",
                "DSA and Java lab, mini project",
              ],
              [
                "Semester 3",
                "Computer networks, web technologies, cloud computing, elective I (AI/ML, data science, cyber security)",
                "Full-stack or cloud lab, elective lab",
              ],
              [
                "Semester 4",
                "Elective II, research methodology or IT project management",
                "Major project and viva",
              ],
            ],
          },
          specSection("online-mca").blocks[0]!,
        ],
      },
      {
        heading: "Career roadmap after online MCA",
        blocks: [
          {
            kind: "p",
            text: "Treat the two years as a staged roadmap rather than a wait for the degree certificate. Employers hire on demonstrated work; the MCA makes you eligible, the portfolio makes you shortlisted.",
          },
          {
            kind: "list",
            ordered: true,
            items: [
              "Months 0-6: lock the fundamentals — one language, SQL and Git. Push every lab assignment to a public repository.",
              "Months 6-12: build two working applications end to end and start reading production codebases at your current workplace.",
              "Months 12-18: pick the elective track you want to be hired into and add one industry certification (cloud, data or security) alongside it.",
              "Months 18-24: turn the capstone into a portfolio project with a live deployment, then start applying three months before the final result.",
              "Post-degree: target internal movement first — an internal switch with an MCA on record is the fastest route out of a support role.",
            ],
          },
        ],
      },
      {
        heading: "Salary after online MCA",
        blocks: [
          {
            kind: "chart",
            title: "Indicative annual salary by experience level, Indian IT market",
            unit: "₹ lakh per annum (LPA), typical range midpoint",
            data: [
              { label: "Fresher, 0-1 year", value: 4, display: "₹3-5 LPA" },
              { label: "1-3 years", value: 6.5, display: "₹5-8 LPA" },
              { label: "3-5 years", value: 10, display: "₹8-12 LPA" },
              { label: "5-8 years", value: 16, display: "₹12-20 LPA" },
              { label: "Specialised (AI/ML, cloud, security)", value: 20, display: "₹15-25 LPA+" },
            ],
            note: "Indicative market bands, not a university placement claim. Pay is driven by skill demonstration, city and specialisation — the mode of study is not a separate pay grade.",
          },
          {
            kind: "note",
            text: "Salary rises fastest where the elective track matches a scarce skill. A working professional who completes the MCA while shipping production work usually re-enters the market a band above a fresher.",
          },
        ],
      },
      {
        heading: "Career opportunities after online MCA",
        blocks: [
          {
            kind: "table",
            caption: "Common roles, the skills they test and the entry band",
            head: ["Role", "Core skills tested", "Typical entry pay"],
            rows: [
              ["Software developer", "DSA, one backend language, Git, REST APIs", "₹4-7 LPA"],
              [
                "Full-stack developer",
                "React or Angular with Node/Java, databases, deployment",
                "₹5-9 LPA",
              ],
              ["Data analyst", "SQL, Python, statistics, Power BI or Tableau", "₹4-8 LPA"],
              ["Cloud / DevOps engineer", "AWS or Azure, Linux, CI/CD, containers", "₹6-12 LPA"],
              [
                "Cyber security analyst",
                "Networking, SIEM tools, vulnerability assessment",
                "₹5-10 LPA",
              ],
              [
                "Systems / business analyst",
                "Requirement analysis, SQL, process documentation",
                "₹5-9 LPA",
              ],
              [
                "Government IT officer / programmer",
                "MCA eligibility plus written examination",
                "Pay-level based",
              ],
            ],
          },
          {
            kind: "p",
            text: "Sectors hiring consistently: IT services and product companies, banking and fintech, healthcare technology, e-commerce, ed-tech, government departments and public-sector undertakings.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can a non-computer-science graduate join an online MCA?",
        answer:
          "Yes at most universities, provided you studied mathematics at Class 12 or graduation level. Several universities run a bridge course in the first semester instead of refusing the application — check the eligibility table above for the exact wording.",
      },
      {
        question: "What salary can I expect after an online MCA?",
        answer:
          "Freshers typically enter at ₹3-5 LPA and experienced professionals re-enter at ₹8-20 LPA depending on the elective track and the work they can demonstrate. The online mode itself is not a separate pay grade — the portfolio and specialisation decide the band.",
      },
      {
        question: "Which documents do I need ready before applying?",
        answer:
          "Class 10 and 12 marksheets, all graduation marksheets, the degree or provisional certificate, a photo ID, a passport photograph, a signature scan, and category or work-experience proof if you are claiming a relaxation. Keep the name spelling identical across all of them.",
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
    sections: [
      eligibilitySection("online-bba"),
      feeSection("online-bba"),
      specSection("online-bba"),
    ],
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
    sections: [
      eligibilitySection("online-bca"),
      feeSection("online-bca"),
      specSection("online-bca"),
    ],
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
    sections: [
      eligibilitySection("online-bcom"),
      feeSection("online-bcom"),
      specSection("online-bcom"),
    ],
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
