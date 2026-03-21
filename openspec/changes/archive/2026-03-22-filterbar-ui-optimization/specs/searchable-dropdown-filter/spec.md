## ADDED Requirements

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

### Requirement: Close dropdown on outside interaction

The system SHALL close the dropdown when the user interacts outside the component.

#### Scenario: Click outside closes dropdown

- **WHEN** the dropdown is open and the user clicks outside the component
- **THEN** the dropdown SHALL close

#### Scenario: Escape key closes dropdown

- **WHEN** the dropdown is open and the user presses the Escape key
- **THEN** the dropdown SHALL close

### Requirement: Empty state

The system SHALL display an empty state message when no options match the search.

#### Scenario: No matching options

- **WHEN** the user types a search term that matches no options
- **THEN** the dropdown SHALL display a "無符合結果" message
