<template>
  <GlassPanel
    class="project-card"
    role="link"
    tabindex="0"
    :aria-label="`查看${project.title}详情`"
    @click="goToProject"
    @keydown.enter.prevent="goToProject"
    @keydown.space.prevent="goToProject"
  >
    <div class="project-illustration" aria-hidden="true">
      <img v-if="project.heroImage" :src="project.heroImage" :alt="project.title" />
      <span v-else>{{ project.category }}</span>
    </div>
    <div class="project-copy">
      <p class="eyebrow">{{ project.date }} · {{ project.category }} · {{ project.status }}</p>
      <h2>{{ project.title }}</h2>
      <p>{{ project.summary }}</p>
      <ul class="project-feature-list">
        <li v-for="feature in project.features.slice(0, 4)" :key="feature">{{ feature }}</li>
      </ul>
      <div class="chip-row">
        <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
      </div>
      <span class="soft-link compact">阅读详情</span>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import type { Project } from '@/types/content'

const props = defineProps<{
  project: Project
}>()

const router = useRouter()

function goToProject() {
  router.push(`/code/${props.project.slug}`)
}
</script>
