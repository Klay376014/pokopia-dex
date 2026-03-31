import { ref, computed } from 'vue'

const STORAGE_KEY = 'pokopia-map-placements'

function loadFromStorage(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveToStorage(placements: Record<string, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(placements))
}

const placements = ref<Record<string, string[]>>(loadFromStorage())

export function useMapPlacements() {
  function addPokemon(mapId: string, name: string) {
    const next = { ...placements.value }
    if (!next[mapId]) next[mapId] = []
    if (!next[mapId].includes(name)) {
      next[mapId] = [...next[mapId], name]
      placements.value = next
      saveToStorage(next)
    }
  }

  function removePokemon(mapId: string, name: string) {
    const next = { ...placements.value }
    if (!next[mapId]) return
    next[mapId] = next[mapId].filter(n => n !== name)
    placements.value = next
    saveToStorage(next)
  }

  function getPokemonNames(mapId: string): string[] {
    return placements.value[mapId] ?? []
  }

  function isPlaced(mapId: string, name: string): boolean {
    return (placements.value[mapId] ?? []).includes(name)
  }

  const allPlacements = computed(() => placements.value)

  return { addPokemon, removePokemon, getPokemonNames, isPlaced, allPlacements }
}
