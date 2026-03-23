## 1. UnoCSS 作為 CSS 工具框架：設置與 Vite plugin integration

- [x] [P] 1.1 安裝 UnoCSS 依賴（unocss, @unocss/preset-uno, @unocss/preset-web-fonts, @unocss/transformer-directives）
- [x] 1.2 建立 `uno.config.ts`，配置 UnoCSS theme configuration（oklch 色彩、DM Sans + Outfit 字型組合、presets、transformers）
- [x] 1.3 更新 `vite.config.ts`，將 UnoCSS 插件放在 Vue 插件之前（Vite plugin integration）
- [x] 1.4 在 `src/main.ts` 加入 `import 'virtual:uno.css'`
- [x] 1.5 驗證 `bun run dev` 正常啟動

## 2. oklch 色彩空間搭配 CSS custom properties 與全域樣式

- [x] 2.1 在 `src/App.vue` 全域 `<style>` 中定義 `:root` CSS custom properties（oklch 色彩空間搭配 CSS custom properties）
- [x] 2.2 更新 body 樣式：暖色背景、DM Sans 字型、暖黑文字色
- [x] 2.3 加入 subtle terrain background 漸層（radial gradients, background-attachment: fixed）

## 3. 顏色統一（Collapsible filter group 與其他元件）

- [x] [P] 3.1 替換 `FilterBar.vue` 硬編碼色值為 CSS custom properties
- [x] [P] 3.2 替換 `CollapsibleFilterBar.vue` 硬編碼色值為 CSS custom properties（collapsible filter group 配色統一）
- [x] [P] 3.3 替換 `SearchableDropdown.vue` 硬編碼色值為 CSS custom properties
- [x] [P] 3.4 替換 `PokemonDetail.vue` 硬編碼色值為 CSS custom properties
- [x] [P] 3.5 替換 `App.vue` 中篩選區、結果計數等硬編碼色值

## 4. Branded header 重設計

- [x] 4.1 重寫 `App.vue` branded header 模板：全寬紅色背景、Outfit 字型標題、副標題
- [x] 4.2 實作 CSS-only Pokéball 浮水印（半透明圓 + 橫線偽元素）

## 5. Pokemon card list display 重設計

- [x] 5.1 重寫 `PokemonCard.vue` 實作 Pokemon card list display：圓形精靈背景、紅色 ID、暖黑名稱（卡片圓形精靈背景）
- [x] 5.2 實作 card hover interaction（translateY + scale + 紅色光條 + 品牌陰影）

## 6. Themed search input 與網格微調

- [x] [P] 6.1 更新搜尋框樣式：themed search input（紅色焦點環、設計系統色彩）
- [x] [P] 6.2 調整 Pokemon grid 為 `minmax(130px, 1fr)` + gap 10px

## 7. 驗證

- [x] 7.1 執行 `bun run build` 確認無建置錯誤
- [x] 7.2 執行 `bun run test` 確認現有測試通過
- [x] 7.3 視覺驗證：紅色 header + Pokéball 浮水印、卡片圓形精靈背景 + hover 紅色光條、篩選功能正常
