<template>
  <div class="glass-panel p-5 flex flex-col gap-4 animate-fade-in">
    <div class="flex items-center justify-between">
      <h2 class="font-semibold text-[13px] text-zinc-300 tracking-[0.18em] uppercase">Queue</h2>
      <span class="text-xs text-zinc-400 font-mono rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
        {{ queue.length }} เพลง • {{ totalDur }}
      </span>
    </div>

    <!-- empty -->
    <div v-if="!queue.length" class="flex flex-col items-center justify-center py-10 text-zinc-600 gap-2">
      <svg class="w-10 h-10 opacity-30" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <path d="M9 19V6l12-3v13M9 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
      </svg>
      <p class="text-sm text-zinc-400">คิวยังว่างอยู่</p>
      <p class="text-xs text-zinc-600">พิมพ์ชื่อเพลงด้านล่างเพื่อเพิ่ม</p>
    </div>

    <!-- list -->
    <ul v-else class="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-1">
      <li
        v-for="(song, i) in queue"
        :key="i"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition group"
      >
        <span class="text-xs text-zinc-500 font-mono w-5 text-center shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>

        <div class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 overflow-hidden shrink-0">
          <img v-if="song.thumbnail" :src="song.thumbnail" :alt="song.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 18V5l12-2v13M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
            </svg>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm text-zinc-200 truncate">{{ song.title }}</p>
          <p class="text-xs text-zinc-500 truncate">{{ song.requester }}</p>
        </div>

        <span class="text-xs font-mono text-zinc-500 shrink-0">{{ fmtDur(song.duration) }}</span>

        <button
          v-if="canControl"
          @click="emit('remove', i)"
          class="opacity-0 group-hover:opacity-100 transition w-7 h-7 rounded-lg flex items-center justify-center
                 text-zinc-500 hover:text-red-300 hover:bg-red-500/10 shrink-0"
          title="ลบออก (DJ)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </li>
    </ul>

    <!-- add song -->
    <div class="flex gap-2 pt-3 border-t border-white/10">
      <input
        v-model="query"
        @keydown.enter="submit"
        type="text"
        placeholder="ชื่อเพลง หรือลิงก์ YouTube..."
        class="flex-1 bg-white/5 border border-white/10 text-sm text-zinc-200 rounded-xl px-4 py-2.5 outline-none backdrop-blur
               placeholder-zinc-600 focus:border-iris-400/50 focus:ring-1 focus:ring-iris-400/30 transition"
      />
      <button
        @click="submit"
        :disabled="!query.trim()"
        class="bg-iris-500/90 hover:bg-iris-500 disabled:opacity-40 disabled:cursor-not-allowed backdrop-blur
               text-white text-sm font-medium rounded-xl px-5 py-2.5 transition active:scale-95 shrink-0"
      >
        เพิ่ม
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  queue: { type: Array, default: () => [] },
  canControl: { type: Boolean, default: true },
})
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
