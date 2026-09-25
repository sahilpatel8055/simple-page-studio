# GSC-Led Ranking Plan (28 days to 24 Sep 2026)

## What the data says
- 9,452 impressions, 85 clicks. Position is improving, from about 40 in late August to about 20 now.
- By page type (average position): comparisons 9.5, university×course 16.7, blogs 19.7, tools 17.8, university hubs 34.1, course pillars 38.9.
- Pages Google already rewards are comparisons and university×course. We rank from those instead of pushing pillars at head terms.
- Biggest click leaks (ranking well, almost no clicks): "course salary" at #7.6 (192 impressions, 0 clicks), "course to salary" at #5.2, the UGC-vs-DEB blog at #7.7 (209 impressions, 3 clicks), and DU SOL exam pattern at #8.

## Phase 1 — Fix the click leaks (week 1)
1. Salary tool: add a course-to-salary table above the fold, an H1 "Course to Salary 2026", a one-line answer, and a title that leads with "Course Salary".
2. UGC-entitled vs DEB blog: put the direct answer first, add a comparison table and FAQ schema, and write a sharper title.
3. Rewrite titles and descriptions for every page ranking in positions 1–12 with CTR under 2%. The list comes from the export.
- Checkpoint: CTR on these pages is 3% or higher within 14 days.

## Phase 2 — Query expansion on university×course pages (weeks 1–3)
- Build a query map from the export: query → owning page → intent (fees, eligibility, syllabus, admission, exam pattern, placement) → matching section.
- Rename each section heading to the query form, for example "LPU Online MCA Syllabus" instead of "Curriculum". Add a stable anchor and a 40–60 word direct answer at the top of the section.
- First batch is the pages with the most impressions: LPU MCA/MBA, DU SOL, NSOU, IGNOU, Amity, NMIMS, Shoolini.
- No new URLs. Section sub-URLs keep their redirect to the page's anchor.
- Checkpoint: "lpu mca syllabus", "lpu mca eligibility" and "lpu mca admission" move from 44–80 to under 30.

## Phase 3 — Comparison expansion (weeks 2–4)
- Strengthen comparisons already in the top 10: IGNOU vs Uttaranchal, DU SOL vs Kurukshetra, Shoolini vs Parul, Parul vs Uttaranchal, Amity vs DU SOL, VGU vs Chandigarh.
- Add new pairs only where there is search demand: Shoolini vs Chandigarh, IGNOU vs DU SOL (currently #35), and similar. Both universities must offer the course and have verified data.
- Link every university×course page to its 3 strongest comparisons.

## Phase 4 — University hubs and course pillars (weeks 3–6)
- Wire the existing verdict and question block into the university hubs. This includes fixing the broken university route first.
- Course pillars target mid-tail terms ("online mba fee structure", "online ba admission", "online mca fees") instead of head terms. Each gets a fee-range table at the top, links to its 8 strongest universities, and a question block.

## Phase 5 — Online Degree Fee Index (weeks 4–8)
- One original research page: lowest, median and highest fee per course and per university type, calculated from our own fee data. This is what earns links.

## Phase 6 — Automated query-gap report (ongoing)
- A monthly script reads the new GSC export and lists queries ranking 8–40 whose page has no matching heading or answer. That list becomes the next content batch.

## Content to collect from Google or official sites (please supply or approve research)
| Section | What is missing | Source to take it from |
|---|---|---|
| Salary tool | Salary ranges by course and role | AmbitionBox, Naukri and Glassdoor role pages, cited |
| LPU / DU SOL / NSOU syllabus | Semester-wise subject lists, syllabus PDF links | Official university syllabus PDFs |
| Eligibility (LPU MCA, BBA docs) | Marks, maths requirement, documents list | Official admission / prospectus page |
| Admission | Current intake dates, last date, application fee | Official admission notice for 2026 |
| Exam pattern (DU SOL, IGNOU) | Marks split, exam mode, datesheet link | Official exam branch notices |
| Scholarships | Current waiver percentages | Official scholarship page per university |
| Comparisons (Shoolini vs Chandigarh, IGNOU vs DU) | NIRF rank, NAAC grade, total fee | NIRF 2025 list, NAAC portal, official fee pages |
| UGC blog | Current UGC-DEB entitled list | deb.ugc.ac.in |

No figures will be invented. Anything missing shows as "Not published".

## Technical notes
- Query map: `scripts/gsc-query-map.ts` reads the xlsx, groups queries by intent, matches them to routes, and writes `src/data/gsc/query-map.json`.
- Headings come from the query map via `pageVerdict.ts` and `UniCourseSectionBody`. Anchors stay in `uniCourseAnchors.ts`.
- FAQ schema is built through `src/lib/seo.ts`, and the visible text must match it.
- The sitemap is filtered to the canonical, indexable set.
