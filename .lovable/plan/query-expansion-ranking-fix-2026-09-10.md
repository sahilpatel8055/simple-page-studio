# Query Expansion + Ranking Fix

## What the new export actually says

Window 19 Aug – 10 Sep 2026. 63 clicks, 5,327 impressions, average position 29.7.

- **533 distinct queries — but 338 of them got exactly 1 impression.** Only ~50 queries carry real volume. That is the expansion problem: the site appears for a thin, accidental set of phrases.
- **422 URLs already earn impressions** (258 of them university×course). So indexing and crawling are fine. Visibility is not.
- Where you sit by page type (average position):
  - comparison 10.9 · university×course 23.0 · blog 29.5 · **university 41.0 · course pillar 44.7**
- The money query families are all deep:
  - fee / fees queries: 124 queries, 423 impressions, **average position 61, zero clicks**
  - admission: 55 queries, average position 62 · eligibility: 31 queries, average position 58
- Whole intent families produce almost nothing: "vs" 5 queries, "review" 2, "scholarship" 5, "placement" 3, "best" 1, "is X valid" 4.
- `/tools/salary-after-course`: 398 impressions at position 8.9, **2 clicks**. It ranks for "course salary", "course to salary", "course update salary" — a table intent the page does not visibly answer above the fold.
- Mobile position 13.9 vs desktop 40.2. India = 4,052 of 5,327 impressions.

## Why the pillar pages will not go under 30

Not a data-quality problem. Four concrete causes, in order of impact:

1. **Template sameness.** All 248 university×course pages and all course pillars share one heading skeleton and one sentence pattern; only numbers change. Google clusters near-identical pages, picks one representative and suppresses the rest. This is exactly why the pillar layer sits at 44 while the hand-shaped comparison pages sit at 10.
2. **One title carries three intents.** "Fees, Eligibility & Admission 2026" means the page matches "…fees" weakly, "…eligibility" weakly and "…admission" weakly instead of owning one. The 61-average on fee queries is that.
3. **No query-shape coverage.** People search in question form ("is LPU online MBA valid", "LPU online MBA vs Amity", "LPU online MBA placement salary"). Those strings do not exist as headings or as answers anywhere on the page, so the page never enters those auctions — that is the missing-query problem.
4. **No external authority yet.** A three-week-old domain with no links cannot rank a generic head term ("online ba degree", position 88). Those terms are a month-4 target, not a month-1 one.

## The plan

### Step 1 — Break template sameness (highest impact)
- Give each university×course page a generated-but-distinct opening: a 120–160 word verdict paragraph built from that programme's own facts (fee vs category median, approval status, duration, specialisation count, admission window) — different sentence structures selected by data shape, not one template.
- Vary the section order and heading wording per course family so no two families share an identical skeleton.
- Suppress sections with no real data instead of printing a placeholder heading (empty headings are what makes pages read as clones).

### Step 2 — One title, one intent
- Rewrite title/description generation so the primary intent is chosen from the programme's strongest attribute:
  fee-led · eligibility-led · admission-led · placement-led.
- University pages get "…Online: Courses, Fees & Approval 2026"; course pillars get "Online <Course> in India 2026: Fees, Eligibility, Best Universities" — distinct from the university×course layer so they stop competing with each other.

### Step 3 — Query expansion layer (the missing-impressions fix)
Add a question block to every university×course and course pillar page, rendered from data, covering the shapes that currently produce zero impressions:
- "Is <University> <Course> valid for government jobs / UGC-entitled?"
- "<University> <Course> vs <closest rival>" (3 auto-picked rivals, linked)
- "<University> <Course> placement and salary"
- "<University> <Course> scholarship and EMI"
- "<University> <Course> exam pattern"
- "<University> <Course> total fee for 2 years"
Each with a 40–60 word direct answer, wired into FAQPage schema. This is what multiplies the query set — one page then matches dozens of phrasings instead of three.

### Step 4 — Fix the two pages already ranking but not clicked
- `/tools/salary-after-course`: put the course→salary table above the fold, add an H1 matching "course to salary", give each course an indexable sub-view. 398 impressions at position 9 with 2 clicks is the single largest recoverable loss on the site.
- `/blogs/ugc-entitled-vs-deb-approved`: 120 impressions at position 10 — same treatment, direct answer first.

### Step 5 — Consolidate internal authority
- Sitemap = canonical set only; remove every non-indexable URL from it.
- Each university page links down to its strongest 6 courses; each course pillar links across to its 8 strongest universities; each university×course links to 3 comparisons and its pillar. Deliberate, not a link farm.

### Step 6 — Then, and only then, the head terms
"online mba fees in india", "online ba degree", "lpu online fees". These need links, which need the Fee Index and comparison engine already on the roadmap. Attempting them before steps 1–5 wastes the effort.

## Expected shape of the result
Steps 1–3 move the pillar layer from ~44 toward the 15–25 band and should multiply the query count several times over, because each page starts matching question phrasings it currently cannot. Step 4 recovers clicks within days. Step 6 is a months-long play.

## Technical notes
- Verdict/answer generation lives in a new `src/lib/pageVerdict.ts` and a `src/components/common/QuestionBlock.tsx`, fed by `offerings`, `universityCompare` and the existing fee/approval data — no new datasets, no invented facts; missing values render as "not published".
- Title logic extends `offeringCtrMeta` and the `head()` blocks in `universities.$slug.courses.$course.tsx`, `universities.$slug.index.tsx`, `courses.$course.index.tsx`.
- FAQ entries feed the existing JSON-LD helper in `src/lib/seo.ts`; visible text and schema must match.
- Sitemap filtering in `src/routes/sitemap[.]xml.ts` reuses `isIndexablePair` and the canonical offering list.
