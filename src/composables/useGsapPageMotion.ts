import { nextTick, onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type MotionSetup = (helpers: {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
  mm: ReturnType<typeof gsap.matchMedia>
  root: HTMLElement
}) => void

export function useGsapPageMotion(rootRef: Ref<HTMLElement | null>, setup: MotionSetup) {
  let ctx: gsap.Context | null = null
  let mm: ReturnType<typeof gsap.matchMedia> | null = null

  const clear = () => {
    mm?.revert()
    mm = null
    ctx?.revert()
    ctx = null
  }

  const init = async () => {
    clear()
    await nextTick()
    if (!rootRef.value || typeof window === 'undefined') return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      rootRef.value.classList.add('motion-reduced')
      return
    }

    ctx = gsap.context(() => {
      mm = gsap.matchMedia()
      setup({ gsap, ScrollTrigger, mm, root: rootRef.value as HTMLElement })
    }, rootRef.value)

    window.requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  onMounted(() => {
    void init()
  })

  onBeforeUnmount(clear)

  return { refreshMotion: init, clearMotion: clear }
}
