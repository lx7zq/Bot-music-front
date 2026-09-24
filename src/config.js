// ค่ากลางของเว็บ (รหัสลับอย่างเบอร์พร้อมเพย์ดึงจาก backend /billing/config แทน)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const BOT_CLIENT_ID = import.meta.env.VITE_BOT_CLIENT_ID || '1512172686254800986'
export const INVITE_PERMS = '36785168' // view+send+embed+history+connect+speak+VAD+manage-channels

export function inviteUrl() {
  return `https://discord.com/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=${INVITE_PERMS}&scope=bot+applications.commands`
}
