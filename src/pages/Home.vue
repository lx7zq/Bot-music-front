<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100 flex flex-col overflow-x-hidden">
    <SiteNav />

    <!-- ambient -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-32 left-1/4 w-[480px] h-[480px] bg-iris-500/15 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 -left-24 w-[380px] h-[380px] bg-fuchsia-500/10 rounded-full blur-[120px]"></div>
    </div>

    <main class="relative flex-1">
      <!-- ══ hero ══ -->
      <section class="max-w-5xl mx-auto px-6 pt-12 pb-6 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] text-emerald-200 animate-fade-in">
          <Gift class="w-4 h-4" />ดิสใหม่ทดลองใช้ฟรี 30 วัน ไม่ต้องจ่ายก่อน
        </div>
        <div class="mt-6 flex justify-center">
          <img src="/bear-logo.png" alt="หมีไอแว่น" class="w-28 h-28 rounded-[2rem] object-contain bg-white/5 border border-white/10 p-2 animate-float" />
        </div>
        <h1 class="mt-5 font-display text-6xl sm:text-7xl font-bold tracking-tight">
          ไอแว่น<span class="bg-gradient-to-r from-iris-200 via-violet-300 to-cyan-200 bg-clip-text text-transparent">DJ</span>
        </h1>
        <p class="mt-3 font-display text-xl text-zinc-300">บอทเพลงคุณภาพสูง ไม่มีคำสั่งพรีเมี่ยม</p>
        <p class="mt-2 text-zinc-400 text-sm max-w-xl mx-auto">แค่เอาเข้าดิสก็เล่นได้เลย — พิมพ์ <code class="px-1.5 py-0.5 rounded bg-iris-500/20 border border-iris-400/30 text-iris-100 font-mono text-[13px]">/play</code> ชื่อเพลง จบ</p>
        <div class="mt-7 flex flex-wrap justify-center gap-3 text-sm">
          <a :href="invite" target="_blank" rel="noopener" class="px-8 py-3.5 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-semibold transition shadow-[0_4px_28px_rgba(83,74,183,0.5)] active:scale-95 inline-flex items-center gap-2"><Bot class="w-4 h-4" />เชิญบอทเข้าดิสคอร์ด</a>
          <RouterLink to="/pricing" class="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-medium transition active:scale-95">ดูแพ็กเกจ 99฿</RouterLink>
        </div>
      </section>

      <!-- ══ typing demo ══ -->
      <section class="max-w-2xl mx-auto px-6 py-6">
        <TypingDemo />
        <p class="mt-3 text-center text-xs text-zinc-600">แค่นี้จริงๆ — ไม่ต้องจำคำสั่งเยอะ ไม่ต้องตั้งค่าอะไร</p>
      </section>

      <!-- ══ live now ══ -->
      <section class="max-w-5xl mx-auto px-6 py-6">
        <div class="glass-panel p-5 sm:p-6">
          <div class="flex items-center gap-2">
            <span class="relative flex w-2.5 h-2.5">
              <span class="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-60 animate-ping"></span>
              <span class="relative inline-flex w-2.5 h-2.5 rounded-full bg-red-400"></span>
            </span>
            <h2 class="font-display text-lg font-bold">กำลังเล่นตอนนี้</h2>
            <span class="ml-auto text-[11px] text-zinc-600">สด • ไม่ระบุชื่อดิส</span>
          </div>
          <div v-if="live.length" class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="(s, i) in live" :key="i" class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 animate-fade-in">
              <div class="w-11 h-11 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                <img v-if="s.thumbnail" :src="s.thumbnail" :alt="s.title" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-zinc-600"><Music class="w-5 h-5" /></div>
              </div>
              <p class="text-[13px] text-zinc-200 truncate">{{ s.title }}</p>
            </div>
          </div>
          <div v-else class="mt-4 rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center">
            <p class="text-sm text-zinc-400">ตอนนี้เงียบอยู่ — เป็นดิสแรกที่เปิดเพลงสิ</p>
            <a :href="invite" target="_blank" rel="noopener" class="mt-3 inline-block px-6 py-2.5 rounded-full bg-iris-500 hover:bg-iris-400 text-white text-sm font-semibold transition active:scale-95">เชิญบอทเลย ฟรี 30 วัน</a>
          </div>
        </div>
      </section>

      <!-- ══ stats ══ -->
      <section class="max-w-5xl mx-auto px-6 py-2">
        <div class="grid grid-cols-2 gap-3 max-w-md mx-auto text-center">
          <div class="glass-panel py-4 px-2">
            <p class="font-display text-2xl sm:text-3xl font-bold text-iris-100">{{ stats.guilds }}</p>
            <p class="text-[11px] text-zinc-500 mt-0.5 flex items-center justify-center gap-1"><Home class="w-3 h-3" />ดิสที่ติดตั้ง</p>
          </div>
          <div class="glass-panel py-4 px-2">
            <p class="font-display text-2xl sm:text-3xl font-bold text-emerald-300">{{ stats.listeners }}</p>
            <p class="text-[11px] text-zinc-500 mt-0.5 flex items-center justify-center gap-1"><Headphones class="w-3 h-3" />คนฟังตอนนี้</p>
          </div>
        </div>
      </section>

      <!-- ══ marquee ══ -->
      <div class="relative mt-8 py-4 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div class="flex gap-3 whitespace-nowrap animate-marquee w-max">
          <span v-for="c in [...cmds, ...cmds]" :key="c" class="font-mono text-sm text-zinc-400 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">{{ c }}</span>
        </div>
      </div>

      <!-- ══ how to add ══ -->
      <section class="max-w-5xl mx-auto px-6 py-12">
        <h2 class="font-display text-3xl font-bold text-center">วิธีเอาบอทเข้าดิส</h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="(s, i) in steps" :key="i" class="glass-panel p-6 text-center hover:border-iris-400/30 transition">
            <p class="font-mono text-xs text-zinc-600">ขั้นตอนที่ {{ i + 1 }}</p>
            <div class="mt-3 mx-auto w-12 h-12 rounded-2xl bg-iris-500/15 border border-iris-400/25 flex items-center justify-center">
              <component :is="s.icon" class="w-6 h-6 text-iris-200" />
            </div>
            <p class="mt-3 font-display font-bold text-lg">{{ s.title }}</p>
            <p class="mt-1 text-[13px] text-zinc-400 leading-relaxed" v-html="s.desc"></p>
          </div>
        </div>
      </section>

      <!-- ══ commands ══ -->
      <section class="max-w-5xl mx-auto px-6 py-4">
        <h2 class="font-display text-3xl font-bold text-center">คำสั่งเล่นเพลงบอท</h2>
        <div class="mt-6 glass-panel p-5 sm:p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-2xl mx-auto text-[13px] text-zinc-400">
            <p v-for="c in mainCmds" :key="c.cmd"><code class="font-mono text-iris-100 bg-iris-500/15 border border-iris-400/25 rounded-lg px-2 py-0.5">{{ c.cmd }}</code> — {{ c.desc }}</p>
          </div>
          <p class="mt-4 text-center text-xs text-zinc-600">รองรับชื่อเพลงภาษาไทย + ลิงก์ YouTube / Playlist</p>
        </div>
      </section>

      <!-- ══ pricing teaser ══ -->
      <section class="max-w-5xl mx-auto px-6 py-10">
        <div class="glass-panel p-6 sm:p-8 text-center relative overflow-hidden">
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-iris-500/20 rounded-full blur-[80px] pointer-events-none"></div>
          <p class="relative font-display text-4xl font-bold">99<span class="text-lg text-zinc-400 font-sans">฿/เดือน/ดิส</span></p>
          <p class="relative mt-2 text-sm text-zinc-400">ฟรี 30 วันแรก • ยกเลิกเมื่อไรก็ได้</p>
          <div class="relative mt-5">
            <RouterLink to="/pricing" class="inline-block px-7 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white text-sm font-semibold transition active:scale-95">ดูแพ็กเกจ + สแกนจ่าย</RouterLink>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Gift, Bot, Music, Home, Headphones, MousePointerClick, SlidersHorizontal,
} from 'lucide-vue-next'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import TypingDemo from '../components/TypingDemo.vue'
import { API_URL, inviteUrl } from '../config'

