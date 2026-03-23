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

  // Requirement: Collapsible filter group
  describe('collapsible filter group', () => {
    it('預設收合時隱藏選項', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: false },
      })
      expect(wrapper.find('.filter-collapse').classes()).not.toContain('expanded')
    })

    it('點擊標題可展開', async () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: false },
      })
      await wrapper.find('.filter-header').trigger('click')
      expect(wrapper.find('.filter-collapse').classes()).toContain('expanded')
    })

    it('展開後點擊標題可收合', async () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: true },
      })
      await wrapper.find('.filter-header').trigger('click')
      expect(wrapper.find('.filter-collapse').classes()).not.toContain('expanded')
    })

    it('收合時顯示收合指示符號', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: false },
      })
      expect(wrapper.find('.filter-chevron').exists()).toBe(true)
      expect(wrapper.find('.filter-chevron svg').exists()).toBe(true)
    })

    it('展開時顯示展開指示符號', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: true },
      })
      expect(wrapper.find('.filter-chevron').classes()).toContain('expanded')
      expect(wrapper.find('.filter-chevron svg').exists()).toBe(true)
    })
  })

  // Requirement: Selected count badge in collapsed state
  describe('selected count badge', () => {
    it('收合時顯示已選數量 badge', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, selected: ['craft', 'dj', 'cook'], defaultExpanded: false },
      })
      expect(wrapper.find('.filter-badge').text()).toContain('3')
    })

    it('無選取時不顯示 badge', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, selected: [], defaultExpanded: false },
      })
      expect(wrapper.find('.filter-badge').exists()).toBe(false)
    })
  })

  // Requirement: Inline chips in collapsed state
  describe('inline chips', () => {
    it('收合時顯示已選項目 chips', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, selected: ['dj', 'craft'], defaultExpanded: false },
      })
      const chips = wrapper.findAll('.filter-chip')
      expect(chips).toHaveLength(2)
      expect(chips.map(c => c.text())).toContain('DJ')
      expect(chips.map(c => c.text())).toContain('工匠')
    })
  })

  // Requirement: Toggle filter option
  describe('toggle filter option', () => {
    it('點擊選項觸發 toggle 事件', async () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: true },
      })
      await wrapper.findAll('.filter-btn')[0].trigger('click')
      expect(wrapper.emitted('toggle')?.[0]).toEqual(['craft'])
    })
  })

  // Requirement: Label mapping support
  describe('label mapping', () => {
    it('labels 正確映射顯示名稱', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { ...defaultProps, defaultExpanded: true },
      })
      const buttons = wrapper.findAll('.filter-btn')
      expect(buttons[0].text()).toBe('工匠')
      expect(buttons[1].text()).toBe('DJ')
      expect(buttons[2].text()).toBe('料理')
    })

    it('無 labels 時直接顯示 option 值', () => {
      const wrapper = mount(CollapsibleFilterBar, {
        props: { label: '特長', options: ['craft', 'dj'], selected: [], defaultExpanded: true },
      })
      const buttons = wrapper.findAll('.filter-btn')
      expect(buttons[0].text()).toBe('craft')
      expect(buttons[1].text()).toBe('dj')
    })
  })
})
