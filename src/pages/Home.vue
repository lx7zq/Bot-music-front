<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100 flex flex-col">
    <div class="max-w-3xl mx-auto px-6 py-16 text-center flex-1 flex flex-col items-center justify-center">
      <div class="w-20 h-20 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
        <img src="/bear-logo.png" alt="ไอแว่น" class="w-full h-full object-contain" />
      </div>
      <h1 class="mt-6 text-4xl font-bold tracking-tight">ไอแว่น 🐻 DJ</h1>
      <p class="mt-3 text-zinc-400 text-sm leading-relaxed max-w-md">
        บอทเพลงสำหรับ Discord — เปิดเพลงใน Voice Channel จัดคิว โหวตข้ามเพลง
        และควบคุมผ่าน Dashboard แบบเรียลไทม์
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <a :href="invite" target="_blank" rel="noopener" class="px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition">เชิญบอทเข้าดิส</a>
        <RouterLink to="/pricing" class="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">แพ็กเกจ 99฿/เดือน</RouterLink>
      </div>

      <div class="mt-4 flex flex-wrap justify-center gap-3 text-sm">
        <RouterLink to="/terms" class="px-5 py-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-zinc-100 transition">ข้อกำหนดการให้บริการ</RouterLink>
        <RouterLink to="/privacy" class="px-5 py-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-zinc-100 transition">นโยบายความเป็นส่วนตัว</RouterLink>
      </div>

      <div class="glass-panel mt-10 p-5 text-left text-sm text-zinc-400 leading-relaxed w-full">
        <p class="font-semibold text-zinc-200">วิธีใช้งานเบื้องต้น</p>
        <ul class="mt-2 list-disc pl-5 space-y-1">
          <li>เชิญบอทเข้าเซิร์ฟเวอร์ แล้วเข้า Voice Channel</li>
          <li>พิมพ์ <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">/play ชื่อเพลง</code> หรือ <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">/search ชื่อเพลง</code></li>
          <li>เปิดหน้า Dashboard ตามลิงก์ในข้อความ Now Playing เพื่อคุมเพลงจากเว็บ</li>
        </ul>
      </div>
    </div>

    <footer class="border-t border-white/10 py-5">
      <div class="max-w-3xl mx-auto px-6 flex flex-wrap justify-center gap-5 text-xs text-zinc-500">
        <RouterLink to="/pricing" class="hover:text-zinc-200">Pricing</RouterLink>
        <RouterLink to="/billing" class="hover:text-zinc-200">ส่งสลิป</RouterLink>
        <RouterLink to="/terms" class="hover:text-zinc-200">Terms of Service</RouterLink>
        <RouterLink to="/privacy" class="hover:text-zinc-200">Privacy Policy</RouterLink>
        <a href="https://discord.com/terms" target="_blank" rel="noopener" class="hover:text-zinc-200">Discord Terms</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { inviteUrl } from '../config'
const invite = inviteUrl()
</script>
