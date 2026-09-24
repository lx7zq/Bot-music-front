<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100">
    <!-- ambient background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-32 left-1/4 w-[480px] h-[480px] bg-iris-500/15 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 -left-24 w-[380px] h-[380px] bg-fuchsia-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.035]
        bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]">
      </div>
    </div>

    <header class="sticky top-0 z-10 border-b border-white/10 bg-[#0a0a12]/70 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="bear-avatar"
            :class="{ 'bot-dancing': state?.is_playing }"
            title="หมีไอแว่น"
          ></div>
          <span class="text-base font-semibold tracking-tight text-zinc-100">ไอแว่น</span>
          <span class="text-zinc-600 text-sm">/</span>
          <span class="text-zinc-400 text-sm font-medium">{{ state?.guild_name ?? guildId }}</span>
        </div>
        <div class="flex items-center gap-2">
          <RouterLink to="/pricing" class="hidden md:inline text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-zinc-100 transition">แพ็กเกจ</RouterLink>
          <span
            class="glass-pill"
            :class="connected ? 'text-emerald-300' : 'text-zinc-500'"
          >
            <span class="w-1.5 h-1.5 rounded-full"
              :class="connected ? 'bg-emerald-400 animate-pulse-dot' : 'bg-zinc-500'">
            </span>
            {{ connected ? 'connected' : 'reconnecting...' }}
          </span>
          <span v-if="state" class="glass-pill" :class="state.is_playing ? 'text-iris-200' : 'text-zinc-500'">
            <span class="w-1.5 h-1.5 rounded-full"
              :class="state.is_playing ? 'bg-iris-400 animate-pulse-dot' : 'bg-zinc-500'">
            </span>
            {{ state.is_playing ? 'playing' : state.is_paused ? 'paused' : 'idle' }}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="relative max-w-7xl mx-auto px-6 py-8">

      <div v-if="!state" class="flex flex-col items-center justify-center py-32 gap-4 text-zinc-500">
        <svg class="w-8 h-8 animate-spin opacity-60" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" />
        </svg>
        <p class="text-sm">{{ connected ? 'รอข้อมูลจาก bot...' : 'กำลังเชื่อมต่อ...' }}</p>
        <p class="text-xs text-zinc-700 font-mono">server: {{ guildId }}</p>
      </div>

      <div v-else class="flex flex-col gap-5">
        <!-- expired banner -->
        <div v-if="!subOk" class="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 flex items-center gap-3 text-sm text-amber-200/90 animate-fade-in">
          <AlertTriangle class="shrink-0 w-5 h-5" />
          <p>แพ็กเกจดิสนี้หมดอายุแล้ว{{ paidUntil ? ` (${paidUntil})` : '' }} — กดเล่นเพลงใหม่ไม่ได้
            <RouterLink to="/pricing" class="underline font-semibold">ต่ออายุ 49฿/เดือน</RouterLink>
          </p>
        </div>
        <!-- view-only notice: ลิงก์ไม่มี key = เห็นครบแต่ปุ่มแดงกดไม่ติด -->
        <div v-if="!canControl" class="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 flex items-center gap-3 text-sm text-zinc-400 animate-fade-in">
          <Eye class="shrink-0 w-5 h-5 text-zinc-500" />
          <p>โหมดดูอย่างเดียว — ปุ่มหยุดล้าง เสียง และลบเพลงเป็นของ DJ กดปุ่ม <b class="text-zinc-200">เปิด Dashboard</b> หรือพิมพ์ <b class="text-zinc-200">/dashboard</b> ในดิสเพื่อขอลิงก์ DJ ขอเพลงด้านล่างได้ตามปกติ</p>
        </div>
        <!-- slim now-playing hero -->
        <section class="glass-panel relative overflow-hidden p-5 animate-fade-in">
          <div v-if="state.now_playing?.thumbnail"
            class="absolute inset-0 bg-cover bg-center opacity-15 blur-2xl scale-110 pointer-events-none"
            :style="{ backgroundImage: `url(${state.now_playing.thumbnail})` }"></div>
          <div class="relative flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
              <img v-if="state.now_playing?.thumbnail" :src="state.now_playing.thumbnail" :alt="state.now_playing.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
                <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{{ statusLine }}</p>
              <p class="truncate text-lg font-semibold tracking-tight text-zinc-50">{{ state.now_playing?.title ?? 'ยังไม่มีเพลงเล่นอยู่' }}</p>
              <p class="mt-0.5 text-xs text-zinc-500 truncate">
                <span v-if="state.now_playing?.requester">ขอโดย <span class="text-zinc-300">{{ state.now_playing.requester }}</span></span>
                <span v-if="state.channel_name"> • {{ state.channel_name }}</span>
                <span v-else-if="!state.now_playing">พิมพ์ชื่อเพลงด้านล่างเพื่อเริ่ม</span>
              </p>
            </div>
            <div class="hidden sm:flex shrink-0 flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur">
              <span class="text-xl font-mono font-bold text-zinc-100">{{ (state.queue ?? []).length }}</span>
              <span class="text-[11px] text-zinc-500">ในคิว</span>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
          <div class="flex flex-col gap-5">
            <NowPlaying
              :song="state.now_playing"
              :is-playing="state.is_playing"
              :is-paused="state.is_paused"
              :volume="state.volume ?? 50"
              :can-control="canControl"
              @action="sendAction"
              @volume="v => sendAction('volume', { value: v })"
            />

            <div v-if="state.channel_name" class="glass-panel px-4 py-3 flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-iris-500/15 border border-iris-500/20 flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-iris-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M11 5 6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-[11px] text-zinc-500 uppercase tracking-widest">Voice Channel</p>
                <p class="text-sm text-zinc-200 truncate font-medium">{{ state.channel_name }}</p>
              </div>
            </div>
          </div>

          <QueueList
            :queue="state.queue ?? []"
            :can-control="canControl"
            @remove="removeSong"
            @add="handleAdd"
          />
        </div>
      </div>
    </main>
    <footer class="relative border-t border-white/10 py-4 mt-4">
      <div class="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px] text-zinc-600">
        <span>ไอแว่น DJ</span>
        <RouterLink to="/pricing" class="hover:text-zinc-300">แพ็กเกจ</RouterLink>
        <RouterLink to="/billing" class="hover:text-zinc-300">ส่งสลิป</RouterLink>
        <RouterLink to="/terms" class="hover:text-zinc-300">ข้อกำหนด</RouterLink>
        <RouterLink to="/privacy" class="hover:text-zinc-300">ความเป็นส่วนตัว</RouterLink>
      </div>
    </footer>
    <Toast />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AlertTriangle, Eye } from 'lucide-vue-next'
