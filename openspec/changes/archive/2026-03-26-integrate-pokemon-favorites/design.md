## Context

目前 `data/pokopia.json` 儲存 311 筆寶可夢的基本資料（棲息地、時間、天氣、特長），而 `data/favorite.json` 包含約 933 筆寶可夢的喜好資料（口味 flavor、環境 environment、喜歡的東西 things），兩者以中文名稱配對。需要將喜好資料以英文 key 合併進 pokopia.json，建立中英 label mapping，並在 PokemonDetail 中顯示。

現有模式：`src/skillLabels.ts` 提供英文→中文的 mapping，PokemonDetail.vue 使用此 mapping 顯示特長標籤。

## Goals / Non-Goals

**Goals:**

- 將 favorite.json 喜好資料合併進 pokopia.json，使用英文 key
- 建立 `favoriteLabels.ts` 提供 flavor、environment、things 的英中 mapping
- 在 PokemonDetail.vue 顯示口味、環境偏好、喜歡的東西
- 處理資料品質問題（typo、縮寫、無資料）

**Non-Goals:**

- 不在此次變更中新增篩選功能（flavor/environment/things filter）
- 不處理 pokopia.json 中不存在的寶可夢（favorite.json 有 933 筆，只合併 311 筆有對應的）

## Decisions

### 資料結構設計

- `flavor`: `string | null` — 單一英文 key（如 `"sweet"`），mapping 的中文值包含完整原文（含食材，如 `"甜甜的(桃桃果、豆子)"`）
- `environment`: `string | null` — 單一英文 key（如 `"bright"`）
- `things`: `string[] | null` — 英文 key 陣列（如 `["nature", "soft", "cute"]`）
- 無資料（`待更新`、`–`）統一為 `null`

**理由**：沿用 skills 的 `string[]` + labels mapping 模式，保持一致性。flavor 使用 `string` 而非 `string[]`，因為已確認無雙口味。

### Mapping 檔案結構

新增 `src/favoriteLabels.ts`，export 三個 `Record<string, string>`：`flavorLabels`、`environmentLabels`、`thingLabels`。

**理由**：與 `skillLabels.ts` 保持一致的 pattern，方便日後擴充篩選功能。

### 合併腳本

使用 `scripts/merge-favorites.ts`（bun 執行），腳本內建反向 mapping（中文→英文）和資料清洗邏輯。

名稱配對策略：將兩邊的全形括號 `（）` 正規化為半形 `()` 後比對。

### UI 顯示位置

在 PokemonDetail.vue 的特長（skills）區塊之後，依序顯示口味、環境、喜歡的東西。各區塊使用與特長相同的 tag 樣式。

## Risks / Trade-offs

- **[名稱配對遺漏]** → 腳本會印出未配對的名稱，手動檢查後補充
- **[資料縮寫不完整]** → 已建立正規化對照表，但可能有遺漏的縮寫 → 腳本遇到未知值時 log warning
- **[favorite.json 資料更新]** → 腳本可重複執行，每次重新合併
