import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonDetail from '../PokemonDetail.vue'

// Mock asset imports that use import.meta.url
vi.mock('../../../data/habitats.json', () => ({ default: [] }))

const basePokemon = {
  pokopia_id: '001',
  national_id: '25',
  name_zh: '皮卡丘',
  artwork_url: 'https://example.com/pikachu.png',
  sprite_url: 'https://example.com/pikachu-sprite.png',
  habitats: [],
  time: { dawn: true, day: true, dusk: false, night: false },
  weather: { sunny: true, cloudy: false, rainy: false },
  skills: [],
  flavor: null,
  environment: null,
  things: null,
}

describe('PokemonDetail bookmark', () => {
  function mountDetail(bookmarked: boolean) {
    return mount(PokemonDetail, {
      props: { pokemon: basePokemon, bookmarked },
    })
  }

  it('渲染 SVG 愛心圖示', () => {
    const wrapper = mountDetail(false)
    const btn = wrapper.find('.detail-bookmark-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.find('svg').exists()).toBe(true)
  })

  it('點擊愛心按鈕觸發 toggleBookmark 事件並帶 name_zh', async () => {
    const wrapper = mountDetail(false)
    const btn = wrapper.find('.detail-bookmark-btn')
    await btn.trigger('click')
    expect(wrapper.emitted('toggleBookmark')?.[0]).toEqual(['皮卡丘'])
  })

  it('已收藏時 aria-label 為「取消收藏」', () => {
    const wrapper = mountDetail(true)
    const btn = wrapper.find('button[aria-label="取消收藏"]')
    expect(btn.exists()).toBe(true)
  })

  it('未收藏時 aria-label 為「加入收藏」', () => {
    const wrapper = mountDetail(false)
    const btn = wrapper.find('button[aria-label="加入收藏"]')
    expect(btn.exists()).toBe(true)
  })
})
