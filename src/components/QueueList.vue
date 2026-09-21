<template>
  <div class="sticker-card p-5 flex flex-col gap-4 animate-fade-in">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-sm text-cream tracking-wide uppercase">🎫 บัตรคิว</h2>
      <span class="text-xs text-zinc-400 font-mono rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1">
        {{ queue.length }} เพลง • {{ totalDur }}
      </span>
    </div>

    <!-- empty : bear -->
    <div v-if="!queue.length" class="flex flex-col items-center justify-center py-10 text-zinc-500 gap-2 animate-pop-in">
      <img src="/bear-frame2.png" alt="หมีรอเพลง" class="w-16 h-16 animate-float" style="image-rendering: pixelated" />
      <p class="font-display font-semibold text-sm text-zinc-300">คิวว่าง หมีรอฟังเพลงอยู่ 🍯</p>
      <p class="text-xs text-zinc-600">พิมพ์ชื่อเพลงข้างล่างขอเพลงได้เลย</p>
    </div>

    <!-- list : tickets -->
    <ul v-else class="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto pr-1">
      <li
        v-for="(song, i) in queue"
        :key="i"
        class="ticket-row hover:bg-zinc-800/80 group animate-fade-in"
      >
        <span class="text-xs text-cream font-mono w-6 h-6 rounded-full bg-iris-500/25 border border-iris-500/40 flex items-center justify-center shrink-0">{{ i + 1 }}</span>

        <div class="w-9 h-9 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
          <img v-if="song.thumbnail" :src="song.thumbnail" :alt="song.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 18V5l12-2v13M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </svg>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm text-zinc-200 truncate">{{ song.title }}</p>
          <p class="text-xs text-zinc-500">🍯 <span class="text-zinc-400">{{ song.requester }}</span></p>
        </div>

        <span class="text-xs font-mono text-zinc-500 shrink-0">{{ fmtDur(song.duration) }}</span>

        <button
          @click="emit('remove', i)"
          class="opacity-0 group-hover:opacity-100 transition w-7 h-7 rounded-lg flex items-center justify-center
                 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 shrink-0"
          title="ลบออก"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </li>
    </ul>

    <!-- add song -->
    <div class="flex gap-2 pt-3 border-t-2 border-dashed border-zinc-800">
      <input
        v-model="query"
        @keydown.enter="submit"
        type="text"
        placeholder="พิมพ์ชื่อเพลงให้หมีหน่อย 🐻..."
        class="flex-1 bg-zinc-950 text-sm text-zinc-200 rounded-xl px-4 py-2.5 outline-none border border-zinc-800
               placeholder-zinc-600 focus:border-honey-500/60 focus:ring-1 focus:ring-honey-500/40 transition"
      />
      <button
        @click="submit"
        :disabled="!query.trim()"
        class="bg-iris-500 hover:bg-iris-600 disabled:opacity-40 disabled:cursor-not-allowed
               text-white text-sm font-display font-bold rounded-xl px-5 py-2.5 transition active:scale-90 shrink-0"
        style="box-shadow: 2px 2px 0 0 rgba(83,74,183,.5)"
      >
        ขอเพลง 🍯
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ queue: { type: Array, default: () => [] } })
const emit = defineEmits(['remove', 'add'])

const query = ref('')

function submit() {
  if (!query.value.trim()) return
  emit('add', query.value.trim())
  query.value = ''
}

function fmtDur(s) {
  if (!s) return '0:00'
  const m = Math.floor(s / 60), sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

const totalDur = computed(() => {
  const total = props.queue.reduce((acc, s) => acc + (s.duration || 0), 0)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  return `${m}:${String(s).padStart(2,'0')}`
})
</script>