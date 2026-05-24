import { onMounted, onUnmounted, ref } from 'vue'

export function useRevealOnScroll() {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target, isVisible }
}
