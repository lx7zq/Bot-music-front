<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100 flex flex-col">
    <SiteNav />

    <!-- ambient -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-32 left-1/4 w-[480px] h-[480px] bg-iris-500/15 rounded-full blur-[120px]"></div>
      <div class="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-0 -left-24 w-[380px] h-[380px] bg-fuchsia-500/10 rounded-full blur-[120px]"></div>
    </div>

    <main class="relative flex-1">
      <!-- hero -->
      <section class="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] text-emerald-200 animate-fade-in">
          🎁 ดิสใหม่ทดลองใช้ฟรี 30 วัน ไม่ต้องจ่ายก่อน
        </div>
        <div class="mt-6 flex justify-center animate-float">
          <img src="/bear-logo.png" alt="หมีไอแว่น" class="w-28 h-28 rounded-[2rem] object-contain bg-white/5 border border-white/10 p-2" />
        </div>
        <h1 class="mt-6 font-display text-5xl sm:text-6xl font-bold tracking-tight">
          ไอแว่น <span class="text-iris-200">🐻 DJ</span>
        </h1>
        <p class="mt-4 text-zinc-400 leading-relaxed max-w-xl mx-auto">
          บอทเพลงสำหรับ Discord — เข้าห้องเสียง เปิดเพลง จัดคิว
          โหวตข้ามเพลง และคุมทุกอย่างผ่านหน้าเว็บแบบเรียลไทม์
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm">
          <a :href="invite" target="_blank" rel="noopener" class="px-7 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-semibold transition shadow-[0_4px_28px_rgba(83,74,183,0.5)] active:scale-95">🤖 เชิญบอทเข้าดิส</a>
          <RouterLink to="/pricing" class="px-7 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-medium transition active:scale-95">ดูแพ็กเกจ 99฿/เดือน</RouterLink>
        </div>
        <p class="mt-4 text-xs text-zinc-600">ใช้ฟรี 30 วันแรก • ไม่ต้องผูกบัตร • ยกเลิกเมื่อไรก็ได้</p>
      </section>

      <!-- command demo -->
      <section class="max-w-5xl mx-auto px-6 pb-4">
        <div class="glass-panel p-4 sm:p-5 flex items-center gap-3 max-w-xl mx-auto animate-fade-in">
          <span class="w-9 h-9 rounded-full bg-iris-500/20 border border-iris-400/30 flex items-center justify-center text-sm shrink-0">♪</span>
          <p class="font-mono text-sm text-zinc-300 truncate"><span class="text-zinc-600">/</span>play <span class="text-zinc-100">คืนความสุขให้ประเทศไทย</span></p>
          <span class="ml-auto text-[11px] text-zinc-600 shrink-0 hidden sm:inline">พิมพ์ในห้องแชทได้เลย</span>
        </div>
      </section>

      <!-- features -->
      <section class="max-w-5xl mx-auto px-6 py-10">
        <h2 class="font-display text-2xl font-bold text-center">ทำอะไรได้บ้าง</h2>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="f in features" :key="f.title" class="glass-panel p-5 animate-fade-in hover:border-iris-400/30 transition">
            <p class="text-2xl">{{ f.emoji }}</p>
            <p class="mt-3 font-semibold text-[15px]">{{ f.title }}</p>
            <p class="mt-1 text-[13px] text-zinc-400 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </section>

      <!-- steps -->
      <section class="max-w-5xl mx-auto px-6 py-6">
        <div class="glass-panel p-6 sm:p-8">
          <h2 class="font-display text-2xl font-bold text-center">เริ่มใช้ใน 3 ขั้น</h2>
          <ol class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <li v-for="(s, i) in steps" :key="i" class="flex sm:flex-col gap-3 sm:gap-2 sm:text-center sm:items-center">
              <span class="w-9 h-9 rounded-full bg-iris-500 text-white font-display font-bold flex items-center justify-center shrink-0">{{ i + 1 }}</span>
              <div>
                <p class="font-semibold text-[15px]">{{ s.title }}</p>
                <p class="mt-1 text-[13px] text-zinc-400 leading-relaxed" v-html="s.desc"></p>
              </div>
            </li>
          </ol>
          <div class="mt-8 text-center">
            <a :href="invite" target="_blank" rel="noopener" class="inline-block px-7 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white text-sm font-semibold transition active:scale-95">เริ่มเลย — ฟรี 30 วัน</a>
          </div>
        </div>
      </section>

      <!-- role note -->
      <section class="max-w-5xl mx-auto px-6 py-10 text-center">
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
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { inviteUrl } from '../config'

const invite = inviteUrl()

const features = [
  { emoji: '🎵', title: 'เปิดเพลงจากชื่อ/ลิงก์', desc: '/play /search หาเพลง กดเลือกจากผลลัพธ์ได้ ไม่ต้องจำคำสั่งเยอะ' },
  { emoji: '📋', title: 'คิว + Dashboard เรียลไทม์', desc: 'ดูคิว กดข้าม หยุด เพิ่มเพลงจากหน้าเว็บ อัปเดตทันทีทุกเครื่อง' },
  { emoji: '🗳️', title: 'โหวตข้ามเพลง', desc: 'คนเยอะไม่ต้องแย่งกันกดข้าม ครบโหวตบอทข้ามให้เอง' },
  { emoji: '🛡️', title: 'กันเกรียนด้วย role DJ', desc: 'ปุ่มแรงๆ ล็อกไว้เฉพาะ DJ/แอดมิน เพื่อนในห้องขอเพลงได้ปกติ' },
]

const steps = [
  { title: 'เชิญบอท', desc: 'กดปุ่มเชิญด้านบน<br/>แล้วลากบอทเข้าห้องเสียง' },
  { title: 'ตั้ง DJ', desc: 'สร้าง role ชื่อ <b>DJ</b><br/>ให้คนที่คุมเพลงได้' },
  { title: 'เปิดเพลง', desc: 'พิมพ์ <b>/play</b> ชื่อเพลง<br/>ฟรี 30 วันแรก' },
]
</script>
