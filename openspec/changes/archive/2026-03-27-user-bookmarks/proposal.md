## Why

玩家在使用 Pokopia 圖鑑時，想要標記自己感興趣的寶可夢，以便後續快速篩選查看。目前所有狀態都是暫時性的，沒有任何個人化的持久儲存機制。

## What Changes

- 新增使用者收藏功能：可在卡片和詳情頁上切換收藏狀態（愛心圖示）
- 收藏資料透過 localStorage 持久化，重新整理不會遺失
- 篩選區塊新增「僅顯示收藏」開關，與現有篩選條件 AND 疊加

## Capabilities

### New Capabilities

- `user-bookmarks`: 使用者收藏寶可夢功能，包含 localStorage 持久化與收藏篩選

### Modified Capabilities

- `dex-frontend`: 新增收藏篩選按鈕至篩選區塊，PokemonCard 和 PokemonDetail 新增收藏互動元素

## Impact

- 新增檔案：`src/composables/useBookmarks.ts`
- 修改檔案：`src/App.vue`、`src/components/PokemonCard.vue`、`src/components/PokemonDetail.vue`
- 無後端依賴，純前端變更
- 使用 localStorage API
