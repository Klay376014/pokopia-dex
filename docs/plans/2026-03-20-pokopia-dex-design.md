# Pokopia Dex 設計文件

## 目標

為寶可夢系列新遊戲 Pokopia 製作方便易查的小圖鑑，顯示每隻寶可夢的出沒條件（地點、時間、天氣、特長）。

## 資料來源

- **寶可夢列表**: [52poke wiki - 寶可夢列表（Pokopia）](https://wiki.52poke.com/zh-hant/寶可夢列表（Pokopia）)
- **棲息地列表**: [52poke wiki - 棲息地列表](https://wiki.52poke.com/zh-hant/棲息地列表)（繁體中文版）
- **寶可夢 Sprite**: [PokeAPI sprites](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png)
- **寶可夢 Artwork**: [PokeAPI official artwork](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png)

## 資料結構

頁面有 2 個資料表（主表 ~307 筆 + 小表 ~3 筆），欄位結構相同：

| 欄位 | 型別 | 說明 |
|------|------|------|
| `pokopia_id` | string | Pokopia 圖鑑編號 |
| `national_id` | string | 全國圖鑑編號（用於對應 sprite） |
| `name_zh` | string | 繁體中文名稱 |
| `habitats` | array | 能遇見的地點，每項含 `name`（對應 habitats.json 取本地圖片） |
| `time` | object | 出現時間，含 `dawn`/`day`/`dusk`/`night` 布林值 |
| `weather` | object | 出現天氣，含 `sunny`/`cloudy`/`rainy` 布林值 |
| `skills` | array | 特長，每項含 `name`（圖示下載至本地 `assets/skills/`） |

### JSON 範例

```json
{
  "pokemon": [
    {
      "pokopia_id": "001",
      "national_id": "0001",
      "name_zh": "妙蛙種子",
      "habitats": [
        { "name": "綠色的草叢", "habitat_id": "001" },
        { "name": "綠色的長椅", "habitat_id": "022" }
      ],
      "time": { "dawn": true, "day": true, "dusk": true, "night": true },
      "weather": { "sunny": true, "cloudy": true, "rainy": true },
      "skills": ["栽培"]
    }
  ]
}
```

## 技術架構

### 爬蟲（Python）

**共通**: 所有腳本需設定瀏覽器 User-Agent（wiki 擋預設 UA，回傳 403）
**依賴**: `requests`, `beautifulsoup4`

#### 腳本 1: `scripts/scrape_habitats.py`
- 來源: 棲息地列表（繁體中文版）
- 解析 ~209 筆棲息地（編號、名稱、詳情）
- 下載棲息地圖片到 `assets/habitats/{id}.webp`
- 輸出: `data/habitats.json`

#### 腳本 2: `scripts/scrape_pokopia.py`
- 來源: 寶可夢列表（Pokopia）
- 解析 2 個資料表（主表 ~307 筆 + 小表 ~3 筆）
- 下載特長圖示到 `assets/skills/`
- 輸出: `data/pokopia.json`

#### 寶可夢圖片（不需下載）
- Sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
- Artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`

### 前端（Vue 3 SPA）

- Vue 3 Composition API + `<script setup>` + TypeScript
- Vite 建置工具
- 直接 import JSON 檔作為資料源（靜態資料，無需 API server）

### 前端功能

- 列表頁：寶可夢卡片（sprite + 名稱 + 編號）
- 篩選：依時間、天氣、特長、棲息地篩選
- 搜尋：依名稱或編號搜尋
- 詳細資訊：點擊卡片展開完整資訊

## 專案結構

```
pokopia-dex/
├── scripts/
│   ├── scrape_habitats.py   # 棲息地爬蟲（含下載圖片）
│   ├── scrape_pokopia.py    # 寶可夢列表爬蟲（含下載特長圖示）
│   └── requirements.txt
├── data/
│   ├── pokopia.json         # 寶可夢列表資料
│   └── habitats.json        # 棲息地 mapping 資料
├── assets/
│   ├── habitats/            # 棲息地圖片（本地）
│   └── skills/              # 特長圖示（本地）
├── src/
│   ├── App.vue
│   ├── main.ts
│   └── components/
├── docs/plans/
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 執行順序

1. 爬取棲息地 → 產出 `data/habitats.json` + 下載圖片到 `assets/habitats/`
2. 爬取寶可夢列表 → 產出 `data/pokopia.json` + 下載特長圖示到 `assets/skills/`
3. 驗證資料正確性與完整性（筆數、棲息地名稱 mapping）
4. 建構 Vue 3 前端圖鑑介面
