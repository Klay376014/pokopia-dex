## MODIFIED Requirements

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
