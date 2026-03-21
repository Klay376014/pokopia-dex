## 1. 測試環境設置

- [x] 1.1 測試框架使用 Vitest：安裝測試依賴（vitest、@vue/test-utils、jsdom），設定 vite.config.ts

## 2. CollapsibleFilterBar 元件

- [x] [P] 2.1 建立 `CollapsibleFilterBar.vue`，實作 collapsible filter group（展開/收合、CSS grid 動畫）
- [x] [P] 2.2 實作 selected count badge in collapsed state（收合時顯示已選數量）
- [x] [P] 2.3 實作 inline chips in collapsed state（收合時顯示已選項目 chips）
- [x] [P] 2.4 實作 toggle filter option（點擊 pill button 觸發 toggle 事件）
- [x] [P] 2.5 實作 label mapping support（選項 key 對應顯示名稱）
- [x] 2.6 撰寫 CollapsibleFilterBar 單元測試，涵蓋所有 collapsible-filter spec 場景

## 3. SearchableDropdown 元件

- [x] [P] 3.1 建立 `SearchableDropdown.vue`，實作 searchable single-select dropdown（搜尋式單選下拉）
- [x] [P] 3.2 實作 close dropdown on outside interaction（點擊外部與 Escape 關閉）
- [x] [P] 3.3 實作 empty state（無符合結果提示）
- [x] 3.4 撰寫 SearchableDropdown 單元測試，涵蓋所有 searchable-dropdown-filter spec 場景

## 4. App.vue 整合

- [x] 4.1 特長篩選使用 CollapsibleFilterBar 元件（對應設計決策：特長篩選使用 CollapsibleFilterBar 元件）
- [x] 4.2 棲息地篩選使用 SearchableDropdown 元件，棲息地從多選改為單選（對應設計決策：棲息地篩選使用 SearchableDropdown 元件、棲息地篩選從多選改為單選）
- [x] 4.3 更新 filter by skill 篩選 UI 為 Accordion 模式
- [x] 4.4 更新 filter by habitat 篩選邏輯為單選，清除選取時顯示全部

## 5. 驗證

- [x] 5.1 執行所有單元測試確認通過
- [x] 5.2 手動驗證篩選功能端對端正確運作
