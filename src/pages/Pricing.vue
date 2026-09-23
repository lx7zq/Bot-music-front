<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100">
    <div class="max-w-3xl mx-auto px-6 py-12">
      <RouterLink to="/" class="text-sm text-zinc-400 hover:text-zinc-100">← กลับหน้าแรก</RouterLink>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">แพ็กเกจ 🐻</h1>
      <p class="mt-2 text-sm text-zinc-500">จ่ายดิสละครั้งเดียว ใช้ได้ทุกห้องในดิสนั้น</p>

      <div class="glass-panel mt-8 p-6 sm:p-8 text-center">
        <p class="text-5xl font-bold">{{ priceText }}<span class="text-lg text-zinc-400">฿/เดือน</span></p>
        <p class="mt-2 text-sm text-zinc-400">ต่อดิส • ใช้ได้ {{ planDays }} วัน • หมดอายุยังฟังต่อได้อีก {{ graceDays }} วัน</p>

        <div v-if="qrUrl" class="mt-6 inline-block rounded-2xl bg-white p-4">
          <img :src="qrUrl" alt="QR พร้อมเพย์" class="w-56 h-56" />
        </div>
        <p v-if="qrUrl" class="mt-3 text-sm text-zinc-300">สแกนจ่าย {{ priceText }}฿ เป๊ะๆ แล้วกดไปส่งสลิปด้านล่างนะ ♡</p>
        <p v-else class="mt-6 text-sm text-zinc-500">ช่องทางจ่ายเงินยังไม่พร้อม ติดต่อแอดมินก่อนนะ ♡</p>

        <div class="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <RouterLink to="/billing" class="px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition">ส่งสลิป</RouterLink>
          <a :href="invite" target="_blank" rel="noopener" class="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">เชิญบอทเข้าดิส</a>
        </div>
      </div>

      <div class="glass-panel mt-6 p-6 text-sm text-zinc-400 leading-relaxed">
        <p class="font-semibold text-zinc-200">เริ่มใช้ใน 3 ขั้น</p>
        <ol class="mt-2 list-decimal pl-5 space-y-1">
          <li>กด <b class="text-zinc-200">เชิญบอทเข้าดิส</b> แล้วลากบอทเข้าห้องเสียง</li>
          <li>สร้าง role ชื่อ <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">DJ</code> ให้คนที่คุมเพลงได้ (แอดมินได้สิทธิ์อัตโนมัติ)</li>
          <li>สแกนจ่าย + <RouterLink to="/billing" class="underline">ส่งสลิป</RouterLink> รอไม่เกิน 1 วัน (ปกติไม่กี่นาที) แล้วใช้ <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">/play</code> ได้เลย</li>
        </ol>
      </div>

      <div class="mt-6 flex gap-4 text-sm">
        <RouterLink to="/terms" class="underline text-zinc-400 hover:text-zinc-100">เงื่อนไขการคืนเงิน</RouterLink>
        <RouterLink to="/billing" class="underline text-zinc-400 hover:text-zinc-100">ส่งสลิป</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import generatePayload from 'promptpay-qr'
import QRCode from 'qrcode'
import { API_URL, inviteUrl } from '../config'

const invite = inviteUrl()
const priceText = ref('99')
const planDays = ref(30)
const graceDays = ref(3)
const qrUrl = ref('')

onMounted(async () => {
  try {
    const r = await fetch(`${API_URL}/billing/config`)
    const cfg = await r.json()
    priceText.value = String(cfg.price ?? 99)
    planDays.value = cfg.plan_days ?? 30
    graceDays.value = cfg.grace_days ?? 3
    if (cfg.promptpay_id) {
      const payload = generatePayload(cfg.promptpay_id, { amount: Number(cfg.price ?? 99) })
      qrUrl.value = await QRCode.toDataURL(payload, { width: 224, margin: 1 })
    }
  } catch (e) {
    console.warn('[pricing] config error', e)
  }
})
</script>
