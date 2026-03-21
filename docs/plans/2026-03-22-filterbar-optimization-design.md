# FilterBar UI/UX 優化設計

## 問題描述

FilterBar 的「特長」(34 個選項) 和「棲息地」(100+ 個選項) 以平鋪 pill buttons 展示，佔滿整個畫面，使用者無法看到寶可夢列表。

### 使用者特徵
- 混合型使用：精確搜尋 + 探索瀏覽
- 棲息地通常只選 1 個

---

## 方案比較

### 方案 A：Accordion 手風琴收納

**概念**：特長、棲息地預設收合，點擊標題展開。時間、天氣保持展開。

**行為**：
- 標題列永遠可見：`特長 ▸` / `特長 (3) ▾`
- 收合時顯示已選數量 badge + 已選項目 inline chips
- 展開後顯示原本的 pill buttons
- CSS `grid-template-rows: 0fr → 1fr` 動畫

**優點**：改動小（1 個新元件）、開發快、互動直覺

**缺點**：展開後 100+ 棲息地仍是一面牆、沒有搜尋功能

---

### 方案 B：篩選 Drawer 面板

**概念**：時間、天氣留在主畫面。特長和棲息地收進「更多篩選」按鈕，點擊開啟側邊 Drawer。

**行為**：
- 主畫面：搜尋欄 + 時間 + 天氣 + 「更多篩選」按鈕 + 已選 chips
- Drawer 從右側滑入，內含搜尋框 + pill buttons（即時過濾）+ 已選項目置頂
- 點擊 overlay / 按 Escape / 點「確認」關閉
- 篩選即時生效

**優點**：主畫面極簡、搜尋功能解決 100+ 棲息地問題、手機體驗好

**缺點**：多 2 步操作、需建 2-3 個新元件、「更多篩選」按鈕可能被忽略

---

### 比較表

| 維度 | A: Accordion | B: Drawer |
|---|---|---|
| 開發量 | 小（1 新元件） | 中（2-3 新元件） |
| 主畫面空間節省 | 中等 | 極高 |
| 100+ 棲息地可用性 | 未解決 | 已解決（有搜尋） |
| 篩選操作步數 | 1 步（展開→點選） | 2 步（開 Drawer→點選） |
| 手機友善度 | 好 | 更好 |

---

## 採用方案：混合 A+B

結合兩者優點，依據選項數量選擇最適合的 UI 模式：

| 篩選分類 | 選項數量 | UI 模式 | 理由 |
|---|---|---|---|
| 時間 | 4 | FilterBar（維持現狀） | 選項少，無需收納 |
| 天氣 | 3 | FilterBar（維持現狀） | 選項少，無需收納 |
| 特長 | 34 | Accordion（收合/展開） | 數量可控，展開直接選 |
| 棲息地 | 100+ | Drawer + 搜尋 | 數量太多，需要搜尋才可用 |

---

## 實作設計

### 1. CollapsibleFilterBar.vue（新增）

用於「特長」篩選。

**Props**：
- `label: string` — 分類標籤
- `options: string[]` — 所有選項
- `selected: string[]` — 已選選項
- `labels?: Record<string, string>` — 選項顯示名稱映射
- `defaultExpanded?: boolean` — 預設是否展開（default: false）

**Emits**：
- `toggle: [value: string]`

**UI 結構**：
```
┌─────────────────────────────────────────┐
│ 特長 (3)  ▾  DJ · 伐木 · 收藏家        │  ← 收合狀態，顯示已選 chips
├─────────────────────────────────────────┤
│ 特長 ▸                                  │  ← 展開狀態
│ [鑑定] [建造] [伐木] [收藏家] [工匠]... │     pill buttons
└─────────────────────────────────────────┘
```

**動畫**：CSS `grid-template-rows: 0fr → 1fr`，內層 `overflow: hidden; min-height: 0`。

---

### 2. SearchableFilterGroup.vue（新增）

用於 Drawer 內部的篩選群組。

**Props**：
- `label: string`
- `options: string[]`
- `selected: string[]`
- `labels?: Record<string, string>`
- `placeholder?: string` — 搜尋框 placeholder

**Emits**：
- `toggle: [value: string]`

**行為**：
- 內部 `searchQuery` ref，即時過濾 `options`（比對 display label）
- 已選項目永遠顯示在最上方，不受搜尋過濾影響
- 搜尋匹配：對 display label 做 case-insensitive 子字串比對

---

### 3. FilterDrawer.vue（新增）

用於「棲息地」篩選。

**Props**：
- `open: boolean`
- `habitats: string[]`
- `selectedHabitats: string[]`

**Emits**：
- `close`
- `toggleHabitat: [value: string]`
- `clearHabitats`

