<template>
  <div class="sticker-card p-5 flex flex-col gap-4 animate-fade-in">

    <!-- thumbnail / visualizer -->
    <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700/60">
      <img
        v-if="song?.thumbnail"
        :src="song.thumbnail"
        :alt="song.title"
        class="w-full h-full object-cover"
      />
      <div v-else class="flex flex-col items-center gap-2 text-zinc-600">
        <img src="/bear-frame1.png" alt="หมีรอเพลง" class="w-20 h-20 opacity-80" style="image-rendering: pixelated" />
        <p class="text-xs">หมีหิวเพลง 🍯</p>
      </div>

      <!-- equalizer overlay เมื่อเล่นอยู่ -->
      <div v-if="isPlaying" class="absolute bottom-3 right-3 flex items-end gap-[3px]">
        <div class="w-1 bg-iris-400 rounded-full origin-bottom animate-bar1" style="height:14px"></div>
        <div class="w-1 bg-iris-400 rounded-full origin-bottom animate-bar2" style="height:20px"></div>
        <div class="w-1 bg-iris-400 rounded-full origin-bottom animate-bar3" style="height:10px"></div>
      </div>

      <!-- paused badge -->
      <div v-if="isPaused" class="absolute inset-0 bg-black/50 flex items-center justify-center">
        <span class="text-xs font-mono text-zinc-300 tracking-widest uppercase">paused</span>
      </div>
    </div>

    <!-- info -->
    <div class="min-w-0">
      <p v-if="song" class="font-display font-bold text-base leading-snug truncate text-cream">{{ song.title }}</p>
      <p v-else class="font-display text-sm text-zinc-500">ยังไม่มีเพลงเล่นอยู่</p>
      <p class="text-xs text-zinc-500 mt-1">
        <span v-if="song?.requester">🍯 ขอโดย <span class="text-honey-400 font-medium">{{ song.requester }}</span></span>
      </p>
    </div>

    <!-- progress bar : honey honey -->
    <div v-if="song">
      <div class="relative h-2.5 bg-zinc-800 rounded-full overflow-visible border border-zinc-700/60">
        <div
          class="h-full bg-gradient-to-r from-honey-500 to-honey-300 rounded-full transition-all duration-1000"
          :style="{ width: progressPct + '%' }"
        ></div>
        <div
          class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cream border-2 border-honey-500 flex items-center justify-center text-[10px] shadow transition-all duration-1000"
          :style="{ left: progressPct + '%' }"
        >🐾</div>
      </div>
      <div class="flex justify-between text-xs text-zinc-500 mt-1.5 font-mono">
        <span>{{ fmtDur(elapsed) }}</span>
        <span>{{ fmtDur(song.duration) }}</span>
      </div>
    </div>

    <!-- controls -->
    <div class="flex items-center justify-center gap-2.5">
      <button @click="emit('action','restart')" class="ctrl-btn hover:animate-wiggle" title="เริ่มใหม่">
        <SkipBack class="w-5 h-5" />
      </button>
      <button @click="emit('action','prev')" class="ctrl-btn" title="ก่อนหน้า">
        <ChevronFirst class="w-5 h-5" />
      </button>
      <button
        @click="emit('action', isPlaying ? 'pause' : 'resume')"
        class="ctrl-btn-primary hover:scale-105"
        :title="isPlaying ? 'หยุดชั่วคราว' : 'เล่น'"
      >
        <Pause v-if="isPlaying" class="w-6 h-6" />
        <Play v-else class="w-6 h-6" />
      </button>
      <button @click="emit('action','skip')" class="ctrl-btn" title="ข้ามเพลง">
        <ChevronLast class="w-5 h-5" />
      </button>
      <button @click="emit('action','stop')" class="ctrl-btn text-red-400 hover:bg-red-500/10" title="หยุดและล้าง Queue">
        <Square class="w-5 h-5" />
      </button>
    </div>

    <!-- volume -->
    <div class="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2">
      <Volume2 class="w-4 h-4 text-honey-400 shrink-0" />
      <input
        type="range" min="0" max="100" :value="volume"
        @input="emit('volume', +$event.target.value)"
        class="flex-1 accent-amber-400 cursor-pointer"
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
  @apply w-10 h-10 rounded-full flex items-center justify-center text-zinc-300
         hover:bg-zinc-800 hover:text-white transition-all active:scale-90 border border-transparent hover:border-zinc-700;
}
.ctrl-btn-primary {
  @apply w-14 h-14 rounded-full flex items-center justify-center
         bg-iris-500 text-white hover:bg-iris-600 transition-all active:scale-90;
  box-shadow: 3px 3px 0 0 rgba(83, 74, 183, 0.5);
}
.ctrl-btn-primary:active {
  box-shadow: 0 0 0 0 rgba(83, 74, 183, 0.5);
}
</style>