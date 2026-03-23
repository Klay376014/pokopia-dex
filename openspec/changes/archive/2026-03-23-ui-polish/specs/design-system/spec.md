## MODIFIED Requirements

### Requirement: CSS custom properties

The system SHALL define CSS custom properties on `:root` that map to the oklch color palette, enabling non-UnoCSS components to inherit the design system colors. The system SHALL also define spacing custom properties for layout rhythm.

#### Scenario: Custom properties available globally

- **WHEN** the application renders
- **THEN** CSS custom properties SHALL be available for: `--color-primary`, `--color-primary-light`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-border`, `--color-surface`, `--color-surface-raised`, `--color-surface-muted`

#### Scenario: Spacing custom properties available

- **WHEN** the application renders
- **THEN** CSS custom properties SHALL be available for: `--spacing-section` (24px), `--spacing-group` (20px), `--spacing-element` (8px)
