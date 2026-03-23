## Context

UI redesign 已完成，設計審查報告指出四個優先改善項目。目前的介面品牌感和配色系統良好，但在間距節奏、文字對比度和卡片邊界感上需要微調。所有改動都是 CSS 層面的調整，不涉及邏輯或資料變更。

## Goals / Non-Goals

**Goals:**

- 建立清晰的 spacing 層次：header → filters → grid 之間有明確的呼吸感
- 提升結果數量文字的可見度
- 改善 Header 副標題在紅色背景上的對比度
- 為卡片靜態狀態增加視覺邊界

**Non-Goals:**

- 不改變現有的色彩系統（oklch palette 維持不變）
- 不調整卡片 hover 動畫行為
- 不修改 grid 欄數或 breakpoint 邏輯
- 不重構元件結構

## Decisions

### 間距節奏系統

採用三級間距：header 下方 24px、filters 與 grid 之間 20px、filters 內部維持 8px。這建立了由大到小的視覺層次，讓使用者直覺區分不同區塊。

### 結果數量文字強化

將 `--color-text-subtle` 改為 `--color-text-muted`，並加上 `font-weight: 500`。不移動位置，維持現有佈局。

### Header 副標題對比度

移除 opacity 疊加方式，直接使用 `rgba(255, 255, 255, 0.7)` 作為色值。這在紅色背景上提供更穩定的對比度。

### 卡片靜態邊界

加上 `box-shadow: 0 1px 3px oklch(0 0 0 / 0.06)` 作為淡陰影。選擇 box-shadow 而非 border 是因為不會影響卡片尺寸計算，且與 hover 時的陰影過渡更自然。

## Risks / Trade-offs

- [風險] 間距調整可能影響小螢幕的可視卡片數量 → 影響極小（總計增加 ~20px），且不改變 grid 本身的 gap
- [風險] 卡片靜態陰影在大量卡片時可能造成視覺噪音 → 使用極淡的 0.06 opacity，不會搶走 hover 狀態的視覺重心
