<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  options: string[]
  selected: string[]
  labels?: Record<string, string>
  defaultExpanded?: boolean
}>()

defineEmits<{
  toggle: [value: string]
}>()

const isExpanded = ref(props.defaultExpanded ?? false)

function displayLabel(opt: string): string {
  return props.labels?.[opt] ?? opt
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="filter-header group flex items-center gap-[6px] cursor-pointer select-none flex-wrap" @click="toggleExpanded">
      <span class="filter-label-base">{{ label }}</span>
      <span v-if="!isExpanded && selected.length > 0" class="filter-badge text-xs text-primary font-600">({{ selected.length }})</span>
      <span
        :class="[
          'filter-chevron text-primary inline-flex items-center justify-center w-5 h-5 border-[1.5px] border-primary rounded-full transition-all duration-200 group-hover:bg-primary group-hover:text-white',
          isExpanded ? 'expanded rotate-90' : '',
        ]"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <polyline points="3,1 7,5 3,9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <template v-if="!isExpanded && selected.length > 0">
        <span v-for="s in selected" :key="s" class="filter-chip text-xs py-[1px] px-2 bg-primary-50 text-primary rounded-[10px]">{{ displayLabel(s) }}</span>
      </template>
    </div>
    <div :class="['filter-collapse', { expanded: isExpanded }]">
      <div class="overflow-hidden min-h-0 flex gap-1 flex-wrap">
        <button
          v-for="opt in options"
          :key="opt"
          :class="[
            'filter-btn filter-btn-base hover:border-text-subtle',
            selected.includes(opt) ? 'bg-primary text-surface-raised border-primary' : '',
          ]"
          @click.stop="$emit('toggle', opt)"
        >
          {{ displayLabel(opt) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.filter-collapse.expanded {
  grid-template-rows: 1fr;
}
</style>
