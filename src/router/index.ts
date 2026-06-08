import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'
import AboutPage from '@/pages/AboutPage.vue'
import CodePage from '@/pages/CodePage.vue'
import HomePage from '@/pages/HomePage.vue'
import PhotoDetailPage from '@/pages/PhotoDetailPage.vue'
import PhotographyPage from '@/pages/PhotographyPage.vue'
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'

const resetScrollTop = () => {
  if (typeof window === 'undefined') return

  window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export const router = createRouter({
  history:
    typeof window === 'undefined'
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/code', name: 'code', component: CodePage },
    { path: '/code/:slug', name: 'project-detail', component: ProjectDetailPage },
    { path: '/photos', name: 'photos', component: PhotographyPage },
    { path: '/photos/:slug', name: 'photo-detail', component: PhotoDetailPage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }

    return { left: 0, top: 0, behavior: 'auto' }
  },
})

if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  router.beforeEach((_to, _from, next) => {
    resetScrollTop()
    next()
  })

  router.afterEach(async () => {
    await nextTick()
    resetScrollTop()

    window.requestAnimationFrame(() => {
      resetScrollTop()
      window.requestAnimationFrame(resetScrollTop)
    })

    window.setTimeout(resetScrollTop, 120)
    window.setTimeout(resetScrollTop, 320)
  })
}
