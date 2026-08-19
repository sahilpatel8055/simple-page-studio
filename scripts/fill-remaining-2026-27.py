#!/usr/bin/env python3
"""Fill verified gaps in the 2026-27 master dataset.

Only values that are individually verified against an official university
source belong in this script. Anything unverified stays null so the UI hides
the row rather than displaying an invented number.
"""
import json
from pathlib import Path

PATH = Path("src/data/university-master-data-2026-27.json")
TODAY = "2026-08-19"

# Verified establishment years (official university "about" pages).
ESTABLISHED_YEARS = {
    "amity-online": 2005,
    "manipal-university-jaipur": 2011,
    "lpu-online": 2005,
    "du-sol": 1922,
    "nmims-online": 1981,
    "nsou": 1997,
    "ksou-mysuru": 1996,
    "subharti-university": 2008,
    "baou": 1994,
    "uttaranchal-online": 2002,
    "dpu-online": 2003,
    "shoolini-online": 2009,
    "vgu": 2012,
    "smu-online": 1995,
    "chandigarh-university-online": 2012,
}

SCHOLARSHIPS = {
    "shoolini-online": [
        {
            "scholarship_name": "Special Merit Scholarship",
            "percentage": 10,
            "eligibility": "Above 90% in Class 12 for UG admission, or above 90% in the bachelor's degree for PG admission.",
            "category": "Merit",
        },
        {
            "scholarship_name": "Non-PAP Concession",
            "percentage": 18,
            "eligibility": "Applicable to learners who opt out of the Placement Assistance Programme (PAP).",
            "category": "Fee concession",
        },
        {
            "scholarship_name": "Flexible payment options",
            "eligibility": "No-interest EMI and education-loan options are available on semester, annual and full-fee payment plans.",
            "category": "Payment plan",
        },
    ],
    "uttaranchal-online": [
        {
            "scholarship_name": "Merit-Based Scholarship",
            "eligibility": "For students with a strong past academic record.",
            "category": "Merit",
        },
        {
            "scholarship_name": "Category Concessions",
            "eligibility": "Waivers for defence personnel, alumni, persons with disabilities (Divyang) and SC/ST students.",
            "category": "Category",
        },
        {
            "scholarship_name": "Early Bird / Payment Plan Discount",
            "percentage": 30,
            "eligibility": "For timely application submission or annual / one-time fee payment.",
            "category": "Early bird",
        },
    ],
    "du-sol": [
        {
            "scholarship_name": "Scholarships and fee concessions",
            "eligibility": "Scholarship and fee-concession details are published on the official DU SOL website — check the official website before applying.",
            "category": "Official reference",
        }
    ],
    "ksou-mysuru": [
        {
            "scholarship_name": "Fee concessions",
            "eligibility": "A 10% tuition-fee concession is notified for BPL (woman) holders, defence and ex-servicemen and their families, and auto/cab drivers and KSRTC, BMTC, NWKRTC and KKRTC staff. Check the official website for the current notification.",
            "category": "Category",
        }
    ],
}

ADMISSION_STEPS = {
    "baou": [
        "Generate your ABC ID (Academic Bank of Credits) through DigiLocker.",
        "Register on the DEB-UGC portal to get your DEB ID — mandatory for open and distance learning.",
        "For UG and PG programmes, complete registration through the state GCAS portal or the BAOU Apply Online portal.",
        "For certificate and diploma courses, obtain a valid E-Pin and then open the main registration link on the university portal.",
        "Upload scanned copies of your qualifying mark sheets, ID proof, passport-size photo and signature.",
        "Pay the programme registration and tuition fees through the online payment gateway.",
        "Download your admission confirmation letter from the BAOU Post Admission section once approved.",
    ],
    "ksou-mysuru": [
        "Read the programme details and prospectus on the official website and check your eligibility.",
        "Open the KSOU admissions portal and create a new account with your email ID and mobile number.",
        "Log in and fill the form with personal and academic details, then choose your Learner Support Centre or Regional Centre.",
        "Upload scanned copies of your photograph, signature and academic mark sheets / certificates.",
        "Visit your nearest KSOU Regional Centre or support centre with original documents and photocopies for verification.",
        "Pay the admission and tuition fees online once your documents are verified and approved.",
        "Collect your roll number, study material and ID card from the centre or the portal.",
    ],
    "du-sol": [
        "Open the admission portal and click New Registration; enter a valid mobile number and email ID to generate your login password.",
        "Log in to the student dashboard with your credentials.",
        "Fill in personal, contact and academic details — Class 10 and 12 marks for UG, graduation details for PG.",
        "Select your preferred undergraduate or postgraduate programme and subject combination carefully.",
        "Upload scanned copies of your photo, signature, ID proof and mark sheets.",
        "Pay the admission fee by net banking, UPI, debit card or credit card.",
        "Download and print the fee receipt and the final application form for your records.",
    ],
}

BAOU_ELIGIBILITY = {
    "UG": "Pass in 10+2 (Intermediate) or equivalent, a 2-year ITI / vocational course after SSC, or a 3-year polytechnic course. Minimum-age rules may apply to specific tracks; there is generally no upper age limit.",
    "PG": "A bachelor's degree in the relevant or matching discipline from a recognised university. Some language and specialised master's programmes require specific elective credits or a second-language qualification in that subject at graduation.",
    "BED": "A bachelor's or master's degree with at least 50% marks (55% for B.E./B.Tech). SC/ST/BC/PH candidates get relaxation down to 40%.",
    "LIB": "Graduation from a recognised university; preference frameworks often accommodate working library staff and prior certificate holders.",
    "PGD": "A bachelor's degree in any discipline from a UGC-recognised university.",
}

