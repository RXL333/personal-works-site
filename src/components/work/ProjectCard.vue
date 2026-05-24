<template>
  <GlassPanel class="project-card">
    <div class="project-illustration" aria-hidden="true">
      <span>DEV</span>
    </div>
    <div class="project-copy">
      <p class="eyebrow">{{ project.date }} · {{ project.category }}</p>
      <h2>{{ project.title }}</h2>
      <p>{{ project.summary }}</p>
      <div class="chip-row">
        <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
      </div>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import type { Project } from '@/types/content'

defineProps<{
  project: Project
}>()
</script>
