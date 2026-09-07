# DegreeKhojo Master Plan — one combined roadmap to compete with CollegeSathi & CollegeVidya

This merges everything discussed today into a single phase-by-phase programme:
the CollegeSathi UI/UX audit, the GSC-driven ranking plan, the 30–40 university
content-scale plan, and the competitiveness assessment. Nothing from those is dropped.

Baseline (GSC 19 Aug – 1 Sep 2026): 3,357 impressions · 48 clicks · avg position 33.8 ·
mobile pos 14.9 vs desktop 51.6 · India 2,689 impressions · 463 indexed of ~4,400 crawlable.

Competitor reality: CollegeVidya ~77.6k keywords / ~198k visits per month.
CollegeSathi ~3.5k keywords / ~13.8k visits. We win on data honesty, we lose on
authority, speed-to-answer and content velocity.

Guiding UX principle for every page: **answer in 3 seconds, prove in 30 seconds, decide in 3 minutes.**

---

## Phase 0 — Foundations & leak-stopping (Week 1)

Nothing else compounds until these are true.

1. Single canonical host `https://degreekhojo.com` everywhere — `src/lib/seo.ts` SITE_URL,
   canonical links, og:url, `public/robots.txt` sitemap line, sitemap route output.
2. Replace the placeholder WhatsApp number `919000000000` with the real counselling number
   in every consumer (lead context, quick menu, sticky bar, CTA buttons).
3. Install analytics: GA4 + Google Tag Manager + Microsoft Clarity in the root document,
   with events for lead-form start, lead submit, WhatsApp click, brochure click, fee-table view.
4. Index hygiene audit: list every crawlable URL, classify as canonical / thin / duplicate /
   redirected, and make the sitemap contain only the canonical set.
5. Verify Search Console property, submit the corrected sitemap, request indexing on the
   top 50 canonical pages.

**Checkpoint 0** — sitemap returns only canonical URLs; robots and canonicals agree on one host;
analytics events fire in Clarity/GA4 real-time; GSC coverage report accepted the new sitemap.

---

## Phase 1 — Answer-first UX on every money page (Weeks 1–3)

The CollegeSathi gap is not depth, it is order. Keep all depth; change the sequence.

1. `AnswerFirst` block directly under the H1 on all 21 university hubs (already built) —
   verify content is data-derived and unique per university, never templated prose.
2. Same block on all 248 university×course pages: fee, eligibility, duration, specialisations,
   mode, approvals, last-verified date, and a one-line verdict.
3. Above-the-fold action row: Apply / Get fees on WhatsApp / Download brochure — mobile sticky.
4. Fold long middle sections (exam pattern, learning experience, considerations) into
   expandable blocks. Content stays in the HTML for crawlers, collapsed for humans.
5. Desktop parity work: desktop averages position 51.6 vs mobile 14.9. Audit desktop-only
   layout shift, above-fold content differences and internal-link density on wide screens.
6. Mobile fee tables stay real side-by-side tables (per existing rule), compact typography.

**Checkpoint 1** — on a phone, fee + eligibility + CTA are visible without scrolling on a sample
of 10 university pages and 10 course pages; Clarity scroll maps show fee-block views up sharply;
desktop and mobile render the same above-fold facts.

---

## Phase 2 — Striking-distance query capture (Weeks 2–4)

Seven queries already sit in the top 20 with near-zero clicks. Fastest available win.

Targets: du sol exam pattern (7.6) · nsou ma english syllabus (9.5) · course to salary (4.8) ·
shoolini pay after placement (10.8) · du sol ma political science syllabus (10.8) ·
nsou b.sc chemistry hons (7.6) · vgu vs chandigarh university (6.7).

For each: exact-match H1, answer table above the fold, rewritten title/description
matching query intent, visible last-updated date, and 3–5 contextual internal links.

**Checkpoint 2** — all seven pages rewritten; two weeks later, GSC shows average position
improvement and non-zero clicks on at least five of the seven.

---

## Phase 3 — Trust & verification layer (Weeks 4–6)

This is CollegeVidya's actual moat: students trust them to say what is real.

1. UGC-DEB entitlement proof badge per university, linked to the official listing.
2. "Last checked on <date> · source: official university website" on every fee, approval
   and eligibility block. Never "Unverified"; absent figures say "Fee not published".
3. Source-links panel per university, with the exact official page/PDF used.
4. Reviews: remove any remaining verified-review wording; build a real review submission
   flow with moderation, then AggregateRating schema only once real reviews exist.
5. "Check before you pay" tool: enter university + programme, see entitlement status,
   approval bodies, published fee and what is not published.

**Checkpoint 3** — every fee table on the site carries a dated source line; entitlement badge
renders on all 21 hubs; review flow accepts and stores a real submission end to end.

---

## Phase 4 — Lead & conversion backend (Weeks 5–7)

Rankings without capture are wasted.

1. Move lead storage off Apps Script/localStorage onto Lovable Cloud: server-side validation,
   deduplication by phone, source-page attribution, UTM capture, timestamps.
2. Partial-lead capture (save on first field blur), missed-lead recovery, callback scheduling,
   exit-intent on mobile back-button — wire the pieces already built into the new backend.
3. Admin view: leads list with filters by university, course, source page, date.
4. WhatsApp click-to-chat with pre-filled context per page.
5. Admission countdown: midnight-only deadline logic, aesthetic flip-tile, never fake urgency.
6. Lead-form placement rule: above the fold only on fee/eligibility intent pages.

**Checkpoint 4** — a test lead submitted on a course page appears in the admin view with the
correct source page and UTM; duplicates within 24h collapse into one record.

---

## Phase 5 — Content scale to 30–40 universities (Weeks 6–14, batches of 5)

