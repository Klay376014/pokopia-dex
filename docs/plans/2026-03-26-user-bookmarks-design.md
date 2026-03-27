# User Bookmarks Feature Design

## Problem

玩家在使用 Pokopia 圖鑑時，想要標記自己感興趣的寶可夢，以便後續快速篩選查看。目前所有狀態都是暫時性的，沒有任何個人化的持久儲存機制。

## Goals

- 讓使用者可以收藏/取消收藏任意寶可夢
- 收藏資料持久化到 localStorage，重新整理不會遺失
- 提供「僅顯示收藏」篩選功能，與現有篩選條件疊加
- 支援透過 URL 分享收藏清單給其他人

---

## Architecture

### State Management: `useBookmarks()` Composable

新建 `src/composables/useBookmarks.ts`，以 module-level singleton 管理狀態（不需要 Pinia）。

**API:**

| Method | Description |
|---|---|
| `toggle(id: string)` | 切換收藏狀態 |
| `isBookmarked(id: string): boolean` | 查詢是否已收藏 |
| `bookmarkedIds: ComputedRef<Set<string>>` | 所有已收藏的 pokopia_id（reactive） |
| `count: ComputedRef<number>` | 收藏數量 |
| `copyShareUrl(): Promise<void>` | 產生含 `?bookmarks=001,002,...` 的 URL 並複製到剪貼簿 |
| `getUrlBookmarks(): string[] \| null` | 從當前 URL 讀取 bookmarks 參數 |
| `mergeFromUrl(ids: string[])` | 將 URL 中的收藏合併到 localStorage，清理 URL |

**關鍵設計：**
- localStorage key: `pokopia-bookmarks`，儲存為 JSON 陣列
- 每次 toggle 時替換整個 Set（不直接 mutate），確保 Vue reactivity 正確追蹤
- `navigator.clipboard.writeText()` 包在 try/catch 中處理安全性限制

---

## UI Changes

### 1. PokemonCard — 愛心圖示

在每張卡片右上角加上愛心按鈕：

- **未收藏**: 隱藏，hover 卡片時以半透明出現（`♡`）
- **已收藏**: 常駐顯示，紅色填滿（`♥`，使用 `text-primary`）
- **互動**: `@click.stop` 避免觸發詳情頁，hover 時 `scale(1.2)`

**Props 新增:** `bookmarked: boolean`
**Emits 新增:** `toggleBookmark: [pokopiaId: string]`

### 2. PokemonDetail — 收藏按鈕

在寶可夢名稱旁邊（`<h2>` 右側）加一個愛心按鈕：

- 與名稱同行排列（flex row, center aligned）
- 點擊切換收藏狀態

**Props 新增:** `bookmarked: boolean`
**Emits 新增:** `toggleBookmark: [pokopiaId: string]`

### 3. Filter Section — 收藏篩選 & 分享

在篩選區塊最上方（搜尋欄之前）加入：

- **「僅顯示收藏」** toggle 按鈕 — 帶愛心圖示和收藏數量 badge
  - 啟用時套用 `bg-primary text-surface-raised` 樣式
  - 與所有其他篩選條件 AND 疊加
- **「分享收藏」** 按鈕 — 僅在有收藏時顯示
  - 點擊後複製帶 `?bookmarks=` 參數的 URL 到剪貼簿
  - 顯示 Toast 提示「已複製分享連結」（2 秒後自動消失）

### 4. URL Import Banner

當頁面載入時偵測到 `?bookmarks=` 參數，在 header 和 filter section 之間顯示橫幅：

> 偵測到分享的收藏清單（N 隻），要合併到你的收藏嗎？ [合併] [忽略]

- **合併**: 將 URL 中的 ID 加入現有收藏（非破壞性合併），清理 URL
- **忽略**: 僅清理 URL，不修改收藏

---

## File Changes Summary

| File | Action | Description |
|---|---|---|
| `src/composables/useBookmarks.ts` | **New** | 核心收藏邏輯 |
| `src/App.vue` | Modify | 篩選整合、props 傳遞、URL 偵測、Toast |
| `src/components/PokemonCard.vue` | Modify | 愛心圖示 overlay |
| `src/components/PokemonDetail.vue` | Modify | 名稱旁收藏按鈕 |

`src/types.ts` **不需修改** — 收藏是純 UI 狀態（pokopia_id 的 Set），不屬於 Pokemon 資料模型。

---

## Filter Logic

```
filteredPokemon = pokemon.filter(p => {
  // Bookmark filter (AND)
  if (showBookmarkedOnly && !bookmarkedIds.has(p.pokopia_id)) return false

  // Search filter (AND)
  if (searchQuery && !matchesSearch(p)) return false

  // Flavor/Environment/Things/Skills/Habitat filters (OR within, AND between)
  ...existing logic...
})
```

---

## Verification Plan

1. `bun run dev` — 確認無錯誤載入
2. 點擊卡片愛心 — 確認切換狀態，重新整理後仍保留（檢查 localStorage）
3. 開啟詳情頁 — 確認愛心按鈕運作正常
4. 啟用「僅顯示收藏」— 確認只顯示已收藏的寶可夢，且可與其他篩選疊加
5. 點擊「分享收藏」— 確認 URL 已複製，在新分頁開啟後出現合併橫幅
6. 點擊合併 — 確認收藏已合併，URL 已清理
7. `bun run test` — 確認現有測試通過
