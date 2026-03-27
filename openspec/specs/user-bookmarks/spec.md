# user-bookmarks Specification

## Purpose

TBD - created by archiving change 'user-bookmarks'. Update Purpose after archive.

## Requirements

### Requirement: Bookmark toggle on Pokemon card

The system SHALL display a heart icon button on each Pokemon card for toggling bookmark status. The button SHALL use `@click.stop` to prevent opening the detail view. When a Pokemon is not bookmarked, the heart icon (`♡`) SHALL be hidden by default and appear with reduced opacity on card hover. When a Pokemon is bookmarked, the filled heart icon (`♥`) SHALL be permanently visible in the primary red color.

#### Scenario: Bookmark a Pokemon from card

- **WHEN** the user clicks the heart icon on a Pokemon card
- **THEN** the Pokemon SHALL be added to the bookmarks
- **THEN** the heart icon SHALL change to a filled red heart (`♥`) and remain visible

#### Scenario: Unbookmark a Pokemon from card

- **WHEN** the user clicks the filled heart icon on a bookmarked Pokemon card
- **THEN** the Pokemon SHALL be removed from the bookmarks
- **THEN** the heart icon SHALL revert to the outline style (`♡`)

#### Scenario: Heart icon visibility on hover

- **WHEN** the user hovers over a Pokemon card that is not bookmarked
- **THEN** the outline heart icon SHALL appear with reduced opacity

#### Scenario: Heart icon does not trigger detail view

- **WHEN** the user clicks the heart icon on a Pokemon card
- **THEN** the detail view SHALL NOT open


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
### Requirement: Bookmark toggle on Pokemon detail view

The system SHALL display a heart button next to the Pokemon name in the detail view. Clicking it SHALL toggle the bookmark status.

#### Scenario: Bookmark from detail view

- **WHEN** the user clicks the heart button in the detail view
- **THEN** the Pokemon bookmark status SHALL be toggled
- **THEN** the heart icon SHALL update to reflect the current status


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
### Requirement: Bookmark persistence via localStorage

The system SHALL persist all bookmarked Pokemon IDs in localStorage under the key `pokopia-bookmarks` as a JSON array of pokopia_id strings. Bookmarks SHALL survive page refresh.

#### Scenario: Bookmarks persist across page refresh

- **WHEN** the user bookmarks one or more Pokemon and refreshes the page
- **THEN** the previously bookmarked Pokemon SHALL still show as bookmarked

#### Scenario: localStorage is empty or invalid

- **WHEN** localStorage has no bookmark data or contains invalid JSON
- **THEN** the system SHALL initialize with an empty bookmark set


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
### Requirement: Filter by bookmarked status

The system SHALL provide a toggle button labeled "僅顯示收藏" at the top of the filter section (before the search input). When enabled, only bookmarked Pokemon SHALL be displayed. This filter SHALL combine with all other active filters using AND logic. The button SHALL display the current bookmark count as a badge.

#### Scenario: Enable bookmark filter

- **WHEN** the user enables the "僅顯示收藏" toggle
- **THEN** only Pokemon that are bookmarked SHALL be displayed
- **THEN** other active filters SHALL still apply (AND logic)

#### Scenario: Disable bookmark filter

- **WHEN** the user disables the "僅顯示收藏" toggle
- **THEN** all Pokemon (subject to other active filters) SHALL be displayed

#### Scenario: Bookmark count badge

- **WHEN** the user has bookmarked N Pokemon
- **THEN** the bookmark filter button SHALL display the count N as a badge

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