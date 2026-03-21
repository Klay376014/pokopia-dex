## ADDED Requirements

### Requirement: Collapsible filter group

The system SHALL provide a collapsible filter component that displays filter options as pill buttons within an expandable/collapsible section.

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

### Requirement: Selected count badge in collapsed state

The system SHALL display a badge showing the number of selected options when the filter is collapsed.

#### Scenario: Badge shown with selected count

- **WHEN** the filter is collapsed and 3 options are selected
- **THEN** the header SHALL display a badge showing "(3)"

#### Scenario: No badge when nothing selected

- **WHEN** the filter is collapsed and no options are selected
- **THEN** no badge SHALL be displayed

### Requirement: Inline chips in collapsed state

The system SHALL display selected options as inline chips next to the header when collapsed.

#### Scenario: Chips displayed for selected options

- **WHEN** the filter is collapsed and options "DJ" and "工匠" are selected
- **THEN** the header row SHALL display "DJ" and "工匠" as inline chips

### Requirement: Toggle filter option

The system SHALL allow toggling individual filter options by clicking pill buttons.

#### Scenario: Select an option

- **WHEN** the user clicks an unselected filter option pill button
- **THEN** the component SHALL emit a toggle event with the option value

#### Scenario: Deselect an option

- **WHEN** the user clicks a selected filter option pill button
- **THEN** the component SHALL emit a toggle event with the option value

### Requirement: Label mapping support

The system SHALL support mapping option keys to display labels.

#### Scenario: Display mapped labels

- **WHEN** a labels mapping is provided (e.g., `{ craft: '工匠' }`)
- **THEN** the pill button SHALL display the mapped label "工匠" instead of the key "craft"
