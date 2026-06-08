<template>
  <div class="site-frame" :class="themeClass">
    <div class="scene scene-back" aria-hidden="true"></div>
    <AppNav
      :theme="theme"
      :is-search-open="isSearchOpen"
      @open-search="isSearchOpen = true"
      @set-theme="setTheme"
    />
    <RouterView />
    <AppFooter />
    <div v-if="isSearchOpen" class="search-backdrop" @click.self="isSearchOpen = false">
      <section class="search-modal glass-panel" role="dialog" aria-modal="true" aria-label="站内搜索">
        <div class="search-head">
          <div>
            <p class="eyebrow">Search</p>
            <h2>搜索这个小站</h2>
          </div>
          <button type="button" aria-label="关闭搜索" @click="isSearchOpen = false">×</button>
        </div>
        <input v-model.trim="searchQuery" type="search" placeholder="搜索照片、分类、描述..." autofocus />
        <div class="search-results">
          <RouterLink
            v-for="photo in filteredPhotos"
            :key="photo.slug"
            :to="`/photos/${photo.slug}`"
            @click="isSearchOpen = false"
          >
            <img :src="photo.src" :alt="photo.title" />
            <span>
              <strong>{{ photo.title }}</strong>
              <small>{{ photo.category }} · {{ photo.note }}</small>
            </span>
          </RouterLink>
          <p v-if="searchQuery && filteredPhotos.length === 0" class="empty-search">
            没有找到相关照片。
          </p>
          <p v-if="!searchQuery" class="empty-search">
            可以搜索“花草”“雨夜”“云天”，或者照片标题里的关键词。
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNav from '@/components/layout/AppNav.vue'
import { photos } from '@/data/photos'

type ThemeMode = 'light' | 'dark'

const isSearchOpen = ref(false)
const searchQuery = ref('')
const theme = ref<ThemeMode>('light')

const themeClass = computed(() => `theme-${theme.value}`)
const filteredPhotos = computed(() => {
  const query = searchQuery.value.toLowerCase()
  if (!query) return photos.slice(0, 6)

  return photos
    .filter((photo) =>
      [photo.title, photo.category, photo.note, photo.description, photo.location]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
    .slice(0, 8)
})

function setTheme(nextTheme: ThemeMode) {
  theme.value = nextTheme
  localStorage.setItem('site-theme', nextTheme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('site-theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    theme.value = savedTheme
  }
})
</script>
