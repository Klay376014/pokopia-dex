<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon } from '../types'

const props = defineProps<{
  allPokemon: Pokemon[]
  mapId: string
  isPlaced: (name: string) => boolean
}>()

const emit = defineEmits<{
  toggle: [name: string]
  close: []
}>()

const searchQuery = ref('')

function getSpriteUrl(p: Pokemon): string {
  if (p.sprite_url) return p.sprite_url
  const id = parseInt(p.national_id, 10)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const filteredPokemon = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return props.allPokemon
  return props.allPokemon.filter(
    p => p.name_zh.toLowerCase().includes(q) || p.pokopia_id.includes(q)
  )
})

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <div class="modal-backdrop" @click="onBackdropClick">
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="選擇寶可夢">
      <!-- Header -->
      <div class="modal-header">
        <h2 class="modal-title">新增寶可夢</h2>
        <button class="modal-close" aria-label="關閉" @click="emit('close')">✕</button>
      </div>

      <!-- Search -->
      <div class="modal-search-wrap">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋名稱或編號..."
          class="modal-search"
          autofocus
        />
      </div>

      <!-- Pokémon list -->
      <ul class="picker-list">
        <li
          v-for="p in filteredPokemon"
          :key="p.name_zh"
        >
          <button
            class="picker-item"
            :class="{ 'picker-item--placed': isPlaced(p.name_zh) }"
            @click="emit('toggle', p.name_zh)"
          >
            <img
              :src="getSpriteUrl(p)"
              :alt="p.name_zh"
              class="picker-sprite image-pixelated"
            />
            <span class="picker-name">{{ p.name_zh }}</span>
            <span class="picker-id">{{ p.pokopia_id }}</span>
            <span v-if="isPlaced(p.name_zh)" class="picker-check" aria-label="已配置">✓</span>
          </button>
        </li>
        <li v-if="filteredPokemon.length === 0" class="picker-empty">
          找不到符合的寶可夢
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: oklch(0 0 0 / 0.45);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}

@media (min-width: 640px) {
  .modal-backdrop {
    align-items: center;
    padding: 24px;
  }
}

.modal-panel {
  background: white;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 480px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 32px oklch(0 0 0 / 0.15);
}

@media (min-width: 640px) {
  .modal-panel {
    border-radius: 20px;
    max-height: 600px;
    box-shadow: 0 8px 40px oklch(0 0 0 / 0.2);
  }
}

/* Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 12px;
  border-bottom: 1px solid oklch(0.93 0.01 27);
  flex-shrink: 0;
}
.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: oklch(0.22 0.02 27);
  font-family: Outfit, 'PingFang TC', sans-serif;
}
.modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: oklch(0.97 0.005 27);
  color: oklch(0.45 0.02 27);
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.1s;
}
.modal-close:hover {
  background: oklch(0.93 0.01 27);
}

/* Search */
.modal-search-wrap {
  position: relative;
  padding: 10px 16px;
  flex-shrink: 0;
  border-bottom: 1px solid oklch(0.93 0.01 27);
}
.search-icon {
  position: absolute;
  left: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: oklch(0.60 0.015 27);
  font-size: 1rem;
  pointer-events: none;
}
.modal-search {
  width: 100%;
  padding: 8px 12px 8px 30px;
  border: 1px solid oklch(0.93 0.01 27);
  border-radius: 10px;
  font-size: 0.875rem;
  font-family: inherit;
  background: oklch(0.985 0.005 27);
  color: oklch(0.22 0.02 27);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.modal-search:focus {
  border-color: oklch(0.55 0.22 27);
  box-shadow: 0 0 0 3px oklch(0.55 0.22 27 / 0.1);
}

/* Picker list */
.picker-list {
  list-style: none;
  overflow-y: auto;
  flex: 1;
  padding: 8px;
}
.picker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, border-color 0.1s;
}
.picker-item:hover {
  background: oklch(0.985 0.005 27);
}
.picker-item--placed {
  background: oklch(0.97 0.02 27);
  border-color: oklch(0.55 0.22 27 / 0.3);
}
.picker-sprite {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.picker-sprite-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: oklch(0.93 0.01 27);
  flex-shrink: 0;
}
.picker-name {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: oklch(0.22 0.02 27);
}
.picker-id {
  font-size: 0.75rem;
  color: oklch(0.60 0.015 27);
  font-family: monospace;
}
.picker-check {
  font-size: 0.875rem;
  font-weight: 700;
  color: oklch(0.55 0.22 27);
  flex-shrink: 0;
}
.picker-empty {
  text-align: center;
  padding: 32px 16px;
  color: oklch(0.60 0.015 27);
  font-size: 0.875rem;
}
</style>
