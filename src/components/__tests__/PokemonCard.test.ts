import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonCard from '../PokemonCard.vue'
import type { Pokemon } from '../../types'

const makePokemon = (overrides: Partial<Pokemon> = {}): Pokemon => ({
  pokopia_id: '001',
  national_id: '25',
  name_zh: '皮卡丘',
  habitats: [],
  time: { dawn: true, day: true, dusk: false, night: false },
  weather: { sunny: true, cloudy: false, rainy: false },
  skills: [],
  flavor: null,
  environment: null,
  things: null,
  ...overrides,
})

describe('PokemonCard', () => {
  const defaultProps = {
    pokemon: makePokemon(),
    bookmarked: false,
  }

  describe('bookmark heart icon', () => {
    it('渲染 SVG 愛心圖示', () => {
      const wrapper = mount(PokemonCard, {
        props: { ...defaultProps, bookmarked: false },
      })
      const btn = wrapper.find('.bookmark-btn')
      expect(btn.exists()).toBe(true)
      expect(btn.find('svg').exists()).toBe(true)
    })

    it('已收藏時按鈕有 opacity-100 class', () => {
      const wrapper = mount(PokemonCard, {
        props: { ...defaultProps, bookmarked: true },
      })
      const btn = wrapper.find('.bookmark-btn')
      expect(btn.classes()).toContain('opacity-100')
    })

    it('未收藏時按鈕有 opacity-0 和 group-hover 樣式', () => {
      const wrapper = mount(PokemonCard, {
        props: { ...defaultProps, bookmarked: false },
      })
      const btn = wrapper.find('.bookmark-btn')
      expect(btn.classes()).toContain('opacity-0')
      expect(btn.classes()).toContain('group-hover:opacity-50')
    })
  })

  describe('bookmark interaction', () => {
    it('點擊愛心觸發 toggleBookmark 事件並帶 name_zh', async () => {
      const wrapper = mount(PokemonCard, {
        props: { ...defaultProps, bookmarked: false },
      })
      await wrapper.find('.bookmark-btn').trigger('click')
      expect(wrapper.emitted('toggleBookmark')?.[0]).toEqual(['皮卡丘'])
    })

    it('點擊愛心不會觸發 select 事件 (click.stop)', async () => {
      const wrapper = mount(PokemonCard, {
        props: { ...defaultProps, bookmarked: false },
      })
      await wrapper.find('.bookmark-btn').trigger('click')
      expect(wrapper.emitted('toggleBookmark')).toHaveLength(1)
      expect(wrapper.emitted('select')).toBeUndefined()
    })
  })
})
