<template>
  <div class="grid grid-cols-2 gap-3 animate-fade-in">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="glass-panel px-4 py-3.5 flex flex-col gap-1"
    >
      <span class="text-[11px] text-zinc-500 uppercase tracking-[0.18em]">{{ stat.label }}</span>
      <span class="text-xl font-mono font-bold text-zinc-50">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  guilds: { type: Object, default: () => ({}) },
})

const stats = computed(() => {
  const gList = Object.values(props.guilds)
  const playing = gList.filter(g => g.is_playing).length
  const totalQ = gList.reduce((a, g) => a + (g.queue?.length || 0), 0)
  return [
    { label: 'Playing', value: playing },
    { label: 'Servers', value: gList.length },
    { label: 'Queued', value: totalQ },
    { label: 'Status', value: playing ? 'LIVE' : 'IDLE' },
  ]
})
</script>
