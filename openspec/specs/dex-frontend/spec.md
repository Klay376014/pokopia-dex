# dex-frontend Specification

## Purpose

TBD - created by archiving change 'build-pokopia-dex'. Update Purpose after archive.

## Requirements

### Requirement: Pokemon card list display

The system SHALL display all Pokemon as cards in a scrollable grid. Each card SHALL show the Pokemon sprite image within a circular backdrop, Chinese name in warm near-black (font-weight 600), and Pokopia dex number in primary red. The grid SHALL use `minmax(130px, 1fr)` column sizing with 10px gap. Each card SHALL have a subtle box shadow (`0 1px 3px oklch(0 0 0 / 0.06)`) in its default state to provide visual boundary separation.

#### Scenario: Initial page load

- **WHEN** the user opens the dex page
- **THEN** all Pokemon cards SHALL be displayed in order of Pokopia dex number
- **THEN** each card SHALL show the sprite from PokeAPI CDN (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{national_id}.png`) within an 80px circular background area
- **THEN** each card SHALL display the Pokopia ID in the primary red color

#### Scenario: Sprite image fails to load

- **WHEN** a Pokemon sprite image fails to load from the CDN
- **THEN** a placeholder image SHALL be displayed instead

#### Scenario: Card hover interaction

- **WHEN** the user hovers over a Pokemon card
- **THEN** the card SHALL translate up 3px and scale to 1.02 with exponential easing
- **THEN** a 3px red gradient accent bar SHALL appear at the top of the card
- **THEN** a brand-tinted box shadow SHALL appear

#### Scenario: Card default state has visual boundary

- **WHEN** a Pokemon card is rendered in its default (non-hover) state
- **THEN** the card SHALL display a subtle box shadow to distinguish it from adjacent cards


<!-- @trace
source: ui-polish
updated: 2026-03-23
code:
  - docs/plans/2026-03-22-ui-critique-report.md
  - assets/time/dawn.webp
  - assets/.DS_Store
  - src/App.vue
  - src/components/CollapsibleFilterBar.vue
  - src/components/SearchableDropdown.vue
  - src/components/FilterBar.vue
  - vite.config.ts
  - assets/weather/cloud.webp
  - assets/weather/rain.webp
  - src/main.ts
  - package.json
  - node_modules/.vite/deps/_metadata.json
  - bun.lock
  - src/components/PokemonCard.vue
  - assets/weather/sun.webp
  - data/habitats.json
  - assets/time/day.webp
  - src/components/PokemonDetail.vue
  - uno.config.ts
  - assets/time/dusk.webp
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - index.html
  - CLAUDE.md
  - .impeccable.md
  - assets/time/night.webp
  - docs/plans/2026-03-22-ui-redesign-design.md
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
-->

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
- **THEN** the detail view SHALL show: official artwork, Chinese name, Pokopia ID, national ID, habitat list with habitat images and detail description and Pokemon list, time availability, weather availability, skills with icons, flavor preference, environment preference, and favorite things

#### Scenario: Close detail view

- **WHEN** the user closes the detail view
- **THEN** the view SHALL return to the card list

#### Scenario: Display flavor preference

- **WHEN** a Pokemon has a non-null `flavor` value
- **THEN** the detail view SHALL display a "口味" section showing the full Chinese flavor label (including ingredients) from `flavorLabels`

#### Scenario: Display environment preference

- **WHEN** a Pokemon has a non-null `environment` value
- **THEN** the detail view SHALL display a "環境偏好" section showing the Chinese environment label from `environmentLabels`

#### Scenario: Display favorite things

- **WHEN** a Pokemon has a non-null `things` array
- **THEN** the detail view SHALL display a "喜歡的東西" section showing Chinese labels for each thing from `thingLabels` as flex-wrapped tags

#### Scenario: Hide sections when data is missing

- **WHEN** a Pokemon has `null` for `flavor`, `environment`, or `things`
- **THEN** the corresponding section SHALL NOT be rendered in the detail view


<!-- @trace
source: integrate-pokemon-favorites
updated: 2026-03-26
code:
  - docs/favorite-mapping.md
  - src/components/PokemonDetail.vue
  - src/types.ts
  - scripts/merge-favorites.ts
  - data/pokopia.json
  - src/favoriteLabels.ts
  - data/favorite.json
tests:
  - src/__tests__/merge-favorites.test.ts
  - src/__tests__/favoriteLabels.test.ts
-->

---
### Requirement: Combined filter behavior

All active filters, search, and the bookmark filter SHALL be combined with AND logic. Within each filter category, multiple selections SHALL use OR logic. The bookmark filter SHALL be evaluated first in the filter chain.

#### Scenario: Combined filters

- **WHEN** the user selects time "day" AND weather "rainy" AND searches "妙"
- **THEN** only Pokemon matching ALL three criteria SHALL be displayed

#### Scenario: Bookmark filter combined with other filters

- **WHEN** the user enables "僅顯示收藏" AND selects habitat "某棲息地"
- **THEN** only Pokemon that are both bookmarked AND found in that habitat SHALL be displayed


<!-- @trace
source: user-bookmarks
updated: 2026-03-27
code:
  - src/App.vue
  - src/components/BookmarkToast.vue
  - src/components/PokemonDetail.vue
  - src/components/PokemonCard.vue
  - src/composables/useBookmarks.ts
  - data/habitats.json
  - docs/plans/2026-03-26-user-bookmarks-design.md
tests:
  - src/components/__tests__/PokemonDetail.test.ts
  - src/composables/__tests__/useBookmarks.filter.test.ts
  - src/components/__tests__/PokemonCard.test.ts
  - src/composables/__tests__/useBookmarks.test.ts
-->

---
### Requirement: Branded header

The application SHALL display a branded header with a full-width primary red background, the title "Pokopia 圖鑑" in Outfit display font with fluid sizing, a subtitle "寶可夢棲息地探索手冊", and a CSS-only Pokéball watermark decoration. The header SHALL have `--spacing-section` (24px) margin below it.

#### Scenario: Header renders with branding

- **WHEN** the application loads
- **THEN** the header SHALL have a primary red background
- **THEN** the title SHALL use the Outfit font at `clamp(1.5rem, 4vw, 2.25rem)` size in white
- **THEN** a subtitle SHALL display below the title using `rgba(255, 255, 255, 0.7)` color (not opacity overlay)
- **THEN** a semi-transparent Pokéball watermark (opacity ~0.15) SHALL be positioned at the top-right, clipped by `overflow: hidden`

#### Scenario: Spacing below header

- **WHEN** the header is rendered
- **THEN** the margin below the header SHALL be `--spacing-section` (24px) to create visual separation from the filter area


<!-- @trace
source: ui-polish
updated: 2026-03-23
code:
  - docs/plans/2026-03-22-ui-critique-report.md
  - assets/time/dawn.webp
  - assets/.DS_Store
  - src/App.vue
  - src/components/CollapsibleFilterBar.vue
  - src/components/SearchableDropdown.vue
  - src/components/FilterBar.vue
  - vite.config.ts
  - assets/weather/cloud.webp
  - assets/weather/rain.webp
  - src/main.ts
  - package.json
  - node_modules/.vite/deps/_metadata.json
  - bun.lock
  - src/components/PokemonCard.vue
  - assets/weather/sun.webp
  - data/habitats.json
  - assets/time/day.webp
  - src/components/PokemonDetail.vue
  - uno.config.ts
  - assets/time/dusk.webp
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - index.html
  - CLAUDE.md
  - .impeccable.md
  - assets/time/night.webp
  - docs/plans/2026-03-22-ui-redesign-design.md
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
-->

---
### Requirement: Themed search input

The search input SHALL use the design system's border color, and display a red-tinted focus ring when focused.

#### Scenario: Search input focus state

- **WHEN** the user focuses the search input
- **THEN** the border color SHALL change to the primary red
- **THEN** a 3px red-tinted box shadow ring SHALL appear around the input


<!-- @trace
source: ui-redesign
updated: 2026-03-22
code:
  - src/App.vue
  - docs/plans/2026-03-22-ui-critique-report.md
  - src/components/SearchableDropdown.vue
  - vite.config.ts
  - bun.lock
  - index.html
  - docs/plans/2026-03-22-ui-redesign-design.md
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - package.json
  - src/components/FilterBar.vue
  - src/components/PokemonDetail.vue
  - src/components/PokemonCard.vue
  - src/components/CollapsibleFilterBar.vue
  - uno.config.ts
  - node_modules/.vite/deps/_metadata.json
  - src/main.ts
-->

---
### Requirement: Subtle terrain background

The page background SHALL use layered radial gradients with faint green and warm tints to evoke a natural terrain feel, applied with `background-attachment: fixed`.

#### Scenario: Background renders

- **WHEN** the application loads
- **THEN** the page background SHALL display subtle, fixed radial gradients over the warm surface color

<!-- @trace
source: ui-redesign
updated: 2026-03-22
code:
  - src/App.vue
  - docs/plans/2026-03-22-ui-critique-report.md
  - src/components/SearchableDropdown.vue
  - vite.config.ts
  - bun.lock
  - index.html
  - docs/plans/2026-03-22-ui-redesign-design.md
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - package.json
  - src/components/FilterBar.vue
  - src/components/PokemonDetail.vue
  - src/components/PokemonCard.vue
  - src/components/CollapsibleFilterBar.vue
  - uno.config.ts
  - node_modules/.vite/deps/_metadata.json
  - src/main.ts
-->

---
### Requirement: Result count visibility

The result count text SHALL use `--color-text-muted` color and `font-weight: 500` to ensure adequate visibility as filter feedback.

#### Scenario: Result count is visually prominent

- **WHEN** filters are applied or the page loads
- **THEN** the result count text SHALL be displayed in `--color-text-muted` color with font-weight 500

<!-- @trace
source: ui-polish
updated: 2026-03-23
-->


<!-- @trace
source: ui-polish
updated: 2026-03-23
code:
  - docs/plans/2026-03-22-ui-critique-report.md
  - assets/time/dawn.webp
  - assets/.DS_Store
  - src/App.vue
  - src/components/CollapsibleFilterBar.vue
  - src/components/SearchableDropdown.vue
  - src/components/FilterBar.vue
  - vite.config.ts
  - assets/weather/cloud.webp
  - assets/weather/rain.webp
  - src/main.ts
  - package.json
  - node_modules/.vite/deps/_metadata.json
  - bun.lock
  - src/components/PokemonCard.vue
  - assets/weather/sun.webp
  - data/habitats.json
  - assets/time/day.webp
  - src/components/PokemonDetail.vue
  - uno.config.ts
  - assets/time/dusk.webp
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - index.html
  - CLAUDE.md
  - .impeccable.md
  - assets/time/night.webp
  - docs/plans/2026-03-22-ui-redesign-design.md
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
-->

---
### Requirement: Section spacing rhythm

The layout SHALL use a three-tier spacing rhythm: `--spacing-section` (24px) between major sections (header to filters), `--spacing-group` (20px) between filter area and grid, and `--spacing-element` (8px) within filter internals.

#### Scenario: Spacing between filters and grid

- **WHEN** the filter bar and Pokemon grid are rendered
- **THEN** the vertical spacing between them SHALL be `--spacing-group` (20px)

#### Scenario: Spacing within filter bar

- **WHEN** the filter bar internal elements are rendered
- **THEN** the spacing between filter elements SHALL be `--spacing-element` (8px)

<!-- @trace
source: ui-polish
updated: 2026-03-23
-->

<!-- @trace
source: ui-polish
updated: 2026-03-23
code:
  - docs/plans/2026-03-22-ui-critique-report.md
  - assets/time/dawn.webp
  - assets/.DS_Store
  - src/App.vue
  - src/components/CollapsibleFilterBar.vue
  - src/components/SearchableDropdown.vue
  - src/components/FilterBar.vue
  - vite.config.ts
  - assets/weather/cloud.webp
  - assets/weather/rain.webp
  - src/main.ts
  - package.json
  - node_modules/.vite/deps/_metadata.json
  - bun.lock
  - src/components/PokemonCard.vue
  - assets/weather/sun.webp
  - data/habitats.json
  - assets/time/day.webp
  - src/components/PokemonDetail.vue
  - uno.config.ts
  - assets/time/dusk.webp
  - node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts
  - index.html
  - CLAUDE.md
  - .impeccable.md
  - assets/time/night.webp
  - docs/plans/2026-03-22-ui-redesign-design.md
tests:
  - src/components/__tests__/CollapsibleFilterBar.test.ts
-->