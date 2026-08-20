/**
 * Presentation helpers for editorial (blog) tables.
 *
 * Blogs restate researched fee tables. On a phone a nine-digit rupee string
 * wraps badly, so amounts are compacted to `k` / `L` for display only — the
 * underlying data is never rewritten. University names in the first column are
 * matched against the master dataset so a reader can jump to that university.
 */
import { allUniversities } from "@/lib/universityData";

/** ₹1,75,000 -> ₹1.75L · ₹85,000 -> ₹85k. Non-money text passes through. */
export function compactMoney(text: string): string {
  return text.replace(/₹\s?([\d,]+(?:\.\d+)?)/g, (whole, num: string) => {
    const n = Number(String(num).replace(/,/g, ""));
    if (!Number.isFinite(n) || n < 1000) return whole;
    if (n >= 100000) {
      const l = n / 100000;
      return `₹${trim(l)}L`;
    }
    return `₹${trim(n / 1000)}k`;
  });
}

const trim = (n: number) => String(Number(n.toFixed(2)));

type UniIndex = { slug: string; keys: string[] };

let index: UniIndex[] | null = null;

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(university|online|the|of|deemed|to|be)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function getIndex(): UniIndex[] {
  if (index) return index;
  index = allUniversities().map((u) => {
    const anyU = u as unknown as Record<string, unknown>;
    const name = String(anyU["name"] ?? anyU["university_name"] ?? "");
    const short = String(anyU["short_name"] ?? anyU["shortName"] ?? "");
    const slug = String(anyU["slug"] ?? "");
    return { slug, keys: [norm(name), norm(short)].filter(Boolean) };
  });
  return index;
}

/** Best-effort university slug for a free-text cell such as "Amity Online". */
export function universitySlugForLabel(label: string): string | undefined {
  const key = norm(label);
  if (!key || key.length < 3) return undefined;
  const hit = getIndex().find((u) =>
    u.keys.some((k) => k && (k === key || k.includes(key) || key.includes(k))),
  );
  return hit?.slug;
}

/** Keeps one row per university (first column) while preserving order. */
export function dedupeByFirstCell(rows: string[][]): string[][] {
  const seen = new Set<string>();
  return rows.filter((r) => {
    const key = norm(String(r[0] ?? ""));
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
