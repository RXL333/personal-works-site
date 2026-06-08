<template>
  <RouterLink class="photo-tile" :to="`/photos/${photo.slug}`">
    <img
      :src="photo.src"
      :alt="photo.title"
      :width="photo.width"
      :height="photo.height"
      loading="lazy"
    />
    <div class="photo-caption">
      <div>
        <strong>{{ photo.title }}</strong>
        <p>{{ photo.note }}</p>
      </div>
      <TagChip :label="photo.category" />
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TagChip from '@/components/common/TagChip.vue'
import type { PhotoWork } from '@/types/content'

defineProps<{
  photo: PhotoWork
}>()
</script>
