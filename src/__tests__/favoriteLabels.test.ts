import { describe, it, expect } from 'vitest'
import { flavorLabels, environmentLabels, thingLabels } from '../favoriteLabels'

describe('favoriteLabels', () => {
  describe('flavorLabels', () => {
    it('has exactly 5 entries', () => {
      expect(Object.keys(flavorLabels)).toHaveLength(5)
    })

    it('all values are non-empty strings', () => {
      for (const value of Object.values(flavorLabels)) {
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
    })
  })

  describe('environmentLabels', () => {
    it('has exactly 6 entries', () => {
      expect(Object.keys(environmentLabels)).toHaveLength(6)
    })

    it('all values are non-empty strings', () => {
      for (const value of Object.values(environmentLabels)) {
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
    })
  })

  describe('thingLabels', () => {
    it('has exactly 43 entries', () => {
      expect(Object.keys(thingLabels)).toHaveLength(43)
    })

    it('all values are non-empty strings', () => {
      for (const value of Object.values(thingLabels)) {
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
    })
  })
})
