import { ref, watch } from 'vue'

const STORAGE_KEY = 'theme'

function initialTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'dark'
  } catch {
    return 'dark'
  }
}

const theme = ref(initialTheme())

function apply(t) {
  document.documentElement.dataset.theme = t
}

apply(theme.value)

watch(theme, (t) => {
  try {
    localStorage.setItem(STORAGE_KEY, t)
  } catch {
    /* ignore */
  }
  apply(t)
})

export function useTheme() {
  const toggle = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
