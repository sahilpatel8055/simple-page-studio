"""Sync every derived dataset to the 18-university master record.

Master file: src/data/university-master-data-2026-27.json (18 universities / 232 programmes).
Derived files are regenerated / extended in place; nothing already researched is overwritten.
Run: python3 scripts/sync-datasets.py
"""

import json
import os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "data")


def load(name):
    with open(os.path.join(ROOT, name)) as f:
        return json.load(f)


def save(name, data):
    with open(os.path.join(ROOT, name), "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")


master = load("university-master-data-2026-27.json")["universities"]
by_slug = {u["slug"]: u for u in master}
TODAY = "2026-08-16"


# ------------------------------- course index ------------------------------ #
index = []
for u in master:
    for p in u["programmes"]:
        index.append(
            {
                "university_name": u["university_name"],
                "university_slug": u["slug"],
                "programme_name": p["programme_name"],
                "programme_slug": p["slug"],
                "level": p["level"],
                "mode": p.get("mode") or u["mode"],
                "canonical_url": f"/universities/{u['slug']}/courses/{p['slug']}",
            }
        )
save("university-course-index-2026-27.json", index)
print("course index:", len(index))


# ------------------------------ pub/universities --------------------------- #
pub = load("pub/universities.json")
have = {u["slug"] for u in pub}
for u in master:
    if u["slug"] in have:
        continue
    b, a = u["basic_information"], u["admissions"]
    pub.append(
        {
            "university_name": u["university_name"],
            "slug": u["slug"],
            "page_url": f"/universities/{u['slug']}",
            "mode": u["mode"],
            "location": b.get("location"),
            "hero": {
                "title": u["university_name"],
                "subtitle": f"{u['university_name']} courses, fees, admission and eligibility for 2026-27",
                "description": (
                    f"{u['university_name']} lists {len(u['programmes'])} {u['mode'].lower()} "
                    f"programmes for the 2026-27 session."
                    + (f" The university is located in {b['location']}." if b.get("location") else "")
                ),
                "official_website": b.get("official_website"),
                "official_online_portal": b.get("official_online_portal"),
                "official_admission_portal": b.get("official_admission_portal"),
            },
            "recognition": u["recognition"],
            "admission": {
                "mode": u["mode"].lower(),
                "cycles": a.get("admission_cycle"),
                "steps": a.get("admission_steps") or [],
                "entrance_exam": a.get("entrance_exam"),
                "status": u.get("data_status", "research_based"),
                "source": b.get("official_admission_portal") or b.get("official_website"),
            },
            "scholarship": {"status": "not_published", "criteria": [], "note": None},
            "career": {
                "university_level_summary": (
                    "Course-specific career information is published on each programme page."
                ),
                "roles": [],
                "industries": [],
                "skills": [],
            },
            "sources": {"official": b.get("official_website")},
            "last_verified": u.get("last_verified") or TODAY,
        }
    )
pub.sort(key=lambda x: x["slug"])
save("pub/universities.json", pub)
print("pub universities:", len(pub))


# ---------------------- admission / exam / career dataset ------------------- #
adm = load("university-admission-exam-career-scholarship-2026-27.json")
have = {u.get("university_slug") for u in adm["universities"]}
policy = adm["universities"][0]["content_reuse_policy"]
for u in master:
    if u["slug"] in have:
        continue
    a, e = u["admissions"], u.get("examination", {}) or {}
    adm["universities"].append(
        {
            "university_name": u["university_name"],
            "university_slug": u["slug"],
            "admission": {
                "mode": u["mode"].lower(),
                "cycles": a.get("admission_cycle"),
                "steps": a.get("admission_steps") or [],
                "entrance_exam": a.get("entrance_exam"),
                "status": u.get("data_status", "research_based"),
                "source": u["basic_information"].get("official_admission_portal"),
            },
            "exam": {
                "mode": e.get("exam_mode"),
                "proctoring": e.get("proctoring"),
                "assessment": e.get("assessment_pattern") or e.get("evaluation"),
                "weightage": e.get("marks_distribution") or e.get("weightage"),
                "sections": e.get("question_paper_pattern"),
                "status": "research_based",
            },
            "scholarship": {"status": "not_published", "criteria": [], "note": None},
            "career": {
                "university_level_summary": (
                    "Course-specific career opportunities are published on each programme page."
                ),
                "roles": [],
                "industries": [],
                "skills": [],
                "placement_support_reference": None,
                "source_status": "research_based",
            },
            "sources": {"official": u["basic_information"].get("official_website")},
            "content_reuse_policy": policy,
            "courses": [
                {
                    "programme_name": p["programme_name"],
                    "programme_slug": p["slug"],
                    "level": p["level"],
                    "duration": p.get("duration"),
                    "eligibility": (p.get("eligibility") or {}).get("summary"),
                }
                for p in u["programmes"]
            ],
        }
    )
