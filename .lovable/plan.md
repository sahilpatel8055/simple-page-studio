# Grouping the course page into a few readable tabs

Right now the bar under the header lists about 24 names. That is too many to scan on a phone and it is why the page feels endless. CollegeVidya and CollegeSathi show 6-8 names only; each name opens a group that contains several related blocks stacked one under the other, with a "Next" button at the bottom of the group.

So the rule is: the bar holds groups, not individual blocks. Inside a group the blocks stay in the order a person naturally asks about them.

## How each block is assigned

A block goes into the group that answers the same question the visitor is asking at that moment. The visitor's questions, in order, are: what is this → who runs it and what does it cost → can I get in and how do I apply → what will I study and how am I tested → what job does it lead to → is it genuine and worth it → what do others say → anything left over.

## The proposed groups

**1. Overview** — the "what is this" group
- At a glance table
- Overview
- Who should consider it
- Who it may not suit (the "may not suit you if" half of the current worth-it block moves here so the honest answer is up front)

**2. Universities & Fees** — the "who runs it, what does it cost" group
- Universities offering it
- Fee table
- Fee notes and what is included
- Scholarships and fee waivers
- Compare universities tool

**3. Eligibility & Admission** — the "can I get in" group
- Eligibility
- Documents required
- Admission steps
- How it works / intake cycles

**4. Syllabus & Specialisations** — the "what will I study" group
- Specialisations
- Curriculum / semester subjects
- Learning format (live and recorded)
- Exam pattern

**5. Career & Salary** — the "what do I get out of it" group
- Career roles
- Industries and career areas
- Salary
- Placement support

**6. Validity & Worth It** — the "is it genuine" group
- Recognition and validity
- How to verify before you pay
- Advantages and limitations
- Is it worth it
- Online vs regular
- Online vs distance
- How to choose

**7. Reviews** — the social proof group
- Student reviews
- Write a review

**8. FAQs** — kept as its own name because it is the most-clicked item on competitor pages
- FAQs
- Related courses and guides

That is 8 names in the bar instead of 24 — the same count the competitor pages use.

## The in-between reading controls

- At the bottom of every group: a full-width **"Next: <group name>"** button, plus a small "Back" link. This is the main way people move through the page, exactly as on CollegeSathi.
- After the second group there is one **"Get fees on WhatsApp / Talk to a counsellor"** strip, and one more at the end. Not on every group — too many CTAs kill the click rate.
- The bar itself stays sticky and swipeable, with the current group highlighted and scrolled into view.
- A **"Read the full page"** toggle opens every group at once for people who prefer scrolling, and it is the default when printing.

## Same treatment on the other page types

- University pages get: Overview / Courses & Fees / Admission / Exams & Learning / Placement / Approvals & Validity / Reviews / FAQs.
- University-course pages get the course grouping above, minus Universities (there is only one).
- Section sub-pages (fees-only, admission-only) stay single-topic and unchanged.

## Search safety

- All groups stay in the served HTML at all times; inactive ones are hidden with CSS only. Nothing is removed from what Google reads.
- Headings, heading levels and section IDs are unchanged, so existing in-page links, structured data and the sitemap keep working.
- A link that points at a block inside a collapsed group (for example ...#fees) opens that group automatically.

## Technical section

- Add `src/lib/pageGroups.ts` holding the group definitions as data: `{ id, label, blocks: string[] }`. The template maps its existing block list onto these groups; nothing per-course is hardcoded, so all nine course families and every university page use the same map.
- New `src/components/common/SectionTabs.tsx` provides context + `<SectionGroup>` wrapper. Panels render as `<section id role="tabpanel" data-active>`; a `[data-active="false"]{display:none}` rule in `src/styles.css` hides them, plus `@media print{[data-active]{display:block}}`.
- `SectionNav.tsx` gains `mode="tabs"` with `active`/`onSelect`, keeping today's scroll-spy behaviour as the default so other pages are unaffected.
- Group state syncs to `location.hash` via `history.replaceState` (no route change, no scroll jump); on mount, the hash is matched against both group ids and inner block ids so deep links still land correctly.
- `SectionFooterNav` (Previous / Next) is rendered from the same context at the bottom of each group.
- `CoursePageTemplate.tsx`, `universities.$slug.index.tsx`, `universities.$slug.courses.$course.tsx` and `DetailLayout` are wrapped; block content itself is not edited. Interstitials (`NextStep`, `PromoBanner`, `SectionBanner`) are attached to the group they belong to.
- Chips get `role="tab"`, `aria-selected`, `aria-controls`, arrow-key navigation; panels get `aria-labelledby`.
- Fire the existing analytics helper on each group open (`section_view` with the group name) so engagement is measurable in Clarity/GA.

## Verification

- Typecheck.
- Fetch the served HTML of `/courses/online-bba` and confirm text from the last group is still present — proof indexing is unchanged.
- Phone and desktop pass on one course page and one university page: chip switching, deep link into a collapsed group, Next/Back, "Read the full page", no horizontal overflow, no console errors.
