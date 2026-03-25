## 1. 資料結構設計與 Mapping

- [x] [P] 1.1 建立 `src/favoriteLabels.ts`，依 Mapping 檔案結構 export `flavorLabels`、`environmentLabels`、`thingLabels`（Favorite data English key mapping）
- [x] [P] 1.2 更新 `src/types.ts`，Pokemon interface 新增 `flavor: string | null`、`environment: string | null`、`things: string[] | null`（Pokemon type includes favorite fields）

## 2. 合併腳本

- [x] 2.1 建立 `scripts/merge-favorites.ts` 合併腳本，實作名稱配對與資料清洗邏輯（Favorite data merge script、Data cleaning during merge）
- [x] 2.2 執行合併腳本，驗證 `data/pokopia.json` 輸出正確，檢查未配對名稱清單

## 3. UI 顯示

- [x] 3.1 修改 `src/components/PokemonDetail.vue`，新增口味、環境偏好、喜歡的東西顯示區塊（Pokemon detail view、UI 顯示位置）
