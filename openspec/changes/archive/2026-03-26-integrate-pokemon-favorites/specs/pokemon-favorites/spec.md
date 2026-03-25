## ADDED Requirements

### Requirement: Favorite data merge script

The system SHALL provide a merge script (`scripts/merge-favorites.ts`) that reads `data/favorite.json` and merges favorite data into `data/pokopia.json` by matching Pokemon Chinese names.

#### Scenario: Successful merge by name matching

- **WHEN** the merge script is executed
- **THEN** each Pokemon entry in `pokopia.json` whose `name_zh` matches a `name` in `favorite.json` SHALL have `flavor`, `environment`, and `things` fields populated with English keys

#### Scenario: Name normalization for matching

- **WHEN** a Pokemon name contains fullwidth parentheses `（）` in one file and halfwidth `()` in the other
- **THEN** the script SHALL normalize both to halfwidth `()` before matching

#### Scenario: Unmatched Pokemon

- **WHEN** a Pokemon in `pokopia.json` has no matching entry in `favorite.json`
- **THEN** the `flavor`, `environment`, and `things` fields SHALL be set to `null`
- **THEN** the script SHALL log the unmatched Pokemon name

#### Scenario: Unknown or pending data

- **WHEN** a favorite entry contains `待更新` or `–` for any field
- **THEN** that field SHALL be set to `null` in the merged output

---

### Requirement: Favorite data English key mapping

The system SHALL provide a mapping file (`src/favoriteLabels.ts`) that exports `flavorLabels`, `environmentLabels`, and `thingLabels` as `Record<string, string>` mapping English keys to Chinese labels.

#### Scenario: Flavor label lookup

- **WHEN** a component looks up a flavor key (e.g., `"sweet"`)
- **THEN** `flavorLabels` SHALL return the full Chinese label including ingredients (e.g., `"甜甜的(桃桃果、豆子)"`)

#### Scenario: Environment label lookup

- **WHEN** a component looks up an environment key (e.g., `"bright"`)
- **THEN** `environmentLabels` SHALL return the Chinese label (e.g., `"明亮"`)

#### Scenario: Thing label lookup

- **WHEN** a component looks up a thing key (e.g., `"nature"`)
- **THEN** `thingLabels` SHALL return the Chinese label (e.g., `"能感受大自然的"`)

---

### Requirement: Data cleaning during merge

The merge script SHALL normalize and clean data before converting to English keys.

#### Scenario: Environment typo correction

- **WHEN** the script encounters `溫款` as an environment value
- **THEN** it SHALL treat it as `溫暖` and map to `warm`

#### Scenario: Things abbreviation normalization

- **WHEN** the script encounters abbreviated things values (e.g., `海`, `大家用`, `食物`, `色彩`, `多彩`, `遊樂`)
- **THEN** it SHALL normalize them to their full forms before mapping to English keys

#### Scenario: Things split by delimiter

- **WHEN** the script processes a `things` field value
- **THEN** it SHALL split the value by `、` (Chinese enumeration comma) into individual items

---

### Requirement: Pokemon type includes favorite fields

The `Pokemon` TypeScript interface SHALL include `flavor` as `string | null`, `environment` as `string | null`, and `things` as `string[] | null`.

#### Scenario: Pokemon with complete favorite data

- **WHEN** a Pokemon has all favorite data available
- **THEN** `flavor` SHALL be a string English key, `environment` SHALL be a string English key, and `things` SHALL be an array of string English keys

#### Scenario: Pokemon with missing favorite data

- **WHEN** a Pokemon has no favorite data or data marked as unknown
- **THEN** `flavor`, `environment`, and `things` SHALL all be `null`
