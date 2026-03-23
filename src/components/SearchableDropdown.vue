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
  <div class="relative" ref="rootRef">
    <div class="flex items-center gap-2">
      <span class="filter-label-base">{{ label }}</span>
      <div class="relative flex-1 max-w-[200px]">
        <input
          type="text"
          :value="displayValue"
          :placeholder="placeholder ?? `搜尋${label}...`"
          @input="searchQuery = ($event.target as HTMLInputElement).value"
          @focus="onFocus"
          @keydown.escape="onEscape"
          class="w-full py-1 pr-7 pl-3 border-1 border-solid border-surface-muted rounded-2xl text-[0.8125rem] outline-none focus:border-primary"
        />
        <button v-if="modelValue" class="clear-btn absolute right-[6px] top-1/2 -translate-y-1/2 bg-transparent border-none text-base text-text-subtle cursor-pointer px-1 leading-none hover:text-text" @click="onClear">&times;</button>
      </div>
    </div>
    <div v-if="isOpen" class="dropdown-list absolute top-full left-[3em] right-0 mt-1 max-h-[240px] overflow-y-auto bg-surface-raised border-1 border-solid border-surface-muted rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-10">
      <div
        v-for="opt in filteredOptions"
        :key="opt"
        class="dropdown-item py-[6px] px-3 text-[0.8125rem] cursor-pointer hover:bg-primary-50"
        @click="onSelect(opt)"
      >
        {{ opt }}
      </div>
      <div v-if="filteredOptions.length === 0" class="dropdown-empty p-3 text-[0.8125rem] text-text-subtle text-center">
        無符合結果
      </div>
    </div>
  </div>
</template>
