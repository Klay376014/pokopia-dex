## Context

Pokopia 圖鑑的篩選區域目前使用 `FilterBar.vue` 元件，以平鋪 pill buttons 展示所有選項。時間（4 項）和天氣（3 項）效果良好，但特長（34 項）和棲息地（100+ 項）佔滿畫面，嚴重影響使用體驗。

現有架構：
- `FilterBar.vue` — 接受 `label`、`options[]`、`selected[]`、`labels?` props，emit `toggle`
- `App.vue` — 使用 4 個 FilterBar 實例，篩選邏輯為 OR within / AND across
- 棲息地使用者行為分析：通常只選 1 個

## Goals / Non-Goals

**Goals:**

- 大幅減少篩選區域的垂直空間佔用
- 特長篩選保持可多選，使用 Accordion 收合/展開
- 棲息地篩選改為單選搜尋式 Dropdown，解決 100+ 選項的可用性問題
- 為所有新元件建立單元測試

**Non-Goals:**

- 不改變時間/天氣的 UI 呈現方式
- 不改變篩選邏輯（OR within, AND across）
- 不引入第三方 UI 元件庫
- 不處理 RWD / 手機版專屬佈局（現有 flex-wrap 已足夠）

## Decisions

### 特長篩選使用 CollapsibleFilterBar 元件

**選擇**：新建 `CollapsibleFilterBar.vue`，在現有 FilterBar 基礎上加入展開/收合功能。

**替代方案**：直接在 FilterBar 內加入 `collapsible` prop。
**選擇理由**：獨立元件職責更清晰，不影響時間/天氣已穩定使用的 FilterBar。

**實作要點**：
- 接受與 FilterBar 相同的 props + `defaultExpanded: boolean`
- 收合狀態顯示已選數量 badge 與 inline chips
- 展開/收合使用 CSS `grid-template-rows: 0fr → 1fr` 動畫

### 棲息地篩選使用 SearchableDropdown 元件

**選擇**：新建 `SearchableDropdown.vue` 作為單選搜尋式下拉選單。

**替代方案**：使用 Drawer 側邊面板 + 搜尋。
**選擇理由**：棲息地通常只選 1 個，Dropdown 操作步驟最少，不需要額外開面板中斷操作流程。

**實作要點**：
- Props：`label`、`options: string[]`、`modelValue: string | null`、`placeholder?`
- 輸入框聚焦時展開下拉選單，輸入文字即時過濾
- 選取後關閉下拉、顯示已選值於輸入框
- 點擊外部或按 Escape 關閉下拉
- 清除按鈕可取消選取

### 棲息地篩選從多選改為單選

**選擇**：`selectedHabitats: string[]` 改為 `selectedHabitat: string | null`。

**替代方案**：維持多選但用 Dropdown UI。
**選擇理由**：使用者幾乎只選 1 個棲息地，單選簡化了 UI 和狀態管理。

**影響**：`filteredPokemon` computed 中的棲息地篩選邏輯從陣列 `.some()` 改為單值比對。

### 測試框架使用 Vitest

**選擇**：Vitest + @vue/test-utils + jsdom。

**替代方案**：Jest。
**選擇理由**：Vitest 與 Vite 原生整合，零設定、速度快。

## Risks / Trade-offs

- **Accordion 展開後仍佔空間** → 34 項特長在展開時仍有一定高度，但遠優於 100+ 棲息地平鋪。可接受的 trade-off。
- **Dropdown 點擊外部關閉的實作** → 需要 `clickOutside` 監聽。使用 `@click.stop` + document click listener 實作，無需引入額外套件。
- **棲息地從多選改單選為 breaking change** → 使用者原本可多選棲息地（雖然幾乎不用），改為單選後行為改變。風險低，因實際使用模式已是單選。
