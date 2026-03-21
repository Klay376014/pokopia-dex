"""寶可夢列表爬蟲：從 52poke wiki 爬取 Pokopia 寶可夢列表並下載特長圖示"""

import json
import os
import re
from urllib.parse import unquote

import requests
from bs4 import BeautifulSoup

URL = "https://wiki.52poke.com/zh-hant/寶可夢列表（Pokopia）"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SKILLS_DIR = os.path.join(BASE_DIR, "assets", "skills")

SKILL_ZH_TO_EN: dict[str, str] = {
    "DJ": "dj", "不明": "unknown", "亂撒": "scatter", "交易": "trade",
    "伐木": "chop", "分類": "sort", "哈欠": "yawn", "回收利用": "recycle",
    "夢島": "dream-island", "工匠": "craft", "帶動氣氛": "liven-up",
    "建造": "build", "彩繪": "paint", "找東西": "find", "採蜜": "gather-honey",
    "收納": "storage", "收藏家": "collector", "栽培": "cultivate",
    "滋潤": "moisten", "爆炸": "explode", "發光": "glow", "發電": "generate",
    "瞬間移動": "teleport", "碾壓": "crush", "稀有物": "rare-find",
    "變身": "transform", "貪吃鬼": "glutton", "重踏": "stomp",
    "鑑定": "appraise", "開派對": "party", "飛翔": "fly", "點火": "ignite",
}


def fetch_page(url: str) -> BeautifulSoup:
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


def get_full_image_url(thumb_src: str) -> str:
    """Convert thumbnail URL to full image URL."""
    url = thumb_src
    if url.startswith("//"):
        url = "https:" + url
    # Convert thumb URL to full URL
    url = url.replace("/wiki/thumb/", "/wiki/")
    url = re.sub(r"/\d+px-[^/]+$", "", url)
    return url


def download_image(url: str, filepath: str) -> None:
    if os.path.exists(filepath):
        return
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    with open(filepath, "wb") as f:
        f.write(resp.content)


def parse_habitats_cell(cell) -> list[dict]:
    """Parse the habitats column which uses a grid layout with images and links."""
    habitats = []
    links = cell.find_all("a", href=re.compile(r"#habitat-\d+"))
    for link in links:
        href = link.get("href", "")
        match = re.search(r"#habitat-(\d+)", href)
        if match:
            habitat_id = match.group(1)
            name = link.get_text(strip=True)
            if name:
                habitats.append({"name": name, "habitat_id": habitat_id})
    return habitats


def parse_skills_cell(cell) -> list[str]:
    """Parse the skills column which has icon + text in a grid."""
    skills = []
    # The grid contains pairs of (img span, text span)
    # Collect skill names from text spans, converting to English
    spans = cell.find_all("span")
    for span in spans:
        if span.find("img"):
            continue
        text = span.get_text(strip=True)
        if text:
            en = SKILL_ZH_TO_EN.get(text, text)
            skills.append(en)

    # Download skill icons with English filenames
    grid_children = list(cell.find("div").children) if cell.find("div") else []
    img_text_pairs = []
    i = 0
    while i < len(grid_children):
        child = grid_children[i]
        img_tag = child.find("img") if hasattr(child, "find") else None
        if img_tag and hasattr(img_tag, "get"):
            if i + 1 < len(grid_children):
                text_el = grid_children[i + 1]
                text = text_el.get_text(strip=True) if hasattr(text_el, "get_text") else str(text_el).strip()
                if text and img_tag.get("src"):
                    img_text_pairs.append((img_tag["src"], text))
            i += 2
        else:
            i += 1

    for src, skill_name_zh in img_text_pairs:
        full_url = get_full_image_url(src)
        en = SKILL_ZH_TO_EN.get(skill_name_zh, skill_name_zh)
        filename = f"Pokopia_skill_{en}.png"
        filepath = os.path.join(SKILLS_DIR, filename)
        download_image(full_url, filepath)

    return skills


