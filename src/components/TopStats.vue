<template>
  <div class="grid grid-cols-2 gap-3 animate-fade-in">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-zinc-900 rounded-2xl px-4 py-4 flex flex-col gap-1"
    >
      <span class="text-xs text-zinc-500 uppercase tracking-wide">{{ stat.label }}</span>
      <span class="text-2xl font-mono font-bold text-zinc-100">{{ stat.value }}</span>
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
    { label: 'กำลังเล่น', value: playing },
    { label: 'เซิร์ฟเวอร์', value: gList.length },
    { label: 'ใน Queue', value: totalQ },
    { label: 'สถานะ', value: playing ? 'LIVE' : 'IDLE' },
  ]
})
</script>