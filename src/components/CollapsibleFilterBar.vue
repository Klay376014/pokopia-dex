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
  <div class="collapsible-filter-group">
    <div class="filter-header" @click="toggleExpanded">
      <span class="filter-label">{{ label }}</span>
      <span v-if="!isExpanded && selected.length > 0" class="filter-badge">({{ selected.length }})</span>
      <span class="filter-chevron">{{ isExpanded ? '▾' : '▸' }}</span>
      <template v-if="!isExpanded && selected.length > 0">
        <span v-for="s in selected" :key="s" class="filter-chip">{{ displayLabel(s) }}</span>
      </template>
    </div>
    <div class="filter-collapse" :class="{ expanded: isExpanded }">
      <div class="filter-options">
        <button
          v-for="opt in options"
          :key="opt"
          :class="['filter-btn', { active: selected.includes(opt) }]"
          @click.stop="$emit('toggle', opt)"
        >
          {{ displayLabel(opt) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapsible-filter-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  min-width: 3em;
}

.filter-badge {
  font-size: 0.75rem;
  color: #4a90d9;
  font-weight: 600;
}

.filter-chevron {
  font-size: 0.75rem;
  color: #999;
}

.filter-chip {
  font-size: 0.75rem;
  padding: 1px 8px;
  background: #e8f0fe;
  color: #4a90d9;
  border-radius: 10px;
}

.filter-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.filter-collapse.expanded {
  grid-template-rows: 1fr;
}

.filter-options {
  overflow: hidden;
  min-height: 0;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 16px;
  background: white;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-btn:hover {
  border-color: #aaa;
}

.filter-btn.active {
  background: #4a90d9;
  color: white;
  border-color: #4a90d9;
}
</style>
