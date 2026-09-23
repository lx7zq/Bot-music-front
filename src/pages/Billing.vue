<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100 flex flex-col">
    <SiteNav />
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute -top-32 left-1/3 w-[420px] h-[420px] bg-iris-500/12 rounded-full blur-[120px]"></div>
    </div>

    <main class="relative flex-1 w-full max-w-xl mx-auto px-6 py-12">
      <h1 class="font-display text-3xl font-bold tracking-tight text-center flex items-center justify-center gap-2.5">
        <Receipt class="w-7 h-7 text-iris-200" />ส่งสลิป
      </h1>
      <p class="mt-2 text-sm text-zinc-500 text-center">จ่ายแล้วอัปโหลดตรงนี้ เจ้าของตรวจแล้วต่ออายุให้ (ปกติไม่กี่นาที)</p>

      <!-- status card -->
      <div class="glass-panel mt-6 p-5 flex items-center gap-4">
        <span class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border"
          :class="{
            'bg-emerald-500/15 border-emerald-400/25 text-emerald-300': subTone === 'ok',
            'bg-amber-500/15 border-amber-400/25 text-amber-300': subTone === 'warn',
            'bg-red-500/15 border-red-400/25 text-red-300': subTone === 'bad',
            'bg-white/5 border-white/10 text-zinc-500': subTone === 'idle',
          }">
          <component :is="subIcon" class="w-5 h-5" />
        </span>
        <div class="min-w-0">
          <p class="text-[11px] uppercase tracking-[0.18em] text-zinc-500">สถานะดิสนี้</p>
          <p class="text-sm font-medium truncate">{{ subText }}</p>
          <button @click="refresh" class="mt-1 text-xs text-zinc-500 underline hover:text-zinc-200">รีเฟรช</button>
        </div>
      </div>

      <div v-if="statusLine" class="mt-4 px-4 py-3 rounded-2xl text-sm border animate-pop-in"
        :class="statusLine.ok ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-red-400/30 bg-red-500/10 text-red-200'">
        {{ statusLine.text }}
      </div>

      <div class="glass-panel mt-4 p-6 flex flex-col gap-5">
        <label class="text-sm">
          <span class="font-medium">รหัสดิส (Server ID)</span>
          <input v-model="guildId" type="text" placeholder="เช่น 802130450096586772"
            class="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none font-mono focus:border-iris-400/50 focus:ring-1 focus:ring-iris-400/30 transition placeholder-zinc-600" />
          <span class="block text-xs text-zinc-600 mt-1.5">คลิกขวาชื่อดิสใน Discord → Copy Server ID (ต้องเปิดโหมดนักพัฒนา)</span>
        </label>

        <label class="text-sm">
          <span class="font-medium">รูปสลิป</span>
          <div class="mt-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-center cursor-pointer hover:border-iris-400/40 hover:bg-white/[0.04] transition">
            <input @change="onFile" type="file" accept="image/png,image/jpeg,image/webp" class="hidden" ref="fileInput" />
            <div @click="$refs.fileInput.click()">
              <Upload class="w-6 h-6 mx-auto text-zinc-500" />
              <p class="mt-2 text-[13px] text-zinc-300">{{ file ? file.name : 'แตะเพื่อเลือกรูป (png/jpg ไม่เกิน 5MB)' }}</p>
            </div>
          </div>
        </label>

        <button @click="submit" :disabled="!canSubmit || sending"
          class="rounded-full bg-iris-500 hover:bg-iris-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 transition active:scale-95">
          {{ sending ? 'กำลังส่ง...' : 'ส่งสลิป' }}
        </button>

        <p class="text-xs text-zinc-600 text-center">รูปสลิปถูกลบทันทีหลังตรวจเสร็จ ไม่เก็บไว้ • ส่งแล้วไม่ต้องส่งซ้ำ</p>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Receipt, Upload, CheckCircle2, Gift, AlertTriangle, XCircle, MinusCircle,
} from 'lucide-vue-next'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import { API_URL } from '../config'

const route = useRoute()
const guildId = ref(route.query.guild || '')
const file = ref(null)
const sending = ref(false)
const statusLine = ref(null)
const sub = ref(null)

const canSubmit = computed(() => guildId.value.trim() && file.value)

function onFile(e) {
  file.value = e.target.files?.[0] || null
}

async function refresh() {
  if (!guildId.value.trim()) return
  try {
    const r = await fetch(`${API_URL}/billing/status/${guildId.value.trim()}`)
    sub.value = await r.json()
  } catch (e) {
    console.warn('[billing] status error', e)
  }
}

const subTone = computed(() => {
  if (!sub.value) return 'idle'
  if (sub.value.paid || sub.value.trial) return 'ok'
  if (sub.value.in_grace) return 'warn'
  if (sub.value.paid_until || sub.value.trial_expired) return 'bad'
  return 'idle'
})

const subIcon = computed(() => {
  if (!sub.value) return MinusCircle
  if (sub.value.paid) return CheckCircle2
  if (sub.value.trial) return Gift
  if (sub.value.in_grace) return AlertTriangle
  return XCircle
})

const subText = computed(() => {
  if (!sub.value) return guildId.value ? 'กำลังโหลด...' : 'ใส่รหัสดิสเพื่อดูสถานะ'
  if (sub.value.paid) return `ใช้งานได้ถึง ${sub.value.paid_until}`
  if (sub.value.trial) return `ทดลองใช้เหลืออีก ${sub.value.trial_left} วัน`
  if (sub.value.trial_expired) return 'หมดช่วงทดลองแล้ว — ส่งสลิปเพื่อเริ่ม 99฿/เดือน'
  if (sub.value.in_grace) return `หมดอายุ ${sub.value.paid_until} (ฟังได้ช่วงผ่อนผัน)`
  if (sub.value.paid_until) return `หมดอายุ ${sub.value.paid_until}`
  return 'ยังไม่เคยสมัคร — ส่งสลิปครั้งแรกได้เลย'
})

async function submit() {
  if (!canSubmit.value) return
  sending.value = true
  statusLine.value = null
  try {
    const form = new FormData()
    form.append('slip', file.value)
    const r = await fetch(
      `${API_URL}/billing/submit?guild_id=${encodeURIComponent(guildId.value.trim())}`,
      { method: 'POST', body: form }
    )
    const data = await r.json()
    if (!r.ok) throw new Error(data.detail || 'ส่งไม่สำเร็จ')
    statusLine.value = { ok: true, text: 'รับสลิปแล้ว กำลังรอตรวจ (ปกติไม่กี่นาที) ส่งแล้วไม่ต้องส่งซ้ำ' }
    file.value = null
    await refresh()
  } catch (e) {
    statusLine.value = { ok: false, text: `${e.message} ลองใหม่อีกครั้ง` }
  } finally {
    sending.value = false
  }
}

watch(guildId, refresh)
onMounted(refresh)
</script>
