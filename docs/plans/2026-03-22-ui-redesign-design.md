# Pokopia Dex UI Redesign

> 日期：2026-03-22

## Context

目前的 Pokopia Dex 外觀過於樸素 — 白灰色背景、藍色按鈕、系統字型。目標是打造一個**現代寶可夢圖鑑 App**，融合經典紅色品牌配色與自然探索元素，看起來專業且有吸引力。

## 設計方向

- **現代圖鑑 App** — 乾淨的現代介面，經典紅色配色 + 自然元素（地形漸層）作為裝飾
- 遵循 Impeccable 設計原則：避免 AI 風格（不用 Inter/Roboto、不用紫色漸層、不用純黑純白）

## 改版範圍

**重點改版（本次）**：Header、Pokemon 卡片、整體配色與字型

**暫不處理**：FilterBar、CollapsibleFilterBar、SearchableDropdown、PokemonDetail（僅做顏色統一）

## 技術方案

引入 **UnoCSS** 取代手寫 CSS，搭配 oklch 色彩系統。

---

## 實作步驟

### Step 1: UnoCSS Setup

安裝依賴：
```bash
bun add -D unocss @unocss/preset-uno @unocss/preset-web-fonts @unocss/transformer-directives
```

建立 `uno.config.ts`：
- `presetUno()` — Tailwind 相容工具類
- `presetWebFonts()` — DM Sans（內文）+ Outfit（標題）
- `transformerDirectives()` — 支援 `@apply`
- 主題色彩（oklch）：
  - **primary**：經典圖鑑紅 `oklch(0.55 0.22 27)`
  - **accent**：自然綠 `oklch(0.58 0.12 145)`
  - **surface**：偏紅暖色中性色（非純白）
  - **text**：暖黑 `oklch(0.22 0.02 27)`

更新 `vite.config.ts`：`UnoCSS()` 放在 `vue()` 之前。

更新 `src/main.ts`：加入 `import 'virtual:uno.css'`。

**涉及檔案**：`uno.config.ts`（新建）、`vite.config.ts`、`src/main.ts`

---

### Step 2: 全域樣式與 CSS 變數

在 `src/App.vue` 全域 `<style>` 中：
- 定義 `:root` CSS custom properties 對應 oklch 色盤
- Body：暖色背景、DM Sans 字型、暖色文字
- 微妙地形背景漸層（`background-attachment: fixed`）
- 保留 `*` box-sizing reset

**涉及檔案**：`src/App.vue`

---

### Step 3: 顏色統一（機械式替換）

所有元件的硬編碼色值替換為 CSS 變數：

| 舊值 | 新值 |
|------|------|
| `#4a90d9` | `var(--color-primary)` |
| `#333` | `var(--color-text)` |
| `#666` | `var(--color-text-muted)` |
| `#888`, `#999` | `var(--color-text-subtle)` |
| `#ddd` | `var(--color-border)` |
| `white`（背景）| `var(--color-surface-raised)` |
| `#fafafa`, `#f8f8f8`, `#f9f9f9` | `var(--color-surface)` |
| `#1976d2` / `#e3f2fd` | primary red 變體 |
| `#e8e8e8`, `#eee` | `var(--color-surface-muted)` |

**涉及檔案**：`FilterBar.vue`、`CollapsibleFilterBar.vue`、`SearchableDropdown.vue`、`PokemonDetail.vue`、`App.vue`

---

### Step 4: Header 重設計

在 `src/App.vue` 中：
- 全寬紅色背景
- Outfit 字型，流體大小 `clamp(1.5rem, 4vw, 2.25rem)`，白色粗體
- 副標題：「寶可夢棲息地探索手冊」淺紅色
- CSS-only Pokéball 浮水印：半透明圓 + 橫線，右上角，低透明度 (~0.15)
- `overflow: hidden` 優雅裁切浮水印

**涉及檔案**：`src/App.vue`

---

### Step 5: Pokemon 卡片重設計

在 `src/components/PokemonCard.vue` 中：
- 暖色 surface 背景
- 精靈圖圓形背景（80px，微妙底色）
- 頂部紅色光條（3px 漸層），hover 時顯示
- ID 用 primary red 顯示
- 名稱暖黑色，font-weight 600
- Hover：`translateY(-3px) scale(1.02)` + 指數緩動 `cubic-bezier(0.33, 1, 0.68, 1)`
- Hover 陰影：品牌色調 `oklch(0.55 0.22 27 / 0.12)`
- 保留 `image-rendering: pixelated`

**涉及檔案**：`src/components/PokemonCard.vue`

---

### Step 6: 網格與搜尋微調

在 `src/App.vue` 中：
- Grid：`minmax(130px, 1fr)`，gap `10px`
- 搜尋框：`var(--color-border)`，focus 紅色焦點環
- 篩選容器：暖色 surface 背景

**涉及檔案**：`src/App.vue`

---

## 驗證

1. `bun run dev` — 開發伺服器正常啟動
2. 視覺檢查：紅色 Header + Pokéball 浮水印、卡片圓形精靈背景 + hover 紅色光條
3. 篩選功能正常（顏色改變但邏輯不變）
4. 點擊寶可夢 — Detail modal 顯示更新後的配色
5. `bun run build` — 無建置錯誤
6. `bun run test` — 現有測試通過

---

## Step 7: Impeccable 設計審查

實作完成後，使用 Impeccable 設計工具做專業審查與精修：

1. **`/critique`** — UX 設計審查：檢查視覺層級、清晰度、情感共鳴
2. **根據回饋修正** — 調整設計細節
3. **`/polish`** — 最終出貨前打磨
