<template>
  <header class="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a12]/70 backdrop-blur-xl">
    <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2.5">
        <img src="/bear-logo.png" alt="ไอแว่น" class="w-7 h-7 rounded-lg object-contain bg-white/5 border border-white/10" />
        <span class="font-display font-bold tracking-tight">ไอแว่น <span class="text-zinc-500 font-sans font-medium text-sm">DJ</span></span>
      </RouterLink>
      <nav class="flex items-center gap-1 sm:gap-2 text-sm">
        <RouterLink to="/pricing" class="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition">แพ็กเกจ</RouterLink>
        <RouterLink to="/billing" class="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition hidden sm:inline">ส่งสลิป</RouterLink>
        <a :href="invite" target="_blank" rel="noopener" class="ml-1 px-4 py-1.5 rounded-full bg-iris-500 hover:bg-iris-400 text-white font-medium transition text-[13px]">เชิญบอท</a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { inviteUrl } from '../config'
const invite = inviteUrl()
</script>
