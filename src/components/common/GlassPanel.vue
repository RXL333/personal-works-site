<template>
  <section ref="target" class="glass-panel reveal" :class="{ 'is-visible': isVisible }">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const { target, isVisible } = useRevealOnScroll()
</script>
