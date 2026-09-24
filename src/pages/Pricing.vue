<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100 flex flex-col">
    <SiteNav />
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-32 left-1/4 w-[480px] h-[480px] bg-iris-500/15 rounded-full blur-[120px]"></div>
    </div>

    <main class="relative flex-1 w-full max-w-3xl mx-auto px-6 py-12">
      <div class="text-center">
        <div v-if="trialDays > 0" class="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-[13px] text-emerald-200">
          <Gift class="w-4 h-4" />ดิสใหม่ทดลองใช้ฟรี {{ trialDays }} วัน ไม่ต้องจ่ายก่อน
        </div>
        <h1 class="mt-4 font-display text-4xl font-bold tracking-tight">แพ็กเกจเดียว จบ</h1>
        <p class="mt-2 text-sm text-zinc-500">จ่ายดิสละครั้งเดียว ใช้ได้ทุกห้องในดิสนั้น</p>
      </div>

      <!-- plan card -->
      <div class="glass-panel mt-8 p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-1 text-center sm:text-left">
            <p class="font-display text-5xl font-bold">{{ priceText }}<span class="text-lg text-zinc-400 font-sans">฿/เดือน</span></p>
            <ul class="mt-4 space-y-2 text-sm text-zinc-300 text-left inline-block">
              <li v-for="t in perks" :key="t" class="flex gap-2 items-start"><Check class="w-4 h-4 mt-0.5 text-emerald-300 shrink-0" />{{ t }}</li>
            </ul>
          </div>
          <div class="text-center shrink-0">
            <div v-if="qrUrl" class="inline-block rounded-2xl bg-white p-4">
              <img :src="qrUrl" alt="QR พร้อมเพย์" class="w-52 h-52" />
            </div>
            <div v-else class="w-52 h-52 mx-auto rounded-2xl border border-dashed border-white/15 flex items-center justify-center text-xs text-zinc-600 px-6">
              ช่องทางจ่ายเงินยังไม่พร้อม ติดต่อแอดมินก่อน
            </div>
            <p v-if="qrUrl" class="mt-3 text-[13px] text-zinc-300">สแกนจ่าย {{ priceText }}฿ เป๊ะๆ<br/>แล้วกดปุ่มส่งสลิป</p>
          </div>
        </div>
        <div class="mt-6 flex flex-col sm:flex-row justify-center gap-3 text-sm">
          <RouterLink to="/billing" class="px-7 py-3 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-semibold transition text-center active:scale-95 inline-flex items-center justify-center gap-2"><Receipt class="w-4 h-4" />ส่งสลิป</RouterLink>
          <a :href="invite" target="_blank" rel="noopener" class="px-7 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 font-medium transition text-center active:scale-95 inline-flex items-center justify-center gap-2"><Bot class="w-4 h-4" />เชิญบอทเข้าดิส</a>
        </div>
      </div>

      <!-- steps -->
      <div class="glass-panel mt-6 p-6">
        <p class="font-display font-bold text-lg">เริ่มใช้ใน 3 ขั้น</p>
        <ol class="mt-3 space-y-3 text-sm text-zinc-400">
          <li class="flex gap-3"><span class="w-6 h-6 rounded-full bg-iris-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span><span><b class="text-zinc-200">เชิญบอท</b> แล้วลากเข้าห้องเสียง — ฟรี {{ trialDays }} วันแรกอัตโนมัติ</span></li>
          <li class="flex gap-3"><span class="w-6 h-6 rounded-full bg-iris-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span><span>สร้าง role <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">DJ</code> ให้คนที่คุมเพลงได้ (แอดมินได้สิทธิ์อัตโนมัติ)</span></li>
          <li class="flex gap-3"><span class="w-6 h-6 rounded-full bg-iris-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span><span>สแกนจ่าย + <RouterLink to="/billing" class="underline text-zinc-200">ส่งสลิป</RouterLink> รอตรวจไม่เกิน 1 วัน (ปกติไม่กี่นาที)</span></li>
          <li class="flex gap-3"><span class="w-6 h-6 rounded-full bg-iris-500 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span><span><b class="text-zinc-200">อยากได้ห้องเพลงส่วนตัว?</b> แอดมินพิมพ์ <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">/setup</code> ให้บอทสร้างห้อง <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">#ไอแว่น-ขอเพลง</code> ให้ — เลือกได้ว่าทุกคนเห็น / เฉพาะคนมี role (เช่น <code class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-100 font-mono text-xs">/setup role:@user</code>) / เฉพาะ DJ</span></li>
        </ol>
      </div>

      <!-- faq -->
      <div class="mt-6">
        <p class="font-display font-bold text-lg text-center">คำถามที่เจอบ่อย</p>
        <div class="mt-4 space-y-3">
          <details v-for="f in faqs" :key="f.q" class="glass-panel px-5 py-4 text-sm group">
            <summary class="cursor-pointer font-medium text-zinc-100 list-none flex justify-between gap-3">
              {{ f.q }}<span class="text-zinc-500 group-open:rotate-45 transition shrink-0">+</span>
            </summary>
            <p class="mt-2 text-zinc-400 leading-relaxed">{{ f.a }}</p>
          </details>
        </div>
      </div>

      <div class="mt-8 text-center text-sm">
        <RouterLink to="/terms" class="underline text-zinc-400 hover:text-zinc-100">เงื่อนไขการคืนเงิน</RouterLink>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import generatePayload from 'promptpay-qr'
