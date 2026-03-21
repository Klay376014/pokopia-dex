<script setup lang="ts">
import { ref, computed } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
import FilterBar from './components/FilterBar.vue'
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
const selectedHabitats = ref<string[]>([])

// Derive available options from data
const timeOptions = ['清晨', '白天', '黃昏', '夜晚']
const timeKeys = ['dawn', 'day', 'dusk', 'night'] as const
const weatherOptions = ['晴朗', '陰天', '下雨']
const weatherKeys = ['sunny', 'cloudy', 'rainy'] as const

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

    // Habitat filter (OR within, AND with others)
    if (selectedHabitats.value.length > 0) {
      const hasMatch = selectedHabitats.value.some(h =>
        p.habitats.some(ph => ph.name === h)
      )
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
  <div class="app">
    <header class="app-header">
      <h1>Pokopia 圖鑑</h1>
    </header>

    <section class="filters">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋名稱或編號..."
          class="search-input"
        />
      </div>

      <FilterBar
        label="時間"
        :options="timeOptions"
        :selected="selectedTimes"
        @toggle="v => toggleFilter(selectedTimes, v)"
      />

      <FilterBar
        label="天氣"
        :options="weatherOptions"
        :selected="selectedWeathers"
        @toggle="v => toggleFilter(selectedWeathers, v)"
      />

      <FilterBar
        label="特長"
        :options="allSkills"
        :selected="selectedSkills"
        :labels="skillLabels"
        @toggle="v => toggleFilter(selectedSkills, v)"
      />

      <FilterBar
        label="棲息地"
        :options="allHabitatNames"
        :selected="selectedHabitats"
        @toggle="v => toggleFilter(selectedHabitats, v)"
      />
    </section>

    <p class="result-count">{{ filteredPokemon.length }} / {{ data.pokemon.length }}</p>

    <main class="pokemon-grid">
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fafafa;
  color: #333;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.app-header {
  text-align: center;
  padding: 16px 0;
}

.app-header h1 {
  font-size: 1.5rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.search-bar {
  margin-bottom: 4px;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
}

.search-input:focus {
  border-color: #4a90d9;
}

.result-count {
  text-align: center;
  padding: 8px 0;
  font-size: 0.875rem;
  color: #888;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  padding: 8px 0;
}
</style>
