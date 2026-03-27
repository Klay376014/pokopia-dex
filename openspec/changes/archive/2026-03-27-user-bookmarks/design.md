## Context

Pokopia 圖鑑目前所有狀態（篩選條件、搜尋文字）都是暫時性的，重新整理頁面後就會遺失。應用程式使用 Vue 3 Composition API，所有狀態以 `ref()` 管理在 `App.vue` 中，沒有使用 Pinia。現有篩選系統採用「同類別 OR、跨類別 AND」的邏輯組合。

## Goals / Non-Goals

**Goals:**

- 提供使用者收藏寶可夢的能力，透過 localStorage 持久化
- 在卡片和詳情頁都能快速切換收藏狀態
- 提供「僅顯示收藏」篩選，與現有篩選條件 AND 疊加

**Non-Goals:**

- 跨裝置同步或後端儲存
- URL 分享收藏清單
- 收藏排序或分組功能

## Decisions

### 使用 module-level singleton composable 管理收藏狀態

建立 `src/composables/useBookmarks.ts`，以 module-level 的 `ref<Set<string>>` 作為 singleton 狀態。所有元件透過 `useBookmarks()` 取得同一份資料，不需要 Pinia 或 provide/inject。

**替代方案：** Pinia store — 但專案目前沒有使用 Pinia，為單一功能引入新依賴不划算。

### 每次 toggle 替換整個 Set 而非 mutate

Vue 的 `ref` 無法深層追蹤 Set 的 `add`/`delete` 操作。因此每次 toggle 時建立新的 Set 取代舊的，確保 reactivity 正確觸發。

### 收藏篩選放在篩選區塊最上方

在搜尋欄上方加一個 toggle 按鈕「僅顯示收藏」，帶收藏數量 badge。作為最高優先級的篩選條件，位於 `filteredPokemon` computed 的最前面。

### PokemonCard 愛心按鈕使用 hover-reveal 模式

未收藏時，愛心圖示僅在 hover 卡片時半透明出現；已收藏時常駐顯示。使用 `@click.stop` 避免觸發詳情頁。

## Risks / Trade-offs

- **localStorage 容量限制** → 收藏僅儲存 pokopia_id 字串陣列，即使收藏全部 311 隻也不到 2KB，不會有問題
- **清除瀏覽器資料會遺失收藏** → 這是 localStorage 的本質限制，屬於 Non-Goal 範圍，未來如需要可加上匯出功能
- **Set reactivity 需注意** → 透過「替換而非 mutate」的設計已解決
