## 1. Design System 更新

- [x] [P] 1.1 在 `src/App.vue` 的 `:root` 加入 spacing CSS custom properties（`--spacing-section: 24px`、`--spacing-group: 20px`、`--spacing-element: 8px`）— 對應間距節奏系統決策與 section spacing rhythm 需求

## 2. Header 調整

- [x] [P] 2.1 修改 branded header 副標題顏色為 `rgba(255, 255, 255, 0.7)`，移除 opacity 疊加 — 對應 Header 副標題對比度決策
- [x] [P] 2.2 將 header 下方 margin 改為 `var(--spacing-section)` (24px) — 對應 spacing below header 場景

## 3. Filter 區塊調整

- [x] [P] 3.1 修改 result count visibility：將結果數量文字改為 `--color-text-muted` 色彩 + `font-weight: 500` — 對應結果數量文字強化決策
- [x] [P] 3.2 將 filter 內部間距調整為 `var(--spacing-element)` (8px)，filter 區與 grid 間距調整為 `var(--spacing-group)` (20px) — 對應 section spacing rhythm 需求

## 4. 卡片樣式調整

- [x] [P] 4.1 為 Pokemon card list display 的卡片預設狀態加上 `box-shadow: 0 1px 3px oklch(0 0 0 / 0.06)` — 對應卡片靜態邊界決策
