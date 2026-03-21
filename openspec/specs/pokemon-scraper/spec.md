# pokemon-scraper Specification

## Purpose

TBD - created by archiving change 'build-pokopia-dex'. Update Purpose after archive.

## Requirements

### Requirement: Scrape Pokemon list from wiki

The system SHALL scrape the Pokopia Pokemon list from the 52poke wiki page and extract all Pokemon entries from both data tables (main table ~307 entries + secondary table ~3 entries).

#### Scenario: Successful Pokemon list scraping

- **WHEN** the scraper is executed against the Pokopia Pokemon list wiki page
- **THEN** the system outputs a JSON file at `data/pokopia.json` containing all Pokemon entries from both tables

#### Scenario: Browser User-Agent is required

- **WHEN** the scraper sends requests to the wiki
- **THEN** all requests SHALL include a browser User-Agent header to avoid HTTP 403

---
### Requirement: Extract Pokemon data fields

Each Pokemon entry SHALL include: `pokopia_id` (string), `national_id` (string, zero-padded to 4 digits), `name_zh` (string), `habitats` (array of objects with `name` and `habitat_id`), `time` (object with `dawn`/`day`/`dusk`/`night` boolean fields), `weather` (object with `sunny`/`cloudy`/`rainy` boolean fields), and `skills` (array of strings).

#### Scenario: Complete data extraction

- **WHEN** the scraper processes a Pokemon entry row
- **THEN** all fields SHALL be extracted with correct types and values
- **THEN** `national_id` SHALL be zero-padded to 4 digits (e.g., "0001")

---
### Requirement: Download skill icons

The system SHALL download skill icons referenced in the Pokemon list and save them locally to `assets/skills/`.

#### Scenario: Successful skill icon download

- **WHEN** the scraper encounters a skill with an associated icon URL
- **THEN** the icon SHALL be downloaded and saved to `assets/skills/`

#### Scenario: Skill icon already exists locally

- **WHEN** a skill icon file already exists at the target path
- **THEN** the scraper SHALL skip downloading that icon

---
### Requirement: Output pokopia JSON structure

The output `data/pokopia.json` SHALL contain a `pokemon` array with all entries from both tables combined.

#### Scenario: Valid JSON output with correct count

- **WHEN** the scraper completes successfully
- **THEN** `data/pokopia.json` SHALL be a valid JSON file
- **THEN** the `pokemon` array SHALL contain ~310 entries (main + secondary tables)
