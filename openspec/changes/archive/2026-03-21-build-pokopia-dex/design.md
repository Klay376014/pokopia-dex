## Context

本專案為 Pokopia 遊戲建立一個靜態寶可夢圖鑑網站。資料來源為 52poke wiki 的繁體中文頁面，包含寶可夢列表（~310 筆）與棲息地列表（~209 筆）。專案無後端 API，所有資料以 JSON 檔案形式靜態載入。

## Goals / Non-Goals

**Goals:**

- 透過 Python 爬蟲自動從 wiki 爬取並結構化寶可夢與棲息地資料
- 建立 Vue 3 SPA 前端，提供直覺的篩選、搜尋與詳細資訊展示
- 所有圖片素材（棲息地圖片、特長圖示）下載至本地，減少外部依賴
- 寶可夢圖片（sprite/artwork）直接使用 PokeAPI CDN 連結

**Non-Goals:**

- 不建立後端 API 或資料庫
- 不支援多語言（僅繁體中文）
- 不支援使用者帳號或個人化功能
- 不實作即時資料更新（資料透過手動重新執行爬蟲更新）

## Decisions

### 靜態 JSON 資料架構

採用 Vite 直接 import JSON 檔案的方式載入資料，而非設計 REST API。

**理由**: 資料量小（~310 筆）且為唯讀靜態資料，不需要動態查詢能力。JSON import 在建置時即嵌入 bundle，載入速度最快且部署最簡單。

**替代方案**: 使用 API server（過度設計）、IndexedDB（資料量不需要）。

### Python 爬蟲分離設計

棲息地爬蟲與寶可夢列表爬蟲分為兩個獨立腳本。

**理由**: 兩者來源頁面不同、資料結構不同，且棲息地資料為寶可夢資料的依賴（棲息地 ID mapping）。分離後可獨立執行與除錯。

### 圖片策略：本地 vs CDN

棲息地圖片與特長圖示下載至本地 `assets/` 目錄；寶可夢 sprite/artwork 使用 PokeAPI CDN。

**理由**: 棲息地圖片來自 wiki 且無穩定 CDN，須本地化。PokeAPI sprites 有穩定的 GitHub raw CDN，且數量多（~310 張），本地化會增加 repo 體積。

### Vue 3 Composition API + TypeScript

使用 Vue 3 `<script setup>` + TypeScript + Vite。

**理由**: 現代 Vue 開發標準，型別安全有助於維護資料結構的正確性。

## Risks / Trade-offs

- [Wiki 頁面結構變更] → 爬蟲可能失效。緩解：爬蟲加入基本驗證（筆數檢查），失敗時提供明確錯誤訊息。
- [PokeAPI CDN 不可用] → 寶可夢圖片無法顯示。緩解：前端顯示 fallback placeholder。
- [Wiki 擋請求] → 需設定瀏覽器 User-Agent header，否則回傳 403。