def parse_pokemon_table(table) -> list[dict]:
    """Parse a pokemon data table, handling rowspan for multi-form Pokemon."""
    rows = table.find_all("tr")
    pokemon_list = []
    # Track current rowspan context for pokopia_id and national_id
    current_pokopia_id = None
    current_national_id = None
    remaining_rowspan = 0

    for row in rows:
        cells = row.find_all("td")
        if not cells:
            continue

        # Determine if this is a primary row (has pokopia_id) or continuation
        first_text = cells[0].get_text(strip=True)
        has_rowspan = cells[0].get("rowspan")

        if has_rowspan or (len(cells) >= 13 and first_text.isdigit()):
            # Primary row with all 13 cells
            pokopia_id = first_text
            if not pokopia_id.isdigit():
                continue
            national_id = cells[1].get_text(strip=True)
            current_pokopia_id = pokopia_id
            current_national_id = national_id
            remaining_rowspan = int(has_rowspan) - 1 if has_rowspan else 0
            # Standard 13-cell indexing
            sprite_idx, name_idx, hab_idx = 2, 3, 4
            time_start, weather_start, skill_idx = 5, 9, 12
        elif remaining_rowspan > 0 and len(cells) >= 11:
            # Continuation row: pokopia_id and national_id are inherited
            pokopia_id = current_pokopia_id
            national_id = current_national_id
            remaining_rowspan -= 1
            # Offset by -2 since first 2 cells are missing
            sprite_idx, name_idx, hab_idx = 0, 1, 2
            time_start, weather_start, skill_idx = 3, 7, 10
        else:
            if remaining_rowspan > 0:
                remaining_rowspan -= 1
            continue

        name_zh = cells[name_idx].get_text(strip=True)
        habitats = parse_habitats_cell(cells[hab_idx])

        dawn = "✓" in cells[time_start].get_text()
        day = "✓" in cells[time_start + 1].get_text()
        dusk = "✓" in cells[time_start + 2].get_text()
        night = "✓" in cells[time_start + 3].get_text()

        sunny = "✓" in cells[weather_start].get_text()
        cloudy = "✓" in cells[weather_start + 1].get_text()
        rainy = "✓" in cells[weather_start + 2].get_text()

        skills = parse_skills_cell(cells[skill_idx])

        pokemon_list.append({
            "pokopia_id": pokopia_id,
            "national_id": national_id,
            "name_zh": name_zh,
            "habitats": habitats,
            "time": {
                "dawn": dawn,
                "day": day,
                "dusk": dusk,
                "night": night,
            },
            "weather": {
                "sunny": sunny,
                "cloudy": cloudy,
                "rainy": rainy,
            },
            "skills": skills,
        })

    return pokemon_list


def main() -> None:
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(SKILLS_DIR, exist_ok=True)

    print("Fetching Pokopia pokemon list page...")
    soup = fetch_page(URL)

    # Find data tables (those with many rows)
    tables = soup.find_all("table")
    data_tables = [t for t in tables if len(t.find_all("tr")) > 4
                   and t.find("td") is not None
                   and any("✓" in td.get_text() for td in t.find_all("td")[:20])]

    all_pokemon: list[dict] = []
    for i, table in enumerate(data_tables):
        print(f"Parsing table {i + 1}...")
        pokemon = parse_pokemon_table(table)
        print(f"  Found {len(pokemon)} pokemon")
        all_pokemon.extend(pokemon)

    print(f"Total: {len(all_pokemon)} pokemon")
    if len(all_pokemon) < 300:
        print(f"WARNING: Expected ~310 pokemon, got {len(all_pokemon)}")

    output_path = os.path.join(DATA_DIR, "pokopia.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({"pokemon": all_pokemon}, f, ensure_ascii=False, indent=2)

    print(f"Saved to {output_path}")

    # List unique skills found
    all_skills = set()
    for p in all_pokemon:
        all_skills.update(p["skills"])
    print(f"Unique skills: {sorted(all_skills)}")


if __name__ == "__main__":
    main()