adm["universities"] = [x for x in adm["universities"] if x.get("university_slug")]
adm["universities_count"] = len(adm["universities"])
adm["programme_count"] = sum(len(x["programmes"]) for x in master)
adm["generated_on"] = TODAY
save("university-admission-exam-career-scholarship-2026-27.json", adm)
print("admission dataset:", adm["universities_count"], adm["programme_count"])


# ---------------------------- comparison master ---------------------------- #
cmp_ = load("university-comparison-master-2026-27.json")
have = {u["slug"] for u in cmp_["universities"]}
for u in master:
    if u["slug"] in have:
        continue
    pmap = {}
    for p in u["programmes"]:
        f = p.get("fees", {}) or {}
        pmap[p["degree"]] = {
            "programme_name": p["programme_name"],
            "duration": p.get("duration"),
            "semesters": p.get("semesters"),
            "fee_total": f.get("total_programme_fee"),
            "fee_status": f.get("fee_verification_status"),
            "specialisations": [s["specialisation_name"] for s in p.get("specializations", [])],
            "eligibility": (p.get("eligibility") or {}).get("summary"),
            "entrance_exam": (p.get("eligibility") or {}).get("entrance_exam"),
            "mode": p.get("mode") or u["mode"],
            "last_verified": u.get("last_verified") or TODAY,
        }
    cmp_["universities"].append(
        {
            "university_name": u["university_name"],
            "short_name": u["short_name"],
            "slug": u["slug"],
            "mode": u["mode"],
            "location": u["basic_information"].get("location"),
            "recognition": u["recognition"],
            "programme_count": len(u["programmes"]),
            "degrees_available": sorted({p["degree"] for p in u["programmes"]}),
            "programme_map": pmap,
            "official_sources": [
                s
                for s in [
                    u["basic_information"].get("official_website"),
                    u["basic_information"].get("official_online_portal"),
                ]
                if s
            ],
            "data_status": u.get("data_status", "research_based"),
            "last_verified": u.get("last_verified") or TODAY,
            "notes": u.get("notes", []),
        }
    )

short = {x["slug"]: x["short_name"] for x in cmp_["universities"]}
degrees = {x["slug"]: set(x["degrees_available"]) for x in cmp_["universities"]}
slugs = [x["slug"] for x in cmp_["universities"]]
existing_pairs = {p["comparison_id"]: p for p in cmp_["all_pair_comparisons"]}
pairs = []
for i in range(len(slugs)):
    for j in range(i + 1, len(slugs)):
        a, b = slugs[i], slugs[j]
        common = sorted(degrees[a] & degrees[b])
        if not common:
            continue
        cid = f"{a}-vs-{b}"
        if cid in existing_pairs:
            pairs.append(existing_pairs[cid])
            continue
        na, nb = short[a], short[b]
        default = "MBA" if "MBA" in common else common[0]
        pairs.append(
            {
                "comparison_id": cid,
                "university_a": na,
                "university_b": nb,
                "canonical_university_comparison_url": f"/compare/{cid}/",
                "course_comparison_url_pattern": f"/compare/{{course-slug}}/{cid}/",
                "default_course": default,
                "common_courses": common,
                "seo": {
                    "title_template": f"{na} vs {nb} – Online University Comparison 2026-27",
                    "course_title_template": (
                        f"{na} vs {nb} Online {{Course}} – Fees, Eligibility & Comparison 2026-27"
                    ),
                    "meta_description_template": (
                        f"Compare {na} and {nb} for online {{Course}}: fees, eligibility, duration, "
                        "specialisations, admission, exams, scholarships and career support."
                    ),
                    "primary_intent": f"{na} vs {nb}",
                    "secondary_intents": [
                        f"{na} vs {nb} online courses",
                        f"{na} vs {nb} fees",
                        f"{na} vs {nb} admission",
                        f"{na} vs {nb} online degree",
                    ],
                },
            }
        )
cmp_["all_pair_comparisons"] = pairs
cmp_["generated_on"] = TODAY
save("university-comparison-master-2026-27.json", cmp_)
print("comparison master:", len(cmp_["universities"]), "pairs:", len(pairs))
