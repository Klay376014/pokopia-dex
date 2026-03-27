<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  message: string | null
}>()

const visible = ref(false)
const displayMessage = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

watch(() => props.message, (msg) => {
  if (!msg) return
  displayMessage.value = msg
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => { visible.value = false }, 2000)
})
</script>

<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-200 pointer-events-none flex items-center gap-[6px] px-4 py-[10px] rounded-xl bg-[oklch(0.99_0.005_27)] border-1 border-solid border-surface-muted shadow-[0_4px_12px_oklch(0_0_0/0.08),0_1px_3px_oklch(0_0_0/0.06)]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.55 0.22 27)" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      <span class="text-[0.8125rem] font-500 text-text whitespace-nowrap">{{ displayMessage }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(16px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-4px) scale(0.98);
}
</style>
