/**
 * Cannibalisation audit — run with: bun scripts/audit-intent.ts
 *
 * Fails loudly when two pages claim the same primary query, so new universities
 * and courses can be added without creating "same page, different name" pages.
 */
import { findCannibalisation, routeForQuery, siteIntentClaims } from "../src/lib/intentMap";

const claims = siteIntentClaims();
const clashes = findCannibalisation(claims);

console.log(`Pages with a declared primary intent: ${claims.length}`);
if (clashes.length === 0) {
  console.log("No cannibalisation: every primary query is owned by exactly one page.");
} else {
  console.log(`\n${clashes.length} cannibalisation issue(s):`);
  for (const c of clashes) console.log(`  "${c.query}" -> ${c.pages.map((p) => p.path).join(", ")}`);
}

const samples = [
  "online mba",
  "lpu online mba",
  "lpu online mba fees",
  "best online mba for working professionals",
  "amity vs lpu online mba",
];
console.log("\nQuery routing spot-check:");
for (const q of samples) {
  const r = routeForQuery(q);
  console.log(`  ${q.padEnd(46)} -> ${r ? `${r.path} [${r.kind}/${r.modifier}]` : "no owner"}`);
}

process.exit(clashes.length ? 1 : 0);
