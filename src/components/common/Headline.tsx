import type { ReactNode } from "react";

/**
 * Renders a headline with its closing words in the brand accent colour
 * (#7f1813) and the rest in the heading ink colour (#060606).
 * Used by every shared heading component so the treatment is site-wide.
 */
/**
 * Renders a headline with its *leading* subject in the brand accent colour —
 * everything before a ":" or "—", otherwise the first `words` words.
 * Used for section headings like "Online MBA at a glance" so the entity name
 * itself is the coloured, eye-catching part.
 */
export function LeadHeadline({ text, words = 2 }: { text: string; words?: number }): ReactNode {
  const trimmed = text.trim();
  const sep = trimmed.search(/[:—–]/);
  if (sep > 0) {
    return (
      <>
        <span className="text-brand">{trimmed.slice(0, sep)}</span>
        {trimmed.slice(sep)}
      </>
    );
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length <= 1) return <>{trimmed}</>;
  const leadCount = Math.min(words, parts.length - 1);
  return (
    <>
      <span className="text-brand">{parts.slice(0, leadCount).join(" ")}</span>{" "}
      {parts.slice(leadCount).join(" ")}
    </>
  );
}

export function AccentHeadline({ text, words = 2 }: { text: string; words?: number }): ReactNode {
  const parts = text.trim().split(/\s+/);
  if (parts.length === 1) return <>{text}</>;
  const accentCount = Math.min(words, Math.max(1, parts.length - 1));
  const head = parts.slice(0, parts.length - accentCount).join(" ");
  const tail = parts.slice(parts.length - accentCount).join(" ");
  return (
    <>
      {head} <span className="text-brand">{tail}</span>
    </>
  );
}
