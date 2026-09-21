<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="glass-panel flex items-center gap-3 pl-3 pr-4 py-3 max-w-xs animate-pop-in"
      >
        <div class="w-9 h-9 rounded-xl bg-iris-500/20 border border-iris-400/30 flex items-center justify-center shrink-0">
          <Music class="w-4 h-4 text-iris-200" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-zinc-100 truncate">{{ t.title }}</p>
          <p v-if="t.subtitle" class="text-xs text-zinc-500 truncate">{{ t.subtitle }}</p>
        </div>
        <button @click="dismiss(t.id)" class="text-zinc-500 hover:text-zinc-200 transition shrink-0" title="ปิด">
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { Music, X } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'

const { toasts, dismiss } = useToast()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
