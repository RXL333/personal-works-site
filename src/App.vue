<template>
  <div class="site-frame">
    <div class="scene scene-back" aria-hidden="true"></div>
    <AppNav />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppNav from '@/components/layout/AppNav.vue'
</script>
