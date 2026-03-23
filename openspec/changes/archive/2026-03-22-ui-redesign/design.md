## Context

Pokopia Dex 目前使用手寫 inline CSS，配色為通用的藍灰色系，缺乏品牌識別度。使用者希望轉型為具有寶可夢風格的現代圖鑑介面。現有元件結構良好（App.vue + 6 個子元件），此次改版聚焦於視覺層，不改變功能邏輯。

## Goals / Non-Goals

**Goals:**

- 引入 UnoCSS 建立可維護的設計系統
- 建立以寶可夢紅為主的 oklch 色彩體系，所有中性色偏暖
- 重新設計 Header 和 Pokemon 卡片，提升視覺吸引力
- 統一所有元件的色值為 CSS custom properties

**Non-Goals:**

- 不重新設計 FilterBar、CollapsibleFilterBar、SearchableDropdown、PokemonDetail 的結構（僅做配色統一）
- 不改變任何功能邏輯或資料流
- 不加入深色模式
- 不加入動畫庫或複雜動效

## Decisions

### UnoCSS 作為 CSS 工具框架

選擇 UnoCSS 而非 Tailwind CSS，因為它與 Vite 整合更原生、啟動更快、體積更小。搭配 `preset-uno`（Tailwind 語法相容）、`preset-web-fonts`（字型載入）和 `transformer-directives`（`@apply` 支援）。

替代方案：Tailwind CSS（更大社群但啟動較慢）、純手寫 CSS（不夠高效）。

### oklch 色彩空間搭配 CSS Custom Properties

使用 oklch 色彩函數定義所有色彩，因為它是感知均勻的色彩空間，適合建立一致的色彩體系。中性色（surface、text、border）全部偏向紅色色調（hue 27），避免冷灰色。

同時定義 `:root` CSS custom properties，讓不在 UnoCSS 改版範圍內的元件也能繼承新配色。

### DM Sans + Outfit 字型組合

內文使用 DM Sans（人文無襯線，辨識度高於 Inter/Roboto），標題使用 Outfit（幾何風，粗體效果突出）。中文字型回退至系統字型（macOS PingFang TC）。

替代方案：Noto Sans TC（需額外載入 CJK 字型，增加體積）。

### CSS-only Pokéball 浮水印

Header 的 Pokéball 裝飾使用純 CSS 實現（圓形 + 橫線偽元素），低透明度（~0.15），不使用 SVG 或圖片資源。保持品牌感但不過度裝飾。

### 卡片圓形精靈背景

使用 80px 圓形區域包裹精靈圖，取代直接放置在方形卡片中。搭配 hover 時顯示的 3px 紅色漸層光條，增加互動回饋。

## Risks / Trade-offs

- **oklch 瀏覽器相容性** → 所有現代瀏覽器（2023 年起）皆支援，本專案為 Vite SPA 不需支援舊瀏覽器
- **CJK 字型回退** → DM Sans 不含中文字形，中文部分回退至系統字型。macOS 上 PingFang TC 與 DM Sans 搭配效果可接受
- **color-mix() 相容性** → 2023 年中起主流瀏覽器皆支援，安全使用
- **UnoCSS 與 scoped styles 共存** → UnoCSS 生成全域 utility class，在 Vue scoped style 中需使用 `@apply` 或直接寫 oklch 值
