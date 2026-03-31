## Context

目前 Pokopia 圖鑑是一個單頁應用，所有內容放在 `App.vue`。為了新增「地圖配置」功能，需要引入 Vue Router 建立多頁架構，並新增相關元件與 composable。現有圖鑑功能必須維持不變。

應用使用 Vue 3 + TypeScript + Vite，資料來源為 `pokopia.json`，技能標籤由 `skillLabels.ts` 管理。

## Goals / Non-Goals

**Goals:**

- 引入 Vue Router，建立 `/`（圖鑑）與 `/maps`（地圖配置）兩個路由
- 將現有 App.vue 邏輯搬移至 DexView.vue，App.vue 改為 Shell
- 新增含導航列的 Shell 佈局，active route 以品牌紅色底線標示
- 實作地圖配置頁，支援寶可夢指派與技能統計
- 使用 localStorage 持久化配置資料（key: `pokopia-map-placements`）
- 支援手機版響應式（上下堆疊）

**Non-Goals:**

- 伺服器端儲存或帳號同步
- 自動配置建議或演算法推薦
- 地圖之間的寶可夢數量限制
- 深色模式

## Decisions

### Vue Router 引入方式

使用 `vue-router` 建立 `src/router/index.ts`，在 `main.ts` 以 `app.use(router)` 掛載。選擇 `createWebHistory` 取得乾淨 URL（`/maps` 而非 `/#/maps`）。Cloudflare Pages 只需在 `public/_redirects` 加入一行 `/* /index.html 200` 即可處理 SPA 路由，部署複雜度極低。

替代方案：`createWebHashHistory` — 零設定，但 URL 含 `#` 較不美觀。

### App.vue 重構為 Shell

將 App.vue 改為只包含導航列 + `<RouterView>`，原有圖鑑邏輯搬移至 `src/views/DexView.vue`。此方案避免改動現有圖鑑邏輯，風險最低。

### useMapPlacements Composable

使用 `Record<string, string[]>` 結構儲存配置，key 為 mapId，value 為寶可夢名稱陣列。提供 `addPokemon`、`removePokemon`、`getPokemonNames`、`isPlaced` 方法。使用 VueUse 的 `useLocalStorage` 確保響應式持久化。

### PokemonPickerModal 設計

Modal 使用現有 filter-btn-base 樣式，支援即時搜尋（名稱或 pokopia_id）。已配置的寶可夢顯示 ✓ 標記，點擊可切換加入/移除狀態，關閉時批次確認。

### 技能統計計算

在 `MapsView.vue` 以 computed property 即時計算：取得當前地圖的寶可夢列表 → 展開各寶可夢的 skills[] → 計數 → 降序排列 → 以 chip 標籤顯示。

## Risks / Trade-offs

- **Cloudflare Pages `_redirects`** → 需額外新增 `public/_redirects`，但只有一行，風險極低
- **localStorage 容量** → 寶可夢名稱字串，實際佔用極小，可忽略
- **搬移 App.vue 內容** → 需確認所有 import、composable、emit 完整搬移，避免漏移
