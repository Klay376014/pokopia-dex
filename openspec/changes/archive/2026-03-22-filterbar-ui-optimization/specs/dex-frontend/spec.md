## MODIFIED Requirements

### Requirement: Filter by skill

The system SHALL allow filtering Pokemon by skill type using a collapsible filter group. The filter group SHALL be collapsed by default and expandable by clicking the header.

#### Scenario: Skill filter applied

- **WHEN** the user expands the skill filter and selects a specific skill filter
- **THEN** only Pokemon whose `skills` array contains that skill SHALL be displayed

#### Scenario: Multiple skill filters applied

- **WHEN** the user selects multiple skill filters
- **THEN** only Pokemon whose `skills` array contains ANY of the selected skills SHALL be displayed

### Requirement: Filter by habitat

The system SHALL allow filtering Pokemon by habitat location using a searchable single-select dropdown. The user SHALL select at most one habitat at a time.

#### Scenario: Habitat filter applied

- **WHEN** the user selects a specific habitat from the searchable dropdown
- **THEN** only Pokemon whose `habitats` array contains that habitat SHALL be displayed

#### Scenario: Habitat filter cleared

- **WHEN** the user clears the habitat selection
- **THEN** all Pokemon (subject to other active filters) SHALL be displayed

#### Scenario: Search for habitat

- **WHEN** the user types in the habitat search input
- **THEN** the dropdown SHALL display only habitats matching the search text
