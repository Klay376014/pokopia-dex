## MODIFIED Requirements

### Requirement: Pokemon card list display

The system SHALL display all Pokemon as cards in a scrollable grid. Each card SHALL show the Pokemon sprite image within a circular backdrop, Chinese name in warm near-black (font-weight 600), and Pokopia dex number in primary red. The grid SHALL use `minmax(130px, 1fr)` column sizing with 10px gap.

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

## ADDED Requirements

### Requirement: Branded header

The application SHALL display a branded header with a full-width primary red background, the title "Pokopia 圖鑑" in Outfit display font with fluid sizing, a subtitle "寶可夢棲息地探索手冊", and a CSS-only Pokéball watermark decoration.

#### Scenario: Header renders with branding

- **WHEN** the application loads
- **THEN** the header SHALL have a primary red background
- **THEN** the title SHALL use the Outfit font at `clamp(1.5rem, 4vw, 2.25rem)` size in white
- **THEN** a subtitle SHALL display below the title in a lighter red tone
- **THEN** a semi-transparent Pokéball watermark (opacity ~0.15) SHALL be positioned at the top-right, clipped by `overflow: hidden`

### Requirement: Themed search input

The search input SHALL use the design system's border color, and display a red-tinted focus ring when focused.

#### Scenario: Search input focus state

- **WHEN** the user focuses the search input
- **THEN** the border color SHALL change to the primary red
- **THEN** a 3px red-tinted box shadow ring SHALL appear around the input

### Requirement: Subtle terrain background

The page background SHALL use layered radial gradients with faint green and warm tints to evoke a natural terrain feel, applied with `background-attachment: fixed`.

#### Scenario: Background renders

- **WHEN** the application loads
- **THEN** the page background SHALL display subtle, fixed radial gradients over the warm surface color
