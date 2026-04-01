<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon, PokopiaData } from '../types'
import { skillLabels } from '../skillLabels'
import { useMapPlacements } from '../composables/useMapPlacements'
import PokemonPickerModal from '../components/PokemonPickerModal.vue'
import pokopiaData from '../../data/pokopia.json'

const data = pokopiaData as PokopiaData

const MAPS = [
  {
    id: 'withered_wastelands',
    name: '乾巴巴荒野',
    image: new URL('../../assets/maps/withered_wastelands.png', import.meta.url).href,
  },
  {
    id: 'bleak_beach',
    name: '暗沉沉海邊',
    image: new URL('../../assets/maps/bleak_beach.png', import.meta.url).href,
  },
  {
    id: 'rocky_ridges',
    name: '凸隆隆山地',
    image: new URL('../../assets/maps/rocky_ridges.png', import.meta.url).href,
  },
  {
    id: 'sparkling_skylands',
    name: '亮晶晶空島',
    image: new URL('../../assets/maps/sparkling_skylands.png', import.meta.url).href,
  },
  {
    id: 'palette_town',
    name: '空空鎮',
    image: new URL('../../assets/maps/palette_town.png', import.meta.url).href,
  },
]

const { addPokemon, removePokemon, movePokemon, getPokemonNames, isPlaced, allPlacements } = useMapPlacements()

const activeMapId = ref(MAPS[0].id)
const activeMap = computed(() => MAPS.find(m => m.id === activeMapId.value)!)
const showPicker = ref(false)

const assignedPokemon = computed(() => {
  const names = getPokemonNames(activeMapId.value)
  return names
    .map(name => data.pokemon.find(p => p.name_zh === name))
    .filter((p): p is Pokemon => p !== undefined)
})

const skillDistribution = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of assignedPokemon.value) {
    for (const skill of p.skills) {
      counts[skill] = (counts[skill] ?? 0) + 1
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

function getSpriteUrl(p: Pokemon): string {
  if (p.sprite_url) return p.sprite_url
  const id = parseInt(p.national_id, 10)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

function getElsewhereInfo(pokemonName: string): { mapId: string; mapName: string } | null {
  for (const [mapId, names] of Object.entries(allPlacements.value)) {
    if (mapId !== activeMapId.value && names.includes(pokemonName)) {
      return { mapId, mapName: MAPS.find(m => m.id === mapId)?.name ?? mapId }
    }
  }
  return null
}

function togglePokemon(name: string) {
  if (isPlaced(activeMapId.value, name)) {
    removePokemon(activeMapId.value, name)
  } else {
    addPokemon(activeMapId.value, name)
  }
}
</script>

<template>
  <div class="max-w-[1200px] mx-auto p-4">
    <!-- Page header -->
    <header class="page-header relative overflow-hidden bg-primary py-5 px-4 text-center rounded-xl mb-5">
      <div class="pokeball-watermark absolute -right-5 -top-5 w-[140px] h-[140px] rounded-full border-[5px] border-white/60 opacity-30" aria-hidden="true"></div>
      <h1 class="relative z-1 font-[Outfit,'PingFang_TC',sans-serif] font-800 text-white tracking-[-0.02em]">地圖配置</h1>
      <p class="subtitle relative z-1 font-500 text-white/70 mt-1">為每張地圖規劃你的寶可夢陣容</p>
    </header>

    <!-- Map selector strip -->
    <div class="overflow-x-auto pb-1 mb-5 -mx-1 px-1">
      <div class="flex gap-3 min-w-max">
        <button
          v-for="map in MAPS"
          :key="map.id"
          class="map-card"
          :class="{ 'map-card--active': activeMapId === map.id }"
          @click="activeMapId = map.id"
        >
          <div class="map-card-img-wrap">
            <img :src="map.image" :alt="map.name" class="map-card-img" />
          </div>
          <span class="map-card-name">{{ map.name }}</span>
          <span class="map-card-count">{{ getPokemonNames(map.id).length }} 隻</span>
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="maps-layout">
      <!-- Map image col -->
      <div class="map-image-col">
        <img :src="activeMap.image" :alt="activeMap.name" class="map-main-img" />
      </div>

      <!-- Detail col -->
      <div class="maps-detail-col">
        <!-- Assigned Pokémon section -->
        <section class="detail-section">
          <div class="section-header">
            <h2 class="section-title">{{ activeMap.name }}</h2>
            <button class="add-btn" @click="showPicker = true">+ 新增寶可夢</button>
          </div>

          <!-- Empty state -->
          <button
            v-if="assignedPokemon.length === 0"
            class="empty-state"
            @click="showPicker = true"
          >
            <span class="empty-icon">＋</span>
            <span>點擊新增寶可夢</span>
          </button>

          <!-- Pokémon grid -->
          <ul v-else class="pokemon-grid">
            <li
              v-for="p in assignedPokemon"
              :key="p.name_zh"
              class="pokemon-cell"
              :title="p.name_zh"
            >
              <img
                :src="getSpriteUrl(p)"
                :alt="p.name_zh"
                class="pokemon-sprite image-pixelated"
              />
              <button
                class="remove-btn"
                :aria-label="`移除 ${p.name_zh}`"
                @click="removePokemon(activeMapId, p.name_zh)"
              >✕</button>
            </li>
          </ul>
        </section>

        <!-- Skill distribution section -->
        <section v-if="skillDistribution.length > 0" class="detail-section skill-section">
          <h3 class="section-subtitle">技能分佈</h3>
          <div class="skill-chips">
            <span
              v-for="[skill, count] in skillDistribution"
              :key="skill"
              class="skill-chip"
            >{{ skillLabels[skill as keyof typeof skillLabels] ?? skill }} × {{ count }}</span>
          </div>
        </section>
      </div>
    </div>

    <!-- Picker modal -->
    <PokemonPickerModal
      v-if="showPicker"
      :all-pokemon="data.pokemon"
      :map-id="activeMapId"
      :is-placed="(name: string) => isPlaced(activeMapId, name)"
      :get-elsewhere-info="getElsewhereInfo"
      @toggle="togglePokemon"
      @move="(fromMapId: string, name: string) => movePokemon(fromMapId, activeMapId, name)"
      @close="showPicker = false"
    />
  </div>
</template>

<style scoped>
.page-header h1 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}
.subtitle {
  font-size: clamp(0.75rem, 2vw, 0.875rem);
}

/* Map selector cards */
.map-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 110px;
  padding: 8px 6px;
  border-radius: 12px;
  border: 2px solid oklch(0.93 0.01 27);
  background: white;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.1s;
  flex-shrink: 0;
}
.map-card:hover {
  border-color: oklch(0.70 0.15 27);
  transform: translateY(-1px);
}
.map-card--active {
  border-color: oklch(0.55 0.22 27);
  box-shadow: 0 0 0 3px oklch(0.55 0.22 27 / 0.12);
}
.map-card-img-wrap {
  width: 80px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  background: oklch(0.97 0.005 27);
}
.map-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.map-card-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: oklch(0.22 0.02 27);
  text-align: center;
  line-height: 1.2;
}
.map-card-count {
  font-size: 0.6875rem;
  color: oklch(0.55 0.22 27);
  font-weight: 500;
}

