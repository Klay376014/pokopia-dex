## MODIFIED Requirements

### Requirement: Pokemon detail view

The system SHALL show detailed information when a Pokemon card is clicked.

#### Scenario: Expand Pokemon detail

- **WHEN** the user clicks a Pokemon card
- **THEN** the detail view SHALL show: official artwork, Chinese name, Pokopia ID, national ID, habitat list with habitat images and detail description and Pokemon list, time availability, weather availability, skills with icons, flavor preference, environment preference, and favorite things

#### Scenario: Close detail view

- **WHEN** the user closes the detail view
- **THEN** the view SHALL return to the card list

#### Scenario: Display flavor preference

- **WHEN** a Pokemon has a non-null `flavor` value
- **THEN** the detail view SHALL display a "口味" section showing the full Chinese flavor label (including ingredients) from `flavorLabels`

#### Scenario: Display environment preference

- **WHEN** a Pokemon has a non-null `environment` value
- **THEN** the detail view SHALL display a "環境偏好" section showing the Chinese environment label from `environmentLabels`

#### Scenario: Display favorite things

- **WHEN** a Pokemon has a non-null `things` array
- **THEN** the detail view SHALL display a "喜歡的東西" section showing Chinese labels for each thing from `thingLabels` as flex-wrapped tags

#### Scenario: Hide sections when data is missing

- **WHEN** a Pokemon has `null` for `flavor`, `environment`, or `things`
- **THEN** the corresponding section SHALL NOT be rendered in the detail view
