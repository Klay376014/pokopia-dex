import { describe, it, expect } from 'vitest'
import { flavorLabels, environmentLabels, thingLabels } from '../favoriteLabels'

// Test the reverse mapping and parsing logic used by the merge script
// by verifying that all labels can be reversed correctly

function buildReverse(labels: Record<string, string>): Record<string, string> {
  const reverse: Record<string, string> = {}
  for (const [en, zh] of Object.entries(labels)) {
    reverse[zh] = en
  }
  return reverse
}

describe('merge-favorites reverse mapping', () => {
  it('all flavor labels can be reversed', () => {
    const reverse = buildReverse(flavorLabels)
    expect(Object.keys(reverse)).toHaveLength(Object.keys(flavorLabels).length)
    expect(reverse['甜甜的(桃桃果、豆子)']).toBe('sweet')
    expect(reverse['辣辣的(成熟的紅蘿蔔)']).toBe('spicy')
  })

  it('all environment labels can be reversed', () => {
    const reverse = buildReverse(environmentLabels)
    expect(Object.keys(reverse)).toHaveLength(Object.keys(environmentLabels).length)
    expect(reverse['明亮']).toBe('bright')
    expect(reverse['溫暖']).toBe('warm')
  })

  it('all thing labels can be reversed', () => {
    const reverse = buildReverse(thingLabels)
    expect(Object.keys(reverse)).toHaveLength(Object.keys(thingLabels).length)
    expect(reverse['能感受大自然的']).toBe('nature')
    expect(reverse['垃圾']).toBe('trash')
  })

  it('no duplicate Chinese values in thingLabels', () => {
    const values = Object.values(thingLabels)
    const unique = new Set(values)
    expect(unique.size).toBe(values.length)
  })

  it('name normalization converts fullwidth to halfwidth parentheses', () => {
    const normalize = (name: string) => name.replace(/（/g, '(').replace(/）/g, ')').trim()
    expect(normalize('海兔獸（東海）')).toBe('海兔獸(東海)')
    expect(normalize('顫弦蠑螈（高調）')).toBe('顫弦蠑螈(高調)')
    expect(normalize('妙蛙種子')).toBe('妙蛙種子')
  })
})
