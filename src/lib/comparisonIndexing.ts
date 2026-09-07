/**
 * Which comparison pages we allow search engines to index.
 *
 * The dataset can generate 140+ university pairs, but only a couple of dozen
 * have real search demand ("Amity vs Manipal", "IGNOU vs DU SOL", …). Indexing
 * the long tail dilutes the pages that matter and reads as thin content, so
 * the rest stay crawlable-but-unindexed and out of the sitemap.
 */

/** Curated head-to-heads, chosen on search demand. Order-insensitive. */
const INDEXABLE_PAIRS: string[] = [
  "amity-online-vs-manipal-university-jaipur",
  "amity-online-vs-lpu-online",
  "amity-online-vs-nmims-online",
  "amity-online-vs-jain-online",
  "amity-online-vs-chandigarh-university-online",
  "amity-online-vs-dpu-online",
  "amity-online-vs-sharda-online",
  "amity-online-vs-uttaranchal-online",
  "amity-online-vs-ignou",
  "manipal-university-jaipur-vs-lpu-online",
  "manipal-university-jaipur-vs-nmims-online",
  "manipal-university-jaipur-vs-jain-online",
  "manipal-university-jaipur-vs-chandigarh-university-online",
  "manipal-university-jaipur-vs-dpu-online",
  "manipal-university-jaipur-vs-ignou",
  "lpu-online-vs-chandigarh-university-online",
  "lpu-online-vs-jain-online",
  "lpu-online-vs-nmims-online",
  "lpu-online-vs-ignou",
  "nmims-online-vs-jain-online",
  "nmims-online-vs-dpu-online",
  "jain-online-vs-chandigarh-university-online",
  "chandigarh-university-online-vs-dpu-online",
  "ignou-vs-du-sol",
  "ignou-vs-ksou-mysuru",
  "ignou-vs-nsou",
];

/** Course pairs worth indexing: the head-to-head above, on these courses only. */
const INDEXABLE_COURSES = new Set(["mba", "mca", "bba", "bca", "bcom", "mcom"]);

const key = (slug: string) => {
  const parts = slug.split("-vs-");
  return parts.length === 2 ? [parts[0], parts[1]].sort().join("-vs-") : slug;
};

const indexSet = new Set(INDEXABLE_PAIRS.map(key));

/** Pair slugs, in either order, that we submit and allow to be indexed. */
export const isIndexablePair = (slug: string) => indexSet.has(key(slug));

/** Course-level comparison (`/compare/mba/a-vs-b`) indexability. */
export const isIndexableCoursePair = (courseSlug: string, pairSlug: string) =>
  isIndexablePair(pairSlug) && INDEXABLE_COURSES.has(courseSlug.replace(/^online-/, ""));

export const indexablePairSlugs = () => [...indexSet];

/** `noindex, follow` meta for the long-tail pages — still crawled for links. */
export const robotsForPair = (indexable: boolean) =>
  indexable ? [] : [{ name: "robots", content: "noindex, follow" }];
