import amity from "@/assets/blog/amity-online-hero-banner.jpg";
import lpu from "@/assets/blog/lpu-online-hero-banner.jpg";
import chandigarh from "@/assets/blog/chandigarh-online-hero-banner.jpg";
import manipal from "@/assets/blog/manipal-online-hero-banner.jpg";
import ycmou from "@/assets/blog/ycmou-hero-banner.jpg";

/** Blog slug -> bespoke university hero banner. */
export const universityBlogBanners: Record<string, string> = {
  "amity-online-mba-2026-fees-eligibility-careers": amity,
  "lpu-online-mba-2026-27-complete-guide": lpu,
  "lpu-online-mba-fees-subjects-specialisations-2026": lpu,
  "cu-online-mba-2026-27-complete-guide": chandigarh,
  "manipal-online-mba-2026-27-complete-guide": manipal,
  "ycmou-online-mba-2026-27-complete-guide": ycmou,
};

export const universityBlogBanner = (slug: string) => universityBlogBanners[slug];
