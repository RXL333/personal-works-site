<template>
  <footer class="app-footer glass-pill">
    <span>© 2026 Ren Xiaolin</span>
    <div class="footer-links" aria-label="社交链接">
      <a v-for="link in profile.socials" :key="link.label" :href="link.href" :aria-label="link.label">
        {{ link.icon }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '@/data/profile'
</script>
