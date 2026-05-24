<template>
  <main class="page-shell home-page">
    <section class="hero-stage">
      <div class="hero-photo-wrap" aria-hidden="true">
        <img :src="featuredPhoto.src" :alt="featuredPhoto.title" />
      </div>

      <div class="hero-content">
        <GlassPanel class="hero-copy">
          <p class="eyebrow">个人博客 · 作品归档 · 自然观察</p>
          <h1>{{ profile.headline }}</h1>
          <p>{{ profile.intro }}</p>
          <div class="hero-actions">
            <RouterLink to="/photos">先看摄影</RouterLink>
            <RouterLink to="/about">了解一下</RouterLink>
          </div>
        </GlassPanel>

        <div class="entry-grid">
          <RouterLink to="/photos" class="entry-card glass-panel">
            <span>01</span>
            <strong>风光与植物</strong>
            <p>把路上的光、花草和云层收进相册。</p>
          </RouterLink>
          <RouterLink to="/code" class="entry-card glass-panel">
            <span>02</span>
            <strong>编程作品</strong>
            <p>项目内容后续细化，先保留完整入口。</p>
          </RouterLink>
          <RouterLink to="/about" class="entry-card glass-panel">
            <span>03</span>
            <strong>关于我</strong>
            <p>前端学习、摄影记录和长期更新的小站。</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="section-heading">
        <p class="eyebrow">Recently</p>
        <h2>最近动态</h2>
      </div>
      <div class="activity-list">
        <GlassPanel v-for="item in activities" :key="item.id" class="activity-card">
          <p class="eyebrow">{{ item.date }} · {{ item.kind }}</p>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <div class="chip-row">
            <TagChip v-for="tag in item.tags" :key="tag" :label="tag" />
          </div>
        </GlassPanel>
      </div>
    </section>

    <section class="home-section split-preview">
      <GlassPanel class="photo-preview">
        <div class="section-heading">
          <p class="eyebrow">Photos</p>
          <h2>风光与植物</h2>
        </div>
        <div class="mini-gallery">
          <img v-for="photo in previewPhotos" :key="photo.slug" :src="photo.src" :alt="photo.title" />
        </div>
      </GlassPanel>

      <GlassPanel class="future-preview">
        <p class="eyebrow">Next</p>
        <h2>以后会慢慢长出</h2>
        <p>文章、手记、实验室、植物图鉴和旅行地图会作为后续栏目补充。</p>
        <div class="chip-row">
          <TagChip label="文章" />
          <TagChip label="手记" />
          <TagChip label="实验室" />
          <TagChip label="植物图鉴" />
        </div>
      </GlassPanel>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import { activities } from '@/data/activity'
import { photos } from '@/data/photos'
import { profile } from '@/data/profile'

const featuredPhoto = computed(() => photos.find((photo) => photo.featured) ?? photos[0])
const previewPhotos = computed(() => photos.slice(0, 4))
</script>
