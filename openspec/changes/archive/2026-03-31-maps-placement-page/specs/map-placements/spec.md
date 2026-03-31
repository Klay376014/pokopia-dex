## ADDED Requirements

### Requirement: Map selection

The system SHALL display a horizontal scrollable list of 5 map cards at the top of the maps page. Each card SHALL show the map thumbnail image, display name, and count of assigned Pokémon.

#### Scenario: Map card displays Pokémon count

- **WHEN** the user navigates to `/maps`
- **THEN** each map card SHALL display the number of Pokémon currently assigned to it

#### Scenario: Selecting a map

- **WHEN** the user taps a map card
- **THEN** the selected map SHALL become active, its large image SHALL be shown, and the assigned Pokémon list and skill distribution SHALL update to reflect that map

### Requirement: Pokémon assignment to map

The system SHALL allow the user to assign Pokémon to a selected map via a picker modal. There SHALL be no limit on the number of Pokémon per map.

#### Scenario: Opening the picker modal

- **WHEN** the user taps the "新增寶可夢" button or the empty state prompt
- **THEN** the PokemonPickerModal SHALL open showing all available Pokémon

#### Scenario: Searching in picker modal

- **WHEN** the user types in the search input inside the modal
- **THEN** the Pokémon list SHALL filter in real-time by `name_zh` or `pokopia_id`

#### Scenario: Adding a Pokémon from the modal

- **WHEN** the user taps an unassigned Pokémon in the modal
- **THEN** that Pokémon SHALL be added to the current map's assignment list and the card SHALL show a ✓ indicator

#### Scenario: Removing a Pokémon from the modal

- **WHEN** the user taps an already-assigned Pokémon (marked with ✓) in the modal
- **THEN** that Pokémon SHALL be removed from the current map's assignment list

### Requirement: Pokémon removal from map

The system SHALL allow the user to remove an assigned Pokémon directly from the map's assignment list.

#### Scenario: Removing a Pokémon via the card

- **WHEN** the user taps the remove button on an assigned Pokémon card
- **THEN** that Pokémon SHALL be removed from the map's assignment list immediately

### Requirement: Skill distribution statistics

The system SHALL compute and display skill distribution for the currently selected map based on all assigned Pokémon.

#### Scenario: Computing skill distribution

- **WHEN** the user selects a map with assigned Pokémon
- **THEN** the system SHALL aggregate all skills from each Pokémon's `skills[]`, count occurrences per skill key, and display each skill with a count in descending order using chip labels and `skillLabels.ts` for Chinese names

#### Scenario: Empty skill distribution

- **WHEN** no Pokémon are assigned to the selected map
- **THEN** the skill distribution section SHALL be empty or hidden

#### Scenario: Real-time update

- **WHEN** a Pokémon is added or removed from the current map
- **THEN** the skill distribution SHALL update immediately without page refresh

### Requirement: Persistent map placements

The system SHALL persist all map placement data in `localStorage` under the key `pokopia-map-placements` using the structure `Record<string, string[]>` where keys are mapIds and values are arrays of Pokémon names.

#### Scenario: Data persists across page reloads

- **WHEN** the user reloads the page
- **THEN** all previously assigned Pokémon SHALL still be present on their respective maps

#### Scenario: Data structure

- **WHEN** placements are saved
- **THEN** the stored value SHALL conform to `Record<string, string[]>` (e.g., `{ "bleak_beach": ["妙蛙種子"] }`)

### Requirement: Responsive layout

The system SHALL adapt the map placements page layout for mobile viewports.

#### Scenario: Desktop layout

- **WHEN** the viewport is wide (desktop)
- **THEN** the map image and the Pokémon list + skill distribution SHALL be displayed side by side in a two-column layout

#### Scenario: Mobile layout

- **WHEN** the viewport is narrow (mobile)
- **THEN** the map image, Pokémon list, and skill distribution SHALL be stacked vertically
