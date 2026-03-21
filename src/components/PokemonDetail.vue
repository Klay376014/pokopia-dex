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
}>()

function getArtworkUrl(nationalId: string): string {
  const id = parseInt(nationalId, 10)
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

const timeEntries: { key: keyof Pokemon['time']; label: string }[] = [
  { key: 'dawn', label: '清晨' },
  { key: 'day', label: '白天' },
  { key: 'dusk', label: '黃昏' },
  { key: 'night', label: '夜晚' },
]

const weatherEntries: { key: keyof Pokemon['weather']; label: string }[] = [
  { key: 'sunny', label: '晴朗' },
  { key: 'cloudy', label: '陰天' },
  { key: 'rainy', label: '下雨' },
]

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}
</script>

<template>
  <div class="detail-overlay" @click.self="$emit('close')">
    <div class="detail-card">
      <button class="close-btn" @click="$emit('close')">✕</button>

      <img
        :src="getArtworkUrl(pokemon.national_id)"
        :alt="pokemon.name_zh"
        class="artwork"
        @error="onImgError"
      />

      <h2 class="name">{{ pokemon.name_zh }}</h2>
      <p class="ids">Pokopia #{{ pokemon.pokopia_id }} / 全國 #{{ pokemon.national_id }}</p>

      <div class="section" v-if="pokemon.habitats.length > 0">
        <h3>棲息地</h3>
        <div class="habitat-list">
          <div v-for="h in pokemon.habitats" :key="h.habitat_id" class="habitat-entry">
            <div class="habitat-item">
              <img
                :src="getHabitatImage(h.habitat_id)"
                :alt="h.name"
                class="habitat-img"
                @error="onImgError"
              />
              <div class="habitat-info">
                <span class="habitat-name">{{ h.name }}</span>
                <span v-if="habitatMap.get(h.habitat_id)?.detail" class="habitat-detail">
                  {{ habitatMap.get(h.habitat_id)!.detail }}
                </span>
              </div>
            </div>
            <div
              v-if="habitatMap.get(h.habitat_id)?.pokemon?.length"
              class="habitat-pokemon"
            >
              <span
                v-for="name in habitatMap.get(h.habitat_id)!.pokemon"
                :key="name"
                class="habitat-pokemon-tag"
              >{{ name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h3>出現時間</h3>
        <div class="tag-list">
          <span
            v-for="t in timeEntries"
            :key="t.key"
            :class="['tag', { active: pokemon.time[t.key] }]"
          >
            {{ t.label }}
          </span>
        </div>
      </div>

      <div class="section">
        <h3>出現天氣</h3>
        <div class="tag-list">
          <span
            v-for="w in weatherEntries"
            :key="w.key"
            :class="['tag', { active: pokemon.weather[w.key] }]"
          >
            {{ w.label }}
          </span>
        </div>
      </div>

      <div class="section" v-if="pokemon.skills.length > 0">
        <h3>特長</h3>
        <div class="skill-list">
          <div v-for="skill in pokemon.skills" :key="skill" class="skill-item">
            <img
              v-if="getSkillIcon(skill)"
              :src="getSkillIcon(skill)!"
              :alt="skill"
              class="skill-icon"
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
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #888;
  padding: 4px 8px;
}

.close-btn:hover {
  color: #333;
}

.artwork {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto 12px;
  object-fit: contain;
}

.name {
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.ids {
  text-align: center;
  color: #888;
  font-size: 0.875rem;
  margin-bottom: 16px;
}

.section {
  margin-bottom: 16px;
}

.section h3 {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 8px;
}

.habitat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.habitat-entry {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 8px;
}

.habitat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.habitat-info {
  display: flex;
  flex-direction: column;
}

.habitat-name {
  font-weight: 500;
}

.habitat-detail {
  font-size: 0.75rem;
  color: #888;
}

.habitat-img {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.habitat-pokemon {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.habitat-pokemon-tag {
  font-size: 0.75rem;
  background: #e8e8e8;
  color: #555;
  padding: 2px 6px;
  border-radius: 4px;
}

.tag-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8125rem;
  background: #eee;
  color: #999;
}

.tag.active {
  background: #e3f2fd;
  color: #1976d2;
}

.skill-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.skill-icon {
  width: 24px;
  height: 24px;
}
</style>
