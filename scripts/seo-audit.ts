/**
 * Technical SEO QA script.
 *
 *   bun scripts/seo-audit.ts             # static audit (routes, sitemap, domain hygiene)
 *   bun scripts/seo-audit.ts --live      # additionally crawls a sample of rendered pages
 *
 * Exits non-zero when a CRITICAL SEO condition is found, so it can gate a build.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "../src/lib/seo";
import { sitemapEntries } from "../src/routes/sitemap[.]xml";

const critical: string[] = [];
const warn: string[] = [];

/* ------------------------------ 1. Domain ------------------------------- */

if (!/^https:\/\/[a-z0-9.-]+$/i.test(SITE_URL)) critical.push(`SITE_URL is not a bare https origin: ${SITE_URL}`);
if (/localhost|lovable\.app|127\.0\.0\.1/i.test(SITE_URL)) critical.push(`SITE_URL points at a non-production host: ${SITE_URL}`);

/* --------------------------- 2. Route inventory -------------------------- */

const ROUTES_DIR = join(process.cwd(), "src/routes");
const routeFiles = readdirSync(ROUTES_DIR, { recursive: true })
  .map(String)
  .filter((f) => /\.tsx?$/.test(f) && !f.startsWith("api/"));

const IGNORED = new Set(["__root.tsx", "sitemap[.]xml.ts", "README.md"]);
const layoutOnly = (src: string) => /<Outlet\s*\/>/.test(src) && !/pageMeta\(/.test(src);

let indexable = 0;
let redirectOnly = 0;
const missingCanonical: string[] = [];
const missingMeta: string[] = [];

for (const file of routeFiles) {
  if (IGNORED.has(file)) continue;
  const src = readFileSync(join(ROUTES_DIR, file), "utf8");
  if (/throw redirect\(/.test(src) && !/pageMeta\(/.test(src)) {
    redirectOnly++;
    if (!/statusCode:\s*301/.test(src)) critical.push(`${file}: legacy redirect is not a 301`);
    continue;
  }
  if (layoutOnly(src)) continue;
  // Some routes build head() through a shared helper (e.g. sectionHead) — that still counts.
  const delegatesHead = /head:\s*\(\{[^}]*\}\)\s*=>\s*\w+Head\(/.test(src);
  if (delegatesHead) {
    indexable++;
    continue;
  }
  if (!/pageMeta\(/.test(src)) {
    missingMeta.push(file);
    continue;
  }
  indexable++;
  if (!/canonical\(/.test(src)) missingCanonical.push(file);
}

missingMeta.forEach((f) => warn.push(`${f}: no pageMeta() call (layout or non-indexable?)`));
missingCanonical.forEach((f) => critical.push(`${f}: pageMeta() without canonical()`));

/* ----------------------- 3. Domain hygiene in source --------------------- */

const scanDirs = ["src/lib", "src/routes", "src/components"];
const badHostRe = /(localhost:\d+|https?:\/\/[a-z0-9-]+\.lovable\.app)/i;
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
for (const dir of scanDirs) {
  for (const file of walk(join(process.cwd(), dir))) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const src = readFileSync(file, "utf8");
    if (badHostRe.test(src)) critical.push(`${file}: contains a localhost/lovable.app URL`);
  }
}

/* ------------------------------ 4. Sitemap ------------------------------- */

const entries = sitemapEntries();
const paths = entries.map((e) => e.path);
const dupes = paths.filter((p, i) => paths.indexOf(p) !== i);
if (dupes.length) critical.push(`sitemap contains ${dupes.length} duplicate URLs (e.g. ${dupes[0]})`);
paths.forEach((p) => {
  if (!p.startsWith("/")) critical.push(`sitemap entry is not a root-relative path: ${p}`);
  if (/[?#]/.test(p)) critical.push(`sitemap entry contains a query/fragment: ${p}`);
});
if (paths.length === 0) critical.push("sitemap is empty");

/* ------------------------------- 5. Robots ------------------------------- */

const robots = readFileSync(join(process.cwd(), "public/robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) critical.push("robots.txt missing absolute Sitemap directive");
if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) critical.push("robots.txt blocks the whole site");
["\\.css", "\\.js", "/assets"].forEach((r) => {
  if (new RegExp(`Disallow:.*${r}`).test(robots)) critical.push(`robots.txt blocks a render-critical resource (${r})`);
});

/* -------------------------------- 6. Live -------------------------------- */

const live = process.argv.includes("--live");
if (live) {
  const base = process.env["SEO_AUDIT_BASE"] ?? "http://localhost:8080";
  const sample = [...new Set(["/", ...paths.filter((_, i) => i % Math.ceil(paths.length / 40) === 0)])].slice(0, 40);
  const titles = new Map<string, string>();
  for (const p of sample) {
    const res = await fetch(`${base}${p}`);
    if (!res.ok) {
      critical.push(`live: ${p} returned ${res.status}`);
      continue;
    }
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? "";
    const desc = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? "";
    const canon = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/gi)].map((m) => m[1]);
    const h1 = [...html.matchAll(/<h1[\s>]/gi)].length;
    const noindex = /name="robots"[^>]+content="[^"]*noindex/i.test(html);

    if (!title) critical.push(`live: ${p} missing <title>`);
    if (/undefined|null|unavailable|not found/i.test(title)) critical.push(`live: ${p} has a placeholder title "${title}"`);
    if (!desc) critical.push(`live: ${p} missing meta description`);
    if (canon.length !== 1) critical.push(`live: ${p} has ${canon.length} canonical tags`);
    else if (!canon[0]!.startsWith(SITE_URL)) critical.push(`live: ${p} canonical is not on ${SITE_URL}: ${canon[0]}`);
    if (h1 === 0) critical.push(`live: ${p} has no H1`);
    if (h1 > 1) warn.push(`live: ${p} has ${h1} H1 elements`);
    if (noindex) critical.push(`live: ${p} is in the sitemap but noindex`);
    if (!/property="og:image"/.test(html)) warn.push(`live: ${p} missing og:image`);
    if (!/name="twitter:image"/.test(html)) warn.push(`live: ${p} missing twitter:image`);

    for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(m[1]!);
      } catch {
        critical.push(`live: ${p} has malformed JSON-LD`);
      }
    }
    const prev = [...titles.entries()].find(([, t]) => t === title);
    if (prev) critical.push(`live: duplicate title on ${p} and ${prev[0]}`);
    titles.set(p, title);
  }
}

/* ------------------------------- Report ---------------------------------- */

console.log("=== DegreeKhojo SEO audit ===");
console.log(`Production origin : ${SITE_URL}`);
console.log(`Route files       : ${routeFiles.length}`);
console.log(`Indexable routes  : ${indexable}`);
console.log(`Redirect routes   : ${redirectOnly}`);
console.log(`Sitemap URLs      : ${paths.length} (0 duplicates expected)`);
console.log(`Live crawl        : ${live ? "on" : "off"}`);
console.log("");
if (warn.length) {
  console.log(`Warnings (${warn.length}):`);
  warn.slice(0, 50).forEach((w) => console.log(`  - ${w}`));
  console.log("");
}
if (critical.length) {
  console.log(`CRITICAL (${critical.length}):`);
  critical.slice(0, 100).forEach((c) => console.log(`  ! ${c}`));
  process.exit(1);
}
console.log("No critical SEO failures.");
