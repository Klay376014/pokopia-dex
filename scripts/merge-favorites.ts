import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { flavorLabels, environmentLabels, thingLabels } from '../src/favoriteLabels'

const dataDir = resolve(import.meta.dir, '..', 'data')

interface FavoriteEntry {
  name: string
  flavor: string
  enviromment: string // typo in source data
  things: string
}

interface PokopiaEntry {
  pokopia_id: string
  national_id: string
  name_zh: string
  habitats: string[]
  time: Record<string, boolean>
  weather: Record<string, boolean>
  skills: string[]
  artwork_url?: string
  sprite_url?: string
  flavor?: string | null
  environment?: string | null
  things?: string[] | null
}

// Build reverse mappings (Chinese → English)
function buildReverse(labels: Record<string, string>): Record<string, string> {
  const reverse: Record<string, string> = {}
  for (const [en, zh] of Object.entries(labels)) {
    reverse[zh] = en
  }
  return reverse
}

const reverseFlavorLabels = buildReverse(flavorLabels)
const reverseEnvironmentLabels = buildReverse(environmentLabels)
const reverseThingLabels = buildReverse(thingLabels)

// For flavor, we need to match by the base flavor text (before parentheses) too
// since flavorLabels stores full text with ingredients
const flavorByBase: Record<string, string> = {}
for (const [en, zh] of Object.entries(flavorLabels)) {
  flavorByBase[zh] = en
}

// Normalize fullwidth parentheses to halfwidth
function normalizeName(name: string): string {
  return name.replace(/（/g, '(').replace(/）/g, ')').trim()
}

// Environment typo correction
const envTypoMap: Record<string, string> = {
  '溫款': '溫暖',
}

// Things abbreviation normalization
const thingsNormMap: Record<string, string> = {
  '海': '能感受海的',
  '大家用': '大家一起用的',
  '大家': '大家一起用的',
  '食物': '像食物的',
  '色彩': '色彩繽紛的',
  '多彩': '色彩繽紛的',
  '遊樂': '遊戲區',
  '觀賞用的用的': '觀賞用的',
}

function parseFlavor(raw: string): string | null {
  if (raw === '待更新' || raw === '–' || raw === '-') return null
  const trimmed = raw.trim()
  // Try exact match first
  if (reverseFlavorLabels[trimmed]) return reverseFlavorLabels[trimmed]
  // Try matching in flavorByBase
  if (flavorByBase[trimmed]) return flavorByBase[trimmed]
  console.warn(`⚠ Unknown flavor: "${trimmed}"`)
  return null
}

function parseEnvironment(raw: string): string | null {
  if (raw === '待更新' || raw === '–' || raw === '-') return null
  const corrected = envTypoMap[raw.trim()] ?? raw.trim()
  const en = reverseEnvironmentLabels[corrected]
  if (!en) {
    console.warn(`⚠ Unknown environment: "${raw.trim()}" (corrected: "${corrected}")`)
    return null
  }
  return en
}

function parseThings(raw: string): string[] | null {
  if (raw === '待更新' || raw === '–' || raw === '-') return null
  const items = raw.split('、').map(s => s.trim()).filter(Boolean)
  const result: string[] = []
  for (const item of items) {
    const normalized = thingsNormMap[item] ?? item
    const en = reverseThingLabels[normalized]
    if (!en) {
      console.warn(`⚠ Unknown thing: "${item}" (normalized: "${normalized}")`)
    } else {
      result.push(en)
    }
  }
  return result.length > 0 ? result : null
}

// Read data
const favorites: FavoriteEntry[] = JSON.parse(
  readFileSync(resolve(dataDir, 'favorite.json'), 'utf-8'),
)
const pokopiaData = JSON.parse(
  readFileSync(resolve(dataDir, 'pokopia.json'), 'utf-8'),
)
const pokemonList: PokopiaEntry[] = pokopiaData.pokemon

// Build favorites lookup by normalized name
const favByName = new Map<string, FavoriteEntry>()
for (const fav of favorites) {
  favByName.set(normalizeName(fav.name), fav)
}

// Merge
let matched = 0
let unmatched = 0
const unmatchedNames: string[] = []

for (const pokemon of pokemonList) {
  const normalizedName = normalizeName(pokemon.name_zh)
  const fav = favByName.get(normalizedName)

  if (!fav) {
    pokemon.flavor = null
    pokemon.environment = null
    pokemon.things = null
    unmatched++
    unmatchedNames.push(pokemon.name_zh)
    continue
  }

  pokemon.flavor = parseFlavor(fav.flavor)
  pokemon.environment = parseEnvironment(fav.enviromment)
  pokemon.things = parseThings(fav.things)
  matched++
}

// Write output
writeFileSync(
  resolve(dataDir, 'pokopia.json'),
  JSON.stringify(pokopiaData, null, 2) + '\n',
  'utf-8',
)

console.log(`\n✅ Merge complete`)
console.log(`   Matched: ${matched}/${pokemonList.length}`)
console.log(`   Unmatched: ${unmatched}`)

if (unmatchedNames.length > 0) {
  console.log(`\n❌ Unmatched Pokémon:`)
  for (const name of unmatchedNames) {
    console.log(`   - ${name}`)
  }
}
