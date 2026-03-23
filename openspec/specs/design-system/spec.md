# design-system Specification

## Purpose

TBD - created by archiving change 'ui-redesign'. Update Purpose after archive.

## Requirements

### Requirement: UnoCSS theme configuration

The system SHALL provide a UnoCSS configuration file (`uno.config.ts`) that defines the project's design tokens including color palette, font families, and utility shortcuts.

#### Scenario: Color palette defined in oklch

- **WHEN** the UnoCSS configuration is loaded
- **THEN** the theme SHALL define primary colors based on oklch(0.55 0.22 27) (Pokédex red) with light and dark variants
- **THEN** the theme SHALL define accent colors based on oklch(0.58 0.12 145) (earthy green)
- **THEN** the theme SHALL define surface colors as red-tinted neutrals (NOT pure white or pure black)
- **THEN** the theme SHALL define text colors as warm near-black with muted and subtle variants

#### Scenario: Font families configured

- **WHEN** the UnoCSS configuration is loaded
- **THEN** the theme SHALL configure DM Sans as the body font via web fonts preset
- **THEN** the theme SHALL configure Outfit as the display font via web fonts preset


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
### Requirement: CSS custom properties

The system SHALL define CSS custom properties on `:root` that map to the oklch color palette, enabling non-UnoCSS components to inherit the design system colors. The system SHALL also define spacing custom properties for layout rhythm.

#### Scenario: Custom properties available globally

- **WHEN** the application renders
- **THEN** CSS custom properties SHALL be available for: `--color-primary`, `--color-primary-light`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-border`, `--color-surface`, `--color-surface-raised`, `--color-surface-muted`

#### Scenario: Spacing custom properties available

- **WHEN** the application renders
- **THEN** CSS custom properties SHALL be available for: `--spacing-section` (24px), `--spacing-group` (20px), `--spacing-element` (8px)


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
### Requirement: Vite plugin integration

The system SHALL integrate UnoCSS as a Vite plugin, loaded before the Vue plugin in the plugin array.

#### Scenario: UnoCSS active in dev and build

- **WHEN** the dev server starts or a production build runs
- **THEN** UnoCSS utility classes SHALL be available in all Vue components
- **THEN** the virtual CSS module (`virtual:uno.css`) SHALL be imported in the application entry point

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