# Tabbed section reading experience for course pages

## Why the competitor pages look different

On CollegeVidya and CollegeSathi the course page is one long page, but only one section is shown at a time. Clicking a name in the section bar swaps the visible block. Two things matter here:

1. All the other sections are still present in the page's HTML — they are only visually hidden with CSS. Google reads hidden-but-present text, so they lose nothing in search while the visitor sees a short, focused page.
2. The visitor sees roughly one screen of content instead of a 20,000-word scroll, so they read more, click more, and reach the enquiry form faster.

Our page already has every section and a sticky section bar, but all sections are stacked and open. That is not the reason for the ranking gap — the content is there and indexable — but it does hurt time-on-page, scroll depth and enquiry clicks, and those engagement signals feed back into ranking over time.

Short answer: yes, adopt this pattern. It is a presentation change only. No content is removed, no URL changes, no SEO architecture changes.

## What will change for a visitor

- The sticky bar under the header becomes the real navigation for the page: tap a name, that section appears immediately below it.
- One section is shown at a time. The first section (Overview) is open by default.
- Under each section there is a "Next: <name>" button so a visitor can move forward without going back to the bar.
- A "Show everything on one page" toggle stays available for people who prefer the long read, and it is the default when printing.
- On a phone the bar stays swipeable and the active chip scrolls into view, exactly as it does now.
- A visitor arriving from a search result or a shared link with a section in the address (for example ...#fees) lands with that section already open.
- The enquiry form and the sidebar stay visible on every section, so the lead capture is never behind a scroll.

## Where it applies

- Course pages (Online MBA, MCA, BBA, BCA, B.Com, M.Com, BA, MA, M.Sc) — the main template.
- University pages and university-course pages — same treatment, same component.
- Section sub-pages (for example the fees-only page) stay exactly as they are; they are already short and single-topic.
- Blog, comparison, tool and policy pages are untouched.

## Search safety rules built into the plan

- Every section stays in the served HTML at all times; hidden sections use a CSS rule, never conditional rendering. This is what keeps the indexed content identical to today.
- Section headings keep their current heading levels and IDs, so existing in-page links, the table of contents and structured data keep working.
- No change to titles, descriptions, canonicals, sitemap or internal link targets.
- The FAQ block stays open at the bottom of every section view so the FAQ markup and the page's answer text are always in view.

## Technical section

- New component `src/components/common/SectionTabs.tsx`:
  - Accepts the same `sections` array already computed in `CoursePageTemplate` and renders the existing `SectionNav` chips as buttons that set active state.
  - Wraps children in a context; a `SectionPanel` child registers by its slug and renders `<section id={slug} hidden-by-css>` using a `data-active` attribute plus `[data-active="false"]{display:none}` in `src/styles.css` — content stays in the DOM for SSR and crawlers.
  - Reads `location.hash` on mount (and on hashchange) to open the matching panel; updates the hash with `history.replaceState` when a chip is clicked, so no route change and no scroll jump.
  - "Show all" state persisted in `localStorage`; when on, all panels get `data-active="true"`.
  - Adds `@media print { [data-active] { display: block } }`.
- `SectionNav.tsx` gains an optional `mode="tabs"` with `onSelect`, `active` props; the current scroll-spy behaviour is kept as the default so any page still using anchors is unaffected.
- `CoursePageTemplate.tsx`: wrap the existing `<main>` children in `SectionTabs` and convert each `<Section title=...>` call into `<SectionPanel name=...>` around it. No section content is edited. Sections currently rendered between blocks (`NextStep`, `PromoBanner`, `SectionBanner`) are attached to the panel they follow so they do not float outside the tab system.
- Add a `SectionFooterNav` (Previous / Next) rendered at the bottom of each panel from the same context.
- `src/routes/universities.$slug.index.tsx` and `universities.$slug.courses.$course.tsx` (and `DetailLayout` where it owns the section list) get the same wrapper.
- Accessibility: chips get `role="tab"`, `aria-selected`, `aria-controls`; panels get `role="tabpanel"` and `aria-labelledby`; arrow-key navigation across chips.
- Analytics: fire the existing tracking helper on each section open (`section_view`, with the section name) so scroll-depth is replaced by a real engagement metric in Clarity/GA.

## Verification

- Typecheck.
- Confirm the served HTML for `/courses/online-bba` still contains every section's text (fetch and grep for a phrase from the last section) — this is the proof that indexing is unchanged.
- Phone and desktop check of one course page and one university page: chip switching, hash deep-link, Previous/Next, "Show all", no horizontal overflow, no console errors.
