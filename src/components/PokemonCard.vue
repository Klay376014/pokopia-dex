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
  <div class="pokemon-card group relative flex flex-col items-center p-[10px_8px_8px] rounded-[10px] bg-surface-raised cursor-pointer overflow-hidden shadow-[0_1px_3px_oklch(0_0_0/0.06)]" @click="$emit('select', pokemon)">
    <div class="card-accent absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100" aria-hidden="true"></div>
    <div class="sprite-area w-20 h-20 flex items-center justify-center rounded-full mb-1">
      <img
        :src="getSpriteUrl(pokemon.national_id)"
        :alt="pokemon.name_zh"
        class="w-[72px] h-[72px] image-pixelated"
        loading="lazy"
        @error="onImgError"
      />
    </div>
    <span class="text-[0.7rem] font-500 text-primary tracking-[0.02em]">#{{ pokemon.pokopia_id }}</span>
    <span class="text-[0.85rem] font-600 text-text">{{ pokemon.name_zh }}</span>
  </div>
</template>

<style scoped>
.pokemon-card {
  transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1),
              box-shadow 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}

.pokemon-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 24px oklch(0.55 0.22 27 / 0.12),
              0 2px 8px oklch(0 0 0 / 0.06);
}

.card-accent {
  background: linear-gradient(90deg, oklch(0.55 0.22 27), oklch(0.65 0.18 27));
  transition: opacity 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}

.sprite-area {
  background: oklch(0.94 0.02 27 / 0.8);
}
</style>
