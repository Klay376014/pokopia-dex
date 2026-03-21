## Why

目前 FilterBar 將所有篩選選項（特長 34 個、棲息地 100+ 個）以平鋪 pill buttons 展示，佔滿整個畫面，使用者無法看到寶可夢列表。需要根據各分類的選項數量，採用不同的 UI 模式來優化空間利用與操作效率。

## What Changes

- 特長篩選（34 項）改為 **Accordion 手風琴收納**：預設收合，點擊展開，收合時顯示已選數量與 chips
- 棲息地篩選（100+ 項）改為**單選搜尋式 Dropdown**：輸入關鍵字即時過濾，從下拉選單中選取一個棲息地，選取後顯示於輸入框
- 時間、天氣篩選維持現狀（選項少，無需收納）
- 新增測試框架（Vitest + Vue Test Utils）與各元件的單元測試
- 篩選邏輯不變（OR within, AND across），棲息地從多選改為單選

## Capabilities

### New Capabilities

- `collapsible-filter`: 可收合/展開的篩選元件，支援已選 badge 與 inline chips 顯示
- `searchable-dropdown-filter`: 單選搜尋式下拉篩選元件，支援即時過濾棲息地選項

### Modified Capabilities

- `dex-frontend`: 特長篩選 UI 改為 Accordion 模式，棲息地篩選 UI 改為單選搜尋式 Dropdown（原為多選 pill buttons）

## Impact

- 受影響的 spec：`dex-frontend`（篩選 UI 呈現方式變更，棲息地從多選改為單選）
- 受影響的程式碼：
  - `src/components/FilterBar.vue` — 保留，僅用於時間/天氣
  - `src/components/CollapsibleFilterBar.vue` — 新增
  - `src/components/SearchableDropdown.vue` — 新增
  - `src/App.vue` — 修改 template 整合新元件，棲息地篩選邏輯從陣列改為單值
- 新增依賴：`vitest`、`@vue/test-utils`、`jsdom`（dev dependencies）
