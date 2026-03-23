# Pokopia Dex — Impeccable Design Critique Report

> 日期：2026-03-22
> 對象：ui-redesign 實作後的視覺審查

## Anti-Patterns Verdict

**PASS** — 整體不像典型 AI 生成介面：
- 沒有紫色漸層、深色模式 + 發光效果
- 沒有 Inter/Roboto
- 沒有 glassmorphism
- oklch 色彩系統 + 暖色調中性色做得好
- 指數緩動曲線正確

小 tell：所有卡片完全相同大小、等距排列（identical card grid），但 Pokédex 本質上就是列表，可接受。

## Overall Impression

品牌感有了，紅色 Header 和配色統一做得好。**最大的機會是 spacing rhythm** — 目前從 header 到 filters 到 grid 都用很接近的間距（16px/12px/8px），缺少呼吸感和層次。

## What's Working

1. **Header 品牌感強** — 紅色背景 + Pokéball 浮水印 + Outfit 字體，一看就是寶可夢風格
2. **卡片 hover 互動** — 紅色光條 + 品牌色陰影 + 指數緩動，回饋感好且品牌一致
3. **配色統一** — oklch 暖色調系統讓整個 app 感覺連貫

## Priority Issues

### 1. Spacing 缺乏節奏感

- **What**: Header、filters、grid 之間間距太均勻（都是 ~16px）
- **Why it matters**: 用戶無法直覺感受到區塊之間的層級關係
- **Fix**: Header 下方加大到 24px，filters 和 grid 之間也加大到 20px，filters 內部保持 8px 緊湊
- **Command**: `/arrange`

### 2. Result count 太弱

- **What**: `"152 / 152"` 太小且太淡，夾在 filters 和 grid 之間像是被遺忘的元素
- **Why it matters**: 篩選後的重要回饋，需要被注意到
- **Fix**: 放到 filters 區塊內部的右下角，或加 font-weight，用 `var(--color-text-muted)` 而非 `subtle`
- **Command**: `/arrange`

### 3. Header 副標題可見度不足

- **What**: 副標題用 `var(--color-primary-light)` + `opacity: 0.85`，在紅色背景上不夠清晰
- **Why it matters**: 副標題是品牌定位的一部分
- **Fix**: 改用 `rgba(255, 255, 255, 0.7)` 或更亮的對比色，去掉 opacity
- **Command**: `/typeset`

### 4. 卡片缺少靜態視覺區分

- **What**: 不 hover 時所有卡片無邊框、同色背景，在密集 grid 中糊成一片
- **Why it matters**: 缺少邊界感
- **Fix**: 加 `border: 1px solid var(--color-border)` 或 `box-shadow: 0 1px 2px oklch(0 0 0 / 0.04)`
- **Command**: `/bolder`

## Minor Observations

- Pokéball 浮水印只在右上角，可在左下角加一個更小的（~80px）創造對角線平衡
- 搜尋框 placeholder 文字對比度需確認
- `.filters` 的 `box-shadow`（0.08 opacity）幾乎看不到，可加強到 0.12

## Questions to Consider

- 如果 header 不是圓角而是全寬（edge-to-edge），會不會更有 App 的感覺？
- 結果數量 + 排序功能組合在一行，會不會讓 filters 區更完整？
- 卡片 grid 是否可以考慮在手機上用 2 欄、桌面用更多欄？
