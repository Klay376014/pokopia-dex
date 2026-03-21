"""棲息地爬蟲：從 52poke wiki 爬取棲息地列表並下載圖片"""

import json
import os
import re
from urllib.parse import unquote

import requests
from bs4 import BeautifulSoup

URL = "https://wiki.52poke.com/zh-hant/棲息地列表"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
ASSETS_DIR = os.path.join(BASE_DIR, "assets", "habitats")


def fetch_page(url: str) -> BeautifulSoup:
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


def get_full_image_url(thumb_src: str) -> str:
    """Convert thumbnail URL to full image URL.

    Thumb: //s1.52poke.com/wiki/thumb/7/79/Pokopia_棲息地_001.webp/150px-...
    Full:  https://s1.52poke.com/wiki/7/79/Pokopia_棲息地_001.webp
    """
    url = thumb_src.replace("//s1.52poke.com/wiki/thumb/", "")
    # Remove the /150px-... suffix
    url = re.sub(r"/\d+px-[^/]+$", "", url)
    return f"https://s1.52poke.com/wiki/{url}"


def download_image(url: str, filepath: str) -> None:
    if os.path.exists(filepath):
        return
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    with open(filepath, "wb") as f:
        f.write(resp.content)


def parse_habitats(soup: BeautifulSoup) -> list[dict]:
    # Find the main habitat table (the one with ~210 rows)
    tables = soup.find_all("table")
    habitat_table = None
    for table in tables:
        rows = table.find_all("tr")
        if len(rows) > 100:
            habitat_table = table
            break

    if not habitat_table:
        raise ValueError("Could not find habitat table")

    rows = habitat_table.find_all("tr")
    habitats = []

    for row in rows:
        # Skip header rows
        if row.find("th"):
            continue

        cells = row.find_all("td")
        if len(cells) < 4:
            continue

        habitat_id = cells[0].get_text(strip=True)
        if not habitat_id.isdigit():
            continue

        # Image is in cells[1]
        img = cells[1].find("img")
        img_url = None
        if img and img.get("src"):
            img_url = get_full_image_url(img["src"])

        # Name is in cells[2]
        name = cells[2].get_text(strip=True)

        # Detail is in cells[3]
        detail = cells[3].get_text(separator="、", strip=True)

        # Pokemon list is in cells[4]
        pokemon_names = []
        if len(cells) > 4:
            sprites = cells[4].find_all("span", class_=re.compile(r"sprite-icon"))
            pokemon_names = [s.get("title", "") for s in sprites if s.get("title")]

        # Download image
        if img_url:
            img_path = os.path.join(ASSETS_DIR, f"{habitat_id}.webp")
            download_image(img_url, img_path)
            print(f"  Downloaded habitat {habitat_id}: {name}")

        habitats.append({
            "id": habitat_id,
            "name": name,
            "detail_url": f"https://wiki.52poke.com/zh-hant/棲息地列表#habitat-{habitat_id}",
            "detail": detail,
            "pokemon": pokemon_names,
        })

    return habitats


def main() -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(ASSETS_DIR, exist_ok=True)

    print("Fetching habitat list page...")
    soup = fetch_page(URL)

    print("Parsing habitats...")
    habitats = parse_habitats(soup)

    print(f"Found {len(habitats)} habitats")
    if len(habitats) < 200:
        print(f"WARNING: Expected ~209 habitats, got {len(habitats)}")

    output_path = os.path.join(DATA_DIR, "habitats.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(habitats, f, ensure_ascii=False, indent=2)

    print(f"Saved to {output_path}")


if __name__ == "__main__":
    main()
