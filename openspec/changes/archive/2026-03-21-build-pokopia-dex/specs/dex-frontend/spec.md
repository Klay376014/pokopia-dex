## ADDED Requirements

### Requirement: Pokemon card list display

The system SHALL display all Pokemon as cards in a scrollable list. Each card SHALL show the Pokemon sprite image, Chinese name, and Pokopia dex number.

#### Scenario: Initial page load

- **WHEN** the user opens the dex page
- **THEN** all Pokemon cards SHALL be displayed in order of Pokopia dex number
- **THEN** each card SHALL show the sprite from PokeAPI CDN (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{national_id}.png`)

#### Scenario: Sprite image fails to load

- **WHEN** a Pokemon sprite image fails to load from the CDN
- **THEN** a placeholder image SHALL be displayed instead

### Requirement: Filter by time of day

The system SHALL allow filtering Pokemon by time of day: dawn, day, dusk, night.

#### Scenario: Single time filter applied

- **WHEN** the user selects "day" time filter
- **THEN** only Pokemon with `time.day === true` SHALL be displayed

#### Scenario: Multiple time filters applied

- **WHEN** the user selects both "dawn" and "night" time filters
- **THEN** only Pokemon that appear in dawn OR night SHALL be displayed

### Requirement: Filter by weather

The system SHALL allow filtering Pokemon by weather condition: sunny, cloudy, rainy.

#### Scenario: Weather filter applied

- **WHEN** the user selects "rainy" weather filter
- **THEN** only Pokemon with `weather.rainy === true` SHALL be displayed

### Requirement: Filter by skill

The system SHALL allow filtering Pokemon by skill type.

#### Scenario: Skill filter applied

- **WHEN** the user selects a specific skill filter
- **THEN** only Pokemon whose `skills` array contains that skill SHALL be displayed

### Requirement: Filter by habitat

The system SHALL allow filtering Pokemon by habitat location.

#### Scenario: Habitat filter applied

- **WHEN** the user selects a specific habitat
- **THEN** only Pokemon whose `habitats` array contains that habitat SHALL be displayed

### Requirement: Search by name or number

The system SHALL allow searching Pokemon by Chinese name or dex number.

#### Scenario: Search by name

- **WHEN** the user types a Chinese name in the search box
- **THEN** only Pokemon whose `name_zh` contains the search text SHALL be displayed

#### Scenario: Search by number

- **WHEN** the user types a number in the search box
- **THEN** only Pokemon whose `pokopia_id` contains the search text SHALL be displayed

#### Scenario: Empty search

- **WHEN** the search box is empty
- **THEN** all Pokemon (subject to active filters) SHALL be displayed

### Requirement: Pokemon detail view

The system SHALL show detailed information when a Pokemon card is clicked.

#### Scenario: Expand Pokemon detail

- **WHEN** the user clicks a Pokemon card
- **THEN** the detail view SHALL show: official artwork, Chinese name, Pokopia ID, national ID, habitat list with habitat images and detail description and Pokemon list, time availability, weather availability, and skills with icons

#### Scenario: Close detail view

- **WHEN** the user closes the detail view
- **THEN** the view SHALL return to the card list

### Requirement: Combined filter behavior

All active filters and search SHALL be combined with AND logic. Within each filter category, multiple selections SHALL use OR logic.

#### Scenario: Combined filters

- **WHEN** the user selects time "day" AND weather "rainy" AND searches "妙"
- **THEN** only Pokemon matching ALL three criteria SHALL be displayed
