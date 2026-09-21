<template>
  <div class="glass-panel p-5 animate-fade-in">
    <h2 class="font-semibold text-[13px] text-zinc-300 tracking-[0.18em] uppercase mb-3">Servers</h2>

    <div v-if="!guildList.length" class="text-zinc-600 text-sm py-4 text-center">ยังไม่มีเซิร์ฟเวอร์</div>

    <ul class="flex flex-col gap-1">
      <li
        v-for="g in guildList"
        :key="g.id"
        @click="emit('select', g.id)"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition border"
        :class="g.id === active ? 'bg-white/10 border-white/20' : 'border-transparent hover:bg-white/5 hover:border-white/10'"
      >
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 font-mono border"
          :class="g.id === active ? 'bg-iris-500/25 border-iris-400/30 text-iris-100' : 'bg-white/5 border-white/10 text-zinc-500'"
        >
          {{ initials(g.guild_name || g.id) }}
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="g.id === active ? 'text-zinc-50' : 'text-zinc-300'">
            {{ g.guild_name || `Guild ${g.id}` }}
          </p>
          <p class="text-xs text-zinc-500 truncate">
            {{ g.channel_name || (g.is_playing ? 'กำลังเล่น' : 'ว่าง') }}
          </p>
        </div>

        <span
          class="w-2 h-2 rounded-full shrink-0"
          :class="g.is_playing ? 'bg-emerald-400 animate-pulse-dot' : g.is_paused ? 'bg-amber-300' : 'bg-zinc-600'"
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