**UI 結構**：
```
┌──────────────────────────────────────┐
│ (overlay, 半透明黑)                   │
│            ┌─────────────────────────┤
│            │ 棲息地篩選          ✕   │
│            │                         │
│            │ [搜尋棲息地...]         │
│            │                         │
│            │ 已選：                   │
│            │ [高岡的草叢 ✕]          │
│            │                         │
│            │ ─────────────────────── │
│            │ [綠色的草叢] [樹蔭的..] │
│            │ [岩影的草叢] [濕潤的..] │
│            │ ...                     │
│            │                         │
│            │         [確認]          │
│            └─────────────────────────┤
└──────────────────────────────────────┘
```

**動畫**：`transform: translateX(100%) → translateX(0)`，overlay `opacity: 0 → 0.5`。

**關閉方式**：點擊 overlay / 按 Escape / 點「確認」。

**參考**：`PokemonDetail.vue` 的 overlay 模式。

---

### 4. App.vue 修改

**Template 變更**：
```html
<!-- 時間、天氣：維持現狀 -->
<FilterBar label="時間" ... />
<FilterBar label="天氣" ... />

<!-- 特長：改用 CollapsibleFilterBar -->
<CollapsibleFilterBar
  label="特長"
  :options="allSkills"
  :selected="selectedSkills"
  :labels="skillLabels"
  :defaultExpanded="false"
  @toggle="v => toggleFilter(selectedSkills, v)"
/>

<!-- 棲息地：按鈕 + 已選 chips -->
<div class="habitat-filter-row">
  <button class="habitat-trigger" @click="showHabitatDrawer = true">
    棲息地篩選
  </button>
  <span v-for="h in selectedHabitats" class="habitat-chip">
    {{ h }} <button @click="toggleFilter(selectedHabitats, h)">✕</button>
  </span>
</div>

<!-- Drawer -->
<FilterDrawer
  :open="showHabitatDrawer"
  :habitats="allHabitatNames"
  :selectedHabitats="selectedHabitats"
  @close="showHabitatDrawer = false"
  @toggleHabitat="v => toggleFilter(selectedHabitats, v)"
  @clearHabitats="selectedHabitats = []"
/>
```

**Script 變更**：
- 新增 `import CollapsibleFilterBar`、`FilterDrawer`
- 新增 `showHabitatDrawer` ref

**篩選邏輯不變**：`toggleFilter` 和 `filteredPokemon` computed 完全不需修改。

---

## 驗證方式

### 手動驗證

- `bun run dev` 啟動開發伺服器
- 確認時間/天氣篩選行為不變
- 確認特長可展開收合，收合時顯示已選 badge + chips
- 確認棲息地 Drawer 可開關、搜尋過濾、選取
- 確認所有篩選組合邏輯正確（OR within, AND across）
- 測試手機寬度下的 RWD 表現

### 自動化測試

**前置：安裝測試依賴**

```bash
bun add -d vitest @vue/test-utils jsdom @testing-library/vue
```

在 `vite.config.ts` 加入 Vitest 設定：

```ts
/// <reference types="vitest/config" />
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  // ...existing config
})
```

---

#### CollapsibleFilterBar.test.ts

| 測試案例 | 驗證內容 |
|---|---|
| 預設收合時只顯示標題 | `defaultExpanded=false` 時，pill buttons 不可見 |
| 點擊標題可展開 | 點擊後 pill buttons 出現 |
| 展開後點擊標題可收合 | 再次點擊後 pill buttons 隱藏 |
| 收合時顯示已選數量 badge | `selected=['a','b']` 時顯示 `(2)` |
| 收合時顯示已選 chips | 已選項目以 inline chips 形式顯示 |
| 點擊 pill button 觸發 toggle | emit `toggle` 事件帶正確 value |
| `defaultExpanded=true` 時預設展開 | pill buttons 預設可見 |
| labels prop 正確映射顯示名稱 | 傳入 `labels` 時按鈕文字使用映射值 |

```ts
// src/components/__tests__/CollapsibleFilterBar.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CollapsibleFilterBar from '../CollapsibleFilterBar.vue'

describe('CollapsibleFilterBar', () => {
  const defaultProps = {
    label: '特長',
    options: ['craft', 'dj', 'cook'],
    selected: [] as string[],
    labels: { craft: '工匠', dj: 'DJ', cook: '料理' },
  }

  it('預設收合時隱藏選項', () => {
    const wrapper = mount(CollapsibleFilterBar, {
      props: { ...defaultProps, defaultExpanded: false },
    })
    expect(wrapper.find('.filter-options').isVisible()).toBe(false)
  })

  it('點擊標題可展開', async () => {
    const wrapper = mount(CollapsibleFilterBar, {
      props: { ...defaultProps, defaultExpanded: false },
    })
    await wrapper.find('.filter-header').trigger('click')
    expect(wrapper.find('.filter-options').isVisible()).toBe(true)
  })

  it('收合時顯示已選數量', () => {
    const wrapper = mount(CollapsibleFilterBar, {
      props: { ...defaultProps, selected: ['craft', 'dj'], defaultExpanded: false },
    })
    expect(wrapper.find('.filter-badge').text()).toContain('2')
  })

  it('點擊選項觸發 toggle 事件', async () => {
    const wrapper = mount(CollapsibleFilterBar, {
      props: { ...defaultProps, defaultExpanded: true },
    })
    await wrapper.findAll('.filter-btn')[0].trigger('click')
    expect(wrapper.emitted('toggle')?.[0]).toEqual(['craft'])
  })

  it('labels 正確映射顯示名稱', () => {
    const wrapper = mount(CollapsibleFilterBar, {
      props: { ...defaultProps, defaultExpanded: true },
    })
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons[0].text()).toBe('工匠')
    expect(buttons[1].text()).toBe('DJ')
  })
})
```