You supply the minimum; the pipeline does the rest.

**Minimum input per university (best case):**
official online/ODL homepage URL · programme list URL · fee page or fee PDF ·
admission/eligibility URL · recognition/approval proof · optional: syllabus PDF,
scholarship page, placement page, logo, campus photo, sample degree image.

**Acceptable minimum (if that is all you have):** university name + official programme
homepage. Sources get crawled from the official domain and every missing fact is reported
back to you rather than invented.

**Pipeline per batch of 5:**
1. Store raw extracted sources under `src/data/sources/`.
2. Merge into `src/data/university-master-data-2026-27.json` + course index + source rows.
3. Write data-derived unique publication content (no cloned prose) and fee tables in
   `src/data/university-fee-tables.ts`.
4. Register logo/campus/degree assets.
5. Generate hub page, course pages, comparison entries, internal links.
6. Typecheck, then desktop + mobile visual verification.

**Uniqueness guarantees:** archetype routing (open vs private vs state), data-derived sections,
per-university decision guides, intent-separated headings, honest "Not published" gaps.
Never invent fees, approvals, placement numbers, rankings or reviews.

**Checkpoint 5 (per batch)** — 5 hubs + their course pages live, each with a distinct H1,
distinct answer block, real fee table or an explicit "Fee not published", and zero duplicate
paragraphs against existing pages.

---

## Phase 6 — Tools moat (Weeks 8–14)

Tools earn links, repeat visits and long dwell time. Each tool gets its own indexable page
plus indexable sub-views.

1. Rebuild `/tools/salary-after-course` around real course→salary queries, with per-course
   salary tables and indexable sub-pages.
2. Fee EMI calculator — deepen with real fee plans per university.
3. Eligibility checker — course + qualification in, eligible universities out.
4. Any-two-university comparison engine — 10+ parameters, shareable URL.
5. Course duration / total-cost calculator.
6. UGC-DEB entitlement checker (shared with Phase 3).

**Checkpoint 6** — each tool has its own title/description/schema, is linked from relevant
university and course pages, and appears in GSC with impressions within 30 days.

---

## Phase 7 — Comparison & head-term pillars (Weeks 10–18)

1. Upgrade the 74 comparison pages: unique "Which should you pick" verdict, parameter table,
   fee-vs-fee, approval-vs-approval, who each suits.
2. Build strong pillars for head terms: online MBA fees in India · online BA degree ·
   LPU online fees · online MBA fee structure · online MCA fees · online BBA fees.
3. One page per (university × course × intent) only where the intent is genuinely distinct;
   otherwise anchors on a single page.
4. Internal link hub: blog → university → course → tool → comparison, both directions.

**Checkpoint 7** — every comparison page has a written verdict; each head-term pillar ranks
in the top 50 within 60 days of publication.

---

## Phase 8 — Content velocity & editorial authority (Months 3–6)

1. Three research-backed articles per week from the 415-query list.
2. Quarterly "Online Degree Fee Index" report with official-notification citations (link bait).
3. Author pages with real credentials; editorial policy visible; update cadence stamped.
4. Legal completeness: disclaimer, terms, privacy, editorial policy wired into the footer
   with the short footer disclaimer paragraph.

**Checkpoint 8** — 36+ new articles live by month 6; indexed page count above 2,000;
average position under 20.

---

## Phase 9 — Authority & off-page (Months 4–12)

1. Digital PR around the Fee Index and a state-wise ODL approval tracker.
2. Citations and guest posts on education portals.
3. Encourage real student reviews and Q&A on university pages.
4. Brand search building: consistent naming, social profiles, YouTube explainers.

**Checkpoint 9** — referring domains growing month over month; branded search impressions
appear in GSC.

---

## Phase 10 — Performance & technical polish (ongoing)

Core Web Vitals on mobile, image sizing and lazy loading, SSG/prerender for stable pages,
one OG image per page family instead of a single global image, structured data validation
(Course, Collegeled, FAQPage, BreadcrumbList, ItemList) with zero errors in Rich Results.

**Checkpoint 10** — mobile LCP under 2.5s on university hubs; zero schema errors.

---

## Realistic outcome timeline

| Timeline | Milestone |
|---|---|
| 30 days | 2–3× clicks; the seven near-miss queries on page 1; desktop parity fixed |
| 90 days | 5–10× clicks; 50+ page-1 long-tail rankings; real lead flow; 2,000+ indexed |
| 6 months | 20–30k monthly organic visits; page 2–3 on head terms; brand searches begin |
| 12–18 months | Genuine challenger on mid-tail; head terms still need sustained authority spend |

Honest note: Phases 0–7 are dev work and will be done here. Phases 8–9 need writers and
link-building budget — without them the on-page work plateaus around month 6.

---

## What I need from you

1. Real counselling / WhatsApp number.
2. Where leads should land — Lovable Cloud store, or an existing CRM.
3. The university source list for Phase 5 (URLs and PDFs, batches of five).
4. Whether real student testimonials exist, or we build the collection flow first.
5. Whether there is budget for content writers and PR in Phases 8–9.

---

## Technical notes

- Domain constant lives in `src/lib/seo.ts`; the sitemap route is `src/routes/sitemap[.]xml.ts`
  and its existing mechanism is preserved, not replaced.
- University data source of truth: `src/data/university-master-data-2026-27.json`;
  display fee tables in `src/data/university-fee-tables.ts`; PDF extractions in `src/data/sources/pdf/`.
- Backend work (leads, reviews, admin) uses Lovable Cloud with server functions; public
  endpoints only under `src/routes/api/public/*` with caller verification.
- Analytics tags go in `src/routes/__root.tsx`.
- Legal copy already exists in `src/data/legal.ts` and only needs wiring.
