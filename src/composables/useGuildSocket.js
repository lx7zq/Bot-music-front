import { ref, watch, onUnmounted } from 'vue'

const WS_URL  = import.meta.env.VITE_WS_URL  || 'ws://localhost:8000/ws'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export function useGuildSocket(guildId /* Ref<string> */) {
  const connected = ref(false)
  const state     = ref(null)

  let ws = null
  let reconnectTimer = null

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
    const payload = { guild_id: guildId.value, action, ...extra }
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload))
    }
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
      body: JSON.stringify({ guild_id: guildId.value, index }),
    }).catch(console.warn)
  }

  connect()
  onUnmounted(() => {
    clearTimeout(reconnectTimer)
    ws?.close()
  })

  return { connected, state, sendAction, addSong, removeSong }
}