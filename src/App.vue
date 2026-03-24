<script setup lang="ts">
import { ref, computed } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
import FilterBar from './components/FilterBar.vue'
import CollapsibleFilterBar from './components/CollapsibleFilterBar.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import type { Pokemon, PokopiaData, HabitatInfo } from './types'
import { skillLabels } from './skillLabels'
import pokopiaData from '../data/pokopia.json'
import habitatsData from '../data/habitats.json'

const data = pokopiaData as PokopiaData
const habitats = habitatsData as HabitatInfo[]

const selectedPokemon = ref<Pokemon | null>(null)
const searchQuery = ref('')

// Filter state
const selectedTimes = ref<string[]>([])
const selectedWeathers = ref<string[]>([])
const selectedSkills = ref<string[]>([])
const selectedHabitat = ref<string | null>(null)

// Derive available options from data
const timeOptions = ['清晨', '白天', '黃昏', '夜晚']
const timeKeys = ['dawn', 'day', 'dusk', 'night'] as const
const weatherOptions = ['晴朗', '陰天', '下雨']
const weatherKeys = ['sunny', 'cloudy', 'rainy'] as const

const timeIcons: Record<string, string> = {
  '清晨': new URL('../assets/time/dawn.webp', import.meta.url).href,
  '白天': new URL('../assets/time/day.webp', import.meta.url).href,
  '黃昏': new URL('../assets/time/dusk.webp', import.meta.url).href,
  '夜晚': new URL('../assets/time/night.webp', import.meta.url).href,
}

const weatherIcons: Record<string, string> = {
  '晴朗': new URL('../assets/weather/sun.webp', import.meta.url).href,
  '陰天': new URL('../assets/weather/cloud.webp', import.meta.url).href,
  '下雨': new URL('../assets/weather/rain.webp', import.meta.url).href,
}

const allSkills = computed(() => {
  const skills = new Set<string>()
  for (const p of data.pokemon) {
    for (const s of p.skills) skills.add(s)
  }
  return [...skills].sort()
})

const allHabitatNames = computed(() => {
  return habitats.map(h => h.name)
})

function toggleFilter(arr: string[], value: string) {
  const idx = arr.indexOf(value)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(value)
}

const filteredPokemon = computed(() => {
  return data.pokemon.filter(p => {
    // Search filter (AND with other filters)
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      if (!p.name_zh.toLowerCase().includes(q) && !p.pokopia_id.includes(q)) {
        return false
      }
    }

    // Time filter (OR within, AND with others)
    if (selectedTimes.value.length > 0) {
      const hasMatch = selectedTimes.value.some((t) => {
        const idx = timeOptions.indexOf(t)
        return idx >= 0 && p.time[timeKeys[idx]]
      })
      if (!hasMatch) return false
    }

    // Weather filter (OR within, AND with others)
    if (selectedWeathers.value.length > 0) {
      const hasMatch = selectedWeathers.value.some((w) => {
        const idx = weatherOptions.indexOf(w)
        return idx >= 0 && p.weather[weatherKeys[idx]]
      })
      if (!hasMatch) return false
    }

    // Skill filter (OR within, AND with others)
    if (selectedSkills.value.length > 0) {
      const hasMatch = selectedSkills.value.some(s => p.skills.includes(s))
      if (!hasMatch) return false
    }

    // Habitat filter (single select)
    if (selectedHabitat.value) {
      const selectedId = habitats.find(h => h.name === selectedHabitat.value)?.id
      const hasMatch = selectedId && p.habitats.includes(selectedId)
      if (!hasMatch) return false
    }

    return true
  })
})

function onSelectPokemon(pokemon: Pokemon) {
  selectedPokemon.value = pokemon
}

function onCloseDetail() {
  selectedPokemon.value = null
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-4">
    <header class="app-header relative overflow-hidden bg-primary py-5 px-4 text-center rounded-xl mb-6">
      <div class="pokeball-watermark absolute -right-5 -top-5 w-[140px] h-[140px] rounded-full border-[5px] border-white/60 opacity-30" aria-hidden="true"></div>
      <h1 class="relative z-1 font-[Outfit,'PingFang_TC',sans-serif] font-800 text-white tracking-[-0.02em]">Pokopia 圖鑑</h1>
      <p class="subtitle relative z-1 font-500 text-white/70 mt-1">寶可夢棲息地探索手冊</p>
    </header>

    <section class="flex flex-col gap-[6px] p-[10px] bg-surface-raised rounded-lg shadow-[0_1px_3px_oklch(0_0_0/0.08)]">
      <div class="relative flex items-center">
        <span class="absolute left-[10px] text-base text-text-subtle pointer-events-none leading-none" aria-hidden="true">⌕</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋名稱或編號..."
          class="search-input w-full py-2 pr-3 pl-[30px] border-1 border-solid border-surface-muted rounded-lg text-[0.875rem] font-inherit outline-none bg-white text-text transition-[border-color,box-shadow] duration-200"
        />
      </div>

      <SearchableDropdown
        label="棲息地"
        :options="allHabitatNames"
        v-model="selectedHabitat"
      />
      <div class="flex gap-4 flex-wrap">
        <FilterBar
          label="時間"
          :options="timeOptions"
          :selected="selectedTimes"
          :icons="timeIcons"
          @toggle="v => toggleFilter(selectedTimes, v)"
        />

        <FilterBar
          label="天氣"
          :options="weatherOptions"
          :selected="selectedWeathers"
          :icons="weatherIcons"
          @toggle="v => toggleFilter(selectedWeathers, v)"
        />
      </div>

      <div class="flex gap-4 flex-wrap">
        <CollapsibleFilterBar
          label="特長"
          :options="allSkills"
          :selected="selectedSkills"
          :labels="skillLabels"
          :defaultExpanded="false"
          @toggle="v => toggleFilter(selectedSkills, v)"
        />
      </div>
    </section>

    <p class="text-center pt-5 text-[0.875rem] text-text-muted font-500">{{ filteredPokemon.length }} / {{ data.pokemon.length }}</p>

    <main class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[10px] py-2">
      <PokemonCard
        v-for="p in filteredPokemon"
        :key="`${p.pokopia_id}-${p.national_id}-${p.name_zh}`"
        :pokemon="p"
        @select="onSelectPokemon"
      />
    </main>

    <PokemonDetail
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      @close="onCloseDetail"
    />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'DM Sans', 'PingFang TC', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: oklch(0.985 0.005 27);
  background-image:
    radial-gradient(ellipse at 20% 50%, oklch(0.96 0.015 145 / 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, oklch(0.96 0.01 27 / 0.2) 0%, transparent 40%);
  background-attachment: fixed;
  color: oklch(0.22 0.02 27);
}

.pokeball-watermark::after {
  content: '';
  position: absolute;
  top: 50%;
  left: -5px;
  right: -5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-50%);
}

.app-header h1 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

.subtitle {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

.search-input:focus {
  border-color: oklch(0.55 0.22 27);
  box-shadow: 0 0 0 3px oklch(0.55 0.22 27 / 0.1);
}
</style>
