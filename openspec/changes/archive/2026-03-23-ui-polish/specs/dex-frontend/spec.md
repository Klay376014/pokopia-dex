## MODIFIED Requirements

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

## ADDED Requirements

### Requirement: Result count visibility

The result count text SHALL use `--color-text-muted` color and `font-weight: 500` to ensure adequate visibility as filter feedback.

#### Scenario: Result count is visually prominent

- **WHEN** filters are applied or the page loads
- **THEN** the result count text SHALL be displayed in `--color-text-muted` color with font-weight 500

### Requirement: Section spacing rhythm

The layout SHALL use a three-tier spacing rhythm: `--spacing-section` (24px) between major sections (header to filters), `--spacing-group` (20px) between filter area and grid, and `--spacing-element` (8px) within filter internals.

#### Scenario: Spacing between filters and grid

- **WHEN** the filter bar and Pokemon grid are rendered
- **THEN** the vertical spacing between them SHALL be `--spacing-group` (20px)

#### Scenario: Spacing within filter bar

- **WHEN** the filter bar internal elements are rendered
- **THEN** the spacing between filter elements SHALL be `--spacing-element` (8px)
