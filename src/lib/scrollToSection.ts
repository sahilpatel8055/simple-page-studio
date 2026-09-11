/**
 * Scroll a page section to the top of the readable area.
 *
 * Native `#hash` jumps rely on `scroll-padding-top` / `scroll-margin-top`, which
 * silently under-shoot when the sticky header + section chip bar change height
 * (or when layout shifts while smooth-scrolling). This measures the real sticky
 * chrome at click time and re-corrects once the scroll settles.
 */

function stickyOffset() {
  let offset = 0;
  const header = document.querySelector<HTMLElement>("header");
  if (header) {
    const pos = getComputedStyle(header).position;
    if (pos === "sticky" || pos === "fixed") offset += header.offsetHeight;
  }
  const nav = document.querySelector<HTMLElement>('nav[aria-label="Page sections"]');
  if (nav) offset += nav.offsetHeight;
  return offset + 12;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  // Expand a collapsed <details> wrapper so the heading is actually reachable.
  const details = el.closest("details");
  if (details && !details.open) details.open = true;

  const target = () =>
    Math.max(0, el.getBoundingClientRect().top + window.scrollY - stickyOffset());

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: target(), behavior: reduced ? "auto" : "smooth" });

  // Layout can shift while the smooth scroll runs (images, sticky bars).
  // Re-check a few times and snap to the exact position if we drifted.
  let checks = 0;
  const tick = () => {
    checks += 1;
    const want = target();
    if (Math.abs(window.scrollY - want) > 4) {
      window.scrollTo({ top: want, behavior: "auto" });
    }
    if (checks < 3) window.setTimeout(tick, 260);
  };
  window.setTimeout(tick, 420);

  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

/** Click handler for in-page anchors (`href="#section-id"`). */
export function onSectionAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  scrollToSection(id);
}