import { useGuildSocket } from '../composables/useGuildSocket'
import NowPlaying from '../components/NowPlaying.vue'
import QueueList from '../components/QueueList.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import Toast from '../components/Toast.vue'
import { useToast } from '../composables/useToast'

const route = useRoute()
const guildId = computed(() => route.params.guildId)

const { connected, state, sendAction, addSong, removeSong, canControl, subOk, paidUntil } = useGuildSocket(guildId)
const { push: pushToast } = useToast()

const handleAdd = (query) => {
  pushToast('เพิ่มเพลงแล้ว', query)
  addSong(query)
}

const statusLine = computed(() => {
  if (!state.value) return 'connecting'
  if (state.value.is_playing) return 'now playing'
  if (state.value.is_paused) return 'paused'
  return 'idle'
})
</script>

<style scoped>
.glass-pill {
  @apply flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur;
}

/* หมี header: นิ่งเฟรม 1, เต้นตอนเพลงเล่น */
.bear-avatar {
  width: 30px;
  height: 30px;
  background-image: url('/bear-frame1.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
}
@keyframes bearDance {
  0%, 100% { background-image: url('/bear-frame1.png'); }
  25%      { background-image: url('/bear-frame2.png'); }
  50%      { background-image: url('/bear-frame3.png'); }
  75%      { background-image: url('/bear-frame4.png'); }
}
.bot-dancing {
  animation: bearDance 1.2s steps(1) infinite;
}
</style>
