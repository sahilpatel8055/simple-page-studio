# “University A vs University B” Comparison System

## Goal
Turn every important comparison into a decision page where visitors instantly recognise both universities, understand the winner for their priorities, verify the evidence, and take the next step. Strengthen rankings by matching real comparison queries without creating hundreds of thin pages.

## What the audit confirmed
- The site already has SSR comparison pages with substantial served content, verdicts, fees, eligibility, FAQs, official links, and a separate compare-any-universities tool.
- The first screen is mostly text. It does not visually establish “University A vs University B” with large logos/campus imagery and an obvious VS treatment.
- A course title currently repeats “Online” (`…Online Online MBA`), while URL, metadata, on-page order, and editorial-pack order can disagree.
- Several sections repeat the same decision: short answer, learner verdict, “Which should you pick?”, “Who should choose which,” and final verdict.
- The master data can produce 144 university pairs and 584 course-pair combinations, but only 15 course comparisons have hand-researched editorial packs. The existing selective-indexing rule is therefore correct and should remain.
- The two references rely on strong visual identity, many criterion-specific sections, visible trust, in-page conversion, FAQs, and comparison-to-course internal links. DegreeKhojo can outperform them with cleaner decision UX, clearer evidence, and honest missing-data treatment.
- Search data shows specific pair demand exists (`amity vs lpu`: about 110 India searches/month), while generic comparison-tool terms are much smaller. The major competitive gap is also authority: Semrush reports Authority Score 2 for DegreeKhojo versus 22 for CollegeSathi and 45 for CollegeVidya. Better pages are necessary, but authority building remains a separate requirement.

## 1. Create one canonical comparison experience
- Use one shared presentation for overall university pairs and course-specific pairs.
- Keep the compare-any-universities tool as a utility page, not a substitute for indexable pair pages.
- Merge the three current pair sources into one canonical registry and remove the thin fallback that currently serves a one-row “See guide below” table.
- Resolve university order once and reuse it everywhere: URL, breadcrumb, title, H1, logos, tables, verdicts, metadata, schema, and related links.
- Fix duplicated course wording and eliminate duplicate/reversed pair entries from the comparison hub.
- Preserve the existing curated `index/noindex` rules; do not submit all generated combinations.

## 2. Replace the first screen with a visual matchup
Build an unframed comparison header immediately below the breadcrumb:

```text
[University A logo]       VS       [University B logo]
University A                        University B
Location · type                      Location · type
UGC-DEB · NAAC                       UGC-DEB · NAAC

Online MBA comparison · verified date
[Lower fee: A] [More specialisations: B] [Recognition: Comparable]

One clear editorial answer in 40–60 words
[Compare fees] [Check eligibility] [Get unbiased guidance]
```

- Use large, equally weighted university identities; logos must remain fully visible and campus images are optional supporting media.
- On mobile, keep both identities side by side rather than stacking them into an ambiguous article header.
- Add a compact sticky “A vs B” section navigator after the matchup.
- Use semantic colour tokens and the existing maroon brand system, with clear winner, tie, and unavailable states.

## 3. Consolidate the decision content
Replace the overlapping verdict blocks with one authoritative decision centre:
- **Bottom line:** concise answer, not a universal “best university” claim.
- **Winner by priority:** lower total cost, approvals/recognition, specialisation breadth, flexible payment, learning support, and published career support.
- **Best for learner type:** budget learner, working professional, fresher, government-job aspirant, and placement-support seeker.
- **Tie / insufficient evidence:** explicitly show “Comparable” or “Not decidable from published data.”
- Every winner must expose the exact factual reason; no score should be created from missing or incomparable fields.
- Correct the current cost-answer fallback so a university is never named as cheaper when comparable fees are unavailable.

## 4. Build criterion-specific comparison sections
Use focused side-by-side sections instead of one long generic table:
1. Quick facts and recognition
2. Total cost of ownership: tuition, registration, exam fee, EMI, scholarship conditions, and published total
3. Course availability and specialisations
4. Eligibility and admission process
5. Curriculum and learning experience
6. Exams and assessment
7. Student support and LMS features
8. Career/placement support, clearly separated from placement guarantees
9. Degree validity, higher-study use, and government-job considerations
10. Strengths, limitations, and final fit

Each section will include:
- a one-sentence answer before the table;
- one stable three-column table (`factor | A | B`);
- a short “what this means for you” interpretation;
- direct links to the matching university/course pages;
- “Not published” where the official material is silent.

Long sections will be collapsible after their answer/table summary on mobile, while all meaningful content remains in the served HTML.

## 5. Upgrade mobile UX
- Pin the factor column and both university identities while tables scroll horizontally.
- Keep tap targets at least 44px and prevent headings, logos, badges, and values from truncating important facts.
- Add a clear swipe cue only when horizontal scrolling is required.
- Prevent the chat button and bottom actions from covering comparison controls or rows.
- Keep the most important comparison and verdict content open; fold only secondary detail.
- Test at 390×844 and 1280×1800, including long university names and missing values.

## 6. Strengthen search intent without keyword stuffing
Create a query map for every indexable pair and its justified course pages:
- Core: `A vs B`, `A or B which is better`, `A vs B fees`, `A vs B approvals`.
- Course: `A vs B online MBA/MCA/BCA…`, fees, eligibility, specialisations, exams, placement support.
- Decision: cheaper, better for working professionals, government jobs, higher studies, EMI, scholarship, LMS, and career support.
- Transactional: application fee, refund policy, payment mode, documents, intake, and admission steps—but only when verified source data exists.

