import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchableDropdown from '../SearchableDropdown.vue'

describe('SearchableDropdown', () => {
  const defaultProps = {
    label: '棲息地',
    options: ['綠色的草叢', '高岡的草叢', '美麗的花田', '樹蔭的花田'],
    modelValue: null as string | null,
  }

  // Requirement: Searchable single-select dropdown
  describe('searchable single-select dropdown', () => {
    it('聚焦輸入框時顯示下拉選單', async () => {
      const wrapper = mount(SearchableDropdown, { props: defaultProps })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.dropdown-list').exists()).toBe(true)
      expect(wrapper.findAll('.dropdown-item')).toHaveLength(4)
    })

    it('輸入文字過濾選項', async () => {
      const wrapper = mount(SearchableDropdown, { props: defaultProps })
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').setValue('草叢')
      const items = wrapper.findAll('.dropdown-item')
      expect(items).toHaveLength(2)
      expect(items[0].text()).toContain('草叢')
      expect(items[1].text()).toContain('草叢')
    })

    it('點擊選項後關閉下拉並發送事件', async () => {
      const wrapper = mount(SearchableDropdown, { props: defaultProps })
      await wrapper.find('input').trigger('focus')
      await wrapper.findAll('.dropdown-item')[0].trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['綠色的草叢'])
      expect(wrapper.find('.dropdown-list').exists()).toBe(false)
    })

    it('選取後輸入框顯示已選值', () => {
      const wrapper = mount(SearchableDropdown, {
        props: { ...defaultProps, modelValue: '綠色的草叢' },
      })
      expect(wrapper.find<HTMLInputElement>('input').element.value).toBe('綠色的草叢')
    })

    it('點擊清除按鈕清空選取', async () => {
      const wrapper = mount(SearchableDropdown, {
        props: { ...defaultProps, modelValue: '綠色的草叢' },
      })
      await wrapper.find('.clear-btn').trigger('click')
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
    })
  })

  // Requirement: Close dropdown on outside interaction
  describe('close dropdown on outside interaction', () => {
    it('按 Escape 關閉下拉', async () => {
      const wrapper = mount(SearchableDropdown, { props: defaultProps })
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.dropdown-list').exists()).toBe(true)
      await wrapper.find('input').trigger('keydown', { key: 'Escape' })
      expect(wrapper.find('.dropdown-list').exists()).toBe(false)
    })
  })

  // Requirement: Empty state
  describe('empty state', () => {
    it('無符合結果時顯示提示', async () => {
      const wrapper = mount(SearchableDropdown, { props: defaultProps })
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').setValue('不存在的地方')
      expect(wrapper.findAll('.dropdown-item')).toHaveLength(0)
      expect(wrapper.find('.dropdown-empty').text()).toContain('無符合結果')
    })
  })
})
