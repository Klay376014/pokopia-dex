## ADDED Requirements

### Requirement: Scrape habitat list from wiki

The system SHALL scrape the habitat list from the 52poke wiki Traditional Chinese page and extract all habitat entries (~209 entries). Each entry SHALL include habitat ID, name, detail URL, detail description, and a list of Pokemon names found in that habitat.

#### Scenario: Successful habitat list scraping

- **WHEN** the scraper is executed against the habitat list wiki page
- **THEN** the system outputs a JSON file at `data/habitats.json` containing all habitat entries with `id`, `name`, `detail_url`, `detail`, and `pokemon` fields

#### Scenario: Wiki returns 403 due to missing User-Agent

- **WHEN** the scraper sends a request without a browser User-Agent header
- **THEN** the request SHALL be rejected with HTTP 403
- **WHEN** the scraper sends a request with a browser User-Agent header
- **THEN** the request SHALL succeed

### Requirement: Download habitat images

The system SHALL download habitat images from the wiki and save them locally to `assets/habitats/{id}.webp`.

#### Scenario: Successful image download

- **WHEN** the scraper processes a habitat entry with a valid image URL
- **THEN** the image SHALL be downloaded and saved as `assets/habitats/{id}.webp`

#### Scenario: Image already exists locally

- **WHEN** a habitat image file already exists at the target path
- **THEN** the scraper SHALL skip downloading that image

### Requirement: Extract habitat detail description

The system SHALL extract the detail description column from each habitat row. The detail describes the habitat composition (e.g., "綠色草 × 4").

#### Scenario: Successful detail extraction

- **WHEN** the scraper processes a habitat entry row
- **THEN** the `detail` field SHALL contain the text from the detail column

### Requirement: Extract habitat Pokemon list

The system SHALL extract the list of Pokemon names from each habitat row's Pokemon column.

#### Scenario: Successful Pokemon list extraction

- **WHEN** the scraper processes a habitat entry with Pokemon sprites
- **THEN** the `pokemon` field SHALL contain an array of Pokemon names extracted from sprite title attributes

#### Scenario: Habitat with no Pokemon

- **WHEN** a habitat entry has no Pokemon sprites
- **THEN** the `pokemon` field SHALL be an empty array

### Requirement: Output habitats JSON structure

The output `data/habitats.json` SHALL contain an array of habitat objects. Each object SHALL have `id` (string), `name` (string), `detail_url` (string), `detail` (string), and `pokemon` (array of strings) fields.

#### Scenario: Valid JSON output

- **WHEN** the scraper completes successfully
- **THEN** `data/habitats.json` SHALL be a valid JSON file with ~209 habitat entries
- **THEN** each entry SHALL have non-empty `id`, `name`, `detail_url`, and `detail` fields, and a `pokemon` array
