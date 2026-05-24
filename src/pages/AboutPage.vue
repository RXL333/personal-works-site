<template>
  <main class="page-shell about-page">
    <GlassPanel class="about-card">
      <div class="avatar large" aria-hidden="true">林</div>
      <div>
        <p class="eyebrow">About</p>
        <h1>{{ profile.displayName }}</h1>
        <p>{{ profile.intro }}</p>
        <div class="chip-row">
          <TagChip v-for="role in profile.roles" :key="role" :label="role" />
        </div>
      </div>
    </GlassPanel>

    <section class="about-grid">
      <GlassPanel>
        <h2>正在学习</h2>
        <p>Vue、TypeScript、前端工程化、滚动动效与组件设计。这个网站也会作为长期练习项目继续迭代。</p>
      </GlassPanel>
      <GlassPanel>
        <h2>喜欢拍摄</h2>
        <p>风光、植物、河流、树影，以及路上遇见的安静瞬间。照片会先从已有素材慢慢整理起来。</p>
      </GlassPanel>
      <GlassPanel>
        <h2>这个网站</h2>
        <p>它不是一次性的作品集，而是一个可以持续更新的个人博客空间。</p>
      </GlassPanel>
    </section>
  </main>
</template>

<script setup lang="ts">
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import { profile } from '@/data/profile'
</script>
