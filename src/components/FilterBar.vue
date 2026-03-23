<script setup lang="ts">
const props = defineProps<{
  label: string
  options: string[]
  selected: string[]
  labels?: Record<string, string>
  icons?: Record<string, string>
}>()

function displayLabel(opt: string): string {
  return props.labels?.[opt] ?? opt
}

defineEmits<{
  toggle: [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap">
    <span class="filter-label-base">{{ label }}</span>
    <div class="flex gap-1 flex-wrap">
      <button
        v-for="opt in options"
        :key="opt"
        :class="[
          'filter-btn-base hover:border-text-subtle',
          selected.includes(opt) ? 'bg-primary text-surface-raised border-primary' : '',
          icons?.[opt] ? 'py-[5px] px-[9px]' : '',
        ]"
        @click="$emit('toggle', opt)"
        :title="displayLabel(opt)"
      >
        <img v-if="icons?.[opt]" :src="icons[opt]" :alt="displayLabel(opt)" class="filter-icon w-5 h-5 object-contain block" />
        <span v-else>{{ displayLabel(opt) }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-icon {
  filter: brightness(0);
  transition: filter 0.15s;
}

.bg-primary .filter-icon {
  filter: brightness(0) invert(1);
}
</style>
