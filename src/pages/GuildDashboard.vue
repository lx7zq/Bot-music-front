<template>
  <div class="min-h-screen bg-zinc-950 font-sans text-zinc-100">

    <div class="fixed inset-0 pointer-events-none opacity-[0.03]
      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]">
    </div>
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-iris-500/5 rounded-full blur-3xl pointer-events-none"></div>

    <header class="sticky top-0 z-10 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          
          <div 
            class="bear-avatar"
            :class="{ 'bot-dancing': state?.is_playing }"
          ></div>

          <span class="text-lg font-mono font-bold text-iris-400">ไอแว่น</span>
          <span class="text-zinc-600 text-sm">/</span>
          <span class="text-zinc-400 text-sm font-medium">{{ state?.guild_name ?? guildId }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
            :class="connected
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-zinc-700 bg-zinc-800 text-zinc-500'"
          >
            <span class="w-1.5 h-1.5 rounded-full"
              :class="connected ? 'bg-emerald-400 animate-pulse-dot' : 'bg-zinc-500'">
            </span>
            {{ connected ? 'connected' : 'reconnecting...' }}
          </span>
          <span
            v-if="state"
            class="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
            :class="state.is_playing
              ? 'border-iris-500/30 bg-iris-500/10 text-iris-400'
              : 'border-zinc-700 bg-zinc-800 text-zinc-500'"
          >
            <span class="w-1.5 h-1.5 rounded-full"
              :class="state.is_playing ? 'bg-iris-400 animate-pulse-dot' : 'bg-zinc-500'">
            </span>
            {{ state.is_playing ? 'playing' : state.is_paused ? 'paused' : 'idle' }}
          </span>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">

      <div v-if="!state" class="flex flex-col items-center justify-center py-32 gap-4 text-zinc-600">
        <svg class="w-16 h-16 opacity-20" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
          <path d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </svg>
        <p class="text-sm">{{ connected ? 'รอข้อมูลจาก bot...' : 'กำลังเชื่อมต่อ...' }}</p>
        <p class="text-xs text-zinc-700">server: {{ guildId }}</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

        <div class="flex flex-col gap-4">
          <NowPlaying
            :song="state.now_playing"
            :is-playing="state.is_playing"
            :is-paused="state.is_paused"
            :volume="state.volume ?? 50"
            @action="sendAction"
            @volume="v => sendAction('volume', { value: v })"
          />

          <div v-if="state.channel_name" class="bg-zinc-900 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-iris-500/15 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-iris-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M11 5 6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-zinc-500 uppercase tracking-wide">Voice Channel</p>
              <p class="text-sm text-zinc-200 truncate font-medium">{{ state.channel_name }}</p>
            </div>
          </div>
        </div>

        <QueueList
          :queue="state.queue ?? []"
          @remove="removeSong"
          @add="addSong"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGuildSocket } from '../composables/useGuildSocket'
import NowPlaying from '../components/NowPlaying.vue'
import QueueList from '../components/QueueList.vue'

const route = useRoute()
const guildId = computed(() => route.params.guildId)

const { connected, state, sendAction, addSong, removeSong } = useGuildSocket(guildId)
</script>

<style scoped>
/* ท่าปกติเมื่อไม่ได้เล่นเพลง (ดึงเฟรม 1 ขึ้นมาแสดงรอไว้) */
.bear-avatar {
  width: 32px;
  height: 32px;
  background-image: url('/bear-frame1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated; /* ป้องกันไม่ให้ภาพ Pixel Art เบลอ */
  transition: transform 0.2s ease;
}

/* คีย์เฟรมคำสั่งสลับรูปภาพทั้ง 4 รูปต่อเนื่องกัน */
@keyframes bearDance {
  0%, 100% { background-image: url('/bear-frame1.png'); }
  25%      { background-image: url('/bear-frame2.png'); }
  50%      { background-image: url('/bear-frame3.png'); }
  75%      { background-image: url('/bear-frame4.png'); }
}

/* คลาสแอนิเมชันเมื่อบอทกำลังเล่นเพลง (state.is_playing === true) */
.bot-dancing {
  /* รันแอนิเมชันสลับภาพแบบทันที (steps 1) วนซ้ำเรื่อยๆ */
  animation: bearDance 0.6s steps(1) infinite;
}
</style>