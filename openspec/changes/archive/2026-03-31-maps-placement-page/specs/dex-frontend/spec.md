## ADDED Requirements

### Requirement: Vue Router multi-page architecture

The application SHALL use Vue Router with web history (`createWebHistory`) to support clean URLs. A `_redirects` file SHALL be provided for Cloudflare Pages to handle SPA routing.

#### Scenario: Dex route

- **WHEN** the user navigates to `/`
- **THEN** the application SHALL render `DexView.vue` with the existing Pokédex functionality unchanged

#### Scenario: Maps route

- **WHEN** the user navigates to `/maps`
- **THEN** the application SHALL render `MapsView.vue` with the map placement interface

### Requirement: Navigation shell with active route indicator

The application shell (`App.vue`) SHALL display a top navigation bar with links to all pages. The active route SHALL be visually indicated with a brand red underline.

#### Scenario: Navigation bar display

- **WHEN** any page is loaded
- **THEN** the navigation bar SHALL show the Pokopia logo on the left and navigation links ("圖鑑", "地圖配置") on the right

#### Scenario: Active route highlight

- **WHEN** the user is on the dex route (`/`)
- **THEN** the "圖鑑" link SHALL be highlighted with a brand red underline

#### Scenario: Active maps route highlight

- **WHEN** the user is on the maps route (`/maps`)
- **THEN** the "地圖配置" link SHALL be highlighted with a brand red underline
