# searchable-dropdown-filter Specification

## Purpose

Provides a searchable single-select dropdown component that allows the user to select one option from a large list by typing to filter, with support for outside-click dismissal and empty state messaging.

## Requirements

### Requirement: Searchable single-select dropdown

The system SHALL provide a searchable dropdown component that allows the user to select one option from a large list by typing to filter.

#### Scenario: Display dropdown on input focus

- **WHEN** the user focuses the search input
- **THEN** a dropdown list SHALL appear showing all available options

#### Scenario: Filter options by search text

- **WHEN** the user types "草叢" in the search input
- **THEN** the dropdown SHALL display only options containing "草叢"

#### Scenario: Select an option

- **WHEN** the user clicks an option in the dropdown
- **THEN** the selected option SHALL be displayed in the input field
- **THEN** the dropdown SHALL close
- **THEN** the component SHALL emit an update event with the selected value

#### Scenario: Clear selection

- **WHEN** the user clicks the clear button
- **THEN** the input field SHALL be cleared
- **THEN** the component SHALL emit an update event with null


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
### Requirement: Close dropdown on outside interaction

The system SHALL close the dropdown when the user interacts outside the component.

#### Scenario: Click outside closes dropdown

- **WHEN** the dropdown is open and the user clicks outside the component
- **THEN** the dropdown SHALL close

#### Scenario: Escape key closes dropdown

- **WHEN** the dropdown is open and the user presses the Escape key
- **THEN** the dropdown SHALL close


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
### Requirement: Empty state

The system SHALL display an empty state message when no options match the search.

#### Scenario: No matching options

- **WHEN** the user types a search term that matches no options
- **THEN** the dropdown SHALL display a "無符合結果" message

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