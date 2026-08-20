import { submitLead, trackContactClick } from "@/lib/leads";
import { Fragment, useState, type ReactNode } from "react";
import { BlogUniversities } from "@/components/post/BlogUniversities";
import { compactMoney, dedupeByFirstCell, universitySlugForLabel } from "@/lib/blogFormat";
import { getCourseFamily } from "@/lib/courseFamily";
import {
  ArrowRight,
  CalendarClock,
  ListTree,
  CheckCircle2,
  Info,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { DataTable } from "@/components/common/Blocks";
import { ContentSection } from "@/components/templates/DetailLayout";
import type { PostBlock, PostContent } from "@/data/posts";
import type { Article } from "@/lib/content";

/* ------------------------------- byline -------------------------------- */

export function PostByline({ item, post }: { item: Article; post: PostContent }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
        By{" "}
        <AppLink to={`/authors`} className="font-semibold text-foreground hover:text-brand">
          {item.author}
        </AppLink>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        Reviewed by <span className="font-semibold text-foreground">{post.reviewer}</span>,{" "}
        {post.reviewerRole}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
        Published {formatDate(item.date)} · Last updated {formatDate(post.updated)}
      </span>
      <span>{item.readingTime} read</span>
    </div>
  );
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ------------------------------ key facts ------------------------------ */

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <section
      id="key-takeaways"
      className="scroll-mt-36 rounded-2xl border border-brand/30 bg-brand-soft p-5 sm:p-6"
    >
      <h2 className="font-display text-lg font-bold">Key takeaways</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 text-sm leading-relaxed">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------- mobile contents --------------------------- */

const anchor = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Collapsible table of contents shown on phones (sidebar TOC is desktop-only). */
export function MobileToc({ sections }: { sections: string[] }) {
  return (
    <details
      className="not-prose group rounded-2xl border border-border bg-card p-4 lg:hidden"
      open
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-extrabold text-foreground">
        <span className="inline-flex items-center gap-2">
          <ListTree className="h-4 w-4 text-brand" aria-hidden="true" /> Table of contents
        </span>
        <span className="text-xs font-semibold text-muted-foreground group-open:hidden">Show</span>
        <span className="hidden text-xs font-semibold text-muted-foreground group-open:inline">
          Hide
        </span>
      </summary>
      <ol className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
        {sections.map((s, i) => (
          <li key={s} className="flex gap-2 leading-snug">
            <span className="w-5 shrink-0 tabular-nums text-xs font-bold text-brand">{i + 1}.</span>
            <a
              href={`#${anchor(s)}`}
              className="min-h-[1.75rem] text-muted-foreground hover:text-brand"
            >
              {s}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

/* -------------------------------- blocks -------------------------------- */

function Block({ block }: { block: PostBlock }) {
  switch (block.kind) {
    case "p":
      return <p className="leading-relaxed">{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed marker:font-semibold marker:text-brand">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      ) : (
        <ul className="space-y-2">
          {block.items.map((i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return <BlogTable block={block} />;
    case "h3":
      return (
        <h3 className="mt-2 scroll-mt-36 border-l-4 border-brand pl-3 font-display text-[1.05rem] font-extrabold leading-snug text-foreground sm:text-lg">
          {block.text}
        </h3>
      );
    case "note":
      return (
        <div className="flex gap-3 rounded-xl border border-border bg-secondary/60 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground">{block.text}</p>
        </div>
      );
    case "chart":
      return <BarChart block={block} />;
    case "cta":
      return <InlineLeadCTA block={block} />;
    case "promo":
      return <PromoBannerBlock block={block} />;
    case "links":
      return (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {block.title}
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {block.items.map((l) => (
              <li key={l.href}>
                <AppLink to={l.href} className="text-sm font-semibold text-brand hover:underline">
                  {l.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return null;
  }
}

/** Inline horizontal bar chart — pure CSS, no chart dependency. */
function BarChart({ block }: { block: Extract<PostBlock, { kind: "chart" }> }) {
  const max = Math.max(...block.data.map((d) => d.value), 1);
  return (
    <figure className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <figcaption className="text-sm font-bold">{block.title}</figcaption>
      {block.unit && <p className="mt-1 text-xs text-muted-foreground">{block.unit}</p>}
      <div className="mt-4 space-y-3">
        {block.data.map((d) => (
          <div key={d.label}>
            <div className="flex items-baseline justify-between gap-3 text-xs">
              <span className="font-medium">{d.label}</span>
              <span className="tabular-nums text-muted-foreground">{d.display ?? d.value}</span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${Math.max(4, (d.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {block.note && <p className="mt-4 text-xs text-muted-foreground">{block.note}</p>}
    </figure>
  );
}

/** Inline lead-capture form used between article sections. */
function InlineLeadCTA({ block }: { block: Extract<PostBlock, { kind: "cta" }> }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="not-prose rounded-2xl border-2 border-[#7f1813] bg-brand-soft p-5 sm:p-6">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7f1813] px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-white">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Free counselling
      </span>
      <h3 className="mt-3 font-display text-lg font-extrabold leading-snug text-foreground">
        {block.title}
      </h3>
      {block.body && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
      )}
      {sent ? (
        <p className="mt-4 rounded-lg bg-card p-3 text-sm font-semibold text-foreground">
          Thanks — our counsellor will call you shortly with verified fees and eligibility.
        </p>
      ) : (
        <form
          className="mt-4 grid gap-2.5 sm:grid-cols-2"
          onSubmit={(e) => {
            const data = new FormData(e.currentTarget);
            e.preventDefault();
            void submitLead({
              name: String(data.get("name") ?? ""),
              phone: String(data.get("phone") ?? ""),
              form: "Article lead block",
            });
            setSent(true);
          }}
        >
          <input
            required
            name="name"
            placeholder="Your name"
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            required
            name="phone"
            type="tel"
            pattern="[0-9+ ]{10,15}"
            placeholder="Mobile number"
            className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="h-11 rounded-lg bg-[#7f1813] text-sm font-bold text-white transition-opacity hover:opacity-90 sm:col-span-2"
          >
            {block.buttonLabel ?? "Get free guidance"}
          </button>
        </form>
      )}
      <p className="mt-2 text-[0.7rem] text-muted-foreground">
        No spam. Your details are used only for counselling.
      </p>
    </div>
  );
}

/** Promotional strip placed between sections. */
function PromoBannerBlock({ block }: { block: Extract<PostBlock, { kind: "promo" }> }) {
  return (
    <div className="not-prose flex flex-col gap-3 rounded-2xl bg-[#7f1813] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-display text-base font-extrabold leading-snug">{block.title}</p>
        {block.body && <p className="mt-1 text-sm leading-relaxed text-white/85">{block.body}</p>}
      </div>
      {block.href ? (
        <AppLink
          to={block.href}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-sm font-bold text-[#7f1813]"
        >
          {block.ctaLabel ?? "Explore now"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </AppLink>
      ) : (
        <a
          href="tel:+918770012496"
          onClick={() => trackContactClick("Call", "Article CTA")}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-sm font-bold text-[#7f1813]"
        >
          <PhoneCall className="h-4 w-4" aria-hidden="true" />{" "}
          {block.ctaLabel ?? "Talk to a counsellor"}
        </a>
      )}
    </div>
  );
}

/**
 * Editorial table: compacts rupee amounts for phones (₹1.75L / ₹85k), keeps one
 * row per university and links the university column to its own page.
 */
function BlogTable({ block }: { block: Extract<PostBlock, { kind: "table" }> }) {
  const isUniTable = /universit|college|institut/i.test(block.head[0] ?? "");
  const source = isUniTable ? dedupeByFirstCell(block.rows) : block.rows;
  const rows: ReactNode[][] = source.map((r) =>
    r.map((cell, ci) => {
      const text = compactMoney(String(cell ?? ""));
      if (isUniTable && ci === 0) {
        const slug = universitySlugForLabel(String(cell ?? ""));
        if (slug)
          return (
            <AppLink
              key={ci}
              to={`/universities/${slug}`}
              className="font-semibold text-brand hover:underline"
            >
              {text}
            </AppLink>
          );
      }
      return text;
    }),
  );
  return block.caption ? (
    <DataTable caption={block.caption} head={block.head} rows={rows} />
  ) : (
    <DataTable head={block.head} rows={rows} />
  );
}

/**
 * Long sections are clamped to roughly one screen with a "See more" control so
 * scrolling stays manageable on phones and laptops.
 */
function Clamped({ children, clamp }: { children: ReactNode; clamp: boolean }) {
  const [open, setOpen] = useState(false);
  if (!clamp) return <>{children}</>;
  return (
    <div>
      <div className={`relative ${open ? "" : "max-h-[26rem] overflow-hidden sm:max-h-[34rem]"}`}>
        {children}
        {!open && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-brand/40 px-5 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
      >
        {open ? "See less" : "See more"}{" "}
        <ArrowRight className={`h-4 w-4 ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
    </div>
  );
}

/** Rough content weight used to decide whether a section needs clamping. */
function isLong(blocks: PostBlock[]) {
  let weight = 0;
  for (const b of blocks) {
    if (b.kind === "p") weight += Math.ceil(b.text.length / 220);
    else if (b.kind === "list") weight += b.items.length * 0.6;
    else if (b.kind === "table") weight += b.rows.length * 0.8;
    else weight += 1.5;
  }
  return weight > 8;
}

export function PostBody({
  post,
  familySlug,
  showUniversities = true,
}: {
  post: PostContent;
  familySlug?: string | undefined;
  /** University-specific blogs hide the "Universities offering this course" strip. */
  showUniversities?: boolean;
}) {
  const family = familySlug ? getCourseFamily(familySlug) : undefined;
  const pillarAt = post.sections.length > 4 ? Math.floor(post.sections.length / 2) : -1;
  return (
    <>
      {post.sections.map((s, si) => (
        <Fragment key={s.heading}>
          <ContentSection title={s.heading}>
            <Clamped clamp={isLong(s.blocks)}>
              <div className="space-y-4">
                {s.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>
            </Clamped>
          </ContentSection>
          {family && showUniversities && si === 0 && <BlogUniversities familySlug={family.slug} />}

          {family && si === pillarAt && (
            <PromoBannerBlock
              block={{
                kind: "promo",
                title: `Want the full ${family.name} comparison?`,
                body: `Fees, eligibility, specialisations and placement support for every university offering an ${family.name}, side by side.`,
                ctaLabel: `Open the ${family.name} guide`,
                href: `/courses/${family.slug}`,
              }}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}

/* -------------------------------- sources ------------------------------- */

export function PostSources({ items }: { items: { label: string; href: string }[] }) {
  return (
    <section id="sources" className="scroll-mt-36">
      <h2 className="text-lg font-bold">Sources &amp; references</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-brand hover:underline"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
