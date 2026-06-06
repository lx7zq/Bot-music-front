import { ref, reactive, onUnmounted } from 'vue'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useWebSocket() {
  const connected = ref(false)
  const guilds = reactive({})   // guild_id → state
  const activeGuild = ref(null)

  let ws = null
  let reconnectTimer = null

  function connect() {
    try {
      ws = new WebSocket(WS_URL)
    } catch (e) {
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

        if (msg.type === 'full_state') {
          // ล้างของเก่า แล้วเติมใหม่ทั้งหมด
          Object.keys(guilds).forEach(k => delete guilds[k])
          Object.assign(guilds, msg.state)
          // auto-select guild แรก
          if (!activeGuild.value || !guilds[activeGuild.value]) {
            const first = Object.keys(guilds)[0]
            if (first) activeGuild.value = first
          }
        } else if (msg.type === 'state_update') {
          guilds[msg.guild_id] = msg.state
          // auto-select ถ้ายังไม่มี active
          if (!activeGuild.value) activeGuild.value = msg.guild_id
        }
      } catch (e) {
        console.warn('[WS] parse error', e)
      }
    }

    ws.onclose = () => {
      connected.value = false
      scheduleReconnect()
    }

    ws.onerror = () => {
      ws?.close()
    }
  }

  function scheduleReconnect() {
    clearTimeout(reconnectTimer)
    reconnectTimer = setTimeout(connect, 3000)
  }

  function send(payload) {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload))
      return true
    }
    return false
  }

  /**
   * ส่ง action ไปให้ bot
   * action ที่ bot รองรับ (ใน _handle_dashboard_cmd):
   *   skip | pause | resume | stop | restart | volume (+ value) | add_song (+ query) | remove_song (+ index)
   */
  async function sendAction(action, extra = {}) {
    if (!activeGuild.value) return
    send({ guild_id: activeGuild.value, action, ...extra })
  }

  /** เพิ่มเพลง — ส่งผ่าน HTTP /add_song แล้วให้ bot poll ไปเอง */
  async function addSong(query) {
    if (!activeGuild.value || !query?.trim()) return
    try {
      await fetch(`${API_URL}/add_song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guild_id: activeGuild.value, query: query.trim() }),
      })
    } catch (e) {
      console.warn('[addSong] fetch error', e)
    }
  }

  /** ลบเพลงใน queue — ส่งผ่าน HTTP /remove_song */
  async function removeSong(index) {
    if (!activeGuild.value) return
    try {
      await fetch(`${API_URL}/remove_song`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guild_id: activeGuild.value, index }),
      })
    } catch (e) {
      console.warn('[removeSong] fetch error', e)
    }
  }

  connect()
  onUnmounted(() => {
    clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { connected, guilds, activeGuild, sendAction, addSong, removeSong }
}