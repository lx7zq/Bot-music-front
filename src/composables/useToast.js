import { ref } from 'vue'

let nextId = 1
const toasts = ref([])

export function useToast() {
  const push = (title, subtitle = '', ms = 3200) => {
    const id = nextId++
    toasts.value.push({ id, title, subtitle })
    if (toasts.value.length > 3) toasts.value.shift()
    setTimeout(() => dismiss(id), ms)
  }

  const dismiss = (id) => {
    const i = toasts.value.findIndex((t) => t.id === id)
    if (i !== -1) toasts.value.splice(i, 1)
  }

  return { toasts, push, dismiss }
}
