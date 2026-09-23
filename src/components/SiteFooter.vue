<template>
  <footer class="border-t border-white/10 py-8 mt-auto">
    <div class="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-sm text-zinc-500">
        <img src="/bear-logo.png" alt="" class="w-5 h-5 rounded object-contain opacity-70" />
        <span>ไอแว่น DJ — หมีเปิดเพลงประจำดิสคุณ 🐻</span>
      </div>
      <div class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
        <RouterLink to="/pricing" class="hover:text-zinc-200">แพ็กเกจ</RouterLink>
        <RouterLink to="/billing" class="hover:text-zinc-200">ส่งสลิป</RouterLink>
        <RouterLink to="/terms" class="hover:text-zinc-200">ข้อกำหนด</RouterLink>
        <RouterLink to="/privacy" class="hover:text-zinc-200">ความเป็นส่วนตัว</RouterLink>
      </div>
    </div>
  </footer>
</template>
