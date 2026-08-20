/**
 * Phase 5 SEO audit — run with: bun scripts/audit-intent.ts
 *
 * Reports keyword ownership, cannibalisation and cluster coverage across every
 * live page type (university, university+course, pillar, comparison, blog).
 * Exits non-zero when two pages claim the same primary query.
 */
import {
  findCannibalisation,
  routeForQuery,
  siteIntentClaims,
  INTENT_OWNERSHIP,
} from "../src/lib/intentMap";
import {
  classifyKeyword,
  courseKeywordCluster,
  universityKeywordCluster,
} from "../src/lib/keywordClusters";
import { programmes, universities } from "../src/data";

const claims = siteIntentClaims();
const byKind = claims.reduce<Record<string, number>>(
  (acc, c) => ({ ...acc, [c.kind]: (acc[c.kind] ?? 0) + 1 }),
  {},
);

console.log("Pages with a declared primary intent:", claims.length);
for (const [kind, n] of Object.entries(byKind)) {
  console.log(
    `  ${kind.padEnd(18)} ${String(n).padStart(4)}  owns: ${INTENT_OWNERSHIP[kind as keyof typeof INTENT_OWNERSHIP]?.owns ?? "-"}`,
  );
}

const clashes = findCannibalisation(claims);
if (clashes.length === 0) {
  console.log("\nNo cannibalisation: every primary query is owned by exactly one page.");
} else {
  console.log(`\n${clashes.length} cannibalisation issue(s):`);
  for (const c of clashes)
    console.log(`  "${c.query}" -> ${c.pages.map((p) => p.path).join(", ")}`);
}

console.log("\nCluster coverage:");
for (const p of programmes.slice(0, 12)) {
  console.log(`  ${p.slug.padEnd(24)} ${courseKeywordCluster(p.slug).length} classified keywords`);
}
console.log(
  `  universities mapped: ${universities.filter((u) => universityKeywordCluster(u.slug)).length}/${universities.length}`,
);

const samples = [
  "online mba",
  "online mba fees",
  "lpu online mba",
  "lpu online mba fees",
  "best online mba universities",
  "online mba eligibility",
  "online mba after graduation",
  "is online mca valid for jobs",
];
console.log("\nQuery routing + intent classification:");
for (const q of samples) {
  const r = routeForQuery(q);
  const c = classifyKeyword(q);
  console.log(
    `  ${q.padEnd(32)} ${c.intent.padEnd(24)} ${c.cluster.padEnd(14)} -> ${r ? r.path : "no owner"}`,
  );
}

process.exit(clashes.length ? 1 : 0);
