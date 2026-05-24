import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage.vue'
import CodePage from '@/pages/CodePage.vue'
import HomePage from '@/pages/HomePage.vue'
import PhotographyPage from '@/pages/PhotographyPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/code', name: 'code', component: CodePage },
    { path: '/photos', name: 'photos', component: PhotographyPage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
