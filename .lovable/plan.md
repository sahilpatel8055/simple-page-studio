# Data Integrity + Research Master Plan (17 universities, 175 programmes)

## What the audit found

- The site already has ONE source of truth: `src/data/university-master-data-2026-27.json` (17 universities, 175 programmes). Everything else (`offerings.ts`, `programmes.ts`, `universities.ts`) is a derived view, so nothing has to be recreated per page.
- Fee verification today: 44 `verified_official`, 3 `secondary_source`, 20 `pending_official_fee_document`, 108 `fee_pending_verification`. 136 of 175 programmes have `total_programme_fee: null`, which is why pages print "Awaiting official confirmation".
- Curriculum is empty (`curriculum: {}`) for most programmes; specialisations only carry a name + a generic `/programs` link, not a programme-specific source.
- Salary numbers come from `src/lib/careerSalaries.ts` (indicative market data) but are rendered next to placement sections, so they can read as university outcomes.
- Root of the repo holds ~30 leftover research/scratch files (`mca_0..6.json`, `result.json`, `results.json`, `final_result*.json`, `report.json`, `minified_results*.json`, `parse_*.py`, `minify_*.py`, `generate_json.py`, `fetch_*.sh`, plus loose `*.md` research dumps). These are duplicates of content already inside `src/data/` and are not imported anywhere.

Nothing published is deleted. No route, slug, canonical or sitemap entry changes anywhere in this plan, so there is no ranking risk.

## Step 0 — Cleanup (safe, no content loss)

- Verify each root scratch file has zero imports, then move the raw research dumps into `research/raw/` (kept, not deleted) and delete only the true duplicates (`result.json` vs `results.json` vs `final_result(s).json`, `minified_results*.json`, the throwaway parse/minify scripts).
- Add `research/README.md` explaining that `src/data/university-master-data-2026-27.json` is the only file pages read.

## Step 1 — Extend the research master schema (source traceability)

Add these fields to every fact-bearing block (fees, curriculum, specialisation, admission, scholarship, career, recognition, reviews):

```text
value            the fact
status           verified_official | verified_regulator | secondary_source | pending | not_published
source_url       exact page/PDF the value came from (not a generic /programs link)
source_type      website | prospectus_pdf | fee_document | notification | regulator
source_year      2026-27 (or the year printed on the document)
verified_on      YYYY-MM-DD
label             e.g. "University-reported", "Indicative market salary", "UGC-DEB entitlement"
```

Rules enforced in code: never infer a missing value, never compute discounts/EMI, `pending` renders as an explicit "not published by the university" note instead of a blank or a guess.

## Step 2 — Fee verification sprint (the 136 pending programmes)

Worked university-by-university in batches of 3–4 so each batch is reviewable:

1. I fetch the official university online portal, fee page and prospectus/fee PDF for each programme.
2. Where an official number exists → fill `total_programme_fee`, semester/annual split, registration and exam fee, set `verified_official` + `source_url` + `verified_on`.
3. Where the university genuinely does not publish it → keep `null`, set `not_published`, and the page shows the labelled note plus a link to the official admission page.
4. Fee figures you already supplied stay authoritative; I only attach a source and date to them so they stop showing as unverified.

You do not need to send PDFs — I can pull them from the official sites. If you already have official fee PDFs, dropping them in `research/raw/` makes a batch faster and stronger.

## Step 3 — Curriculum integrity

- Per programme: semester-wise subject list from the university's own curriculum/syllabus page or PDF, with `status: verified | incomplete | pending`.
- Common curriculum stays shared per programme; specialisation electives are stored separately per university × programme × specialisation, so one university's electives can never leak into another's page.
- Missing semesters are shown as "not published" rows rather than filled in.

## Step 4 — Claim labelling (salary, placement, reviews)

- Salary: every figure renders with `Indicative market salary · <year> · source`, and university-reported figures render as `University-reported · <source> · <date>`. The two are never mixed in one block.
- Placement: only university-published support statements; no invented averages/highest packages.
- Reviews: each review/rating carries `source`, `date`, and one of `verified_learner | user_submitted | external_rating`, displayed as a badge. Unsourced ratings are hidden rather than shown bare.

## Step 5 — Online vs ODL classification

Per programme (not per university): `Online (UGC-DEB entitled)`, `ODL/Distance`, or `Open Learning`, with the entitlement source and validity years. Delivery-mode wording on hero, eligibility and admission blocks is generated from this field, so no page can claim the wrong mode.

## Step 6 — De-templating course pages

- University-level facts stay on course pages but are re-framed in course context (e.g. "How <University> runs the online MBA" instead of the same generic block).
- Each course page gets genuinely course-specific sections: that programme's curriculum, that programme's specialisation electives, that programme's eligibility rule, that programme's exam pattern, that programme's fee table.
- Any section with no verified course-specific data is replaced with a short sourced note instead of filler prose.

## Step 7 — UX items (after the data work)

- Mobile comparison: attribute-by-attribute stacked cards with a sticky attribute label, replacing the squeezed desktop table.
- University cards: grouped/progressive disclosure so all 17 stay scannable on mobile; none removed.
- Next-step CTAs: one quiet contextual action per major section (compare, fees, curriculum, specialisation) — no ad-style blocks.
- Blogs/news/articles keep their own intent; where a post duplicates a course page, it is rewritten to an editorial angle and links to the page instead.

## Step 8 — 17-university sync check + SEO safety

Automated check that every university slug appears consistently across listings, course pages, specialisations, comparisons, filters and sitemap; report any orphan or mismatch. Confirm no URL, canonical or redirect changed at any point.

## Suggested execution order

P0: Steps 0 → 1 → 2 (fees) → 3 (curriculum) → 4 (claims)
P1: Steps 5 → 6
P2: Step 7 → 8

Each step lands as its own reviewable batch so you can check the sources before the next one starts.

## Technical notes

- Schema change is additive; derived readers (`src/data/offerings.ts`, `src/lib/courseMaster.ts`, `src/lib/insightsData.ts`, `src/lib/pubContent.ts`) get optional field support so nothing breaks mid-migration.
- `src/components/common/Verification.tsx` already renders status badges — it is extended to cover the new statuses and labels instead of adding a second badge system.
- No new dependencies, no backend, no route files added or removed.
