<template>
  <header class="app-nav glass-pill">
    <RouterLink class="brand" to="/">{{ profile.siteName }}</RouterLink>
    <nav aria-label="主导航">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="nav-actions" aria-label="页面工具">
      <button type="button" aria-label="搜索">⌕</button>
      <button type="button" aria-label="浅色模式">☼</button>
      <button type="button" aria-label="夜间模式">☾</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navItems, profile } from '@/data/profile'
</script>
