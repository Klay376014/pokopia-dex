# collapsible-filter Specification

## Purpose

Provides a collapsible filter component that displays filter options as pill buttons within an expandable/collapsible section, with support for selected count badges, inline chips, and label mapping.

## Requirements

### Requirement: Collapsible filter group

The system SHALL provide a collapsible filter component that displays filter options as pill buttons within an expandable/collapsible section. All hardcoded color values SHALL be replaced with CSS custom properties from the design system.

#### Scenario: Default collapsed state

- **WHEN** the collapsible filter is rendered with `defaultExpanded` set to false
- **THEN** the filter options SHALL be hidden
- **THEN** only the label header SHALL be visible

#### Scenario: Expand filter by clicking header

- **WHEN** the user clicks the filter header
- **THEN** the filter options SHALL become visible with a smooth animation
- **THEN** the chevron indicator SHALL change to indicate expanded state

#### Scenario: Collapse filter by clicking header

- **WHEN** the filter is expanded and the user clicks the header
- **THEN** the filter options SHALL be hidden with a smooth animation
- **THEN** the chevron indicator SHALL change to indicate collapsed state

#### Scenario: Active filter button styling

- **WHEN** a filter option is selected
- **THEN** the button SHALL use `var(--color-primary)` as background color with white text
- **THEN** the button border SHALL match `var(--color-primary)`


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
### Requirement: Selected count badge in collapsed state

The system SHALL display a badge showing the number of selected options when the filter is collapsed.

#### Scenario: Badge shown with selected count

- **WHEN** the filter is collapsed and 3 options are selected
- **THEN** the header SHALL display a badge showing "(3)"

#### Scenario: No badge when nothing selected

- **WHEN** the filter is collapsed and no options are selected
- **THEN** no badge SHALL be displayed


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
### Requirement: Inline chips in collapsed state

The system SHALL display selected options as inline chips next to the header when collapsed.

#### Scenario: Chips displayed for selected options

- **WHEN** the filter is collapsed and options "DJ" and "工匠" are selected
- **THEN** the header row SHALL display "DJ" and "工匠" as inline chips


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
### Requirement: Toggle filter option

The system SHALL allow toggling individual filter options by clicking pill buttons.

#### Scenario: Select an option

- **WHEN** the user clicks an unselected filter option pill button
- **THEN** the component SHALL emit a toggle event with the option value

#### Scenario: Deselect an option

- **WHEN** the user clicks a selected filter option pill button
- **THEN** the component SHALL emit a toggle event with the option value


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
### Requirement: Label mapping support

The system SHALL support mapping option keys to display labels.

#### Scenario: Display mapped labels

- **WHEN** a labels mapping is provided (e.g., `{ craft: '工匠' }`)
- **THEN** the pill button SHALL display the mapped label "工匠" instead of the key "craft"

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