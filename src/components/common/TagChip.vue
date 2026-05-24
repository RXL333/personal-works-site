<template>
  <span class="tag-chip">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
