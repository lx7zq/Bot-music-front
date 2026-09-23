import { ref, watch, onUnmounted } from 'vue'

const WS_URL  = (import.meta.env.VITE_WS_URL  || 'ws://localhost:8000/ws')
  // ทน env ที่ใส่ scheme มาผิด (https:// → wss://, http:// → ws://)
  .replace(/^https:\/\//, 'wss://').replace(/^http:\/\//, 'ws://')
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useGuildSocket(guildId /* Ref<string> */) {
  const connected = ref(false)
  const state     = ref(null)
  // กุญแจ DJ มาจากลิงก์ ?key= ที่บอทแจกในดิส (ไม่มี = ดู+ขอเพลงได้อย่างเดียว)
  const dashboardKey = ref(
    typeof location !== 'undefined'
      ? new URLSearchParams(location.search).get('key') || ''
      : ''
  )
  const canControl = ref(false)

  let ws = null
  let reconnectTimer = null

  async function refreshCapability() {
    if (!guildId.value) return
    try {
      const r = await fetch(
        `${API_URL}/capability/${guildId.value}?key=${encodeURIComponent(dashboardKey.value)}`
      )
      const data = await r.json()
      canControl.value = !!data.can_control
    } catch {
      canControl.value = false
    }
  }

  function connect() {
    try {
      ws = new WebSocket(`${WS_URL}?guild_id=${guildId.value}`)
    } catch {
      scheduleReconnect()
      return
    }

    ws.onopen = () => {
      connected.value = true
      clearTimeout(reconnectTimer)
    }

    ws.onmessage = ({ data }) => {
      try {
        const msg = JSON.parse(data)
        if (msg.type === 'state_update' && String(msg.guild_id) === String(guildId.value)) {
          state.value = msg.state
        } else if (msg.type === 'full_state' && msg.state?.[guildId.value]) {
          state.value = msg.state[guildId.value]
        }
      } catch (e) {
        console.warn('[WS]', e)
      }
    }

    ws.onclose = () => {
      connected.value = false
      scheduleReconnect()
    }

    ws.onerror = () => ws?.close()
  }

  function scheduleReconnect() {
    clearTimeout(reconnectTimer)
    reconnectTimer = setTimeout(connect, 3000)
  }

  watch(guildId, () => {
    ws?.close()
    connect()
  })

  async function sendAction(action, extra = {}) {
    const payload = { guild_id: guildId.value, action, key: dashboardKey.value, ...extra }
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload))
      return
    }
    // fallback: WS ไม่พร้อม (ยังไม่ต่อ / Render sleep) → ยิง HTTP แทน
    await fetch(`${API_URL}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(console.warn)
  }

  async function addSong(query) {
    if (!query?.trim()) return
    await fetch(`${API_URL}/add_song`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guild_id: guildId.value, query: query.trim() }),
    }).catch(console.warn)
  }

  async function removeSong(index) {
    await fetch(`${API_URL}/remove_song`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guild_id: guildId.value, index, key: dashboardKey.value }),
    }).catch(console.warn)
  }

  refreshCapability()
  connect()
  onUnmounted(() => {
    clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { connected, state, sendAction, addSong, removeSong, canControl, dashboardKey }
}