## ADDED Requirements

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

### Requirement: CSS custom properties

The system SHALL define CSS custom properties on `:root` that map to the oklch color palette, enabling non-UnoCSS components to inherit the design system colors.

#### Scenario: Custom properties available globally

- **WHEN** the application renders
- **THEN** CSS custom properties SHALL be available for: `--color-primary`, `--color-primary-light`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-border`, `--color-surface`, `--color-surface-raised`, `--color-surface-muted`

### Requirement: Vite plugin integration

The system SHALL integrate UnoCSS as a Vite plugin, loaded before the Vue plugin in the plugin array.

#### Scenario: UnoCSS active in dev and build

- **WHEN** the dev server starts or a production build runs
- **THEN** UnoCSS utility classes SHALL be available in all Vue components
- **THEN** the virtual CSS module (`virtual:uno.css`) SHALL be imported in the application entry point
