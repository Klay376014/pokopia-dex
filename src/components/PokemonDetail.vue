<script setup lang="ts">
import type { Pokemon, HabitatInfo } from '../types'
import { skillLabels } from '../skillLabels'
import habitatsRaw from '../../data/habitats.json'

const habitatsData = habitatsRaw as HabitatInfo[]
const habitatMap = new Map<string, HabitatInfo>(
  habitatsData.map(h => [h.id, h])
)

defineProps<{
  pokemon: Pokemon
}>()

defineEmits<{
  close: []
  navigate: [name: string]
}>()

function getArtworkUrl(pokemon: Pokemon): string {
  if (pokemon.artwork_url) return pokemon.artwork_url
  const id = parseInt(pokemon.national_id, 10)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

function getHabitatImage(habitatId: string): string {
  return new URL(`../../assets/habitats/${habitatId}.webp`, import.meta.url).href
}

function getSkillIcon(skillName: string): string | null {
  try {
    return new URL(`../../assets/skills/Pokopia_skill_${skillName}.png`, import.meta.url).href
  } catch {
    return null
  }
}

const timeEntries: { key: keyof Pokemon['time']; label: string; icon: string }[] = [
  { key: 'dawn', label: '清晨', icon: new URL('../../assets/time/dawn.webp', import.meta.url).href },
  { key: 'day', label: '白天', icon: new URL('../../assets/time/day.webp', import.meta.url).href },
  { key: 'dusk', label: '黃昏', icon: new URL('../../assets/time/dusk.webp', import.meta.url).href },
  { key: 'night', label: '夜晚', icon: new URL('../../assets/time/night.webp', import.meta.url).href },
]

const weatherEntries: { key: keyof Pokemon['weather']; label: string; icon: string }[] = [
  { key: 'sunny', label: '晴朗', icon: new URL('../../assets/weather/sun.webp', import.meta.url).href },
  { key: 'cloudy', label: '陰天', icon: new URL('../../assets/weather/cloud.webp', import.meta.url).href },
  { key: 'rainy', label: '下雨', icon: new URL('../../assets/weather/rain.webp', import.meta.url).href },
]

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<template>
  <div class="fixed inset-0 bg-[oklch(0_0_0/0.5)] flex items-center justify-center z-100 p-4" @click.self="$emit('close')">
    <div class="bg-surface-raised rounded-xl p-6 max-w-[480px] w-full max-h-[90vh] overflow-y-auto relative">
      <button class="absolute top-3 right-3 bg-transparent border-none text-[1.25rem] cursor-pointer text-text-subtle p-[4px_8px] hover:text-text" @click="$emit('close')">✕</button>

      <img
        :src="getArtworkUrl(pokemon)"
        :alt="pokemon.name_zh"
        class="block w-[200px] h-[200px] mx-auto mb-3 object-contain"
        @error="onImgError"
      />

      <h2 class="text-center text-[1.25rem] mb-1">{{ pokemon.name_zh }}</h2>
      <p class="text-center text-text-subtle text-[0.875rem] mb-4">Pokopia #{{ pokemon.pokopia_id }} / 全國 #{{ pokemon.national_id }}</p>

      <div class="mb-4" v-if="pokemon.habitats.length > 0">
        <h3 class="text-[0.875rem] text-text-muted mb-2">棲息地</h3>
        <div class="flex flex-col gap-3">
          <div v-for="hId in pokemon.habitats" :key="hId" class="bg-surface rounded-lg p-2">
            <div class="flex items-center gap-2">
              <img
                :src="getHabitatImage(hId)"
                :alt="habitatMap.get(hId)?.name"
                class="w-[90px] h-[60px] object-cover rounded"
                @error="onImgError"
              />
              <div class="flex flex-col">
                <span class="font-500">{{ habitatMap.get(hId)?.name }}</span>
                <span v-if="habitatMap.get(hId)?.detail" class="text-xs text-text-subtle">
                  {{ habitatMap.get(hId)!.detail }}
                </span>
              </div>
            </div>
            <div
              v-if="habitatMap.get(hId)?.pokemon?.length"
              class="flex flex-wrap gap-1 mt-[6px]"
            >
              <button
                v-for="name in habitatMap.get(hId)!.pokemon"
                :key="name"
                class="text-xs bg-surface-muted text-text-muted py-[2px] px-[6px] rounded border-none cursor-pointer hover:bg-primary/15 hover:text-primary transition-colors duration-150"
                @click="$emit('navigate', name)"
              >{{ name }}</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-[0.875rem] text-text-muted mb-2">出現時間</h3>
        <div class="flex gap-[6px] flex-wrap">
          <span
            v-for="t in timeEntries"
            :key="t.key"
            :class="['tag tag-icon', { active: pokemon.time[t.key] }]"
            :title="t.label"
          >
            <img :src="t.icon" :alt="t.label" class="tag-img" />
          </span>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-[0.875rem] text-text-muted mb-2">出現天氣</h3>
        <div class="flex gap-[6px] flex-wrap">
          <span
            v-for="w in weatherEntries"
            :key="w.key"
            :class="['tag tag-icon', { active: pokemon.weather[w.key] }]"
            :title="w.label"
          >
            <img :src="w.icon" :alt="w.label" class="tag-img" />
          </span>
        </div>
      </div>

      <div class="mb-4" v-if="pokemon.skills.length > 0">
        <h3 class="text-[0.875rem] text-text-muted mb-2">特長</h3>
        <div class="flex gap-2 flex-wrap">
          <div v-for="skill in pokemon.skills" :key="skill" class="flex items-center gap-1">
            <img
              v-if="getSkillIcon(skill)"
              :src="getSkillIcon(skill)!"
              :alt="skill"
              class="w-6 h-6"
              @error="onImgError"
            />
            <span>{{ skillLabels[skill] ?? skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8125rem;
  background: oklch(0.93 0.01 27);
  color: oklch(0.60 0.015 27);
}

.tag.active {
  background: oklch(0.97 0.02 27);
  color: oklch(0.55 0.22 27);
}

.tag-icon {
  padding: 4px 6px;
  display: inline-flex;
  align-items: center;
}

.tag-icon.active {
  background: oklch(57.39% 0.22149 30.641);
}

.tag-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.tag-icon:not(.active) .tag-img {
  filter: grayscale(1) opacity(0.3);
}
</style>
