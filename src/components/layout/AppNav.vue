<template>
  <header class="app-nav glass-pill">
    <RouterLink class="brand" to="/">{{ profile.siteName }}</RouterLink>
    <nav aria-label="主导航">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        active-class=""
        exact-active-class=""
        :class="{ 'router-link-active': isActiveNav(item.to) }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="nav-actions" aria-label="页面工具">
      <button type="button" aria-label="搜索照片" title="搜索照片" @click="$emit('open-search')">
        <span aria-hidden="true">🔍</span>
        <small>搜索</small>
      </button>
      <button
        type="button"
        aria-label="切换到日间模式"
        title="日间模式"
        :class="{ active: theme === 'light' }"
        @click="$emit('set-theme', 'light')"
      >
        <span aria-hidden="true">☀️</span>
        <small>日间</small>
      </button>
      <button
        type="button"
        aria-label="切换到夜间模式"
        title="夜间模式"
        :class="{ active: theme === 'dark' }"
        @click="$emit('set-theme', 'dark')"
      >
        <span aria-hidden="true">🌙</span>
        <small>夜间</small>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { navItems, profile } from '@/data/profile'

const route = useRoute()

function isActiveNav(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

defineProps<{
  theme: 'light' | 'dark'
  isSearchOpen: boolean
}>()

defineEmits<{
  'open-search': []
  'set-theme': [theme: 'light' | 'dark']
}>()
</script>
