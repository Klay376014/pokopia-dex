import { ref, computed } from 'vue'

const STORAGE_KEY = 'pokopia-bookmarks'

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveToStorage(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
}

const bookmarkSet = ref<Set<string>>(loadFromStorage())

export function useBookmarks() {
  function toggle(id: string) {
    const next = new Set(bookmarkSet.value)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    bookmarkSet.value = next
    saveToStorage(next)
  }

  function isBookmarked(id: string): boolean {
    return bookmarkSet.value.has(id)
  }

  const bookmarkedIds = computed(() => bookmarkSet.value)
  const count = computed(() => bookmarkSet.value.size)

  return { toggle, isBookmarked, bookmarkedIds, count }
}
