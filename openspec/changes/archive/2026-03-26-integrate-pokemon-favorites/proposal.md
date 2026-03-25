## Why

`data/favorite.json` 包含寶可夢的口味、環境偏好、喜歡的東西等喜好資料，目前尚未整合進應用程式。這些資料能讓玩家更完整地了解每隻寶可夢的特性，提升 Pokopia 圖鑑的實用性。

## What Changes

- 新增合併腳本，將 `favorite.json` 的喜好資料（flavor、environment、things）以英文 key 寫入 `pokopia.json`
- 新增英文→中文的 label mapping 檔（仿 `skillLabels.ts` 模式）
- 擴充 `Pokemon` TypeScript 型別以包含新欄位
- 在 `PokemonDetail.vue` 新增口味、環境偏好、喜歡的東西三個顯示區塊

## Capabilities

### New Capabilities

- `pokemon-favorites`: 寶可夢喜好資料的資料處理、mapping 與 UI 顯示

### Modified Capabilities

- `dex-frontend`: PokemonDetail 元件新增喜好資料顯示區塊

## Impact

- 資料檔案：`data/pokopia.json`（由腳本更新，新增 3 欄位）
- 新增檔案：`src/favoriteLabels.ts`、`scripts/merge-favorites.ts`
- 修改檔案：`src/types.ts`、`src/components/PokemonDetail.vue`
