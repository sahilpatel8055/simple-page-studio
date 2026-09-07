# Fix ranking + simplify the university page experience

## What the Search Console file says (19 Aug – 1 Sep)

- 3,357 impressions, 48 clicks, average position 33.8. Google sees the site but almost nobody clicks.
- Mobile: position 14.9. Desktop: position 51.6. Mobile is where the traffic is; desktop is nearly invisible.
- India is 2,689 of 3,357 impressions. Everything else is noise.
- Money queries sit far down: "online mba fees in india" (71), "online ba degree" (95), "lpu online fees" (48), "smu online mba" (83).
- Queries already close to the first page with zero clicks: "du sol exam pattern" (7.6), "nsou ma english syllabus" (9.5), "course to salary" (4.8), "nsou b.sc chemistry hons" (7.6), "shoolini pay after placement" (10.8).
- /tools/salary-after-course: 111 impressions, 2 clicks — the single biggest wasted asset.

Read plainly: a handful of pages are almost ranking and the titles/snippets are not earning the click; the big fee/course pages are nowhere yet.

## On UI/UX vs CollegeSathi

Ours is richer and more honest — more data, real sources, verification notes. But it is harder to use. A university page runs ~25 stacked sections; a student who came for "what is the fee" scrolls through overview, approvals, exam pattern and decision guides before reaching a number. CollegeSathi is thinner on facts but answers fee / eligibility / apply within the first screen and repeats the call to action all the way down.

So: keep our depth, change the order and the density. That is the plan below.

## Plan

### 1. Answer in the first screen (all university and course pages)
- Fee, eligibility, duration, approval and "apply" in one compact card above everything else, on mobile first.
- Sticky bottom bar on mobile with fee + WhatsApp, always reachable.
- Collapse the long middle sections (exam pattern, learning experience, decision guides) into expandable blocks so the page feels short but keeps all content for Google.
- Move student reviews and placements up; move editorial/verification blocks down.

### 2. Win the near-miss queries (biggest short-term gain)
For the seven queries already in the top 20, rewrite the page title and description to match the query wording exactly, put the direct answer in a table at the top, and show a visible "last checked" date:
du sol exam pattern · nsou ma english syllabus · nsou b.sc chemistry hons · shoolini pay after placement · du sol ma political science syllabus · course to salary · vgu vs chandigarh university.

### 3. Rebuild the salary tool
111 impressions and 2 clicks means the page shows for "course to salary" but doesn't look like the answer. Rebuild it around course→salary: a per-course salary table on landing, separate indexable views per course, and clear links to the matching degree pages.

### 4. Fix why desktop sits at 51 while mobile sits at 15
Audit what desktop shows that mobile doesn't (heavy sidebars, duplicate link blocks diluting the main content) and cut the desktop page down to the same focused structure.

### 5. Fee and course pillar pages
"online mba fees in india", "online ba fees", "lpu online fees" all rank 48–95. Each needs a real fee comparison table across universities at the top of the page, updated dates, and internal links from every matching university page.

### 6. Housekeeping that blocks ranking
- Confirm the live domain and make every canonical, sitemap and share link point at it consistently.
- Sitemap should list only the canonical pages, nothing redirected.
- Replace the placeholder WhatsApp number before pushing conversion changes.

## Technical notes

- Layout changes land in `src/components/templates/DetailLayout.tsx`, `src/routes/universities.$slug.index.tsx` and the course route; sections become collapsible via a shared wrapper so content stays in the HTML.
- Title/description rewrites go through `universityHeadings` in `src/lib/pageDifferentiation.ts` and the per-route `head()`.
- Salary tool: `src/routes/tools.salary-after-course.tsx` plus per-course child routes off `src/lib/salaryData.ts`.
- Domain constant lives at `src/lib/seo.ts` (`SITE_URL`) and `public/robots.txt`; both need the same value.

## Order of work

1. Domain/canonical/sitemap check (small, unblocks everything)
2. First-screen answer card + mobile sticky bar
3. Seven near-miss pages
4. Salary tool rebuild
5. Fee pillar tables
6. Desktop parity pass
