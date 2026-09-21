<template>
  <div class="glass-panel p-5 flex flex-col gap-4 animate-fade-in">

    <!-- artwork -->
    <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10">
      <img
        v-if="song?.thumbnail"
        :src="song.thumbnail"
        :alt="song.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="flex flex-col items-center gap-3 text-zinc-600">
        <svg class="w-14 h-14 opacity-30" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
          <path d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
        </svg>
        <p class="text-xs">ยังไม่มีเพลง</p>
      </div>

      <!-- equalizer overlay -->
      <div v-if="isPlaying" class="absolute bottom-3 right-3 flex items-end gap-[3px] rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur">
        <div class="w-1 bg-iris-200 rounded-full origin-bottom animate-bar1" style="height:12px"></div>
        <div class="w-1 bg-iris-200 rounded-full origin-bottom animate-bar2" style="height:18px"></div>
        <div class="w-1 bg-iris-200 rounded-full origin-bottom animate-bar3" style="height:9px"></div>
      </div>

      <!-- paused badge -->
      <div v-if="isPaused" class="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
        <span class="text-xs font-mono text-white/90 tracking-widest uppercase">paused</span>
      </div>
    </div>

    <!-- info -->
    <div class="min-w-0">
      <p v-if="song" class="font-semibold text-[15px] leading-snug truncate text-zinc-50">{{ song.title }}</p>
      <p v-else class="text-sm text-zinc-500">ยังไม่มีเพลงเล่นอยู่</p>
      <p class="text-xs text-zinc-500 mt-0.5">
        <span v-if="song?.requester">ขอโดย <span class="text-zinc-300">{{ song.requester }}</span></span>
      </p>
    </div>

    <!-- progress -->
    <div v-if="song">
      <div class="progress-track h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-iris-500 via-violet-400 to-cyan-300 transition-all duration-1000"
          :style="{ width: progressPct + '%' }"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-zinc-500 mt-1.5 font-mono">
        <span>{{ fmtDur(elapsed) }}</span>
        <span>{{ fmtDur(song.duration) }}</span>
      </div>
    </div>

    <!-- controls -->
    <div class="flex items-center justify-center gap-2">
      <button @click="emit('action','restart')" class="ctrl-btn" title="เริ่มใหม่">
        <SkipBack class="w-5 h-5" />
      </button>
      <button @click="emit('action','prev')" class="ctrl-btn" title="ก่อนหน้า">
        <ChevronFirst class="w-5 h-5" />
      </button>
      <button
        @click="emit('action', isPlaying ? 'pause' : 'resume')"
        class="ctrl-btn-primary"
        :title="isPlaying ? 'หยุดชั่วคราว' : 'เล่น'"
      >
        <Pause v-if="isPlaying" class="w-6 h-6" />
        <Play v-else class="w-6 h-6" />
      </button>
      <button @click="emit('action','skip')" class="ctrl-btn" title="ข้ามเพลง">
        <ChevronLast class="w-5 h-5" />
      </button>
      <button @click="emit('action','stop')" class="ctrl-btn text-red-300/80 hover:bg-red-500/10 hover:text-red-300" title="หยุดและล้าง Queue">
        <Square class="w-5 h-5" />
      </button>
    </div>

    <!-- volume -->
    <div class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
      <Volume2 class="w-4 h-4 text-zinc-400 shrink-0" />
      <input
        type="range" min="0" max="100" :value="volume"
        @input="emit('volume', +$event.target.value)"
        class="flex-1 accent-violet-400 cursor-pointer"
      />
      <span class="text-xs font-mono text-zinc-400 w-10 text-right">{{ volume }}%</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import {
  SkipBack,
  ChevronFirst,
  ChevronLast,
  Play,
  Pause,
  Square,
  Volume2,
} from 'lucide-vue-next'

const props = defineProps({
  song: Object,
  isPlaying: Boolean,
  isPaused: Boolean,
  volume: { type: Number, default: 50 },
})
const emit = defineEmits(['action', 'volume'])

const elapsed = ref(0)
let timer = null

watch(() => props.isPlaying, (playing) => {
  clearInterval(timer)
  if (playing) {
    timer = setInterval(() => {
      if (elapsed.value < (props.song?.duration || 0)) elapsed.value++
    }, 1000)
  }
})

watch(() => props.song, () => { elapsed.value = 0 })
onUnmounted(() => clearInterval(timer))

const progressPct = computed(() => {
  if (!props.song?.duration) return 0
  return Math.min(100, (elapsed.value / props.song.duration) * 100)
})

function fmtDur(s) {
  if (!s) return '0:00'
  const m = Math.floor(s / 60), sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}
</script>

<style scoped>
.ctrl-btn {
  @apply w-10 h-10 rounded-full flex items-center justify-center text-zinc-400
         hover:bg-white/10 hover:text-white transition-all active:scale-90;
}
.ctrl-btn-primary {
  @apply w-12 h-12 rounded-full flex items-center justify-center text-white transition-all active:scale-90;
  background: linear-gradient(135deg, #534AB7, #7F77DD);
  box-shadow: 0 4px 24px rgba(83, 74, 183, 0.5);
}
</style>
