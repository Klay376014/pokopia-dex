## 1. Vue Router 引入方式

- [x] 1.1 安裝 vue-router 套件（bun add vue-router）
- [x] 1.2 建立 `src/router/index.ts`，設定 `createWebHistory` 與兩個路由（`/` → DexView、`/maps` → MapsView），實作 Vue Router multi-page architecture
- [x] 1.3 [P] 修改 `src/main.ts` 加入 `app.use(router)`
- [x] 1.4 [P] 新增 `public/_redirects`，內容為 `/* /index.html 200`，確保 Cloudflare Pages 支援 SPA 路由

## 2. App.vue 重構為 Shell

- [x] 2.1 [P] 新增 `src/views/DexView.vue`，將現有 App.vue 圖鑑邏輯（template、script、style）完整搬移，確保 App.vue 重構為 Shell 後圖鑑功能不受影響
- [x] 2.2 重構 `src/App.vue` 為 Shell，加入含品牌 Logo 的導航列與 `<RouterView>`，實作 navigation shell with active route indicator（active route 顯示品牌紅色底線）

## 3. useMapPlacements Composable

- [x] 3.1 [P] 新增 `src/composables/useMapPlacements.ts`，使用 `useLocalStorage`（VueUse）實作 persistent map placements，localStorage key 為 `pokopia-map-placements`，資料結構為 `Record<string, string[]>`
- [x] 3.2 實作 `addPokemon`、`removePokemon`、`getPokemonNames`、`isPlaced` 四個方法

## 4. MapsView 頁面

- [x] 4.1 新增 `src/views/MapsView.vue`，建立地圖配置頁主結構
- [x] 4.2 實作 map selection：5 張地圖縮圖卡片水平排列（可左右滑動），每張卡片顯示地圖名稱與已配置寶可夢數量，點擊切換 active 地圖
- [x] 4.3 [P] 實作已配置寶可夢列表區塊，每筆顯示 sprite + 名稱 + 移除鍵，實作 Pokémon removal from map 功能
- [x] 4.4 [P] 實作 skill distribution statistics（技能統計計算）：聚合 active 地圖所有寶可夢的 `skills[]`，以 chip 標籤顯示各技能計數（降序），使用 `skillLabels.ts`
- [x] 4.5 實作 responsive layout：手機版上下堆疊（地圖圖片 → 已配置列表 → 技能統計）

## 5. PokemonPickerModal 設計與實作

- [x] 5.1 新增 `src/components/PokemonPickerModal.vue`，沿用 `filter-btn-base` 樣式，實作 PokemonPickerModal 設計
- [x] 5.2 實作即時搜尋過濾（`name_zh` 或 `pokopia_id`），支援 Pokémon assignment to map（點擊未配置者加入，顯示 ✓ 標記）
- [x] 5.3 整合 MapsView 的「新增寶可夢」按鈕與空狀態提示，開啟 Modal 並在關閉後同步配置

## 6. 驗收

- [x] 6.1 確認 `/` 圖鑑正常顯示，現有篩選 / 書籤功能不受影響
- [x] 6.2 確認 `/maps` 正確渲染地圖配置頁
- [x] 6.3 確認新增 / 移除寶可夢後技能統計即時更新
- [x] 6.4 確認重新整理後 localStorage 資料持久化
- [x] 6.5 確認導航列 active 狀態正確高亮
- [x] 6.6 確認手機版版面正常（responsive layout）