const invite = inviteUrl()
const stats = ref({ guilds: '…', listeners: '…' })
const live = ref([])

const cmds = ['/play', '/search', '/skip', '/pause', '/resume', '/queue', '/nowplaying', '/panel', '/volume', '/clear', '/stop', '/leave', '/join', '/dashboard', '/subscription']

const mainCmds = [
  { cmd: '/play', desc: 'เปิดเพลงจากชื่อ/ลิงก์' },
  { cmd: '/search', desc: 'ค้นหาแล้วกดเลือก 1-5' },
  { cmd: '/skip', desc: 'ข้ามเพลง (โหวตถ้าคนเยอะ)' },
  { cmd: '/panel', desc: 'แผงปุ่มส่วนตัวตามสิทธิ์' },
  { cmd: '/queue', desc: 'ดูคิวเพลงทั้งหมด' },
  { cmd: '/nowplaying', desc: 'ดูเพลงที่กำลังเล่น' },
  { cmd: '/pause・/resume', desc: 'หยุดชั่วคราว/เล่นต่อ' },
  { cmd: '/volume', desc: 'ปรับเสียง 0-100 (DJ)' },
]

const steps = [
  { icon: MousePointerClick, title: 'กดเชิญบอท', desc: 'กดปุ่ม <b>เชิญบอทเข้าดิสคอร์ด</b><br/>ด้านบนได้เลย' },
  { icon: Headphones, title: 'ลากเข้าห้องเสียง', desc: 'ลากบอทเข้าห้องเสียง<br/>แล้วพิมพ์ <b>/play</b> ชื่อเพลง' },
  { icon: SlidersHorizontal, title: 'ตั้ง DJ', desc: 'สร้าง role ชื่อ <b>DJ</b> ให้คนที่คุมเพลงได้<br/>อยากได้ห้องเพลงส่วนตัว พิมพ์ <b>/setup</b> ในดิส' },
]

let timer = null
async function loadLive() {
  try {
    const [s, l] = await Promise.all([
      fetch(`${API_URL}/public/stats`).then((r) => r.json()),
      fetch(`${API_URL}/public/live`).then((r) => r.json()),
    ])
    stats.value = {
      guilds: s.guilds ?? 0,
      listeners: s.listeners ?? 0,
    }
    live.value = l.live ?? []
  } catch {
    stats.value = { guilds: 0, listeners: 0 }
  }
}

onMounted(() => {
  loadLive()
  timer = setInterval(loadLive, 10000)
})
onUnmounted(() => clearInterval(timer))
</script>
