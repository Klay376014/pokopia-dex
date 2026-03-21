# dex-frontend Specification

## Purpose

TBD - created by archiving change 'build-pokopia-dex'. Update Purpose after archive.

## Requirements

### Requirement: Pokemon card list display

The system SHALL display all Pokemon as cards in a scrollable list. Each card SHALL show the Pokemon sprite image, Chinese name, and Pokopia dex number.

#### Scenario: Initial page load

- **WHEN** the user opens the dex page
- **THEN** all Pokemon cards SHALL be displayed in order of Pokopia dex number
- **THEN** each card SHALL show the sprite from PokeAPI CDN (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{national_id}.png`)

#### Scenario: Sprite image fails to load

- **WHEN** a Pokemon sprite image fails to load from the CDN
- **THEN** a placeholder image SHALL be displayed instead

---
### Requirement: Filter by time of day

The system SHALL allow filtering Pokemon by time of day: dawn, day, dusk, night.

#### Scenario: Single time filter applied

- **WHEN** the user selects "day" time filter
- **THEN** only Pokemon with `time.day === true` SHALL be displayed

#### Scenario: Multiple time filters applied

- **WHEN** the user selects both "dawn" and "night" time filters
- **THEN** only Pokemon that appear in dawn OR night SHALL be displayed

---
### Requirement: Filter by weather

The system SHALL allow filtering Pokemon by weather condition: sunny, cloudy, rainy.

#### Scenario: Weather filter applied

- **WHEN** the user selects "rainy" weather filter
- **THEN** only Pokemon with `weather.rainy === true` SHALL be displayed

---
### Requirement: Filter by skill

The system SHALL allow filtering Pokemon by skill type using a collapsible filter group. The filter group SHALL be collapsed by default and expandable by clicking the header.

#### Scenario: Skill filter applied

- **WHEN** the user expands the skill filter and selects a specific skill filter
- **THEN** only Pokemon whose `skills` array contains that skill SHALL be displayed

#### Scenario: Multiple skill filters applied

- **WHEN** the user selects multiple skill filters
- **THEN** only Pokemon whose `skills` array contains ANY of the selected skills SHALL be displayed


<!-- @trace
source: filterbar-ui-optimization
updated: 2026-03-22
code:
  - node_modules/entities/dist/commonjs/decode-codepoint.js
  - node_modules/entities/dist/esm/generated/encode-html.d.ts
  - node_modules/entities/dist/esm/escape.d.ts
  - vite.config.ts
  - node_modules/estree-walker/src/package.json
  - node_modules/entities/dist/esm/generated/encode-html.js.map
  - node_modules/entities/src/decode.ts
  - node_modules/entities/dist/commonjs/index.d.ts.map
  - tsconfig.app.tsbuildinfo
  - node_modules/entities/dist/esm/decode.d.ts
  - node_modules/entities/src/internal/bin-trie-flags.ts
  - node_modules/entities/dist/esm/generated/decode-data-xml.d.ts.map
  - node_modules/entities/dist/esm/index.d.ts
  - node_modules/entities/dist/commonjs/index.d.ts
  - node_modules/estree-walker/src/index.js
  - package.json
  - node_modules/entities/dist/commonjs/generated/decode-data-html.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.js.map
  - src/components/SearchableDropdown.vue
  - node_modules/entities/dist/commonjs/escape.d.ts.map
  - node_modules/entities/dist/esm/internal/decode-shared.d.ts.map
  - node_modules/estree-walker/types/index.d.ts
  - src/components/CollapsibleFilterBar.vue
  - node_modules/entities/readme.md
  - node_modules/entities/dist/commonjs/internal/encode-shared.js
  - node_modules/entities/dist/commonjs/internal/encode-shared.js.map
  - node_modules/.vite/deps/_metadata.json
  - node_modules/entities/dist/esm/encode.js
  - node_modules/entities/package.json
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.d.ts
  - node_modules/entities/src/index.ts
  - node_modules/estree-walker/package.json
  - node_modules/entities/dist/commonjs/index.js.map
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.js.map
  - node_modules/entities/dist/esm/internal/decode-shared.js.map
  - node_modules/estree-walker/src/async.js
  - node_modules/entities/dist/esm/internal/decode-shared.d.ts
  - node_modules/entities/dist/commonjs/escape.js
  - node_modules/entities/dist/commonjs/generated/encode-html.js
  - node_modules/entities/escape.d.ts
  - node_modules/entities/dist/commonjs/internal/decode-shared.js
  - node_modules/estree-walker/types/walker.d.ts
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.js.map
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.d.ts.map
  - node_modules/entities/dist/esm/internal/bin-trie-flags.js
  - node_modules/estree-walker/README.md
  - node_modules/entities/dist/commonjs/index.js
  - node_modules/estree-walker/dist/esm/estree-walker.js
  - node_modules/entities/dist/commonjs/internal/encode-shared.d.ts.map
  - node_modules/entities/dist/esm/internal/decode-shared.js
  - node_modules/entities/src/escape.ts
  - node_modules/entities/dist/commonjs/decode.js.map
  - node_modules/entities/dist/esm/internal/encode-shared.d.ts
  - node_modules/entities/dist/esm/generated/decode-data-xml.js.map
  - node_modules/entities/dist/esm/index.d.ts.map
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.d.ts.map
  - node_modules/entities/dist/commonjs/decode-codepoint.d.ts.map
  - node_modules/entities/src/internal/decode-shared.ts
  - node_modules/estree-walker/types/async.d.ts
  - node_modules/entities/dist/esm/decode-codepoint.js
  - node_modules/entities/dist/esm/generated/decode-data-html.d.ts.map
  - node_modules/entities/dist/esm/internal/bin-trie-flags.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.d.ts
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.js
  - dist/index.html
  - node_modules/entities/dist/esm/generated/decode-data-html.js
  - node_modules/entities/decode.d.ts
  - node_modules/entities/dist/esm/generated/encode-html.js
  - node_modules/entities/dist/commonjs/internal/decode-shared.d.ts
  - node_modules/estree-walker/dist/esm/package.json
  - node_modules/entities/dist/esm/generated/decode-data-xml.js
  - node_modules/estree-walker/src/sync.js
  - node_modules/entities/dist/esm/decode-codepoint.d.ts.map
  - node_modules/entities/dist/commonjs/internal/encode-shared.d.ts
  - node_modules/entities/dist/esm/escape.js.map
  - node_modules/entities/dist/esm/escape.js
  - node_modules/entities/dist/esm/encode.js.map
  - node_modules/entities/src/generated/encode-html.ts
  - dist/assets/index-BS1S6Oz6.css
  - node_modules/entities/dist/esm/internal/bin-trie-flags.d.ts.map
  - node_modules/entities/dist/esm/decode.js.map
  - node_modules/entities/src/internal/encode-shared.ts
  - node_modules/entities/dist/commonjs/decode.d.ts.map
  - node_modules/entities/dist/esm/index.js.map
  - node_modules/estree-walker/types/tsconfig.tsbuildinfo
  - node_modules/entities/dist/commonjs/internal/decode-shared.js.map
  - node_modules/entities/dist/commonjs/decode-codepoint.js.map
  - node_modules/entities/dist/esm/decode-codepoint.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.d.ts.map
  - bun.lock
  - node_modules/entities/dist/commonjs/encode.d.ts.map
  - node_modules/entities/dist/commonjs/generated/decode-data-html.js
  - node_modules/estree-walker/CHANGELOG.md
  - node_modules/entities/dist/commonjs/decode.js
  - node_modules/entities/dist/commonjs/encode.js.map
  - node_modules/entities/dist/commonjs/generated/decode-data-html.d.ts.map
  - dist/assets/index-BwDA347X.js
  - node_modules/entities/dist/esm/decode.d.ts.map
  - dist/assets/index-DbPjWfGW.js
  - node_modules/entities/dist/commonjs/escape.d.ts
  - node_modules/entities/dist/esm/encode.d.ts.map
  - dist/assets/index-t6Dvf4r1.css
  - node_modules/entities/dist/commonjs/escape.js.map
  - node_modules/entities/dist/esm/decode.js
  - node_modules/entities/dist/esm/internal/bin-trie-flags.d.ts
  - src/App.vue
  - node_modules/estree-walker/src/walker.js
  - node_modules/entities/src/generated/decode-data-html.ts
  - node_modules/entities/src/generated/decode-data-xml.ts
  - node_modules/entities/src/encode.ts
  - node_modules/entities/dist/esm/index.js
  - node_modules/entities/dist/esm/internal/encode-shared.js
  - node_modules/estree-walker/dist/umd/estree-walker.js
  - assets/skills/Pokopia_skill_transform.png
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.js
  - node_modules/entities/dist/commonjs/encode.js
  - node_modules/entities/dist/commonjs/internal/decode-shared.d.ts.map
  - node_modules/entities/dist/commonjs/decode.d.ts
  - node_modules/entities/dist/esm/escape.d.ts.map
  - node_modules/entities/src/decode-codepoint.ts
  - assets/skills/Pokopia_skill_unknown.png
  - node_modules/estree-walker/types/sync.d.ts
  - node_modules/entities/dist/esm/internal/encode-shared.js.map
  - node_modules/entities/dist/esm/generated/encode-html.d.ts.map
  - node_modules/entities/dist/esm/internal/encode-shared.d.ts.map
  - node_modules/entities/dist/esm/generated/decode-data-html.js.map
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
  - src/components/__tests__/SearchableDropdown.test.ts
-->

---
### Requirement: Filter by habitat

The system SHALL allow filtering Pokemon by habitat location using a searchable single-select dropdown. The user SHALL select at most one habitat at a time.

#### Scenario: Habitat filter applied

- **WHEN** the user selects a specific habitat from the searchable dropdown
- **THEN** only Pokemon whose `habitats` array contains that habitat SHALL be displayed

#### Scenario: Habitat filter cleared

- **WHEN** the user clears the habitat selection
- **THEN** all Pokemon (subject to other active filters) SHALL be displayed

#### Scenario: Search for habitat

- **WHEN** the user types in the habitat search input
- **THEN** the dropdown SHALL display only habitats matching the search text


<!-- @trace
source: filterbar-ui-optimization
updated: 2026-03-22
code:
  - node_modules/entities/dist/commonjs/decode-codepoint.js
  - node_modules/entities/dist/esm/generated/encode-html.d.ts
  - node_modules/entities/dist/esm/escape.d.ts
  - vite.config.ts
  - node_modules/estree-walker/src/package.json
  - node_modules/entities/dist/esm/generated/encode-html.js.map
  - node_modules/entities/src/decode.ts
  - node_modules/entities/dist/commonjs/index.d.ts.map
  - tsconfig.app.tsbuildinfo
  - node_modules/entities/dist/esm/decode.d.ts
  - node_modules/entities/src/internal/bin-trie-flags.ts
  - node_modules/entities/dist/esm/generated/decode-data-xml.d.ts.map
  - node_modules/entities/dist/esm/index.d.ts
  - node_modules/entities/dist/commonjs/index.d.ts
  - node_modules/estree-walker/src/index.js
  - package.json
  - node_modules/entities/dist/commonjs/generated/decode-data-html.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.js.map
  - src/components/SearchableDropdown.vue
  - node_modules/entities/dist/commonjs/escape.d.ts.map
  - node_modules/entities/dist/esm/internal/decode-shared.d.ts.map
  - node_modules/estree-walker/types/index.d.ts
  - src/components/CollapsibleFilterBar.vue
  - node_modules/entities/readme.md
  - node_modules/entities/dist/commonjs/internal/encode-shared.js
  - node_modules/entities/dist/commonjs/internal/encode-shared.js.map
  - node_modules/.vite/deps/_metadata.json
  - node_modules/entities/dist/esm/encode.js
  - node_modules/entities/package.json
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.d.ts
  - node_modules/entities/src/index.ts
  - node_modules/estree-walker/package.json
  - node_modules/entities/dist/commonjs/index.js.map
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.js.map
  - node_modules/entities/dist/esm/internal/decode-shared.js.map
  - node_modules/estree-walker/src/async.js
  - node_modules/entities/dist/esm/internal/decode-shared.d.ts
  - node_modules/entities/dist/commonjs/escape.js
  - node_modules/entities/dist/commonjs/generated/encode-html.js
  - node_modules/entities/escape.d.ts
  - node_modules/entities/dist/commonjs/internal/decode-shared.js
  - node_modules/estree-walker/types/walker.d.ts
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.js.map
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.d.ts.map
  - node_modules/entities/dist/esm/internal/bin-trie-flags.js
  - node_modules/estree-walker/README.md
  - node_modules/entities/dist/commonjs/index.js
  - node_modules/estree-walker/dist/esm/estree-walker.js
  - node_modules/entities/dist/commonjs/internal/encode-shared.d.ts.map
  - node_modules/entities/dist/esm/internal/decode-shared.js
  - node_modules/entities/src/escape.ts
  - node_modules/entities/dist/commonjs/decode.js.map
  - node_modules/entities/dist/esm/internal/encode-shared.d.ts
  - node_modules/entities/dist/esm/generated/decode-data-xml.js.map
  - node_modules/entities/dist/esm/index.d.ts.map
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.d.ts.map
  - node_modules/entities/dist/commonjs/decode-codepoint.d.ts.map
  - node_modules/entities/src/internal/decode-shared.ts
  - node_modules/estree-walker/types/async.d.ts
  - node_modules/entities/dist/esm/decode-codepoint.js
  - node_modules/entities/dist/esm/generated/decode-data-html.d.ts.map
  - node_modules/entities/dist/esm/internal/bin-trie-flags.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.d.ts
  - node_modules/entities/dist/commonjs/internal/bin-trie-flags.js
  - dist/index.html
  - node_modules/entities/dist/esm/generated/decode-data-html.js
  - node_modules/entities/decode.d.ts
  - node_modules/entities/dist/esm/generated/encode-html.js
  - node_modules/entities/dist/commonjs/internal/decode-shared.d.ts
  - node_modules/estree-walker/dist/esm/package.json
  - node_modules/entities/dist/esm/generated/decode-data-xml.js
  - node_modules/estree-walker/src/sync.js
  - node_modules/entities/dist/esm/decode-codepoint.d.ts.map
  - node_modules/entities/dist/commonjs/internal/encode-shared.d.ts
  - node_modules/entities/dist/esm/escape.js.map
  - node_modules/entities/dist/esm/escape.js
  - node_modules/entities/dist/esm/encode.js.map
  - node_modules/entities/src/generated/encode-html.ts
  - dist/assets/index-BS1S6Oz6.css
  - node_modules/entities/dist/esm/internal/bin-trie-flags.d.ts.map
  - node_modules/entities/dist/esm/decode.js.map
  - node_modules/entities/src/internal/encode-shared.ts
  - node_modules/entities/dist/commonjs/decode.d.ts.map
  - node_modules/entities/dist/esm/index.js.map
  - node_modules/estree-walker/types/tsconfig.tsbuildinfo
  - node_modules/entities/dist/commonjs/internal/decode-shared.js.map
  - node_modules/entities/dist/commonjs/decode-codepoint.js.map
  - node_modules/entities/dist/esm/decode-codepoint.js.map
  - node_modules/entities/dist/commonjs/generated/encode-html.d.ts.map
  - bun.lock
  - node_modules/entities/dist/commonjs/encode.d.ts.map
  - node_modules/entities/dist/commonjs/generated/decode-data-html.js
  - node_modules/estree-walker/CHANGELOG.md
  - node_modules/entities/dist/commonjs/decode.js
  - node_modules/entities/dist/commonjs/encode.js.map
  - node_modules/entities/dist/commonjs/generated/decode-data-html.d.ts.map
  - dist/assets/index-BwDA347X.js
  - node_modules/entities/dist/esm/decode.d.ts.map
  - dist/assets/index-DbPjWfGW.js
  - node_modules/entities/dist/commonjs/escape.d.ts
  - node_modules/entities/dist/esm/encode.d.ts.map
  - dist/assets/index-t6Dvf4r1.css
  - node_modules/entities/dist/commonjs/escape.js.map
  - node_modules/entities/dist/esm/decode.js
  - node_modules/entities/dist/esm/internal/bin-trie-flags.d.ts
  - src/App.vue
  - node_modules/estree-walker/src/walker.js
  - node_modules/entities/src/generated/decode-data-html.ts
  - node_modules/entities/src/generated/decode-data-xml.ts
  - node_modules/entities/src/encode.ts
  - node_modules/entities/dist/esm/index.js
  - node_modules/entities/dist/esm/internal/encode-shared.js
  - node_modules/estree-walker/dist/umd/estree-walker.js
  - assets/skills/Pokopia_skill_transform.png
  - node_modules/entities/dist/commonjs/generated/decode-data-xml.js
  - node_modules/entities/dist/commonjs/encode.js
  - node_modules/entities/dist/commonjs/internal/decode-shared.d.ts.map
  - node_modules/entities/dist/commonjs/decode.d.ts
  - node_modules/entities/dist/esm/escape.d.ts.map
  - node_modules/entities/src/decode-codepoint.ts
  - assets/skills/Pokopia_skill_unknown.png
  - node_modules/estree-walker/types/sync.d.ts
  - node_modules/entities/dist/esm/internal/encode-shared.js.map
  - node_modules/entities/dist/esm/generated/encode-html.d.ts.map
  - node_modules/entities/dist/esm/internal/encode-shared.d.ts.map
  - node_modules/entities/dist/esm/generated/decode-data-html.js.map
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
  - src/components/__tests__/SearchableDropdown.test.ts
-->

---
### Requirement: Search by name or number

The system SHALL allow searching Pokemon by Chinese name or dex number.

#### Scenario: Search by name

- **WHEN** the user types a Chinese name in the search box
- **THEN** only Pokemon whose `name_zh` contains the search text SHALL be displayed

#### Scenario: Search by number

- **WHEN** the user types a number in the search box
- **THEN** only Pokemon whose `pokopia_id` contains the search text SHALL be displayed

#### Scenario: Empty search

- **WHEN** the search box is empty
- **THEN** all Pokemon (subject to active filters) SHALL be displayed

---
### Requirement: Pokemon detail view

The system SHALL show detailed information when a Pokemon card is clicked.

#### Scenario: Expand Pokemon detail

- **WHEN** the user clicks a Pokemon card
- **THEN** the detail view SHALL show: official artwork, Chinese name, Pokopia ID, national ID, habitat list with habitat images and detail description and Pokemon list, time availability, weather availability, and skills with icons

#### Scenario: Close detail view

- **WHEN** the user closes the detail view
- **THEN** the view SHALL return to the card list

---
### Requirement: Combined filter behavior

All active filters and search SHALL be combined with AND logic. Within each filter category, multiple selections SHALL use OR logic.

#### Scenario: Combined filters

- **WHEN** the user selects time "day" AND weather "rainy" AND searches "妙"
- **THEN** only Pokemon matching ALL three criteria SHALL be displayed