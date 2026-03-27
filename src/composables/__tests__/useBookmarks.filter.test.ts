import { describe, it, expect, beforeEach, vi } from 'vitest'

let useBookmarks: typeof import('../useBookmarks').useBookmarks

describe('useBookmarks filter integration', () => {
  beforeEach(async () => {
    localStorage.clear()
    vi.resetModules()
    const mod = await import('../useBookmarks')
    useBookmarks = mod.useBookmarks
  })

  it('bookmarkedIds can be used to filter a pokemon list by name_zh', () => {
    const { toggle, bookmarkedIds } = useBookmarks()
    toggle('皮卡丘')
    toggle('傑尼龜')

    const pokemon = [
      { name_zh: '皮卡丘', pokopia_id: '001' },
      { name_zh: '小火龍', pokopia_id: '002' },
      { name_zh: '傑尼龜', pokopia_id: '003' },
      { name_zh: '妙蛙種子', pokopia_id: '004' },
    ]

    const filtered = pokemon.filter(p => bookmarkedIds.value.has(p.name_zh))
    expect(filtered).toHaveLength(2)
    expect(filtered.map(p => p.name_zh)).toEqual(['皮卡丘', '傑尼龜'])
  })

  it('bookmark filter combines with other filters via AND logic', () => {
    const { toggle, bookmarkedIds } = useBookmarks()
    toggle('皮卡丘')
    toggle('小火龍')
    toggle('傑尼龜')

    const pokemon = [
      { name_zh: '皮卡丘', skill: 'fire' },
      { name_zh: '小火龍', skill: 'water' },
      { name_zh: '傑尼龜', skill: 'fire' },
      { name_zh: '妙蛙種子', skill: 'fire' },
    ]

    const showBookmarkedOnly = true
    const selectedSkill = 'fire'

    const filtered = pokemon.filter(p => {
      if (showBookmarkedOnly && !bookmarkedIds.value.has(p.name_zh)) return false
      if (p.skill !== selectedSkill) return false
      return true
    })

    expect(filtered).toHaveLength(2)
    expect(filtered.map(p => p.name_zh)).toEqual(['皮卡丘', '傑尼龜'])
  })

  it('returns all pokemon when bookmark filter is disabled', () => {
    const { toggle, bookmarkedIds } = useBookmarks()
    toggle('皮卡丘')

    const pokemon = [
      { name_zh: '皮卡丘' },
      { name_zh: '小火龍' },
    ]

    const showBookmarkedOnly = false

    const filtered = pokemon.filter(p => {
      if (showBookmarkedOnly && !bookmarkedIds.value.has(p.name_zh)) return false
      return true
    })

    expect(filtered).toHaveLength(2)
  })
})