Rules:
- Overall pair pages own university-level intent.
- Course-pair pages own course-specific intent.
- University and university-course pillars retain their own fee/admission depth and link contextually to comparisons.
- No new indexable URL is created unless it has demand, two valid offerings, materially different content, and sufficient verified facts.
- Course-pair pages must also have a completed researched pack before they become indexable; a course allow-list alone is not enough.

## 7. Introduce a stronger researched comparison data model
Extend each researched pack with structured fields rather than additional generic prose:
- verified date and per-field source URL;
- quick facts and total-cost items;
- curriculum, learning, exam, admission, scholarship, and career-support facts;
- winner/tie status plus evidence for each criterion;
- “best for” learner segments;
- verified FAQs and unresolved evidence gaps;
- reviewer/editor attribution.

Prioritise research in this order:
1. Existing indexable university pairs with impressions/clicks.
2. Their MBA and MCA comparisons.
3. BBA, BCA, B.Com and M.Com only where search demand and data support a standalone page.
4. Keep all unsupported generated pages `noindex, follow` and outside the sitemap.

## 8. Add visible trust and evidence
- Show a compact “How this comparison was checked” module near the first decision block.
- Display reviewer name, role, review date, methodology, and correction link.
- Add row-level source links or source markers for fees, approvals, and placement claims.
- Separate university claims from DegreeKhojo interpretation.
- Never use institution-wide placement packages as online-cohort outcomes unless the source explicitly supports that scope.
- Keep the existing official-source section, but make it easier to connect each important fact to its source.

## 9. Improve metadata and structured data
- Generate one consistent, intent-led title/H1/description per canonical page.
- Keep titles concise; put the strongest differentiator and year in the description, not a repetitive H1.
- Keep Breadcrumb and FAQ markup only when the matching content is visible.
- Add WebPage/Article and ItemList relationships for the two compared institutions where supported; do not add unsupported review/rating markup.
- Ensure canonical, robots, sitemap inclusion, and internal-link targets all follow the same indexability decision.
- Remove duplicate body-level JSON-LD where route-head markup already owns it.
- Replace the hardcoded update date with the real pair/course verification date in both visible content and structured data.

## 10. Rebuild the comparison hub and internal pathways
- Make `/compare` a decision hub with:
  - prominent “Choose any universities” tool;
  - popular researched head-to-heads;
  - course-specific comparison groups;
  - public/open-university comparisons;
  - recently verified comparisons.
- Show only curated/indexable pairs as crawlable cards; route the remaining generated combinations through the picker instead of listing 100+ `noindex` destinations.
- Every university page should link to its strongest researched comparisons.
- Every course pillar should link to relevant course-specific pair guides.
- Comparison pages should link back to both university profiles, both matching course pages, the course pillar, and 3–5 genuinely related comparisons.
- Avoid link walls; use contextual links near the relevant decision.

## 11. Build conversion around the decision, not interruption
- Place one compact, unbiased guidance prompt after the first complete comparison table.
- Prefill the two universities and course in the enquiry context.
- Offer actions that match intent: view A, view B, compare another pair, request fee verification, or get guidance.
- Keep core comparison facts ungated. The interactive tool’s deeper report may retain its lead unlock, but indexed comparison pages must remain fully useful without submission.
- Track comparison viewed, criterion opened, university profile clicked, course selected, WhatsApp clicked, and lead submitted.

## 12. Rollout and quality gate
### Wave 1 — System and flagship page
- Build the shared visual matchup and consolidated decision centre.
- Fix identity/order/title problems.
- Apply it first to Amity vs LPU Online MBA and verify desktop/mobile, served HTML, metadata, schema, and events.

### Wave 2 — Existing researched packs
- Migrate all 15 hand-researched MBA/MCA/BCA packs to the new structured sections.
- Remove repeated generic blocks where a researched block already answers the intent.

### Wave 3 — Indexable pair set
- Upgrade the remaining curated overall pairs using verified master data.
- Research only the course pairs that pass the demand/data threshold.

### Wave 4 — Hub and distribution
- Rebuild the comparison hub, strengthen university/course links, and validate sitemap/indexability consistency.

### Acceptance criteria
- Both universities are unmistakable within the first mobile viewport.
- No reversed identity, repeated “Online,” or conflicting verdict appears.
- One final answer and one winner-by-priority system exist per page.
- Every major fee/approval/career claim has a source or an explicit unavailable label.
- No newly indexed thin page is created.
- Pages render complete comparison content in SSR HTML with no browser errors.
- Mobile tables remain usable and no fixed element covers content.
- Metadata, canonical, robots, sitemap, and schema agree.

## Technical implementation areas
- Refactor the current pair rendering into shared matchup, decision, criterion-section, evidence, and related-comparison components.
- Extend the comparison-pack types and adapters so researched and generated pages use the same rendering contract.
- Centralise pair orientation and course-label formatting in the comparison data layer.
- Keep the existing SSR route architecture and selective indexing utilities.
- Reuse university logos/campus assets and existing lead tracking; do not rebuild the project or change unrelated pages.

## Expected outcome
This makes DegreeKhojo’s comparison pages clearer and more evidence-led than the references while protecting index quality. It should improve relevance, engagement, internal authority, and lead intent; however, it cannot by itself erase the large backlink/authority gap, so off-site authority work remains necessary after the on-page system is complete.
