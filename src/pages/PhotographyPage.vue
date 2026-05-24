<template>
  <main class="page-shell archive-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">Home / Photos</p>
        <h1>风光与植物 <span>({{ photos.length }})</span></h1>
      </div>
      <RouterLink class="soft-link" to="/">回到首页</RouterLink>
    </header>

    <div class="archive-layout">
      <GlassPanel class="photo-gallery">
        <article class="featured-photo">
          <img :src="featuredPhoto.src" :alt="featuredPhoto.title" />
          <div>
            <TagChip :label="featuredPhoto.category" />
            <h2>{{ featuredPhoto.title }}</h2>
            <p>{{ featuredPhoto.note }}</p>
          </div>
        </article>
        <div class="photo-grid">
          <PhotoTile v-for="photo in photos" :key="photo.slug" :photo="photo" />
        </div>
      </GlassPanel>

      <aside class="sidebar-stack">
        <GlassPanel class="sidebar">
          <h2>分类</h2>
          <div class="chip-row">
            <TagChip v-for="category in categories" :key="category" :label="category" />
          </div>
        </GlassPanel>
        <GlassPanel class="sidebar">
          <h2>相册</h2>
          <p>花草观察 · {{ categoryCount('花草') + categoryCount('植物') }}</p>
          <p>河边散步 · {{ categoryCount('河谷') + categoryCount('湖畔') }}</p>
          <p>云与树影 · {{ categoryCount('云层') + categoryCount('树影') }}</p>
        </GlassPanel>
      </aside>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import PhotoTile from '@/components/photo/PhotoTile.vue'
import { photos } from '@/data/photos'
import type { PhotoWork } from '@/types/content'

const featuredPhoto = computed(() => photos.find((photo) => photo.featured) ?? photos[0])
const categories = computed(() => ['全部', ...new Set(photos.map((photo) => photo.category))])
const categoryCount = (category: PhotoWork['category']) =>
  photos.filter((photo) => photo.category === category).length
</script>
