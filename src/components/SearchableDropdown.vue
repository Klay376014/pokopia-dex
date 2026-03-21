<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  label: string
  options: string[]
  modelValue: string | null
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const searchQuery = ref(props.modelValue ?? '')
const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  const q = searchQuery.value.toLowerCase()
  return props.options.filter(opt => opt.toLowerCase().includes(q))
})

function onFocus() {
  if (props.modelValue) {
    searchQuery.value = ''
  }
  isOpen.value = true
}

function onSelect(opt: string) {
  searchQuery.value = opt
  isOpen.value = false
  emit('update:modelValue', opt)
}

function onClear() {
  searchQuery.value = ''
  isOpen.value = false
  emit('update:modelValue', null)
}

function onEscape() {
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
    if (props.modelValue) {
      searchQuery.value = props.modelValue
    }
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

// Sync input display when modelValue prop changes
const displayValue = computed(() => {
  if (isOpen.value) return searchQuery.value
  return props.modelValue ?? ''
})
</script>

<template>
  <div class="searchable-dropdown" ref="rootRef">
    <div class="dropdown-header">
      <span class="dropdown-label">{{ label }}</span>
      <div class="dropdown-input-wrapper">
        <input
          type="text"
          :value="displayValue"
          :placeholder="placeholder ?? `搜尋${label}...`"
          @input="searchQuery = ($event.target as HTMLInputElement).value"
          @focus="onFocus"
          @keydown.escape="onEscape"
          class="dropdown-input"
        />
        <button v-if="modelValue" class="clear-btn" @click="onClear">&times;</button>
      </div>
    </div>
    <div v-if="isOpen" class="dropdown-list">
      <div
        v-for="opt in filteredOptions"
        :key="opt"
        class="dropdown-item"
        @click="onSelect(opt)"
      >
        {{ opt }}
      </div>
      <div v-if="filteredOptions.length === 0" class="dropdown-empty">
        無符合結果
      </div>
    </div>
  </div>
</template>

<style scoped>
.searchable-dropdown {
  position: relative;
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  min-width: 3em;
}

.dropdown-input-wrapper {
  position: relative;
  flex: 1;
}

.dropdown-input {
  width: 100%;
  padding: 4px 28px 4px 12px;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 0.8125rem;
  outline: none;
}

.dropdown-input:focus {
  border-color: #4a90d9;
}

.clear-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: #999;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
}

.clear-btn:hover {
  color: #333;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 3em;
  right: 0;
  margin-top: 4px;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 6px 12px;
  font-size: 0.8125rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f0f4ff;
}

.dropdown-empty {
  padding: 12px;
  font-size: 0.8125rem;
  color: #999;
  text-align: center;
}
</style>
