## 1. 專案初始化

- [x] 1.1 [P] 初始化 Vue 3 + Vite + TypeScript 專案（靜態 JSON 資料架構），設定 `package.json`、`vite.config.ts`、`tsconfig.json`、`index.html`
- [x] 1.2 [P] 建立 Python 爬蟲環境，新增 `scripts/requirements.txt`（requests, beautifulsoup4）

## 2. 棲息地爬蟲（habitat-scraper）

- [x] 2.1 實作 scrape habitat list from wiki：從 52poke wiki 爬取棲息地列表，解析 ~209 筆棲息地資料，設定瀏覽器 User-Agent header
- [x] 2.2 實作 download habitat images：下載棲息地圖片至 `assets/habitats/{id}.webp`，已存在則跳過
- [x] 2.3 實作 output habitats JSON structure：輸出 `data/habitats.json`，包含 `id`、`name`、`detail_url` 欄位

## 3. 寶可夢列表爬蟲（pokemon-scraper）

- [x] 3.1 實作 scrape Pokemon list from wiki：從 52poke wiki 爬取寶可夢列表頁面（主表 + 副表），設定瀏覽器 User-Agent
- [x] 3.2 實作 extract Pokemon data fields：解析每筆寶可夢資料欄位（pokopia_id、national_id、name_zh、habitats、time、weather、skills）
- [x] 3.3 實作 download skill icons：下載特長圖示至 `assets/skills/`，已存在則跳過
- [x] 3.4 實作 output pokopia JSON structure：輸出 `data/pokopia.json`，包含合併的 `pokemon` 陣列

## 4. 前端圖鑑介面（dex-frontend，Vue 3 Composition API + TypeScript）

- [x] 4.1 實作 Pokemon card list display：寶可夢卡片列表，顯示 sprite、名稱、編號，sprite 載入失敗顯示 placeholder
- [x] 4.2 [P] 實作 filter by time of day：依時間（dawn/day/dusk/night）篩選，支援多選 OR 邏輯
- [x] 4.3 [P] 實作 filter by weather：依天氣（sunny/cloudy/rainy）篩選
- [x] 4.4 [P] 實作 filter by skill：依特長篩選
- [x] 4.5 [P] 實作 filter by habitat：依棲息地篩選
- [x] 4.6 [P] 實作 search by name or number：依名稱或編號搜尋
- [x] 4.7 實作 combined filter behavior：所有篩選與搜尋以 AND 邏輯組合
- [x] 4.8 實作 Pokemon detail view：點擊卡片展開詳細資訊（artwork、棲息地圖片、時間、天氣、特長圖示）

## 5. 圖片策略整合

- [x] 5.1 依照圖片策略：本地 vs CDN 設計決策，設定寶可夢圖片使用 PokeAPI CDN（sprite + artwork），並驗證 Python 爬蟲分離設計的資料完整性

## 6. 棲息地詳情擴充

- [x] 6.1 更新棲息地爬蟲：extract habitat detail description 和 extract habitat Pokemon list，將 `detail` 和 `pokemon` 欄位加入輸出，重新執行產出 `data/habitats.json`
- [x] 6.2 更新 TypeScript 型別：`HabitatInfo` 新增 `detail: string` 和 `pokemon: string[]`
- [x] 6.3 更新 Pokemon detail view：在棲息地區塊顯示 detail 組成描述和該棲息地的寶可夢名稱列表
