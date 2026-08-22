/**
 * Turns a generated blog pack (`pack/*.json`) into the `Article` / `PostContent`
 * shapes the site already uses.
 *
 * The generator keeps a `variant` per blog (university guide, course guide,
 * admission, eligibility). The adapter uses it for differentiated presentation:
 * cover artwork, an entity link block and a variant-specific call to action —
 * so the four kinds of page do not read as one identical layout.
 */
import type { PostBlock, PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";
import { blogBanners } from "@/lib/blogBanners";

export type PackVariant = "university" | "course" | "admission" | "eligibility";

export interface PackEntry {
  article: Article;
  variant: PackVariant;
  university: string;
  course: string | null;
  post: {
    intro: string;
    keyTakeaways: string[];
    updated: string;
    sections: { heading: string; blocks: PostBlock[] }[];
    faqs: { question: string; answer: string }[];
    sources?: { label: string; href: string }[];
    related?: { label: string; href: string }[];
  };
}

const base = { reviewer: "Kartik Ahuja", reviewerRole: "Education Research Lead, Degreekhojo" };

const ctaFor = (variant: PackVariant, label: string): PostBlock => {
  switch (variant) {
    case "course":
      return {
        kind: "cta",
        title: `Get the ${label} fee and eligibility breakdown`,
        body: "Share your details and a counsellor will send the semester-wise fee sheet and the documents you need.",
        buttonLabel: "Request fee details",
      };
    case "admission":
      return {
        kind: "cta",
        title: "Need help with the application form?",
        body: "We walk you through registration, document upload and fee payment so the application is not rejected on a technicality.",
        buttonLabel: "Talk to a counsellor",
      };
    case "eligibility":
      return {
        kind: "cta",
        title: "Not sure you meet the criteria?",
        body: "Send us your qualification details and we will confirm which programmes you are eligible for this session.",
        buttonLabel: "Check my eligibility",
      };
    default:
      return {
        kind: "cta",
        title: `Considering ${label}?`,
        body: "Compare programmes, fees and approvals with a counsellor before you apply.",
        buttonLabel: "Get free guidance",
      };
  }
};

const linksFor = (entry: PackEntry): PostBlock | null => {
  const items = entry.post.related ?? [];
  if (!items.length) return null;
  const title =
    entry.variant === "course"
      ? "Programme pages and comparisons"
      : entry.variant === "university"
        ? "Explore this university"
        : "Admission resources";
  return { kind: "links", title, items };
};

/** Cover art: course blogs reuse the course banner, others fall back to the pack default. */
const bannerFor = (entry: PackEntry): string | undefined =>
  entry.course && blogBanners[entry.course] ? entry.course : undefined;

export interface PackOutput {
  articles: Article[];
  posts: Record<string, PostContent>;
  variants: Record<string, PackVariant>;
  courses: Record<string, string>;
}

export function fromPack(entries: PackEntry[], label: string): PackOutput {
  const articles: Article[] = [];
  const posts: Record<string, PostContent> = {};
  const variants: Record<string, PackVariant> = {};
  const courses: Record<string, string> = {};

  for (const entry of entries) {
    const slug = entry.article.slug;
    articles.push(entry.article);
    variants[slug] = entry.variant;
    if (entry.course) courses[slug] = entry.course;

    const sections = entry.post.sections.map((s) => ({
      heading: s.heading,
      blocks: [...s.blocks],
    }));
    const links = linksFor(entry);
    const tail = sections[sections.length - 1];
    if (tail) {
      if (links) tail.blocks.push(links);
      tail.blocks.push(
        ctaFor(entry.variant, entry.course ? entry.article.title.split(":")[0]! : label),
      );
    }

    const content: PostContent = {
      ...base,
      intro: entry.post.intro,
      keyTakeaways: entry.post.keyTakeaways,
      updated: entry.post.updated,
      sections,
      faqs: entry.post.faqs,
    };
    const banner = bannerFor(entry);
    if (banner) content.banner = banner;
    if (entry.post.sources?.length) content.sources = entry.post.sources;
    if (entry.post.related?.length) content.related = entry.post.related;
    posts[slug] = content;
  }

  return { articles, posts, variants, courses };
}
