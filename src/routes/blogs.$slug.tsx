import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailLayout } from "@/components/templates/DetailLayout";
import {
  KeyTakeaways,
  MobileToc,
  PostBody,
  PostByline,
  PostSources,
} from "@/components/post/PostArticle";
import { ArticleCard } from "@/components/cards";
import { RelatedContent } from "@/components/templates/DetailLayout";
import { articles, news } from "@/lib/content";
import { getPostContent } from "@/data/posts";
import { blogBanner } from "@/lib/blogBanners";
import { familyDefs } from "@/lib/courseFamily";
import { universityByBlogSlug } from "@/data/university-blogs";
import { BlogEntityLinks } from "@/components/post/BlogUniversities";

import { articleSchema, breadcrumbSchema, canonical, faqSchema, jsonLd, pageMeta } from "@/lib/seo";

const all = [...articles, ...news];

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }) => {
    const item = all.find((a) => a.slug === params.slug);
    const post = getPostContent(params.slug);
    if (!item || !post) throw notFound();
    return { item, post };
  },
  head: ({ params, loaderData }) => {
    const path = `/blogs/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { item, post } = loaderData;
    const description = post.intro.slice(0, 155);
    return {
      meta: pageMeta({
        title: item.title,
        description,
        path,
        type: "article",
        author: item.author,
        publishedTime: item.date,
        modifiedTime: post.updated,
        section: item.category,
        tags: item.tags,
        keywords: item.tags,
      }),
      links: canonical(path),
      scripts: [
        jsonLd(
          articleSchema({
            headline: item.title,
            description,
            path,
            author: item.author,
            datePublished: item.date,
            dateModified: post.updated,
            type: "BlogPosting",
          }),
        ),
        jsonLd(faqSchema(post.faqs)),
        jsonLd(
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blogs", href: "/blogs" },
            { name: item.title, href: path },
          ]),
        ),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { item, post } = Route.useLoaderData();
  const familySlug = familyDefs.find((f) =>
    new RegExp(`(^|-)${f.shortName.toLowerCase().replace(/[^a-z]/g, "")}(-|$)`).test(item.slug),
  )?.slug;
  // Blogs that belong to one university never show the multi-university strip.
  const showUniversities = !universityByBlogSlug[item.slug];
  const toc = [
    "Key takeaways",
    ...post.sections.flatMap((s, i) =>
      familySlug && showUniversities && i === 0 ? [s.heading, "Universities"] : [s.heading],
    ),
    ...(post.sources?.length ? ["Sources & references"] : []),
    "FAQs",
  ];

  const related = all
    .filter((a) => a.slug !== item.slug && a.categorySlug === item.categorySlug)
    .slice(0, 2);

  const banner = blogBanner(post.banner);

  return (
    <DetailLayout
      crumbs={[
        { name: "Blogs", href: "/blogs" },
        { name: item.title, href: `/blogs/${item.slug}` },
      ]}
      hero={
        banner ? (
          <img
            src={banner}
            alt={item.title}
            width={1280}
            height={640}
            className="aspect-[2/1] w-full rounded-2xl border border-border object-cover"
          />
        ) : undefined
      }
      eyebrow={item.category}
      title={item.title}
      subtitle={post.intro}
      meta={<PostByline item={item} post={post} />}
      tocSections={toc}

      faqs={post.faqs}
      related={
        related.length ? (
          <RelatedContent>
            {related.map((r) => (
              <ArticleCard key={r.slug} item={r} />
            ))}
          </RelatedContent>
        ) : undefined
      }
    >
      <KeyTakeaways items={post.keyTakeaways} />
      <MobileToc sections={toc} />
      <PostBody post={post} familySlug={familySlug} showUniversities={showUniversities} />
      <BlogEntityLinks universitySlug={universityByBlogSlug[item.slug]} familySlug={familySlug} />
      {post.sources?.length ? <PostSources items={post.sources} /> : null}
    </DetailLayout>
  );
}
