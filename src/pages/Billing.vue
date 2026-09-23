<template>
  <div class="app-root min-h-screen bg-[#0a0a12] font-sans text-zinc-100">
    <div class="max-w-xl mx-auto px-6 py-12">
      <RouterLink to="/pricing" class="text-sm text-zinc-400 hover:text-zinc-100">← กลับไปแพ็กเกจ</RouterLink>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">ส่งสลิป 🧾</h1>
      <p class="mt-2 text-sm text-zinc-500">จ่ายแล้วอัปโหลดสลิปตรงนี้ เจ้าของตรวจแล้วต่ออายุให้ (ปกติไม่กี่นาที)</p>

      <div v-if="statusLine" class="glass-panel mt-6 px-4 py-3 text-sm" :class="statusLine.ok ? 'text-emerald-300' : 'text-zinc-300'">
        {{ statusLine.text }}
      </div>

      <div class="glass-panel mt-6 p-6 flex flex-col gap-4">
        <label class="text-sm text-zinc-400">
          รหัสดิส (Guild ID)
          <span class="block text-xs text-zinc-600 mt-0.5">คลิกขวาชื่อดิสใน Discord → Copy Server ID (เปิดโหมดนักพัฒนา)</span>
          <input v-model="guildId" type="text" placeholder="เช่น 802130450096586772"
            class="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none font-mono focus:border-indigo-400/50" />
        </label>

        <label class="text-sm text-zinc-400">
          รูปสลิป (png/jpg ไม่เกิน 5MB)
          <input @change="onFile" type="file" accept="image/png,image/jpeg,image/webp"
            class="mt-2 block w-full text-sm text-zinc-300 file:mr-3 file:px-4 file:py-2 file:rounded-full file:border-0 file:bg-indigo-500 file:text-white file:text-sm hover:file:bg-indigo-400" />
        </label>

        <button @click="submit" :disabled="!canSubmit || sending"
          class="rounded-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 transition">
          {{ sending ? 'กำลังส่ง...' : 'ส่งสลิป' }}
        </button>

        <p class="text-xs text-zinc-600">รูปสลิปถูกลบทันทีหลังตรวจเสร็จ ไม่เก็บไว้ (ดูนโยบายความเป็นส่วนตัวได้)</p>
      </div>

      <div v-if="guildId" class="glass-panel mt-6 p-5 text-sm text-zinc-400">
        <p class="font-semibold text-zinc-200">สถานะดิสนี้</p>
        <p class="mt-1">{{ subText }}</p>
        <button @click="refresh" class="mt-2 text-xs underline hover:text-zinc-200">รีเฟรช</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
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

const subText = computed(() => {
  if (!sub.value) return '—'
  if (sub.value.paid) return `✅ ใช้งานได้ถึง ${sub.value.paid_until}`
  if (sub.value.in_grace) return `⚠️ หมดอายุ ${sub.value.paid_until} (ยังฟังได้ช่วงผ่อนผัน รีบต่อนะ)`
  if (sub.value.paid_until) return `❌ หมดอายุ ${sub.value.paid_until} — ส่งสลิปเพื่อต่ออายุ`
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
    statusLine.value = { ok: true, text: '✅ รับสลิปแล้ว กำลังรอตรวจ (ปกติไม่กี่นาที) ส่งแล้วไม่ต้องส่งซ้ำนะ ♡' }
    file.value = null
    await refresh()
  } catch (e) {
    statusLine.value = { ok: false, text: `❌ ${e.message} ลองใหม่นะ` }
  } finally {
    sending.value = false
  }
}

watch(guildId, refresh)
onMounted(refresh)
</script>
