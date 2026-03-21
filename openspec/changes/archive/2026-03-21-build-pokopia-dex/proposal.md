## Why

為 Pokopia 遊戲建立一個方便易查的寶可夢小圖鑑，讓玩家可以快速查詢每隻寶可夢的出沒條件（地點、時間、天氣、特長）。目前這些資訊分散在 wiki 頁面中，需要一個整合的工具來提升查詢效率。

## What Changes

- 新增 Python 爬蟲腳本，從 52poke wiki 爬取棲息地資料與寶可夢列表
- 新增靜態 JSON 資料檔案（`data/pokopia.json`、`data/habitats.json`）
- 下載棲息地圖片與特長圖示至本地 `assets/` 目錄
- 建構 Vue 3 SPA 前端圖鑑介面，支援篩選、搜尋與詳細資訊展示
- 棲息地資料擴充：加入「詳情」組成描述和「可遇見的寶可夢」列表至 `data/habitats.json`
- 詳情卡片顯示棲息地完整資訊（組成描述 + 棲息地內寶可夢列表）

## Capabilities

### New Capabilities

- `habitat-scraper`: 棲息地爬蟲，解析 wiki 棲息地列表並下載圖片，輸出 `data/habitats.json`
- `pokemon-scraper`: 寶可夢列表爬蟲，解析 wiki 寶可夢列表並下載特長圖示，輸出 `data/pokopia.json`
- `dex-frontend`: Vue 3 SPA 圖鑑介面，包含列表頁、篩選、搜尋與詳細資訊功能

### Modified Capabilities

(無)

## Impact

- 新增檔案: `scripts/scrape_habitats.py`, `scripts/scrape_pokopia.py`, `scripts/requirements.txt`
- 新增資料: `data/pokopia.json`, `data/habitats.json`
- 新增素材: `assets/habitats/`, `assets/skills/`
- 前端程式碼: `src/App.vue`, `src/main.ts`, `src/components/`
- 建置設定: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- 依賴: Python (`requests`, `beautifulsoup4`), Node.js (Vue 3, Vite, TypeScript)