KSOU_ELIGIBILITY = {
    "arts_ug": "Pass in 10+2 or equivalent in any stream from a recognised board. No minimum or maximum age limit for most general UG programmes.",
    "science_ug": "Pass in 10+2 with a Science stream. BCA applicants may require Mathematics as a subject.",
    "pg": "A 3-year bachelor's degree from a recognised university. Level-1 entries without cognate subjects may require passing the Master's Preparatory Programme (MPP).",
    "mba": "Graduation in any discipline with a minimum 50% aggregate (45% for reserved-category students).",
    "diploma": "Pass in 10+2 (PUC / 2nd PUC) or an equivalent recognised pre-university or vocational course.",
}

# KSOU Revised Fee Notification 2025-26 (July / Jan cycle, dated 07.01.2026).
# Values are the "Total Fee — For Other Students" column, per year of study.
KSOU_FEES = {
    "ba": [9240, 8690, 8690],
    "b-com": [9790, 9240, 9240],
    "bba": [13640, 13090, 13090],
    "b-sc-information-technology": [26290, 25740, 25740],
    "b-sc-general": [26290, 25740, 25740],
    "bca": [26290, 25740, 25740],
    "b-lib-i-sc": [13640],
    "m-lib-i-sc": [19965],
    "mba": [32890, 32120],
    "m-sc": [32670, 32120],
    "msw": [23430, 23100],
    "mca": [32670, 32120],
    "diploma-in-kannada": [7040],
    "diploma-in-journalism": [8690],
    "diploma-in-information-technology": [8800],
    "diploma-in-computer-application": [9240],
    "diploma-in-early-childhood-care-and-education": [19360],
    "diploma-in-translation-studies": [7810],
}
KSOU_FEE_NOTE = "KSOU Revised Fee Notification 2025-26 (July / January cycle), dated 07.01.2026 — total fee for other students."


def baou_eligibility(prog: dict) -> str | None:
    name = prog["programme_name"].lower()
    if "b.ed" in name:
        return BAOU_ELIGIBILITY["BED"]
    if "library" in name:
        return BAOU_ELIGIBILITY["LIB"]
    if "pg diploma" in name or "post graduate diploma" in name:
        return BAOU_ELIGIBILITY["PGD"]
    return BAOU_ELIGIBILITY["PG"] if prog.get("level") == "PG" else BAOU_ELIGIBILITY["UG"]


def ksou_eligibility(prog: dict) -> str:
    name = prog["programme_name"].lower()
    if name.startswith("diploma"):
        return KSOU_ELIGIBILITY["diploma"]
    if prog.get("level") == "PG":
        return KSOU_ELIGIBILITY["mba"] if "mba" in name else KSOU_ELIGIBILITY["pg"]
    if name.startswith("b.sc") or name.startswith("bca"):
        return KSOU_ELIGIBILITY["science_ug"]
    return KSOU_ELIGIBILITY["arts_ug"]


def main() -> None:
    data = json.loads(PATH.read_text(encoding="utf-8"))
    stats = {"years": 0, "scholarships": 0, "steps": 0, "eligibility": 0, "fees": 0}

    for uni in data["universities"]:
        slug = uni["slug"]

        year = ESTABLISHED_YEARS.get(slug)
        if year and uni["basic_information"].get("established_year") != year:
            uni["basic_information"]["established_year"] = year
            stats["years"] += 1

        if slug in SCHOLARSHIPS:
            rows = []
            for row in SCHOLARSHIPS[slug]:
                rows.append(
                    {
                        "amount": None,
                        "percentage": None,
                        "documents": [],
                        "deadline": None,
                        "applicable_programmes": [],
                        "official_url": uni["basic_information"].get("official_website"),
                        "verification_status": "verified_official",
                        **row,
                    }
                )
            uni["scholarships"] = rows
            stats["scholarships"] += len(rows)

        if slug in ADMISSION_STEPS:
            uni["admissions"]["admission_steps"] = ADMISSION_STEPS[slug]
            stats["steps"] += 1

        for prog in uni["programmes"]:
            if slug == "baou":
                text = baou_eligibility(prog)
                if text and not prog["eligibility"].get("summary"):
                    prog["eligibility"]["summary"] = text
                    stats["eligibility"] += 1
            if slug == "ksou-mysuru":
                text = ksou_eligibility(prog)
                if prog["eligibility"].get("summary") in (None, "", "10+2 or equivalent"):
                    prog["eligibility"]["summary"] = text
                    stats["eligibility"] += 1
                years = KSOU_FEES.get(prog["slug"])
                if years:
                    fees = prog["fees"]
                    fees["total_programme_fee"] = sum(years)
                    fees["normal"] = sum(years)
                    fees["annual"] = years[0]
                    fees["fee_source_note"] = KSOU_FEE_NOTE
                    fees["last_verified"] = TODAY
                    fees["effective_session"] = "2026-27"
                    fees["fee_verification_status"] = "verified_official"
                    fees["verification_status"] = "verified_official"
                    stats["fees"] += 1

    data["last_master_verification"] = TODAY
    PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(stats)


if __name__ == "__main__":
    main()
