# Update homepage title

## What we will do
Update the homepage title in `src/routes/index.tsx` from the current text to:

`Top Online & Distance Universities: Compare Fees, Programs and EMI`

## Why
The new title better reflects the site scope (both online and distance universities) and keeps the keyword focus on fees, programs and EMI.

## Scope
- One-line string change in `src/routes/index.tsx`.
- No other metadata, routes, or components touched unless the same `title` constant is reused elsewhere and needs alignment.

## Checklist
- [ ] Update `const title` in `src/routes/index.tsx`.
- [ ] Verify the change renders in the page `<title>` after build/preview.
