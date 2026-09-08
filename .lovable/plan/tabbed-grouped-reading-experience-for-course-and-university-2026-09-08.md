# Tabbed, grouped reading experience for course and university pages

Today a course page stacks ~24 sections in one endless scroll, with a sticky bar of 24 chips under the header. Competitor pages (CollegeVidya, CollegeSathi) show 6-8 names in that bar; tapping one swaps in a short, focused group of related blocks, with a "Next" button at the bottom.

This is a presentation change only. No content is removed, no URL changes, no metadata or sitemap changes.

## What a visitor will see

- The sticky bar becomes the real navigation: 8 group names instead of 24 block names.
- One group is shown at a time; **Overview** is open by default.
- At the bottom of each group: a full-width **"Next: <group name>"** button and a small "Back" link.
- One "Get fees on WhatsApp / Talk to a counsellor" strip after the second group, and one at the end — not on every group.
- A **"Read the full page"** toggle opens everything for people who prefer scrolling; it is also the default when printing, and the choice is remembered.
- On a phone the bar stays swipeable and the active chip scrolls into view, as it does now.
- A link with a section in the address (for example `...#fees`) opens the group that contains it, already scrolled to the right place.
- The enquiry form and sidebar stay visible on every group, so lead capture is never behind a scroll.

## The eight groups (course pages)

Blocks are grouped by the question a visitor is asking at that moment.

1. **Overview** — at a glance table, overview, who should consider it, who it may not suit (the "may not suit you if" half of the current worth-it block moves up here so the honest answer is early).
2. **Universities & Fees** — universities offering it, fee table, fee notes, scholarships and waivers, compare-universities tool.
3. **Eligibility & Admission** — eligibility, documents, admission steps, how it works / intake cycles.
4. **Syllabus & Specialisations** — specialisations, curriculum, learning format, exam pattern.
5. **Career & Salary** — career roles, industries, salary, placement support.
6. **Validity & Worth It** — recognition and validity, how to verify before you pay, advantages and limitations, is it worth it, vs regular, vs distance, how to choose.
7. **Reviews** — student reviews, write a review.
8. **FAQs** — FAQs, related courses and guides.

## Where it applies

- Course pages: Online MBA, MCA, BBA, BCA, B.Com, M.Com, BA, MA, M.Sc.
- University pages: Overview / Courses & Fees / Admission / Exams & Learning / Placement / Approvals & Validity / Reviews / FAQs.
- University-course pages: the course grouping above, minus Universities.
- Unchanged: section sub-pages (fees-only, admission-only — already short and single-topic), blogs, comparisons, tools, policy pages.

## Search safety rules built into the plan

- Every group stays in the served HTML at all times. Hidden groups use a CSS rule, never conditional rendering — indexed content is identical to today.
- Headings, heading levels and section IDs are unchanged, so in-page links, the contents list and structured data keep working.
- No change to titles, descriptions, canonicals, sitemap or internal link targets.
- The FAQ markup stays in the page on every group view.

## Technical section

- `src/lib/pageGroups.ts` — group definitions as data: `{ id, label, blocks: string[] }` for the course map and the university map. The templates map their existing block list onto these groups; nothing per-course is hardcoded.
- `src/components/common/SectionTabs.tsx` — context provider plus `<SectionPanel groupId>` wrapper. Panels render as `<section data-active="true|false" role="tabpanel" aria-labelledby=…>`; `src/styles.css` gets `[data-active="false"]{display:none}` and `@media print{[data-active]{display:block}}`.
- `src/components/common/SectionNav.tsx` — gains optional `mode="tabs"` with `active` / `onSelect`; today's scroll-spy anchor behaviour stays the default so other pages are unaffected. Chips get `role="tab"`, `aria-selected`, `aria-controls`, and arrow-key navigation.
- Hash handling: on mount and on `hashchange`, match the hash against group ids *and* inner block ids, open the owning group, then scroll to the block. Chip clicks update the hash with `history.replaceState` — no route change, no scroll jump.
- `SectionFooterNav` (Previous / Next) rendered from the same context at the bottom of each panel.
- "Read the full page" state persisted in `localStorage`; when on, all panels get `data-active="true"`.
- Wrapped templates: `src/components/templates/CoursePageTemplate.tsx`, `src/routes/universities.$slug.index.tsx`, `src/routes/universities.$slug.courses.$course.tsx`, and `DetailLayout` where it owns the section list. Block content is not edited. Interstitials (`NextStep`, `PromoBanner`, `SectionBanner`) are attached to the group they belong to so nothing floats outside the tab system; the CTA strips are reduced to two positions as described above.
- Analytics: fire the existing tracking helper on each group open (`section_view` with the group name), giving a real engagement metric in place of scroll depth.

## Verification

- Typecheck (`bunx tsgo --noEmit`).
- Fetch the served HTML of `/courses/online-bba` and grep for a phrase from the last group — proof that indexing is unchanged.
- Phone and desktop pass on one course page and one university page: chip switching, deep link into a collapsed group, Next/Back, "Read the full page", no horizontal overflow, no console errors.