import QRCode from 'qrcode'
import { Gift, Check, Receipt, Bot } from 'lucide-vue-next'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { API_URL, inviteUrl } from '../config'

const invite = inviteUrl()
const priceText = ref('99')
const planDays = ref(30)
const graceDays = ref(3)
const trialDays = ref(30)
const qrUrl = ref('')

const perks = [
  'เปิดเพลงไม่จำกัด ใช้ได้ทุกห้องในดิส',
  'Dashboard ควบคุมผ่านเว็บแบบเรียลไทม์',
  'หมดอายุยังฟังต่อได้อีก 3 วัน',
  'ยกเลิกเมื่อไรก็ได้ ไม่มีผูกมัด',
]

const faqs = [
  { q: 'ทดลองฟรีต้องทำอะไรไหม?', a: 'ไม่ต้อง แค่เชิญบอทเข้าดิส ระบบเริ่มนับ 30 วันให้อัตโนมัติ เตะบอทออกแล้วเชิญใหม่ไม่รีวันใหม่นะ' },
  { q: 'จ่ายแล้วใช้ได้เมื่อไร?', a: 'ส่งสลิปแล้วรอเจ้าของตรวจ ปกติไม่กี่นาที (ไม่เกิน 1 วัน) อนุมัติแล้วใช้ได้ทันที นับ 30 วันจากวันหมดของเดิมถ้ายังไม่หมด' },
  { q: 'ใครคุมเพลงได้บ้าง?', a: 'คนมี role ชื่อ DJ หรือแอดมินดิสคุมได้ทุกอย่าง เพื่อนในห้องเสียงขอเพลง/ข้ามเพลงได้ปกติ ไม่ต้อง login' },
  { q: 'คืนเงินได้ไหม?', a: 'ได้เฉพาะกรณีบอทใช้ไม่ได้เกิน 7 วันติดจากความผิดของเรา ยกเลิกเมื่อไรก็ได้โดยแค่ไม่ต้องต่ออายุ' },
  { q: '/setup คืออะไร?', a: 'คำสั่งให้บอทสร้างห้อง #ไอแว่น-ขอเพลง ให้เอง (แอดมินเท่านั้น) เลือกได้ 3 แบบ: ทุกคนเห็น / เห็นเฉพาะ role สมาชิก เช่น /setup role:@user (คนเข้าใหม่ไม่เห็นห้องจนกว่ารับยศ) / เฉพาะ DJ+แอดมินด้วย private:True' },
]

onMounted(async () => {
  try {
    const r = await fetch(`${API_URL}/billing/config`)
    const cfg = await r.json()
    priceText.value = String(cfg.price ?? 99)
    planDays.value = cfg.plan_days ?? 30
    graceDays.value = cfg.grace_days ?? 3
    trialDays.value = cfg.trial_days ?? 0
    if (cfg.promptpay_id) {
      const payload = generatePayload(cfg.promptpay_id, { amount: Number(cfg.price ?? 99) })
      qrUrl.value = await QRCode.toDataURL(payload, { width: 208, margin: 1 })
    }
  } catch (e) {
    console.warn('[pricing] config error', e)
  }
})
</script>
