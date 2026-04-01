<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon } from '../types'

const props = defineProps<{
  allPokemon: Pokemon[]
  mapId: string
  isPlaced: (name: string) => boolean
  getElsewhereInfo: (name: string) => { mapId: string; mapName: string } | null
}>()

const emit = defineEmits<{
  toggle: [name: string]
  move: [fromMapId: string, name: string]
  close: []
}>()

const searchQuery = ref('')
const confirmingMove = ref<string | null>(null)

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

function onItemClick(name: string) {
  const elsewhere = props.getElsewhereInfo(name)
  if (elsewhere) {
    confirmingMove.value = confirmingMove.value === name ? null : name
  } else {
    confirmingMove.value = null
    emit('toggle', name)
  }
}

function onConfirmMove(fromMapId: string, name: string) {
  confirmingMove.value = null
  emit('move', fromMapId, name)
}

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
            :class="{
              'picker-item--placed': isPlaced(p.name_zh),
              'picker-item--elsewhere': !!getElsewhereInfo(p.name_zh),
              'picker-item--confirming': confirmingMove === p.name_zh,
            }"
            @click="onItemClick(p.name_zh)"
          >
            <img
              :src="getSpriteUrl(p)"
              :alt="p.name_zh"
              class="picker-sprite image-pixelated"
            />
            <span class="picker-name">{{ p.name_zh }}</span>
            <span class="picker-id">{{ p.pokopia_id }}</span>
            <span v-if="isPlaced(p.name_zh)" class="picker-check" aria-label="已配置">✓</span>
            <span v-else-if="getElsewhereInfo(p.name_zh)" class="picker-elsewhere-tag">
              📍 {{ getElsewhereInfo(p.name_zh)!.mapName }}
            </span>
          </button>

          <!-- Inline move confirmation -->
          <div v-if="confirmingMove === p.name_zh" class="move-confirm">
            <span class="move-confirm-text">移到此地圖？</span>
            <button
              class="move-confirm-btn move-confirm-btn--yes"
              @click.stop="onConfirmMove(getElsewhereInfo(p.name_zh)!.mapId, p.name_zh)"
            >移過來</button>
            <button
              class="move-confirm-btn move-confirm-btn--cancel"
              @click.stop="confirmingMove = null"
            >取消</button>
          </div>
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
.picker-item--elsewhere {
  opacity: 0.7;
}
.picker-item--confirming {
  background: oklch(0.97 0.02 27);
  border-color: oklch(0.55 0.22 27 / 0.4);
  border-radius: 10px 10px 0 0;
  opacity: 1;
}
.picker-sprite {
  width: 40px;
  height: 40px;
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
.picker-elsewhere-tag {
  font-size: 0.6875rem;
  color: oklch(0.52 0.08 60);
  background: oklch(0.80 0.04 60 / 0.4);
  border: 1px solid oklch(0.80 0.04 60);
  border-radius: 6px;
  padding: 2px 6px;
  white-space: nowrap;
  flex-shrink: 0;
}
.picker-empty {
  text-align: center;
  padding: 32px 16px;
  color: oklch(0.60 0.015 27);
  font-size: 0.875rem;
}

/* Move confirmation row */
.move-confirm {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 8px 60px;
  background: oklch(0.97 0.02 27);
  border: 1.5px solid oklch(0.55 0.22 27 / 0.4);
  border-top: none;
  border-radius: 0 0 10px 10px;
  margin-bottom: 2px;
}
.move-confirm-text {
  flex: 1;
  font-size: 0.8125rem;
  color: oklch(0.45 0.02 27);
}
.move-confirm-btn {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid;
  transition: background 0.1s, color 0.1s;
}
.move-confirm-btn--yes {
  background: oklch(0.55 0.22 27);
  border-color: oklch(0.55 0.22 27);
  color: white;
}
.move-confirm-btn--yes:hover {
  background: oklch(0.42 0.22 27);
  border-color: oklch(0.42 0.22 27);
}
.move-confirm-btn--cancel {
  background: white;
  border-color: oklch(0.93 0.01 27);
  color: oklch(0.45 0.02 27);
}
.move-confirm-btn--cancel:hover {
  background: oklch(0.97 0.005 27);
}
</style>