/* Main layout */
.maps-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 640px) {
  .maps-layout {
    grid-template-columns: 1fr;
  }
}

/* Map main image */
.map-main-img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  aspect-ratio: 4/3;
  display: block;
  box-shadow: 0 2px 12px oklch(0 0 0 / 0.1);
}

/* Detail column */
.maps-detail-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.detail-section {
  background: oklch(0.975 0.008 27);
  border-radius: 12px;
  padding: 14px;
  border: 1px solid oklch(0.93 0.01 27);
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 8px;
}
.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: oklch(0.22 0.02 27);
  font-family: Outfit, 'PingFang TC', sans-serif;
}
.section-subtitle {
  font-size: 0.8125rem;
  font-weight: 700;
  color: oklch(0.45 0.02 27);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Add button */
.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 20px;
  border: 1.5px solid oklch(0.55 0.22 27);
  background: white;
  color: oklch(0.55 0.22 27);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.add-btn:hover {
  background: oklch(0.55 0.22 27);
  color: white;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 24px 16px;
  border: 2px dashed oklch(0.93 0.01 27);
  border-radius: 10px;
  background: transparent;
  color: oklch(0.60 0.015 27);
  font-size: 0.875rem;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.15s, color 0.15s;
}
.empty-state:hover {
  border-color: oklch(0.70 0.15 27);
  color: oklch(0.45 0.02 27);
}
.empty-icon {
  font-size: 1.5rem;
  line-height: 1;
  color: oklch(0.93 0.01 27);
}

/* Pokémon grid */
.pokemon-grid {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pokemon-cell {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: white;
  border: 1px solid oklch(0.93 0.01 27);
  flex-shrink: 0;
}
.pokemon-cell:hover .remove-btn {
  opacity: 1;
}
.pokemon-sprite {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 10px;
}
.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid white;
  background: oklch(0.55 0.22 27);
  color: white;
  font-size: 0.5625rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  line-height: 1;
  padding: 0;
}

/* Skill chips */
.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.skill-chip {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  background: oklch(0.97 0.02 27);
  border: 1px solid oklch(0.55 0.22 27 / 0.25);
  color: oklch(0.55 0.22 27);
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
