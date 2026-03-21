<script setup lang="ts">
const props = defineProps<{
  label: string
  options: string[]
  selected: string[]
  labels?: Record<string, string>
}>()

function displayLabel(opt: string): string {
  return props.labels?.[opt] ?? opt
}

defineEmits<{
  toggle: [value: string]
}>()
</script>

<template>
  <div class="filter-group">
    <span class="filter-label">{{ label }}</span>
    <div class="filter-options">
      <button
        v-for="opt in options"
        :key="opt"
        :class="['filter-btn', { active: selected.includes(opt) }]"
        @click="$emit('toggle', opt)"
      >
        {{ displayLabel(opt) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  min-width: 3em;
}

.filter-options {
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
