import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
  articles,
  careerGuides,
  comparisons,
  news,
  reviews,
  scholarships,
} from "@/lib/content";
import { getPostContent } from "@/data/posts";
import { offerings, programmes, universities as universityRecords } from "@/data";
import { universityPairs } from "@/lib/entities";
import { universitySectionPages } from "@/lib/insightsData";
import { COURSE_SECTION_KEYS } from "@/lib/courseSections";
import { courseFamilyList, familyForProgrammeSlug } from "@/lib/courseFamily";
import { courseContentBySlug } from "@/data/course-pages";
import { canonicalProgrammeSlug } from "@/lib/intentMap";
import { SITE_URL } from "@/lib/seo";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Canonical, indexable, 200-status URLs only — mirrors the app's own indexability rules. */
export function sitemapEntries(): SitemapEntry[] {
  // A programme slug is only canonical when the pillar route would render it (no 301).
  const canonicalProgrammes = [
    ...new Set([
      ...courseFamilyList().filter((f) => Boolean(courseContentBySlug(f.slug))).map((f) => f.slug),
      ...programmes
        .map((p) => p.slug)
        .filter((slug) => !courseContentBySlug(slug))
        .filter((slug) => !familyForProgrammeSlug(slug))
        .filter((slug) => canonicalProgrammeSlug(slug) === slug),
    ]),
  ];

  const staticPaths = [
    "/",
    "/universities",
    "/courses",
    "/compare",
    "/compare/universities",
    "/reviews",
    "/career",
    "/scholarships",
    "/admissions",
    "/rankings",
    "/news",
    "/blogs",
    "/tools",
    "/tools/fee-emi-calculator",
    "/tools/salary-after-course",
    "/counselling",
    "/authors",
    "/categories",
    "/tags",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const entries: SitemapEntry[] = [
    ...staticPaths.map((p) => ({
      path: p,
      changefreq: "weekly" as const,
      priority: p === "/" ? "1.0" : "0.8",
    })),

    // University architecture
    ...universityRecords.map((u) => ({
      path: `/universities/${u.slug}`,
      changefreq: "weekly" as const,
      priority: "0.9",
    })),
    ...universityRecords.flatMap((u) =>
      universitySectionPages(u.slug).map((section) => ({
        path: `/universities/${u.slug}/${section}`,
        changefreq: "weekly" as const,
        priority: "0.7",
      })),
    ),
    ...offerings.map((o) => ({
      path: `/universities/${o.universitySlug}/courses/${o.programmeSlug}`,
      changefreq: "weekly" as const,
      priority: "0.9",
    })),

    // Course architecture — mirrors the pillar route's own canonical/redirect rules.
    ...canonicalProgrammes.map((slug) => ({
      path: `/courses/${slug}`,
      changefreq: "weekly" as const,
      priority: "0.9",
    })),
    // Section sub-pages only exist for course families with editorial content.
    ...courseFamilyList()
      .filter((f) => Boolean(courseContentBySlug(f.slug)))
      .flatMap((f) =>
        COURSE_SECTION_KEYS.map((section) => ({
          path: `/courses/${f.slug}/${section}`,
          changefreq: "monthly" as const,
          priority: "0.6",
        })),
      ),
    // Specialisations only where at least two verified universities offer them.
    ...courseFamilyList().flatMap((family) =>
      family.specialisations
        .filter((s) => s.universities.length >= 2)
        .map((s) => ({
          path: `/courses/${family.slug}/specialisation/${s.slug}`,
          changefreq: "monthly" as const,
          priority: "0.6",
        })),
    ),

    // Comparisons
    ...comparisons.map((c) => ({ path: `/compare/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
    ...universityPairs().map((p) => ({ path: p.path, changefreq: "monthly" as const, priority: "0.7" })),

    // Editorial
    ...articles
      .filter((a) => Boolean(getPostContent(a.slug)))
      .map((a) => ({ path: `/blogs/${a.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
    ...news.map((n) => ({ path: `/news/${n.slug}`, changefreq: "weekly" as const, priority: "0.6" })),
    ...careerGuides.map((c) => ({ path: `/career/${c.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
    ...scholarships.map((s) => ({
      path: `/scholarships/${s.slug}`,
      changefreq: "monthly" as const,
      priority: "0.6",
    })),
    ...reviews.map((r) => ({ path: `/reviews/${r.slug}`, changefreq: "monthly" as const, priority: "0.5" })),

    // Taxonomy detail pages (/categories/:slug, /tags/:slug, /authors/:slug)
    // have no route yet — the index pages above cover them, so they stay out
    // of the sitemap to keep every submitted URL a live 200.
  ];

  // De-duplicate on path, first entry wins.
  const seen = new Set<string>();
  return entries.filter((e) => {
    const key = e.path.replace(/\/+$/, "") || "/";
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = sitemapEntries().map((e) =>
          [
            "  <url>",
            `    <loc>${xmlEscape(`${SITE_URL}${e.path === "/" ? "/" : e.path}`)}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
