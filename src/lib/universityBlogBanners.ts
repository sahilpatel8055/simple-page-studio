import amity from "@/assets/blog/amity-online-hero-banner.jpg";
import lpu from "@/assets/blog/lpu-online-hero-banner.jpg";
import cu from "@/assets/blog/chandigarh-online-hero-banner.jpg";
import manipal from "@/assets/blog/manipal-online-hero-banner.jpg";
import ycmou from "@/assets/blog/ycmou-hero-banner.jpg";

/**
 * University-specific blog hero artwork, keyed by blog slug.
 * Used as the article hero and as the card cover on listings.
 */
export const universityBlogBanners: Record<string, string> = {
  "amity-online-mba-2026-fees-eligibility-careers": amity,
  "lpu-online-mba-2026-27-complete-guide": lpu,
  "cu-online-mba-2026-27-complete-guide": cu,
};

/** Banners ready for Manipal and YCMOU blogs (no published blog yet). */
export const pendingUniversityBanners = { manipal, ycmou };

export const universityBlogBanner = (slug: string): string | undefined =>
  universityBlogBanners[slug];