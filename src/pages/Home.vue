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
      <section class="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] text-emerald-200 animate-fade-in">
          🎁 ดิสใหม่ทดลองใช้ฟรี 30 วัน ไม่ต้องจ่ายก่อน
        </div>
        <div class="mt-6 flex justify-center">
          <img src="/bear-logo.png" alt="หมีไอแว่น" class="w-32 h-32 rounded-[2.2rem] object-contain bg-white/5 border border-white/10 p-2 animate-float" />
        </div>
        <h1 class="mt-6 font-display text-6xl sm:text-7xl font-bold tracking-tight">
          ไอแว่น<span class="bg-gradient-to-r from-iris-200 via-violet-300 to-cyan-200 bg-clip-text text-transparent">DJ</span>
        </h1>
        <p class="mt-4 font-display text-xl text-zinc-300">บอทเพลงคุณภาพสูง ไม่มีคำสั่งพรีเมี่ยม</p>
        <p class="mt-2 text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto">
          แค่เอาเข้าดิสก็เล่นได้เลย — เปิดเพลง จัดคิว โหวตข้ามเพลง
          คุมผ่านหน้าเว็บแบบเรียลไทม์
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <a :href="invite" target="_blank" rel="noopener" class="px-8 py-3.5 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-semibold transition shadow-[0_4px_28px_rgba(83,74,183,0.5)] active:scale-95">🤖 เชิญบอทเข้าดิสคอร์ด</a>
          <RouterLink to="/pricing" class="px-8 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-medium transition active:scale-95">ดูแพ็กเกจ 99฿</RouterLink>
        </div>

        <!-- stats -->
        <div class="mt-10 grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div class="glass-panel py-4 px-2">
            <p class="font-display text-2xl sm:text-3xl font-bold text-iris-100">{{ stats.guilds }}</p>
            <p class="text-[11px] text-zinc-500 mt-0.5">ดิสที่ติดตั้ง</p>
          </div>
          <div class="glass-panel py-4 px-2">
            <p class="font-display text-2xl sm:text-3xl font-bold text-emerald-300">{{ stats.playing }}</p>
            <p class="text-[11px] text-zinc-500 mt-0.5">กำลังเล่นตอนนี้</p>
          </div>
          <div class="glass-panel py-4 px-2">
            <p class="font-display text-2xl sm:text-3xl font-bold text-cyan-200">{{ stats.queued }}</p>
            <p class="text-[11px] text-zinc-500 mt-0.5">เพลงในคิว</p>
          </div>
        </div>
      </section>

      <!-- ══ marquee ══ -->
      <div class="relative py-4 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div class="flex gap-3 whitespace-nowrap animate-marquee w-max">
          <span v-for="c in [...cmds, ...cmds]" :key="c" class="font-mono text-sm text-zinc-400 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">{{ c }}</span>
        </div>
      </div>

      <!-- ══ how to add ══ -->
      <section class="max-w-5xl mx-auto px-6 py-12">
        <h2 class="font-display text-3xl font-bold text-center">วิธีเอาบอทเข้าดิส 🐻</h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div v-for="(s, i) in steps" :key="i" class="glass-panel p-6 text-center hover:border-iris-400/30 transition">
            <p class="font-mono text-xs text-zinc-600">ขั้นตอนที่ {{ i + 1 }}</p>
            <p class="text-3xl mt-2">{{ s.emoji }}</p>
            <p class="mt-3 font-display font-bold text-lg">{{ s.title }}</p>
            <p class="mt-1 text-[13px] text-zinc-400 leading-relaxed" v-html="s.desc"></p>
          </div>
        </div>
        <div class="mt-6 text-center">
          <a :href="invite" target="_blank" rel="noopener" class="inline-block px-8 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white text-sm font-semibold transition active:scale-95">เริ่มเลย — ฟรี 30 วัน</a>
        </div>
      </section>

      <!-- ══ commands ══ -->
      <section class="max-w-5xl mx-auto px-6 py-8">
        <h2 class="font-display text-3xl font-bold text-center">คำสั่งเล่นเพลงบอท 🎵</h2>
        <p class="text-center text-sm text-zinc-500 mt-2">พิมพ์ในห้องแชทดิสได้เลย ไม่ต้องจำเยอะ</p>
        <div class="mt-6 glass-panel p-5 sm:p-6">
          <div class="flex flex-wrap gap-2 justify-center">
            <span v-for="c in mainCmds" :key="c.cmd" class="px-3.5 py-2 rounded-xl bg-iris-500/15 border border-iris-400/25 font-mono text-[13px] text-iris-100" :title="c.desc">{{ c.cmd }}</span>
          </div>
          <p class="mt-4 text-center text-xs text-zinc-600">รองรับชื่อเพลงภาษาไทย + ลิงก์ YouTube / Playlist</p>
          <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 max-w-2xl mx-auto text-[13px] text-zinc-400">
            <p v-for="c in mainCmds" :key="c.cmd + '-d'"><code class="font-mono text-zinc-200">{{ c.cmd }}</code> — {{ c.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ══ pricing teaser ══ -->
      <section class="max-w-5xl mx-auto px-6 py-10">
        <div class="glass-panel p-6 sm:p-8 text-center relative overflow-hidden">
          <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-iris-500/20 rounded-full blur-[80px] pointer-events-none"></div>
          <p class="relative font-display text-4xl font-bold">99<span class="text-lg text-zinc-400 font-sans">฿/เดือน/ดิส</span></p>
          <p class="relative mt-2 text-sm text-zinc-400">ฟรี 30 วันแรก • ยกเลิกเมื่อไรก็ได้ • เพื่อนในห้องขอเพลงได้ไม่ต้องจ่ายเพิ่ม</p>
          <div class="relative mt-5 flex flex-wrap justify-center gap-3 text-sm">
            <RouterLink to="/pricing" class="px-7 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-semibold transition active:scale-95">ดูแพ็กเกจ + สแกนจ่าย</RouterLink>
          </div>
        </div>
      </section>

      <!-- ══ trust ══ -->
      <section class="max-w-5xl mx-auto px-6 pb-12 text-center">
        <p class="text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
          🛡️ ปุ่มทำลาย (ล้างคิว/เร่งเสียง/เตะบอท) ล็อกไว้เฉพาะคนมี role
          <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">DJ</code>
          คนในห้องขอเพลง/ข้ามเพลงได้ปกติ ไม่ต้อง login อะไรเลย
        </p>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { API_URL, inviteUrl } from '../config'

const invite = inviteUrl()
const stats = ref({ guilds: '…', playing: '…', queued: '…' })

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
  { emoji: '👆', title: 'กดเชิญบอท', desc: 'กดปุ่ม <b>เชิญบอทเข้าดิสคอร์ด</b><br/>ด้านบนได้เลย' },
  { emoji: '🎧', title: 'ลากเข้าห้องเสียง', desc: 'ลากบอทเข้าห้องเสียง<br/>แล้วพิมพ์ <b>/play</b> ชื่อเพลง' },
  { emoji: '🎛️', title: 'ตั้ง DJ', desc: 'สร้าง role ชื่อ <b>DJ</b><br/>ให้คนที่คุมเพลงได้' },
]

onMounted(async () => {
  try {
    const r = await fetch(`${API_URL}/public/stats`)
    const d = await r.json()
    stats.value = { guilds: d.guilds ?? 0, playing: d.playing ?? 0, queued: d.queued ?? 0 }
  } catch {
    stats.value = { guilds: 0, playing: 0, queued: 0 }
  }
})
</script>
