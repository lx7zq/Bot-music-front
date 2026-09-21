<template>
  <div class="sticker-card p-5 animate-fade-in">
    <h2 class="font-display font-bold text-sm text-cream tracking-wide uppercase mb-3">🐻 ห้องหมี</h2>

    <div v-if="!guildList.length" class="flex flex-col items-center gap-2 text-zinc-600 text-sm py-6">
      <img src="/bear-frame3.png" alt="ยังไม่มีเซิร์ฟเวอร์" class="w-12 h-12 opacity-70" style="image-rendering: pixelated" />
      ยังไม่มีเซิร์ฟเวอร์
    </div>

    <ul class="flex flex-col gap-1">
      <li
        v-for="g in guildList"
        :key="g.id"
        @click="emit('select', g.id)"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition border"
        :class="g.id === active ? 'bg-iris-500/15 border-iris-500/40 shadow-sticker-sm' : 'border-transparent hover:bg-zinc-800/80 hover:border-zinc-700'"
      >
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 font-mono"
          :class="g.id === active ? 'bg-iris-500/20 text-iris-400' : 'bg-zinc-800 text-zinc-500'"
        >
          {{ initials(g.guild_name || g.id) }}
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="g.id === active ? 'text-iris-300' : 'text-zinc-300'">
            {{ g.guild_name || `Guild ${g.id}` }}
          </p>
          <p class="text-xs text-zinc-500 truncate">
            {{ g.channel_name || (g.is_playing ? 'กำลังเล่น' : 'ว่าง') }}
          </p>
        </div>

        <span
          class="w-2 h-2 rounded-full shrink-0"
          :class="g.is_playing ? 'bg-emerald-400 animate-pulse-dot' : g.is_paused ? 'bg-yellow-400' : 'bg-zinc-600'"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  guilds: { type: Object, default: () => ({}) },
  active: String,
})
const emit = defineEmits(['select'])

const guildList = computed(() =>
  Object.entries(props.guilds).map(([id, state]) => ({ id, ...state }))
)

function initials(name) {
  return (name || '??').slice(0, 2).toUpperCase()
}
</script>