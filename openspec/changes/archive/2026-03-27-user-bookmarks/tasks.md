## 1. 核心狀態管理

- [x] [P] 1.1 建立 `src/composables/useBookmarks.ts`，使用 module-level singleton composable 管理收藏狀態，實作 bookmark persistence via localStorage（key: `pokopia-bookmarks`），每次 toggle 替換整個 Set 而非 mutate
- [x] [P] 1.2 為 useBookmarks composable 撰寫單元測試，涵蓋 toggle、localStorage 讀寫、空值/無效 JSON 處理

## 2. 卡片收藏互動

- [x] 2.1 修改 `PokemonCard.vue`，新增 bookmark toggle on Pokemon card（愛心按鈕），PokemonCard 愛心按鈕使用 hover-reveal 模式，`@click.stop` 避免觸發詳情頁
- [x] 2.2 為 PokemonCard 的 bookmark 互動撰寫元件測試

## 3. 詳情頁收藏互動

- [x] [P] 3.1 修改 `PokemonDetail.vue`，新增 bookmark toggle on Pokemon detail view（愛心按鈕放在名稱旁邊）
- [x] [P] 3.2 為 PokemonDetail 的 bookmark 互動撰寫元件測試

## 4. 篩選整合

- [x] 4.1 修改 `App.vue`，新增 filter by bookmarked status 的 toggle 按鈕（收藏篩選放在篩選區塊最上方），含 bookmark count badge，整合 combined filter behavior（AND 邏輯）
- [x] 4.2 將 bookmark props 傳遞至 PokemonCard 和 PokemonDetail
- [x] 4.3 撰寫篩選邏輯的整合測試，驗證 bookmark filter 與其他篩選條件的 AND 疊加行為
