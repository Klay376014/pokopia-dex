import { describe, it, expect, beforeEach, vi } from 'vitest'

// Reset module state between tests by re-importing
let useBookmarks: typeof import('../useBookmarks').useBookmarks

describe('useBookmarks', () => {
  beforeEach(async () => {
    localStorage.clear()
    // Reset module-level singleton by clearing module cache
    vi.resetModules()
    const mod = await import('../useBookmarks')
    useBookmarks = mod.useBookmarks
  })

  describe('toggle', () => {
    it('adds a pokemon id when not bookmarked', () => {
      const { toggle, isBookmarked } = useBookmarks()
      toggle('001')
      expect(isBookmarked('001')).toBe(true)
    })

    it('removes a pokemon id when already bookmarked', () => {
      const { toggle, isBookmarked } = useBookmarks()
      toggle('001')
      toggle('001')
      expect(isBookmarked('001')).toBe(false)
    })

    it('handles multiple bookmarks independently', () => {
      const { toggle, isBookmarked } = useBookmarks()
      toggle('001')
      toggle('002')
      toggle('001')
      expect(isBookmarked('001')).toBe(false)
      expect(isBookmarked('002')).toBe(true)
    })
  })

  describe('isBookmarked', () => {
    it('returns false for non-bookmarked id', () => {
      const { isBookmarked } = useBookmarks()
      expect(isBookmarked('999')).toBe(false)
    })
  })

  describe('count', () => {
    it('reflects the number of bookmarked items', () => {
      const { toggle, count } = useBookmarks()
      expect(count.value).toBe(0)
      toggle('001')
      expect(count.value).toBe(1)
      toggle('002')
      expect(count.value).toBe(2)
      toggle('001')
      expect(count.value).toBe(1)
    })
  })

  describe('bookmarkedIds', () => {
    it('returns a reactive set of all bookmarked ids', () => {
      const { toggle, bookmarkedIds } = useBookmarks()
      toggle('001')
      toggle('003')
      expect(bookmarkedIds.value.has('001')).toBe(true)
      expect(bookmarkedIds.value.has('003')).toBe(true)
      expect(bookmarkedIds.value.has('002')).toBe(false)
    })
  })

  describe('localStorage persistence', () => {
    it('saves bookmarks to localStorage on toggle', () => {
      const { toggle } = useBookmarks()
      toggle('001')
      const stored = JSON.parse(localStorage.getItem('pokopia-bookmarks')!)
      expect(stored).toContain('001')
    })

    it('loads bookmarks from localStorage on init', async () => {
      localStorage.setItem('pokopia-bookmarks', JSON.stringify(['005', '010']))
      vi.resetModules()
      const mod = await import('../useBookmarks')
      const { isBookmarked } = mod.useBookmarks()
      expect(isBookmarked('005')).toBe(true)
      expect(isBookmarked('010')).toBe(true)
    })

    it('initializes empty when localStorage has no data', () => {
      const { count } = useBookmarks()
      expect(count.value).toBe(0)
    })

    it('initializes empty when localStorage has invalid JSON', async () => {
      localStorage.setItem('pokopia-bookmarks', 'not-valid-json')
      vi.resetModules()
      const mod = await import('../useBookmarks')
      const { count } = mod.useBookmarks()
      expect(count.value).toBe(0)
    })
  })

  describe('singleton behavior', () => {
    it('shares state across multiple useBookmarks calls', () => {
      const a = useBookmarks()
      const b = useBookmarks()
      a.toggle('001')
      expect(b.isBookmarked('001')).toBe(true)
    })
  })
})
