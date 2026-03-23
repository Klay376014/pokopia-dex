## Why

UI redesign 完成後的視覺審查發現四個優先問題：spacing 缺乏節奏感、結果數量文字太弱、Header 副標題對比度不足、卡片靜態狀態缺少視覺區分。這些問題影響了介面的層次感和可讀性，需要在設計系統層面進行微調。

## What Changes

- 調整 Header、filters、grid 之間的間距節奏（header 下方 24px、filters-grid 間 20px、filters 內部保持 8px）
- 強化結果數量文字（提升 font-weight，改用 `--color-text-muted`）
- 改善 Header 副標題可見度（改用 `rgba(255,255,255,0.7)` 取代 opacity 疊加）
- 為卡片靜態狀態加上邊框或淡陰影以區分邊界

## Capabilities

### New Capabilities

（無）

### Modified Capabilities

- `design-system`: 調整 spacing tokens 和色彩變數以支援新的間距節奏和對比度要求
- `dex-frontend`: 修改卡片樣式、Header 副標題、結果數量顯示的視覺呈現

## Impact

- 受影響的 specs：`design-system`、`dex-frontend`
- 受影響的程式碼：
  - `src/App.vue`（Header 副標題樣式、spacing）
  - `src/components/PokemonCard.vue`（卡片邊框/陰影）
  - `src/components/FilterBar.vue` 或 `src/components/CollapsibleFilterBar.vue`（結果數量樣式、間距）
  - `uno.config.ts`（spacing / design tokens）
