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
}


def main() -> None:
    data = json.loads(PATH.read_text(encoding="utf-8"))
    years = 0

    for uni in data["universities"]:
        slug = uni["slug"]
        year = ESTABLISHED_YEARS.get(slug)
        if year and not uni["basic_information"].get("established_year"):
            uni["basic_information"]["established_year"] = year
            years += 1

    data["last_master_verification"] = TODAY
    PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print({"established_years_filled": years})


if __name__ == "__main__":
    main()
