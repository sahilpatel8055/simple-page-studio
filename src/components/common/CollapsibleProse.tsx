import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Long overview copy, shortened on screen. Every paragraph stays in the served
 * HTML (hidden with CSS only) so search engines still read the full text while
 * the visitor sees a short, scannable block.
 */
export function CollapsibleProse({
  paragraphs,
  visible = 2,
  label = "overview",
}: {
  paragraphs: string[];
  /** Paragraphs shown before the reader expands. */
  visible?: number;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const hidden = Math.max(0, paragraphs.length - visible);

  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
      {paragraphs.map((p, i) => (
        <p key={p.slice(0, 40)} className={!open && i >= visible ? "hidden print:block" : ""}>
          {p}
        </p>
      ))}
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-soft/50 px-3.5 py-1.5 text-[0.8rem] font-bold text-brand transition hover:bg-brand-soft print:hidden"
        >
          {open ? `Show less` : `Read the full ${label}`}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}
