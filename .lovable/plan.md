# Why our university pages aren't ranking vs CollegeSathi — findings and fix plan

## Evidence gathered

Live comparison (Semrush, India database, today):

| Metric | degreekhojo.com | collegesathi.com |
|---|---|---|
| Keywords ranking | 41 | 3,504 |
| Estimated monthly organic visits | ~0 | ~13,785 |
| Authority score | 0 / 100 | 20 / 100 |
| Backlinks | 14 | 603 referring domains |

I also read their Amity and Manipal pages and our live Amity page side by side.

**The single biggest reason we don't rank is not the page — it's trust signals off the page.** Our site has 14 links pointing at it and effectively no ranking history; theirs has 600+ sources and two years of accumulated authority. Our content is already longer and better sourced than theirs in most sections. So the plan below is: fix the handful of real on-page gaps, then spend the effort where it actually moves rankings (indexing, brand signals, reviews, links, speed).

## What they do better than us

1. **Page address matches the search phrase.** Theirs: `/university/amity-university-online`. Ours: `/universities/amity-online`. People search "Amity University Online", so their address matches the query exactly.
2. **Visible ratings and real review counts** ("4.6 from 32 reviews") near the top, plus a review-submission box. This wins the star ratings in Google results. Ours has a reviews section but no aggregate rating shown and no way for a student to submit one.
3. **Offer-led hooks** — "Up to ₹10,000 off", "Early Bird Scholarship ending soon", brochure download, "Apply to university". These lift clicks and time on page, which feeds rankings.
4. **Named human experts with photos** ("Management experts", "Scholarship & finance experts"). Google's helpful-content signals reward visible authorship of this kind.
5. **Hiring-partner logos and placement salary blocks** presented visually rather than as text.
6. **Fewer, punchier sections.** Their page has ~20 headings, ours has 60+. Ours reads like a database dump in places, which hurts engagement even though the facts are better.
7. **A named comparison tool** (ClikPick) that earns links and brand searches.

## What we do better (keep, don't touch)

Sourced fee tables, honest "not published" labelling, exam patterns, per-programme detail, and a far larger internal link network. This is our defensible advantage — competitors publish estimates, we publish sourced facts.

## Fix list, in the order that matters

### P0 — Make Google able to rank us at all
- Verify the site in Google Search Console and submit the sitemap; check the index-coverage report for every university page. Right now we have no evidence our pages are even indexed.
- Confirm all 20+ university pages return 200 with a unique title, description and canonical (spot-check found the sitemap does not yet contain Sharda, Kurukshetra and YCMOU — the live build is stale, so publish).
- Add each university's search-matched address as the primary one: `/universities/amity-university-online`, `/universities/lovely-professional-university-online`, etc., with permanent redirects from the current short addresses so nothing breaks or loses value.

### P1 — On-page gaps worth closing
- **Rating block:** show an aggregate rating and review count in the header, backed by real reviews only, with matching review structured data. No invented ratings — reviews collected through a submit form.
- **Review submission form** on each university page, stored with the leads data, moderated before publishing.
- **Trim and re-order the page:** merge "Why consider" / "Things to consider" / "Who it suits" / "Who may consider" into one decision block; move "Researched university record" and "What to verify" below the fold. Target ~25 headings, same facts.
- **Named counsellor/expert strip** with photos and specialisation (the expert images already exist in the project).
- **Hiring-partner logo strip and placement snapshot** rendered visually on every university that has verified data.
- **Sample degree image with click-to-zoom** on every university (currently only some).
- **Offer/scholarship banner** per university, driven by real published scholarships, with an honest deadline.
- **Comparison relevance:** "Compare universities" on Amity currently suggests open universities — it should suggest same-archetype, similar-fee universities.

### P2 — Off-page, which is where the ranking actually comes from
- Get 30–50 quality links over 3 months: education directories, Quora/Reddit answers, guest posts on career blogs, university-comparison data studies, HARO-style quotes, YouTube descriptions.
- Build brand search volume: name a comparison tool of our own, run small social/YouTube pushes so people search "Degreekhojo Amity fees".
- Publish 2–3 data-led pieces per month that others cite (e.g. "Online MBA fees across 21 universities, 2026 — sourced table"). These earn the links that lift the university pages.
- Collect and publish genuine student reviews continuously; review volume is the single strongest engagement signal on this page type.

### P3 — Speed and mobile
- Measure the university page on PageSpeed Insights; target under 2.5s largest paint on 4G. The page ships a lot of sections — lazy-load below-the-fold blocks and images.
- Serve modern image formats and correct sizes for logos, campus photos and degree samples.

## Technical notes

- New addresses: add `universities.$slug` alias handling plus a slug alias map so old paths permanently redirect; update `sitemapEntries()` and every internal link generator (`src/lib/entities.ts`).
- Ratings: extend `collegeSchema()` to only emit `aggregateRating` when real reviews exist; add a reviews table when Cloud is enabled (needed for submission + moderation).
- Section consolidation happens in `src/routes/universities.$slug.index.tsx` and the `Differentiation`/`Hub` section components — content is reused, not rewritten.
- Speed work: route-level lazy imports for below-the-fold sections, `loading="lazy"` and width/height on all images.

## Suggested order

P0 this week → P1 next → P2 continuous → P3 alongside.
