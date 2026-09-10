# Honest answer + plan: can the course pillar pages rank?

## My read after today's work

Today's changes help reading experience and lead capture, but they do **not** yet
move the course pillar pages (`/courses/online-mba`, `/courses/online-bba`, …).
Everything added today landed on university pages and university-course pages.

What I checked in the project right now:

- The answer-first block and the "questions people actually ask" block exist only
  on university pages and university-course pages. The course pillar template has
  neither.
- The pillar page opens with a long "at a glance" parameter table, then a prose
  overview. There is no short, direct answer with a real fee number in the first
  40 words — which is exactly what the fee/admission queries the pillars appear
  for are asking.
- Fees sit in the second tab, so on a tabbed page the fee table is not in the
  first screen for a user who arrived on a "fees" query.
- The pillar pages already have section sub-URLs (fees, eligibility, admission,
  syllabus, specialisations, exam pattern, placement, scholarships, FAQ), which is
  the right structure — but the parent pillar itself is the weakest page in the silo.

So: pillars will not climb on today's work alone. They will climb on the four
changes below, which are the same pattern that pulled the university pages up.

## What to build next (in order)

### 1. Answer-first block on every course pillar
A 40-60 word direct answer at the very top: what the course is, the real fee
range with numbers, duration, how many universities, and whether the degree is
UGC-entitled. Plus the four-fact strip (fee, eligibility, duration, universities)
and a visible "verified on" date. Same component already used on university pages.

### 2. Fee answer above the fold
Move a compact top-fee table (5-6 universities, total fee, EMI from) into the
Overview tab, directly under the answer block, with a link into the full fees
tab. The full fee table stays where it is.

### 3. Question block with real data
6 questions per pillar drawn from the dataset, not invented: is it valid for
government jobs, total two-year fee, cheapest UGC-entitled option, placement
and salary, EMI/scholarship, exam mode. Rendered as visible text plus matching
FAQ schema, so it can win the question snippets the pillars currently miss.

### 4. Links pointing upward
Every university-course page ("Online MBA at X") gets a clear link back to its
pillar. Right now the linking runs mostly downward, so the pillar collects no
internal strength from the 250+ pages beneath it.

### 5. Distinct intent per pillar title
One primary intent per pillar title and description — fee-led for the courses
whose queries are fee-shaped (MBA, BA, BCom), admission-led for the rest —
instead of the same "Universities, Fee Range & How to Choose" pattern on all nine.

## Realistic expectation

- Weeks 1-2 after publishing: the pillars get recrawled, and the ones stuck at
  "Discovered – not indexed" (Online BBA) should index.
- Weeks 3-6: movement from position 40-60 into the 20s on fee and admission
  phrases, because those pages will finally answer the query in the first screen.
- Head terms like "online mba" stay out of reach until the site has more authority;
  the money is in the long-tail fee/eligibility/university phrases, and that is
  what this plan targets.

## Technical notes

- Reuse `src/components/university/AnswerFirst.tsx` and
  `src/components/common/QuestionBlock.tsx`; extend `src/lib/pageVerdict.ts`
  with a course-family verdict and question generator sourced from
  `src/data/course-pages/*` and the offerings dataset — no invented facts.
- Wire the blocks into `src/components/templates/CoursePageTemplate.tsx`
  (Overview panel, before the glance table) and into the head/FAQ schema in
  `src/routes/courses.$course.index.tsx`.
- Compact fee table: new small component fed by `family.offers`, reusing the
  existing fee formatting from `FeeSummaryTable`.
- Titles/descriptions via the existing `serpTitle()` / `serpDescription()` and
  `pillarCtrMeta()` in `src/lib/intentMap.ts`.
- Upward links added in `src/routes/universities.$slug.courses.$course.tsx`
  breadcrumb area and related-links grid.
