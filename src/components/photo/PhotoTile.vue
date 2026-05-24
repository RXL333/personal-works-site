<template>
  <article class="photo-tile">
    <img :src="photo.src" :alt="photo.title" loading="lazy" />
    <div class="photo-caption">
      <div>
        <strong>{{ photo.title }}</strong>
        <p>{{ photo.location }}</p>
      </div>
      <TagChip :label="photo.category" />
    </div>
  </article>
</template>

<script setup lang="ts">
import TagChip from '@/components/common/TagChip.vue'
import type { PhotoWork } from '@/types/content'

defineProps<{
  photo: PhotoWork
}>()
</script>
