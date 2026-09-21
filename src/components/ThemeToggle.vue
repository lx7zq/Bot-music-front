<template>
  <button @click="toggle" class="theme-toggle" :title="theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'">
    <Sun v-if="theme === 'dark'" class="w-4 h-4" />
    <Moon v-else class="w-4 h-4" />
  </button>
</template>

<script setup>
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '../composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  color: #a1a1aa;
  transition: all 0.2s ease;
}
.theme-toggle:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}
.theme-toggle:active {
  transform: scale(0.9);
}
[data-theme="light"] .theme-toggle {
  border-color: rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.7);
  color: #52525b;
}
[data-theme="light"] .theme-toggle:hover {
  color: #18181b;
  background: rgba(0, 0, 0, 0.06);
}
</style>
