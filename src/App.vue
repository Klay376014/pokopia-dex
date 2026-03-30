<script setup lang="ts">
import { ref, computed } from 'vue'
import PokemonCard from './components/PokemonCard.vue'
import FilterBar from './components/FilterBar.vue'
import CollapsibleFilterBar from './components/CollapsibleFilterBar.vue'
import SearchableDropdown from './components/SearchableDropdown.vue'
import PokemonDetail from './components/PokemonDetail.vue'
import BookmarkToast from './components/BookmarkToast.vue'
import type { Pokemon, PokopiaData, HabitatInfo } from './types'
import { skillLabels } from './skillLabels'
import { flavorLabels, environmentLabels, thingLabels } from './favoriteLabels'
import { useBookmarks } from './composables/useBookmarks'

// Short flavor labels for filter display (without ingredients)
const flavorFilterLabels = Object.fromEntries(
  Object.entries(flavorLabels).map(([k, v]) => [k, v[0] ?? ''])
)
import pokopiaData from '../data/pokopia.json'
import habitatsData from '../data/habitats.json'

const data = pokopiaData as PokopiaData
const habitats = habitatsData as HabitatInfo[]

const { toggle, isBookmarked, bookmarkedIds, count: bookmarkCount } = useBookmarks()

const toastMessage = ref<string | null>(null)

function toggleBookmark(name: string) {
  const wasBookmarked = isBookmarked(name)
  toggle(name)
  toastMessage.value = null
  // Force reactivity by changing reference
  requestAnimationFrame(() => {
    toastMessage.value = wasBookmarked ? `已取消收藏 ${name}` : `已收藏 ${name}`
  })
}

const selectedPokemon = ref<Pokemon | null>(null)
const searchQuery = ref('')

// Filter state
const showBookmarkedOnly = ref(false)
const selectedSkills = ref<string[]>([])
const selectedHabitat = ref<string | null>(null)
const selectedFlavors = ref<string[]>([])
const selectedEnvironments = ref<string[]>([])
const selectedThings = ref<string[]>([])

const allSkills = computed(() => {
  const skills = new Set<string>()
  for (const p of data.pokemon) {
    for (const s of p.skills) skills.add(s)
  }
  return [...skills].sort()
})

const allFlavors = computed(() => Object.keys(flavorLabels))
const allEnvironments = computed(() => Object.keys(environmentLabels))
const allThings = computed(() => Object.keys(thingLabels))

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
    // Bookmark filter (AND with others)
    if (showBookmarkedOnly.value) {
      if (!bookmarkedIds.value.has(p.name_zh)) return false
    }

    // Search filter (AND with other filters)
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      if (!p.name_zh.toLowerCase().includes(q) && !p.pokopia_id.includes(q)) {
        return false
      }
    }

    // Flavor filter (OR within, AND with others)
    if (selectedFlavors.value.length > 0) {
      if (!p.flavor || !selectedFlavors.value.includes(p.flavor)) return false
    }

    // Environment filter (OR within, AND with others)
    if (selectedEnvironments.value.length > 0) {
      if (!p.environment || !selectedEnvironments.value.includes(p.environment)) return false
    }

    // Things filter (OR within, AND with others)
    if (selectedThings.value.length > 0) {
      if (!p.things || !selectedThings.value.some(t => p.things!.includes(t))) return false
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

function onNavigatePokemon(name: string) {
  if (selectedPokemon.value?.name_zh === name) return
  const target = data.pokemon.find(p => p.name_zh === name)
  if (target) selectedPokemon.value = target
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
      <div class="flex items-center gap-2">
        <button
          class="bookmark-filter-btn flex items-center gap-1 py-[5px] px-3 rounded-lg border-1 border-solid text-[0.8125rem] font-500 cursor-pointer transition-[background,color,border-color] duration-200"
          :class="showBookmarkedOnly ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-surface-muted hover:border-text-subtle'"
          @click="showBookmarkedOnly = !showBookmarkedOnly"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" :fill="showBookmarkedOnly ? 'white' : 'oklch(0.55 0.22 27)'" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>僅顯示收藏</span>
          <span v-if="bookmarkCount > 0" class="text-xs opacity-70">({{ bookmarkCount }})</span>
        </button>
      </div>

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
          label="口味"
          :options="allFlavors"
          :selected="selectedFlavors"
          :labels="flavorFilterLabels"
          @toggle="v => toggleFilter(selectedFlavors, v)"
        />

        <FilterBar
          label="環境"
          :options="allEnvironments"
          :selected="selectedEnvironments"
          :labels="environmentLabels"
          @toggle="v => toggleFilter(selectedEnvironments, v)"
        />
      </div>

      <div class="flex flex-col gap-[6px]">
        <CollapsibleFilterBar
          label="特長"
          :options="allSkills"
          :selected="selectedSkills"
          :labels="skillLabels"
          :defaultExpanded="false"
          @toggle="v => toggleFilter(selectedSkills, v)"
        />

        <CollapsibleFilterBar
          label="喜歡的東西"
          :options="allThings"
          :selected="selectedThings"
          :labels="thingLabels"
          :defaultExpanded="false"
          @toggle="v => toggleFilter(selectedThings, v)"
        />
      </div>
    </section>

    <p class="text-center pt-5 text-[0.875rem] text-text-muted font-500">{{ filteredPokemon.length }} / {{ data.pokemon.length }}</p>

    <main class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[10px] py-2">
      <PokemonCard
        v-for="p in filteredPokemon"
        :key="`${p.pokopia_id}-${p.national_id}-${p.name_zh}`"
        :pokemon="p"
        :bookmarked="isBookmarked(p.name_zh)"
        @select="onSelectPokemon"
        @toggle-bookmark="toggleBookmark"
      />
    </main>

    <BookmarkToast :message="toastMessage" />

    <PokemonDetail
      v-if="selectedPokemon"
      :pokemon="selectedPokemon"
      :bookmarked="isBookmarked(selectedPokemon.name_zh)"
      @close="onCloseDetail"
      @navigate="onNavigatePokemon"
      @toggle-bookmark="toggleBookmark"
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