---

#### SearchableFilterGroup.test.ts

| 測試案例 | 驗證內容 |
|---|---|
| 顯示所有選項 | 無搜尋時列出全部選項 |
| 搜尋過濾選項 | 輸入文字後只顯示匹配的選項 |
| 已選項目不受搜尋影響 | 已選項目即使不匹配搜尋也始終顯示 |
| 清空搜尋恢復全部 | 清空輸入框後顯示所有選項 |
| 點擊選項觸發 toggle | emit `toggle` 事件 |
| 搜尋為 case-insensitive | 大小寫不影響搜尋結果 |

```ts
// src/components/__tests__/SearchableFilterGroup.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchableFilterGroup from '../SearchableFilterGroup.vue'

describe('SearchableFilterGroup', () => {
  const defaultProps = {
    label: '棲息地',
    options: ['綠色的草叢', '高岡的草叢', '美麗的花田', '樹蔭的花田'],
    selected: [] as string[],
  }

  it('預設顯示所有選項', () => {
    const wrapper = mount(SearchableFilterGroup, { props: defaultProps })
    expect(wrapper.findAll('.filter-btn')).toHaveLength(4)
  })

  it('搜尋過濾選項', async () => {
    const wrapper = mount(SearchableFilterGroup, { props: defaultProps })
    await wrapper.find('input').setValue('草叢')
    const buttons = wrapper.findAll('.filter-btn')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toContain('草叢')
  })

  it('已選項目不受搜尋影響', async () => {
    const wrapper = mount(SearchableFilterGroup, {
      props: { ...defaultProps, selected: ['美麗的花田'] },
    })
    await wrapper.find('input').setValue('草叢')
    const allText = wrapper.text()
    expect(allText).toContain('美麗的花田') // 已選仍可見
    expect(allText).toContain('草叢')
  })

  it('點擊選項觸發 toggle 事件', async () => {
    const wrapper = mount(SearchableFilterGroup, { props: defaultProps })
    await wrapper.findAll('.filter-btn')[0].trigger('click')
    expect(wrapper.emitted('toggle')?.[0]).toEqual(['綠色的草叢'])
  })
})
```

---

#### FilterDrawer.test.ts

| 測試案例 | 驗證內容 |
|---|---|
| `open=false` 時不顯示 | Drawer 不在 DOM 中或不可見 |
| `open=true` 時顯示 overlay + 面板 | overlay 和面板都可見 |
| 點擊 overlay 觸發 close | emit `close` 事件 |
| 按 Escape 觸發 close | emit `close` 事件 |
| 點擊確認按鈕觸發 close | emit `close` 事件 |
| 棲息地選項正確傳遞至 SearchableFilterGroup | 選項數量和內容正確 |
| 點擊棲息地選項觸發 toggleHabitat | emit `toggleHabitat` 事件 |
| 點擊清除觸發 clearHabitats | emit `clearHabitats` 事件 |

```ts
// src/components/__tests__/FilterDrawer.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterDrawer from '../FilterDrawer.vue'

describe('FilterDrawer', () => {
  const defaultProps = {
    open: true,
    habitats: ['綠色的草叢', '高岡的草叢'],
    selectedHabitats: [] as string[],
  }

  it('open=false 時不顯示', () => {
    const wrapper = mount(FilterDrawer, {
      props: { ...defaultProps, open: false },
    })
    expect(wrapper.find('.drawer-overlay').exists()).toBe(false)
  })

  it('open=true 時顯示 overlay 和面板', () => {
    const wrapper = mount(FilterDrawer, { props: defaultProps })
    expect(wrapper.find('.drawer-overlay').exists()).toBe(true)
    expect(wrapper.find('.drawer-panel').exists()).toBe(true)
  })

  it('點擊 overlay 觸發 close', async () => {
    const wrapper = mount(FilterDrawer, { props: defaultProps })
    await wrapper.find('.drawer-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('按 Escape 觸發 close', async () => {
    const wrapper = mount(FilterDrawer, {
      props: defaultProps,
      attachTo: document.body,
    })
    await wrapper.trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('close')).toBeTruthy()
    wrapper.unmount()
  })

  it('點擊確認按鈕觸發 close', async () => {
    const wrapper = mount(FilterDrawer, { props: defaultProps })
    await wrapper.find('.drawer-confirm').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
```

---

#### 測試執行

```bash
bun run test        # 執行所有測試
bun run test --ui   # 開啟 Vitest UI
```
