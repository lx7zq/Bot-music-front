<template>
  <div class="grid grid-cols-2 gap-3 animate-fade-in">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="sticker-card px-4 py-3.5 flex items-center gap-3"
    >
      <span class="text-xl shrink-0">{{ stat.emoji }}</span>
      <div class="flex flex-col gap-0.5 min-w-0">
        <span class="text-xs text-zinc-500 uppercase tracking-wide">{{ stat.label }}</span>
        <span class="text-xl font-display font-bold text-cream leading-none">{{ stat.value }}</span>
      </div>
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
    { label: 'กำลังเล่น', value: playing, emoji: '🎶' },
    { label: 'เซิร์ฟเวอร์', value: gList.length, emoji: '🐻' },
    { label: 'ใน Queue', value: totalQ, emoji: '🎫' },
    { label: 'สถานะ', value: playing ? 'LIVE' : 'IDLE', emoji: playing ? '🟢' : '💤' },
  ]
})
</script>