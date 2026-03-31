# 地圖配置頁面設計文件

> 建立日期：2026-03-30
> 狀態：待實作

---

## 功能概述

新增「地圖配置」頁面，讓玩家手動規劃每張遊戲地圖要部署哪些寶可夢，並查看每張地圖的技能專長分佈統計。

---

## 需求確認

| 項目 | 決定 |
|---|---|
| 配置方式 | 手動選擇（使用者自行決定） |
| 每張地圖上限 | 無限制 |
| 技能統計範圍 | 每張地圖各自統計 |
| 導航方式 | vue-router（URL: `/` 圖鑑, `/maps` 地圖配置） |

---

## 地圖清單

| mapId | 顯示名稱 | 圖片 |
|---|---|---|
| withered_wastelands | 乾巴巴荒野 | assets/maps/withered_wastelands.png |
| bleak_beach | 暗沉沉海邊 | assets/maps/bleak_beach.png |
| rocky_ridges | 凸隆隆山地 | assets/maps/rocky_ridges.png |
| sparkling_skylands | 亮晶晶空島 | assets/maps/sparkling_skylands.png |
| palette_town | 空空鎮 | assets/maps/palette_town.png |

---

## 版面設計

### 導航列（更新 App.vue Shell）

```
[Pokopia 圖鑑 Logo]          [圖鑑] [地圖配置]
```

active route 使用品牌紅色底線標示。

---

### 地圖配置頁面（/maps）

```
┌──────────────────────────────────────────────────┐
│  地圖選擇列（5 張縮圖卡片，水平排列，可左右滑動）         │
│                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │  🏖  │ │  🏘  │ │  🏔  │ │  ☁  │ │  🌵 │  │
│  │海灘   │ │小鎮   │ │山脊   │ │天空島 │ │荒地  │  │
│  │ 3隻  │ │ 0隻  │ │ 5隻  │ │ 2隻  │ │ 1隻  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │
└──────────────────────────────────────────────────┘

┌──────────────────────┬───────────────────────────┐
│                      │  已配置寶可夢（0 隻）          │
│  [地圖圖片]            │                           │
│  （選中地圖的大圖）      │  [空狀態：點擊 + 開始配置]    │
│                      │                           │
│                      ├───────────────────────────┤
│                      │  技能分佈                   │
│                      │                           │
│                      │  [技能名稱] × 數量            │
│                      │  [技能名稱] × 數量            │
│                      │  ...                      │
│                      │                           │
│                      │  [+ 新增寶可夢]              │
└──────────────────────┴───────────────────────────┘
```

> 手機版：上下堆疊（地圖圖片 → 已配置列表 → 技能統計）

---

## 元件規劃

### 新增元件

**`src/components/PokemonPickerModal.vue`**
- 搜尋輸入框（即時過濾 name_zh 或 pokopia_id）
- 已配置的寶可夢顯示 ✓ 標記（可再次點擊移除）
- 點擊未配置的寶可夢 → 加入並關閉，可多選
- 樣式沿用現有 filter-btn-base

---

## 資料層

**`src/composables/useMapPlacements.ts`**

localStorage key: `pokopia-map-placements`

```typescript
// 儲存結構
type MapPlacements = Record<string, string[]>
// 例：{ "bleak_beach": ["妙蛙種子", "小火龍"], "palette_town": [] }

// 提供的方法
addPokemon(mapId: string, pokemonName: string): void
removePokemon(mapId: string, pokemonName: string): void
getPokemonNames(mapId: string): string[]
isPlaced(mapId: string, pokemonName: string): boolean
```

---

## 技能統計計算邏輯

```
1. 取得當前地圖的 pokemonName[]
2. 在 pokopia.json 中找到對應寶可夢
3. 展開每隻寶可夢的 skills[]（一隻可有多種技能）
4. 計算各 skill key 的出現次數
5. 只顯示數量 > 0 的技能，依數量降序排列
6. 使用 skillLabels.ts 顯示中文名稱
```

---

## 檔案變更清單

| 操作 | 路徑 |
|---|---|
| 修改 | `src/main.ts` — 加入 app.use(router) |
| 修改 | `src/App.vue` → 改為 Shell + 導航列 |
| 新增 | `src/router/index.ts` |
| 新增 | `src/views/DexView.vue`（現有 App.vue 內容搬移） |
| 新增 | `src/views/MapsView.vue` |
| 新增 | `src/composables/useMapPlacements.ts` |
| 新增 | `src/components/PokemonPickerModal.vue` |

---

## 驗收標準

- [ ] `/` 正常顯示圖鑑（現有功能不受影響）
- [ ] `/maps` 顯示地圖配置頁
- [ ] 可在地圖上新增 / 移除寶可夢
- [ ] 技能統計即時更新
- [ ] 重新整理後資料持久化（localStorage）
- [ ] 導航列 active 狀態正確高亮
- [ ] 手機版版面正常

---

## 待確認細節

3. **已配置卡片外觀** — 每張配置卡要顯示：sprite + 名稱 + 移除鍵
4. **技能統計外觀** — chip 標籤形式
