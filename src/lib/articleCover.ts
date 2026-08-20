import { blogBanners } from "@/lib/blogBanners";
import { universityBlogBanner } from "@/lib/universityBlogBanners";
import { campusImage } from "@/lib/assets";
import { universityByBlogSlug } from "@/data/university-blogs";
import type { Article } from "@/lib/content";

const fallbackBanners = Object.values(blogBanners);

/** Deterministic cover for any article: campus photo for university blogs, else a stock banner. */
export function articleCover(article: Article): string | undefined {
  const bespoke = universityBlogBanner(article.slug);
  if (bespoke) return bespoke;
  const uni = universityByBlogSlug[article.slug];
  const campus = uni ? campusImage(uni) : undefined;
  if (campus) return campus;
  if (!fallbackBanners.length) return undefined;
  const i =
    article.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % fallbackBanners.length;
  return fallbackBanners[i];
}
