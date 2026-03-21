<script setup lang="ts">
import type { Pokemon } from '../types'

defineProps<{
  pokemon: Pokemon
}>()

defineEmits<{
  select: [pokemon: Pokemon]
}>()

function getSpriteUrl(nationalId: string): string {
  const id = parseInt(nationalId, 10)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect fill="%23e0e0e0" width="96" height="96" rx="8"/><text x="48" y="52" text-anchor="middle" fill="%23999" font-size="14">?</text></svg>'
}
</script>

<template>
  <div class="pokemon-card" @click="$emit('select', pokemon)">
    <img
      :src="getSpriteUrl(pokemon.national_id)"
      :alt="pokemon.name_zh"
      class="pokemon-sprite"
      loading="lazy"
      @error="onImgError"
    />
    <div class="pokemon-info">
      <span class="pokemon-id">#{{ pokemon.pokopia_id }}</span>
      <span class="pokemon-name">{{ pokemon.name_zh }}</span>
    </div>
  </div>
</template>

<style scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  background: #f8f8f8;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.pokemon-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pokemon-sprite {
  width: 96px;
  height: 96px;
  image-rendering: pixelated;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.pokemon-id {
  font-size: 0.75rem;
  color: #888;
}

.pokemon-name {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
