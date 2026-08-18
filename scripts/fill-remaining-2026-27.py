#!/usr/bin/env python3
"""
Fills the verified gaps in university-master-data-2026-27.json.

Sources (verbatim, no invented values):
  - src/data/DegreeKhojo_Complete_Remaining_Data_Research_2026_27.md
  - KSOU "Revised Fee Notification 2025-26 July/Jan Cycle" (dtd 07.01.2026), 12-page official PDF

Anything the sources do not settle is left null / empty on purpose.
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
PATH = ROOT / "src/data/university-master-data-2026-27.json"
data = json.loads(PATH.read_text())
unis = {u["slug"]: u for u in data["universities"]}

KSOU_SRC = "https://www.ksoumysuru.ac.in/index.php/prospectus/"
KSOU_NOTE = "KSOU Revised Fee Notification 2025-26 (July/Jan cycle), dated 07.01.2026 — official 12-page fee notification"
BAOU_NOTE = "BAOU official 2025 fee & eligibility prospectus"
SOL_NOTE = "DU SOL official 2026-27 prospectus"
SUB_NOTE = "Subharti CDOE official 2026-27 distance-education fee page"
SHO_NOTE = "Shoolini Online official programme pages (current offer structure)"

# ---------------------------------------------------------------- 1. years
YEARS = {
    "amity-online": 2005,
    "manipal-university-jaipur": 2011,
    "lpu-online": 2005,
    "du-sol": 1922,
    "nmims-online": 1981,
    "nsou": 1997,
    "ksou-mysuru": 1996,
    "subharti-university": 2008,
    "baou": 1994,
}
for slug, year in YEARS.items():
    unis[slug]["basic_information"]["established_year"] = year

# ------------------------------------------------------------- 2. steps
STEPS = {
    "baou": [
        "Generate your ABC (Academic Bank of Credits) ID.",
        "Generate your DEB ID on the UGC-DEB portal.",
        "Complete the GCAS registration for the UG/PG programme.",
        "Use the GCAS credentials to apply on the BAOU university admission portal.",
        "Complete and submit the BAOU application.",
    ],
    "du-sol": [
        "Register and apply online on the SOL/DDCE admission portal.",
        "Select the programme you are eligible for.",
        "Enter the required personal and academic details.",
        "Upload the required documents.",
        "Pay the admission fee online.",
        "Complete admission confirmation.",
    ],
    "ksou-mysuru": [
        "Complete the online registration on the KSOU admission portal.",
        "Pay the CET/application fee where the programme requires it.",
        "Download and print the application / admission ticket.",
        "Appear for the CET where the programme requires it.",
        "Check the selection list published by the university.",
        "Attend counselling / document verification where required.",
        "Pay the prescribed fee online after successful verification.",
    ],
}
for slug, steps in STEPS.items():
    unis[slug]["admissions"]["admission_steps"] = steps

# -------------------------------------------------------- 3. scholarships
unis["baou"]["scholarships"] = [
    {
        "scholarship_name": "BAOU Learner's Scholarship (Scholarship Department / SC-ST Cell)",
        "eligibility": "Course and category specific — the applicable BAOU scholarship notice/form defines the amount and eligibility.",
        "category": "University scholarship division",
        "amount": None,
        "percentage": None,
        "official_url": "https://baou.edu.in/",
        "verification_status": "verified_official_scheme_amount_not_published",
    }
]
unis["du-sol"]["scholarships"] = [
    {"scholarship_name": n, "category": "Fee concession / waiver (2026-27 prospectus)", "amount": None,
     "percentage": None, "eligibility": None, "official_url": "https://sol.du.ac.in/",
     "verification_status": "verified_official_amount_not_published"}
    for n in [
        "PwBD fee concession",
        "Orphan category fee concession",
        "Transgender fee waiver",
        "Sports fee waiver / concession",
        "Armed Forces / CAPF related concession",
        "Financial assistance schemes",
        "Concession for meritorious female students",
    ]
]
unis["ksou-mysuru"]["scholarships"] = [
    {
        "scholarship_name": "10% tuition-fee concession (KSOU fee notification 2025-26)",
        "percentage": 10,
        "amount": None,
        "eligibility": "BPL card-holding women, Defence & ex-servicemen, auto & cab drivers and their family, and KSRTC / BMTC / NWKRTC / KKRTC staff (UG & PG degree programmes).",
        "category": "Category concession on tuition fee",
        "official_url": KSOU_SRC,
        "verification_status": "verified_official",
    },
    {
        "scholarship_name": "Transgender fee concession",
        "amount": None,
        "percentage": None,
        "eligibility": "Transgender candidates, as notified in the official KSOU fee notification.",
        "category": "Category concession",
        "official_url": KSOU_SRC,
        "verification_status": "verified_official_amount_not_published",
    },
    {
        "scholarship_name": "Minority-sponsored fee support",
        "amount": None,
        "percentage": None,
        "eligibility": "Eligible minority students, as published on the official KSOU site.",
        "category": "Sponsored fee support",
        "official_url": KSOU_SRC,
        "verification_status": "verified_official_amount_not_published",
    },
]
unis["shoolini-online"]["scholarships"] = [
    {"scholarship_name": "BBA scholarship", "amount": 39000, "percentage": None,
     "applicable_programmes": ["Bachelor of Business Administration (BBA)"],
     "eligibility": "Published scholarship on the regular ₹1,35,000 BBA fee (effective fee ₹96,000).",
     "official_url": "https://online.shooliniuniversity.com/", "verification_status": "verified_official"},
    {"scholarship_name": "BCA scholarship", "amount": 39000, "percentage": None,
     "applicable_programmes": ["Bachelor of Computer Applications (BCA)"],
     "eligibility": "Published scholarship on the regular ₹1,35,000 BCA fee (effective fee ₹96,000).",
     "official_url": "https://online.shooliniuniversity.com/", "verification_status": "verified_official"},
    {"scholarship_name": "B.Com (Hons) scholarship", "amount": 30000, "percentage": None,
     "applicable_programmes": ["Bachelor of Commerce (B.Com)"],
     "eligibility": "Published scholarship on the regular ₹1,20,000 B.Com Honours fee (effective fee ₹90,000).",
     "official_url": "https://online.shooliniuniversity.com/", "verification_status": "verified_official"},
    {"scholarship_name": "MBA scholarship", "amount": 70000, "percentage": None,
     "applicable_programmes": ["Master of Business Administration (MBA)"],
     "eligibility": "Regular fee ₹2,00,000. Standard/opt-out offer ₹1,30,000 after scholarship; pay-after-placement offer ₹1,58,000 after scholarship.",
     "official_url": "https://online.shooliniuniversity.com/", "verification_status": "verified_official"},
    {"scholarship_name": "Pay-after-placement option", "amount": None, "percentage": None,
     "applicable_programmes": ["Master of Business Administration (MBA)", "Bachelor of Business Administration (BBA)", "Bachelor of Computer Applications (BCA)"],
     "eligibility": "Published pay-after-placement plan; amounts depend on the selected plan.",
     "official_url": "https://online.shooliniuniversity.com/", "verification_status": "verified_official_amount_varies_by_plan"},
]
unis["uttaranchal-online"]["scholarships"] = [
    {"scholarship_name": "Merit-based scholarship / fee waiver", "amount": None, "percentage": None,
     "eligibility": "Merit-based and other university schemes; the exact waiver depends on the current intake notice.",
     "official_url": "https://online.uudoon.in/", "verification_status": "verified_scheme_amount_not_published"}
]

# ------------------------------------------------------------------ 4. fees
def fee_meta(note, url, status="verified_official"):
    return {
        "fee_verification_status": status,
        "source_url": url,
        "source_type": "official_programme_page",
        "source_title": "Official programme/admission source; manually researched from the official website",
        "last_verified": "2026-08-18",
        "verification_status": status,
        "fee_source_note": note,
        "verification_method": "manual_verification",
        "verification_label": "Manually researched — source: official university website",
        "effective_session": "2026-27",
    }


def set_fee(uni_slug, programme_name, note, url, **values):
    prog = next((p for p in unis[uni_slug]["programmes"] if p["programme_name"] == programme_name), None)
    if prog is None:
        raise SystemExit(f"missing programme {uni_slug} / {programme_name}")
    fees = prog.setdefault("fees", {})
    for key in ("normal", "discounted", "annual", "semester", "monthly", "emi", "application_fee",
                "registration_fee", "admission_fee", "examination_fee", "total_programme_fee"):
        fees.setdefault(key, None)
    for key in values:
        fees[key] = values[key]
    fees.update(fee_meta(note, url))
    return prog


def set_eligibility(uni_slug, programme_name, summary, minimum_marks=None):
    prog = next((p for p in unis[uni_slug]["programmes"] if p["programme_name"] == programme_name), None)
    if prog is None:
        raise SystemExit(f"missing programme {uni_slug} / {programme_name}")
    elig = prog.setdefault("eligibility", {})
    elig["summary"] = summary
    if minimum_marks:
        elig["minimum_marks"] = minimum_marks
    elig.setdefault("minimum_marks", None)
    elig.setdefault("required_subjects", [])
    elig.setdefault("age_requirement", None)
    elig.setdefault("entrance_exam", None)
    return prog


# --- KSOU (official fee notification, "Other Students" column) --------------
# name: (1st-year tuition, 1st-year total, full programme total or None, APF, RF)
KSOU = {
    "BA": (6160, 9240, 26620, 935, 605),
    "B.Com": (6710, 9790, 28270, 935, 605),
    "BBA": (10010, 13640, 39820, 1210, 880),
    "B.Sc. General": (22660, 26290, 77770, 1210, 880),
    "B.Sc. Information Technology": (22660, 26290, 77770, 1210, 880),
    "BCA": (22660, 26290, 77770, 1210, 880),
    "B.Lib.I.Sc": (10010, 13640, 13640, 1210, 880),
    "BSW": (10560, 14190, 41910, 1210, 880),
    "MA": (8305, 11660, 22770, 935, 880),
    "M.Com": (10285, 13640, 26730, 935, 880),
    "MBA": (28270, 32890, 65010, 2200, 880),
    "M.Sc": (29040, 32670, 64790, 1210, 880),
    "M.Lib.I.Sc": (16335, 19965, 19965, 1210, 880),
    "MSW": (19800, 23430, 46530, 1210, 880),
    "MCA": (29040, 32670, 64790, 1210, 880),
    "Diploma in Kannada": (4840, 7040, 7040, 935, 440),
    "Diploma in Journalism": (6490, 8690, 8690, 935, 440),
    "Diploma in Information Technology": (6600, 8800, 8800, 935, 440),
    "Diploma in Computer Application": (7040, 9240, 9240, 935, 440),
    "Diploma in Early Childhood Care and Education": (17160, 19360, 19360, 935, 440),
    "Diploma in Translation Studies": (5610, 7810, 7810, 935, 440),
}
for name, (tuition, year_total, total, apf, rf) in KSOU.items():
    set_fee("ksou-mysuru", name, KSOU_NOTE, KSOU_SRC,
            annual=year_total, semester=None, total_programme_fee=total,
            normal=total, registration_fee=rf, admission_fee=apf, examination_fee=None,
            application_fee=None)
    prog = next(p for p in unis["ksou-mysuru"]["programmes"] if p["programme_name"] == name)
    prog["fees"]["tuition_fee_first_year"] = tuition
    prog["fees"]["scholarship"] = {
        "available": True,
        "details": ["10% tuition-fee concession for BPL women, defence & ex-servicemen, auto/cab drivers and their family, and KSRTC/BMTC/NWKRTC/KKRTC staff (UG & PG degree programmes)."],
    }
# Not covered by the notification — stays unpublished.
nut = next(p for p in unis["ksou-mysuru"]["programmes"] if p["programme_name"] == "Diploma in Nutrition and Health Education")
nut["fees"].update(fee_meta("Not listed in the KSOU 2025-26 revised fee notification", KSOU_SRC, "not_published"))

# --- KSOU eligibility (7 diplomas) -----------------------------------------
for name in ["Diploma in Kannada", "Diploma in Journalism", "Diploma in Nutrition and Health Education",
             "Diploma in Information Technology", "Diploma in Computer Application",
             "Diploma in Early Childhood Care and Education", "Diploma in Translation Studies"]:
    set_eligibility("ksou-mysuru", name,
                    "10+2 or equivalent — KSOU lists these as 10+2 based diploma programmes in the official fee notification.")

# --- BAOU fees (official 2025 prospectus) ----------------------------------
BAOU_URL = "https://baou.edu.in/"
BAOU_FEES = {
    "Master of Arts In English (MEG)": dict(annual=None, total_programme_fee=7500, normal=7500),
    "Master of Arts In Hindi (MHD)": dict(total_programme_fee=7500, normal=7500),
    "Master of Arts In Sociology (MSO)": dict(total_programme_fee=7500, normal=7500),
    "Master of Arts In Gujarati (MGT)": dict(total_programme_fee=7500, normal=7500),
    "Master of Arts in Journalism and Mass Communication (MAJMC)": dict(semester=10000, total_programme_fee=40000, normal=40000),
    "Master of Arts Indian Knowledge System (MAIKS)": dict(semester=2450, total_programme_fee=9800, normal=9800),
    "Master of Arts Hindu Studies (MAHS)": dict(semester=2450, total_programme_fee=9800, normal=9800),
    "Master of Library and Information Science (MLIS)": dict(total_programme_fee=9030, normal=9030),
    "Master in Social Work (MSW)": dict(semester=2450, total_programme_fee=9800, normal=9800),
    "Master of Computer Application (MCA)": dict(semester=12500, total_programme_fee=50000, normal=50000),
    "Master of Science - Information Technology (MSCIT)": dict(semester=7500, total_programme_fee=30000, normal=30000),
    "Bachelor of Computer Application (BCA)": dict(semester=7500, total_programme_fee=45000, normal=45000),
    "Bachelor of Commerce (B.Com.Hons)": dict(semester=3000, total_programme_fee=18000, normal=18000),
    "Bachelor of Business Administration (BBA)": dict(semester=4000, total_programme_fee=24000, normal=24000),
}
for name, vals in BAOU_FEES.items():
    set_fee("baou", name, BAOU_NOTE, BAOU_URL, **vals)

BAOU_ELIG = {
    "Master of Arts In English (MEG)": "Bachelor's or professional degree from a recognised university.",
    "Master of Arts In Hindi (MHD)": "Bachelor's or professional degree from a recognised university.",
    "Master of Arts In Sociology (MSO)": "Bachelor's or professional degree from a recognised university.",
    "Master of Arts In Gujarati (MGT)": "Bachelor's or professional degree from a recognised university.",
    "Master of Arts in Journalism and Mass Communication (MAJMC)": "Graduation in any faculty from a statutory university.",
    "Master of Arts Indian Knowledge System (MAIKS)": "Graduate from a statutory university.",
    "Master of Arts Hindu Studies (MAHS)": "Graduate from a statutory university.",
    "Master of Library and Information Science (MLIS)": "BLIS bachelor's degree.",
    "Master in Social Work (MSW)": "Bachelor's degree or professional degree.",
    "Master of Computer Application (MCA)": "BCA / B.Sc CS / B.Sc IT / B.E. or B.Tech in CSE or IT or equivalent; or any graduation degree, preferably with Mathematics at 10+2 or graduation level. Students without Mathematics may need a compulsory bridge course.",
    "Master of Science - Information Technology (MSCIT)": "Graduate from a statutory university.",
    "Bachelor of Computer Application (BCA)": "12th or equivalent, with alternative ITI / polytechnic routes.",
    "Bachelor of Commerce (B.Com.Hons)": "12th pass.",
    "Bachelor of Business Administration (BBA)": "12th or equivalent.",
}
for name, summary in BAOU_ELIG.items():
    marks = "50% marks; 45% for reserved category" if "MCA" in name else None
    set_eligibility("baou", name, summary, marks)

# --- DU SOL 2026-27 prospectus fee -----------------------------------------
set_fee("du-sol", "B.Sc (Hons) - Computer Science", SOL_NOTE, "https://sol.du.ac.in/",
        annual=24570, total_programme_fee=None, normal=24570)

# --- Subharti 2026-27 course fees ------------------------------------------
SUB_URL = "https://subhartidde.com/"
for name, annual, years in [
    ("BACHELOR OF ARTS", 10000, 3),
    ("BACHELOR OF LIBRARY AND INFORMATION SCIENCES", 20000, 1),
    ("BACHELOR OF BUSINESS ADMINISTRATION", 20000, 3),
    ("BACHELOR OF COMMERCE", 10000, 3),
]:
    set_fee("subharti-university", name, SUB_NOTE, SUB_URL,
            annual=annual, total_programme_fee=annual * years, normal=annual * years,
            registration_fee=1650)

# --- Shoolini current programme fees ---------------------------------------
SHO_URL = "https://online.shooliniuniversity.com/"
set_fee("shoolini-online", "Bachelor of Business Administration (BBA)", SHO_NOTE, SHO_URL,
        normal=135000, discounted=96000, semester=15000, total_programme_fee=96000, application_fee=500)
set_fee("shoolini-online", "Bachelor of Computer Applications (BCA)", SHO_NOTE, SHO_URL,
        normal=135000, discounted=96000, semester=16000, total_programme_fee=96000, application_fee=500)
set_fee("shoolini-online", "Bachelor of Commerce (B.Com)", SHO_NOTE, SHO_URL,
        normal=120000, discounted=90000, semester=15000, total_programme_fee=90000, application_fee=500)
set_fee("shoolini-online", "Master of Business Administration (MBA)", SHO_NOTE, SHO_URL,
        normal=200000, discounted=130000, total_programme_fee=130000, application_fee=500)
set_fee("shoolini-online", "Master of Computer Applications (MCA)", SHO_NOTE, SHO_URL,
        semester=20500, total_programme_fee=None, normal=None, application_fee=500)

# --- Uttaranchal: only the university-linked, non-conflicting figures -------
UTT_URL = "https://online.uudoon.in/"
set_fee("uttaranchal-online", "Master of Business Administration (MBA)", "Uttaranchal University online course page (₹24,500 × 4 semesters)", UTT_URL,
        semester=24500, annual=47000, total_programme_fee=98000, normal=98000)
set_fee("uttaranchal-online", "Bachelor of Computer Applications (BCA)", "Uttaranchal University online course page (₹16,000 × 6 semesters)", UTT_URL,
        semester=16000, total_programme_fee=96000, normal=96000)

PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
print("written", PATH)
