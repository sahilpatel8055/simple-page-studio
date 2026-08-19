#!/usr/bin/env python3
"""
Builds src/data/university-blogs/pack/*.json from the researched source docs for
Sharda Online, Kurukshetra University and YCMOU.

Source fidelity rules:
  - Every heading becomes a section; tables, lists and callouts are preserved.
  - Only editorial / SEO-note blocks are dropped (they are internal notes).
  - Nothing is invented: text is copied from the source documents.

Run:  python3 scripts/build-blog-pack.py
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data"
OUT = DATA / "university-blogs" / "pack"

SHARDA = DATA / "sharda unievrsity"
KUK = DATA / "kurushetra university"
YCMOU = DATA / "Yashwantrao Chavan Maharashtra Open University"

# --------------------------------------------------------------------------- #
# blog map: one entry per published article
# --------------------------------------------------------------------------- #
BLOGS = [
    # ----------------------------- Sharda Online ---------------------------- #
    dict(
        file=SHARDA / "Sharda_University_Online_Complete_Guide_2026.docx",
        uni="sharda-online", group="sharda", variant="university",
        slug="sharda-university-online-complete-guide-2026",
        title="Sharda University Online 2026: Programmes, Fees & Recognition",
        excerpt="A full look at Sharda University Online — approvals, the programme and fee list, learning model and who the online degrees suit.",
        category="University Guide", categorySlug="university-guide",
        tags=["sharda-online", "sharda-university", "online-degree", "university-guide"],
        related=[("Sharda University Online", "/universities/sharda-online"),
                 ("Sharda Online MBA", "/universities/sharda-online/courses/online-mba"),
                 ("Compare online universities", "/compare/universities")],
    ),
    dict(
        file=SHARDA / "Sharda_University_Online_MBA_2026_Complete_Guide.md",
        uni="sharda-online", group="sharda", variant="course", course="online-mba",
        slug="sharda-university-online-mba-2026-fees-eligibility-admission",
        title="Sharda University Online MBA 2026: Fees, Eligibility & Specialisations",
        excerpt="Specialisation-wise fees, eligibility, semester syllabus, admission steps and placement support for the Sharda Online MBA.",
        category="Course Guide", categorySlug="course-guide",
        tags=["sharda-online-mba", "online-mba", "sharda-fees", "mba-admission"],
        related=[("Sharda Online MBA", "/universities/sharda-online/courses/online-mba"),
                 ("Online MBA in India", "/courses/online-mba"),
                 ("Sharda University Online", "/universities/sharda-online")],
    ),
    dict(
        file=SHARDA / "Sharda_University_Online_MCA_2026_Complete_Guide.md",
        uni="sharda-online", group="sharda", variant="course", course="online-mca",
        slug="sharda-university-online-mca-2026-fees-syllabus-admission",
        title="Sharda University Online MCA 2026: Fees, Syllabus & Admission",
        excerpt="What the Sharda Online MCA covers — eligibility, fee structure, semester subjects, admission process and career paths.",
        category="Course Guide", categorySlug="course-guide",
        tags=["sharda-online-mca", "online-mca", "mca-fees", "mca-admission"],
        related=[("Sharda Online MCA", "/universities/sharda-online/courses/online-mca"),
                 ("Online MCA in India", "/courses/online-mca"),
                 ("Sharda University Online", "/universities/sharda-online")],
    ),
    dict(
        file=SHARDA / "Sharda_University_Online_BBA_2026.md",
        uni="sharda-online", group="sharda", variant="course", course="online-bba",
        slug="sharda-university-online-bba-2026-fees-eligibility-syllabus",
        title="Sharda University Online BBA 2026: Fees, Eligibility & Syllabus",
        excerpt="The Sharda Online BBA in detail — 10+2 eligibility, three-year structure, specialisations, fees and admission steps.",
        category="Course Guide", categorySlug="course-guide",
        tags=["sharda-online-bba", "online-bba", "bba-fees", "bba-admission"],
        related=[("Sharda Online BBA", "/universities/sharda-online/courses/online-bba"),
                 ("Online BBA in India", "/courses/online-bba"),
                 ("Sharda University Online", "/universities/sharda-online")],
    ),
    dict(
        file=SHARDA / "Sharda_University_Online_BCA_2026_Deep_SEO_Blog.md",
        uni="sharda-online", group="sharda", variant="course", course="online-bca",
        slug="sharda-university-online-bca-2026-fees-syllabus-career",
        title="Sharda University Online BCA 2026: Fees, Syllabus & Career Scope",
        excerpt="Sharda Online BCA fees, eligibility, semester-wise subjects, admission workflow and the IT roles it prepares you for.",
        category="Course Guide", categorySlug="course-guide",
        tags=["sharda-online-bca", "online-bca", "bca-fees", "bca-career"],
        related=[("Sharda Online BCA", "/universities/sharda-online/courses/online-bca"),
                 ("Online BCA in India", "/courses/online-bca"),
                 ("Sharda University Online", "/universities/sharda-online")],
    ),
    # -------------------------- Kurukshetra University ---------------------- #
    dict(
        file=KUK / "kurukshetra-university-online-2026.md",
        uni="kurukshetra-university", group="kuk", variant="university",
        slug="kurukshetra-university-online-2026-courses-fees-admission",
        title="Kurukshetra University Online 2026: Courses, Fees & Admission",
        excerpt="How KUK's online education framework works — recognition, programme list, fee pattern, LMS learning and admission cycle.",
        category="University Guide", categorySlug="university-guide",
        tags=["kurukshetra-university", "kuk-online", "state-university", "university-guide"],
        related=[("Kurukshetra University", "/universities/kurukshetra-university"),
                 ("Kurukshetra Online MBA", "/universities/kurukshetra-university/courses/online-mba"),
                 ("Compare online universities", "/compare/universities")],
    ),
    dict(
        file=KUK / "Kurukshetra_University_Online_MBA_2026.md",
        uni="kurukshetra-university", group="kuk", variant="course", course="online-mba",
        slug="kurukshetra-university-online-mba-2026-fees-eligibility-syllabus",
        title="Kurukshetra University Online MBA 2026: Fees, Eligibility & Syllabus",
        excerpt="The KUK Online MBA explained — four-semester structure, specialisations, eligibility, fee pattern and admission process.",
        category="Course Guide", categorySlug="course-guide",
        tags=["kurukshetra-online-mba", "online-mba", "kuk-mba-fees", "mba-admission"],
        related=[("Kurukshetra Online MBA", "/universities/kurukshetra-university/courses/online-mba"),
                 ("Online MBA in India", "/courses/online-mba"),
                 ("Kurukshetra University", "/universities/kurukshetra-university")],
    ),
    dict(
        file=KUK / "Kurukshetra_University_Online_MCA_2026.md",
        uni="kurukshetra-university", group="kuk", variant="course", course="online-mca",
        slug="kurukshetra-university-online-mca-2026-fees-syllabus-career",
        title="Kurukshetra University Online MCA 2026: Fees, Syllabus & Career",
        excerpt="KUK Online MCA eligibility, semester subjects, fee pattern, examination model and the IT roles graduates target.",
        category="Course Guide", categorySlug="course-guide",
        tags=["kurukshetra-online-mca", "online-mca", "kuk-mca", "mca-career"],
        related=[("Kurukshetra Online MCA", "/universities/kurukshetra-university/courses/online-mca"),
                 ("Online MCA in India", "/courses/online-mca"),
                 ("Kurukshetra University", "/universities/kurukshetra-university")],
    ),
    dict(
        file=KUK / "kurukshetra_university_online_bba_2026.md",
        uni="kurukshetra-university", group="kuk", variant="course", course="online-bba",
        slug="kurukshetra-university-online-bba-2026-fees-eligibility-admission",
        title="Kurukshetra University Online BBA 2026: Fees, Eligibility & Admission",
        excerpt="A practical guide to the KUK Online BBA — six-semester structure, eligibility, fee pattern and how admission runs.",
        category="Course Guide", categorySlug="course-guide",
        tags=["kurukshetra-online-bba", "online-bba", "kuk-bba", "bba-admission"],
        related=[("Kurukshetra Online BBA", "/universities/kurukshetra-university/courses/online-bba"),
                 ("Online BBA in India", "/courses/online-bba"),
                 ("Kurukshetra University", "/universities/kurukshetra-university")],
    ),
    # -------------------------------- YCMOU --------------------------------- #
    dict(
        file=YCMOU / "YCMOU_Distance_Education_2026_Deep_SEO_File.md",
        uni="ycmou", group="ycmou", variant="university",
        slug="ycmou-distance-education-2026-courses-fees-admission",
        title="YCMOU Distance Education 2026: Courses, Fees & Admission",
        excerpt="Yashwantrao Chavan Maharashtra Open University in full — recognition, programme list, fee pattern and study-centre support.",
        category="University Guide", categorySlug="university-guide",
        tags=["ycmou", "distance-education", "open-university", "university-guide"],
        related=[("YCMOU", "/universities/ycmou"),
                 ("YCMOU MBA", "/universities/ycmou/courses/online-mba"),
                 ("Compare online universities", "/compare/universities")],
    ),
    dict(
        file=YCMOU / "YCMOU_MBA_Distance_Education_2026_Deep_SEO_File.md",
        uni="ycmou", group="ycmou", variant="course", course="online-mba",
        slug="ycmou-mba-distance-education-2026-fees-cet-syllabus",
        title="YCMOU MBA Distance Education 2026: Fees, CET & Syllabus",
        excerpt="The YCMOU distance MBA — MBA-CET requirement, total fee, eligibility, syllabus areas and career scope.",
        category="Course Guide", categorySlug="course-guide",
        tags=["ycmou-mba", "distance-mba", "ycmou-cet", "mba-fees"],
        related=[("YCMOU MBA", "/universities/ycmou/courses/online-mba"),
                 ("Online MBA in India", "/courses/online-mba"),
                 ("YCMOU", "/universities/ycmou")],
    ),
    dict(
        file=YCMOU / "YCMOU_MCA_Distance_Education_Deep_Content_2026.md",
        uni="ycmou", group="ycmou", variant="course", course="online-mca",
        slug="ycmou-mca-distance-education-2026-fees-eligibility-syllabus",
        title="YCMOU MCA Distance Education 2026: Fees, Eligibility & Syllabus",
        excerpt="YCMOU's distance MCA in detail — eligibility, fee structure, semester subjects, exams and IT career paths.",
        category="Course Guide", categorySlug="course-guide",
        tags=["ycmou-mca", "distance-mca", "ycmou-fees", "mca-syllabus"],
        related=[("YCMOU MCA", "/universities/ycmou/courses/online-mca"),
                 ("Online MCA in India", "/courses/online-mca"),
                 ("YCMOU", "/universities/ycmou")],
    ),
    dict(
        file=YCMOU / "YCMOU_Admission_2026_Deep_Blog - Copy.md",
        uni="ycmou", group="ycmou", variant="admission",
        slug="ycmou-admission-2026-process-dates-documents",
        title="YCMOU Admission 2026: Process, Dates & Documents",
        excerpt="Step-by-step YCMOU admission for 2026 — portals, admission cycles, documents, fee payment and confirmation.",
        category="Admission Guidance", categorySlug="admission-guidance",
        tags=["ycmou-admission", "admission-2026", "distance-education", "admission-steps"],
        related=[("YCMOU", "/universities/ycmou"),
                 ("YCMOU admission process", "/universities/ycmou/admission"),
                 ("Admission guidance", "/admissions")],
    ),
    dict(
        file=YCMOU / "YCMOU_PG_Admission_2026_Deep_Blog_Content - Copy.md",
        uni="ycmou", group="ycmou", variant="admission",
        slug="ycmou-pg-admission-2026-programmes-eligibility-fees",
        title="YCMOU PG Admission 2026: Programmes, Eligibility & Fees",
        excerpt="Postgraduate admission at YCMOU — which PG programmes run, eligibility for each, fee pattern and the application route.",
        category="Admission Guidance", categorySlug="admission-guidance",
        tags=["ycmou-pg-admission", "pg-courses", "distance-pg", "ycmou-eligibility"],
        related=[("YCMOU", "/universities/ycmou"),
                 ("YCMOU admission process", "/universities/ycmou/admission"),
                 ("Online MBA in India", "/courses/online-mba")],
    ),
    dict(
        file=YCMOU / "YCMOU_Admission_Eligibility_2026_Deep_Blog - Copy.docx",
        uni="ycmou", group="ycmou", variant="eligibility",
        slug="ycmou-admission-eligibility-2026-course-wise-criteria",
        title="YCMOU Eligibility 2026: Course-wise Admission Criteria",
        excerpt="Course-wise eligibility for YCMOU — UG, PG, diploma and certificate requirements, plus the documents each needs.",
        category="Admission Guidance", categorySlug="admission-guidance",
        tags=["ycmou-eligibility", "admission-criteria", "distance-education", "ycmou-2026"],
        related=[("YCMOU", "/universities/ycmou"),
                 ("YCMOU admission process", "/universities/ycmou/admission"),
                 ("Admission guidance", "/admissions")],
    ),
]

AUTHOR = "Kartik Ahuja"
AUTHOR_SLUG = "kartik-ahuja"
DATE = "2026-08-19"

# headings / blocks that are internal editorial notes, never published
DROP_HEADING = re.compile(
    r"seo (metadata|notes?|plan)|meta (title|description)|keyword|internal note|content brief"
    r"|writer note|editor note|suggested (url|slug)|schema markup|word count",
    re.I,
)
DROP_LINE = re.compile(
    r"^\*\*(primary|secondary|target|search intent|content type|programme|university|academic session"
    r"|recommended intent|suggested|meta|word count|tone|audience)[^:]*:\*\*",
    re.I,
)


def to_gfm(path: Path) -> str:
    """Normalise any source (docx / pandoc-flavoured md) into GFM pipe tables."""
    fmt = "docx" if path.suffix.lower() == ".docx" else "markdown"
    return subprocess.run(
        ["pandoc", "-f", fmt, "-t", "gfm", "--wrap=none", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout


BOLD_ONLY = re.compile(r"^\*\*(.{3,140}?)\*\*[ \t]*$")
TOC_LINE = re.compile(r"^(table of contents|contents)\s*:?\s*$", re.I)


def normalise_headings(md: str) -> str:
    """
    Some sources (notably the YCMOU eligibility docx) carry no real headings:
    section titles are bold-only paragraphs and a numbered table of contents
    sits under the document title. Promote those bold lines to h2 and drop the
    TOC block so the article does not collapse into one 'Overview' section.
    """
    if re.search(r"^#{1,3} ", md, re.M):
        return md

    out: list[str] = []
    lines = md.splitlines()
    i = 0
    seen_heading = False
    while i < len(lines):
        line = lines[i].rstrip()
        stripped = line.strip()

        if TOC_LINE.match(re.sub(r"\*", "", stripped)):
            i += 1
            while i < len(lines) and (
                not lines[i].strip() or re.match(r"^\s*(\d+[.)]|[-*])\s+", lines[i])
            ):
                i += 1
            continue

        m = BOLD_ONLY.match(stripped)
        if m:
            text = m.group(1).strip()
            words = len(text.split())
            if words <= 12 and not text.endswith("."):
                if not seen_heading and re.match(r"^\s*[^0-9]", text):
                    # document title — its body belongs to the opening section
                    seen_heading = True
                    i += 1
                    continue
                seen_heading = True
                out.append(f"## {re.sub(r'^\\s*\\d+[.)]\\s*', '', text)}")
                i += 1
                continue
        out.append(line)
        i += 1
    return "\n".join(out)



# --------------------------------------------------------------------------- #
# markdown -> blocks
# --------------------------------------------------------------------------- #
def clean_inline(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", text)
    text = text.replace("\\", "").replace("---", "—")
    return re.sub(r"[ \t]+", " ", text).strip()


def parse_table(lines: list[str]) -> dict | None:
    rows = [
        [clean_inline(c) for c in ln.strip().strip("|").split("|")]
        for ln in lines
        if ln.strip().startswith("|")
    ]
    rows = [
        r for r in rows
        if not all(re.fullmatch(r"[:\-—]{1,}", c.strip() or "-") for c in r)
    ]

    if len(rows) < 2:
        return None
    head, body = rows[0], rows[1:]
    width = len(head)
    body = [(r + [""] * width)[:width] for r in body]
    return {"kind": "table", "head": head, "rows": body}


def parse_sections(md: str) -> list[dict]:
    lines = md.splitlines()
    # Sources that use h1 for sections keep their h2s as in-section sub-headings
    # (this is also what makes FAQ questions parseable), otherwise h2 is the
    # section level. This caps section counts instead of fragmenting the page.
    section_level = 1 if re.search(r"^# ", md, re.M) else 2
    sections: list[dict] = []

    cur: dict | None = None
    buf: list[str] = []
    mode = None  # None | "p" | "ul" | "ol" | "table" | "quote"

    def flush():
        nonlocal buf, mode
        if not buf or cur is None:
            buf, mode = [], None
            return
        if mode == "p":
            text = clean_inline(" ".join(buf))
            if text and not DROP_LINE.match(" ".join(buf).strip()):
                cur["blocks"].append({"kind": "p", "text": text})
        elif mode in ("ul", "ol"):
            items = [clean_inline(re.sub(r"^\s*([-*]|\d+[.)])\s+", "", b)) for b in buf]
            items = [i for i in items if i]
            if items:
                block = {"kind": "list", "items": items}
                if mode == "ol":
                    block["ordered"] = True
                cur["blocks"].append(block)
        elif mode == "quote":
            text = clean_inline(" ".join(re.sub(r"^\s*>\s?", "", b) for b in buf))
            if text:
                cur["blocks"].append({"kind": "note", "text": text})
        elif mode == "table":
            t = parse_table(buf)
            if t:
                cur["blocks"].append(t)
        buf, mode = [], None

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()
        if re.fullmatch(r"-{3,}|_{3,}|\*{3,}", stripped):
            flush()
            continue
        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            flush()
            level, text = len(m.group(1)), clean_inline(m.group(2))
            if level <= section_level:
                cur = {"heading": text, "blocks": [], "_drop": bool(DROP_HEADING.search(text))}
                sections.append(cur)
            else:
                if cur is None:
                    cur = {"heading": text, "blocks": [], "_drop": False}
                    sections.append(cur)
                elif not DROP_HEADING.search(text):
                    cur["blocks"].append({"kind": "h3", "text": text})
            continue
        if not stripped:
            flush()
            continue
        if cur is None:
            cur = {"heading": "Overview", "blocks": [], "_drop": False}
            sections.append(cur)
        if stripped.startswith("|"):
            if mode != "table":
                flush()
                mode = "table"
            buf.append(line)
        elif stripped.startswith(">"):
            if mode != "quote":
                flush()
                mode = "quote"
            buf.append(line)
        elif re.match(r"^\s*[-*]\s+", line):
            if mode != "ul":
                flush()
                mode = "ul"
            buf.append(line)
        elif re.match(r"^\s*\d+[.)]\s+", line):
            if mode != "ol":
                flush()
                mode = "ol"
            buf.append(line)
        else:
            if mode not in ("p",):
                flush()
                mode = "p"
            buf.append(line)
    flush()

    out = []
    for s in sections:
        if s["_drop"] or not s["blocks"]:
            continue
        s.pop("_drop")
        out.append(s)
    return out


def word_count(sections: list[dict]) -> int:
    n = 0
    for s in sections:
        n += len(s["heading"].split())
        for b in s["blocks"]:
            if b["kind"] in ("p", "note", "h3"):
                n += len(b["text"].split())
            elif b["kind"] == "list":
                n += sum(len(i.split()) for i in b["items"])
            elif b["kind"] == "table":
                # count header cells and every body cell exactly once
                n += sum(len(c.split()) for c in b["head"])
                n += sum(len(c.split()) for row in b["rows"] for c in row)
    return n


FAQ_HEADING = re.compile(r"\bFAQ|frequently asked", re.I)


def extract_faqs(sections: list[dict]) -> tuple[list[dict], list[dict]]:
    faqs: list[dict] = []
    kept: list[dict] = []
    for s in sections:
        if not FAQ_HEADING.search(s["heading"]):
            kept.append(s)
            continue
        q = None
        answer: list[str] = []
        for b in s["blocks"]:
            if b["kind"] == "h3":
                if q and answer:
                    faqs.append({"question": q, "answer": " ".join(answer)})
                q, answer = b["text"], []
            elif b["kind"] in ("p", "note"):
                t = b["text"]
                m = re.match(r"^(?:Q\d*[.:)]\s*)?(.+\?)\s*(.*)$", t)
                if m and (q is None or answer):
                    if q and answer:
                        faqs.append({"question": q, "answer": " ".join(answer)})
                    q, answer = m.group(1).strip(), ([m.group(2).strip()] if m.group(2).strip() else [])
                elif q:
                    answer.append(t)
            elif b["kind"] == "list" and q:
                answer.append(" ".join(b["items"]))
        if q and answer:
            faqs.append({"question": q, "answer": " ".join(answer)})
    return kept, faqs


HIGHLIGHT = re.compile(r"highlight|snapshot|quick facts|key details|at a glance|overview table", re.I)


def key_takeaways(sections: list[dict]) -> list[str]:
    # prefer the source's own highlights table (Parameter | Value)
    for s in sections:
        for b in s["blocks"]:
            if b["kind"] == "table" and len(b["head"]) == 2 and (
                HIGHLIGHT.search(s["heading"]) or re.search(r"parameter|particular|feature", b["head"][0], re.I)
            ):
                out = [f"{r[0]}: {r[1]}" for r in b["rows"] if r[0] and r[1]]
                if len(out) >= 4:
                    return out[:6]
    for s in sections:
        for b in s["blocks"]:
            if b["kind"] == "list" and len(b["items"]) >= 4:
                return b["items"][:6]
    return [b["text"] for s in sections for b in s["blocks"] if b["kind"] == "p"][:4]


URL = re.compile(r"https?://[^\s)\]<>\"']+")
OFFICIAL = re.compile(r"(ugc|deb|aicte|naac|edu|ac\.in|gov\.in|nic\.in)", re.I)


def extract_sources(md: str) -> list[dict]:
    seen: dict[str, str] = {}
    for u in URL.findall(md):
        u = u.rstrip(".,;")
        if not OFFICIAL.search(u) or u in seen:
            continue
        host = re.sub(r"^www\.", "", u.split("/")[2])
        seen[u] = f"Official source — {host}"
    return [{"label": v, "href": k} for k, v in list(seen.items())[:6]]


def intro_text(sections: list[dict]) -> tuple[str, list[dict]]:
    for s in sections:
        for i, b in enumerate(s["blocks"]):
            if b["kind"] == "p" and len(b["text"].split()) > 25:
                s["blocks"] = s["blocks"][:i] + s["blocks"][i + 1:]
                return b["text"], sections
    return "", sections


def build(entry: dict) -> dict:
    md = to_gfm(entry["file"])
    sections = parse_sections(md)
    sections, faqs = extract_faqs(sections)
    takeaways = key_takeaways(sections)
    intro, sections = intro_text(sections)
    sections = [s for s in sections if s["blocks"]]
    words = word_count(sections)
    minutes = max(4, round(words / 220))
    return {
        "article": {
            "slug": entry["slug"],
            "title": entry["title"],
            "excerpt": entry["excerpt"],
            "category": entry["category"],
            "categorySlug": entry["categorySlug"],
            "tags": entry["tags"],
            "author": AUTHOR,
            "authorSlug": AUTHOR_SLUG,
            "date": DATE,
            "readingTime": f"{minutes} min",
            "kind": "blog",
        },
        "variant": entry["variant"],
        "university": entry["uni"],
        "course": entry.get("course"),
        "post": {
            "intro": intro,
            "keyTakeaways": takeaways,
            "updated": DATE,
            "sections": sections,
            "faqs": faqs,
            "sources": extract_sources(md),
            "related": [{"label": l, "href": h} for l, h in entry["related"]],
        },
    }


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    groups: dict[str, list[dict]] = {}
    for entry in BLOGS:
        if not entry["file"].exists():
            print(f"MISSING: {entry['file']}", file=sys.stderr)
            return 1
        built = build(entry)
        groups.setdefault(entry["group"], []).append(built)
        print(f"{entry['slug']}: {len(built['post']['sections'])} sections, "
              f"{len(built['post']['faqs'])} faqs, {built['article']['readingTime']}")
    for group, items in groups.items():
        (OUT / f"{group}.json").write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n")
        print(f"wrote pack/{group}.json ({len(items)} blogs)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
