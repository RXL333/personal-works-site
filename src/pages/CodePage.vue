<template>
  <main class="page-shell archive-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">Home / Code</p>
        <h1>编程作品 <span>({{ projects.length }})</span></h1>
      </div>
      <RouterLink class="soft-link" to="/">回到首页</RouterLink>
    </header>

    <div class="archive-layout">
      <section class="card-list" aria-label="编程作品列表">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </section>

      <GlassPanel class="sidebar">
        <h2>先留一个入口</h2>
        <p>这个部分后面再和你一起详细拆项目内容、截图、技术栈和项目详情页。</p>
        <div class="chip-row">
          <TagChip label="Vue" />
          <TagChip label="TypeScript" />
          <TagChip label="GitHub Pages" />
        </div>
      </GlassPanel>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import { projects } from '@/data/projects'
</script>
