## Why

玩家在規劃每張地圖的寶可夢陣容時，目前缺乏一個專屬的工具頁面，只能依靠紙本或外部筆記。新增地圖配置頁面，讓玩家可以直接在 Pokopia 圖鑑內手動規劃每張地圖的寶可夢部署，並即時查看各地圖的技能專長分佈統計。

## What Changes

- 新增 Vue Router，將應用程式改為多頁架構（`/` 圖鑑、`/maps` 地圖配置）
- 更新 `App.vue` 為含導航列的 Shell 佈局
- 將現有圖鑑內容搬移至 `DexView.vue`
- 新增 `MapsView.vue` 地圖配置主頁面
- 新增 `PokemonPickerModal.vue` 用於從圖鑑中挑選寶可夢加入地圖
- 新增 `useMapPlacements.ts` composable，以 localStorage 持久化地圖配置資料
- 支援 5 張遊戲地圖：乾巴巴荒野、暗沉沉海邊、凸隆隆山地、亮晶晶空島、空空鎮

## Capabilities

### New Capabilities

- `map-placements`: 地圖配置功能，包含寶可夢指派、技能分佈統計、localStorage 持久化

### Modified Capabilities

- `dex-frontend`: 加入 Vue Router 多頁架構與導航列 Shell

## Impact

- Affected specs: `map-placements` (new), `dex-frontend` (router integration)
- Affected code:
  - `src/main.ts` — 加入 `app.use(router)`
  - `src/App.vue` — 改為 Shell + 導航列
  - `src/router/index.ts` — 新增
  - `src/views/DexView.vue` — 新增（現有 App.vue 內容搬移）
  - `src/views/MapsView.vue` — 新增
  - `src/composables/useMapPlacements.ts` — 新增
  - `src/components/PokemonPickerModal.vue` — 新增
