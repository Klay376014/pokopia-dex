## MODIFIED Requirements

### Requirement: Combined filter behavior

All active filters, search, and the bookmark filter SHALL be combined with AND logic. Within each filter category, multiple selections SHALL use OR logic. The bookmark filter SHALL be evaluated first in the filter chain.

#### Scenario: Combined filters

- **WHEN** the user selects time "day" AND weather "rainy" AND searches "妙"
- **THEN** only Pokemon matching ALL three criteria SHALL be displayed

#### Scenario: Bookmark filter combined with other filters

- **WHEN** the user enables "僅顯示收藏" AND selects habitat "某棲息地"
- **THEN** only Pokemon that are both bookmarked AND found in that habitat SHALL be displayed
