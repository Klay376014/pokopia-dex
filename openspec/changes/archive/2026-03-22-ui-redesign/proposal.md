## Why

目前的 Pokopia Dex 外觀過於樸素——白灰色背景、藍色按鈕、系統字型，缺乏寶可夢品牌特色與視覺吸引力。需要引入現代設計系統（UnoCSS + oklch 色彩），打造融合經典圖鑑紅色配色與自然探索元素的專業介面。

## What Changes

- 引入 UnoCSS 取代手寫 CSS，建立統一的色彩主題與工具類系統
- 全域配色從藍灰色切換至寶可夢紅色品牌色系（oklch 色彩空間），所有中性色偏暖
- 字型從系統字型改為 DM Sans（內文）+ Outfit（標題）
- Header 重新設計：紅色背景 + CSS Pokéball 浮水印 + 副標題
- Pokemon 卡片重新設計：圓形精靈背景、hover 紅色光條、品牌配色
- 所有現有元件的硬編碼色值統一替換為 CSS custom properties

## Capabilities

### New Capabilities

- `design-system`: UnoCSS 主題配置、oklch 色彩系統、CSS custom properties、字型設定

### Modified Capabilities

- `dex-frontend`: Header 重新設計（紅色品牌 Header + Pokéball 浮水印）、網格與搜尋框樣式更新、全域配色與背景改版
- `collapsible-filter`: 硬編碼色值替換為 CSS custom properties（僅配色，無行為變更）

## Impact

- 新增依賴：`unocss`、`@unocss/preset-uno`、`@unocss/preset-web-fonts`、`@unocss/transformer-directives`
- 新增檔案：`uno.config.ts`
- 修改檔案：`vite.config.ts`、`src/main.ts`、`src/App.vue`、`src/components/PokemonCard.vue`、`src/components/FilterBar.vue`、`src/components/CollapsibleFilterBar.vue`、`src/components/SearchableDropdown.vue`、`src/components/PokemonDetail.vue`
