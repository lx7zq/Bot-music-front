<template>
  <!-- Discord-style typing demo: พิมพ์ /play วนลูป -->
  <div class="rounded-3xl border border-white/10 bg-[#1e1f22]/90 backdrop-blur-xl overflow-hidden text-left shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
    <!-- window bar -->
    <div class="flex items-center gap-2 px-4 py-3 border-b border-white/5">
      <span class="text-zinc-500 font-bold text-lg leading-none">#</span>
      <span class="text-sm font-medium text-zinc-200">เพลง</span>
      <span class="ml-auto flex items-center gap-1.5 text-[11px] text-zinc-500">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
        ไอแว่นอยู่ในห้องเสียง
      </span>
    </div>

    <div class="p-4 min-h-[190px] flex flex-col gap-3">
      <!-- user typing -->
      <div class="flex gap-3 animate-fade-in">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-iris-500 flex items-center justify-center text-sm font-bold shrink-0">ค</div>
        <div class="min-w-0">
          <p class="text-[13px"><span class="font-medium text-zinc-100">คุณ</span> <span class="text-[11px] text-zinc-500 ml-1">กำลังพิมพ์...</span></p>
          <p class="mt-0.5 font-mono text-sm text-zinc-100 break-all">
            <span class="text-iris-200">{{ typed }}</span><span class="inline-block w-[7px] h-4 bg-iris-300/80 align-middle animate-pulse-dot"></span>
          </p>
        </div>
      </div>

      <!-- bot reply -->
      <div v-if="reply" class="flex gap-3 animate-pop-in">
        <img src="/bear-logo.png" alt="" class="w-9 h-9 rounded-full object-contain bg-white/5 border border-white/10 shrink-0" />
        <div class="min-w-0">
          <p class="text-[13px]">
            <span class="font-medium text-zinc-100">ไอแว่น</span>
            <span class="ml-1.5 text-[10px] font-semibold bg-iris-500 rounded px-1.5 py-0.5 text-white align-middle">BOT</span>
          </p>
          <div class="mt-1 rounded-xl border-l-4 border-iris-400 bg-white/[0.04] px-3 py-2 max-w-md">
            <p class="text-sm text-zinc-100 truncate">⋆˚𐙚｡ {{ reply.title }} ｡𐙚˚⋆</p>
            <p class="text-xs text-zinc-500 mt-0.5">{{ reply.sub }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- dots -->
    <div class="flex justify-center gap-1.5 pb-3">
      <span v-for="(_, i) in scenes" :key="i" class="h-1.5 rounded-full transition-all"
        :class="i === idx ? 'w-5 bg-iris-400' : 'w-1.5 bg-white/15'"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scenes = [
  {
    text: '/play ทรงอย่างแบด',
    speed: 45,
    reply: { title: 'ทรงอย่างแบด — Paper Planes', sub: '☁︎ 3:42 • ♡ เพิ่มเข้า Queue แล้ว — คิวที่ #1' },
  },
  {
    text: '/play https://youtu.be/kJQP7kiw5Fk',
    speed: 10,
    reply: { title: 'Despacito — Luis Fonsi', sub: '☁︎ 4:41 • ♡ กำลังเล่นอยู่นะ' },
  },
  {
    text: '/search YOASOBI',
    speed: 40,
    reply: { title: '⋆˚ ผลค้นหา 3 เพลง — กดเลือกได้เลย', sub: '1. 夜に駆ける 2. Idol 3. Monster ♡ (หมดเวลา 30 วิ)' },
  },
]

const typed = ref('')
const reply = ref(null)
const idx = ref(0)
let alive = true
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function loop() {
  while (alive) {
    const s = scenes[idx.value]
    typed.value = ''
    reply.value = null
    await sleep(500)
    for (const ch of s.text) {
      if (!alive) return
      typed.value += ch
      await sleep(s.speed + Math.random() * 30)
    }
    await sleep(600)
    if (!alive) return
    reply.value = s.reply
    await sleep(2600)
    if (!alive) return
    idx.value = (idx.value + 1) % scenes.length
  }
}

onMounted(loop)
onUnmounted(() => { alive = false })
</script>
