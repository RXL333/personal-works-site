<template>
  <main ref="pageRoot" class="page-shell archive-page photography-page">
    <RouterLink class="corner-return" to="/" aria-label="回到首页">
      <span aria-hidden="true">←</span>
    </RouterLink>

    <header class="photo-journal-hero glass-panel">
      <div>
        <p class="eyebrow">Home / Photos</p>
        <h1>摄影作品 <span>({{ filteredPhotos.length }}/{{ photos.length }})</span></h1>
        <p>
          把日常里短暂的光，整理成可以回看的片段。这里更像一面胶片墙，而不是整齐划一的商品列表。
        </p>
      </div>
      <div class="photo-filter-panel" aria-label="照片分类">
        <button
          v-for="category in categories"
          :key="category"
          class="tag-chip filter-chip"
          :class="{ active: selectedCategory === category }"
          type="button"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>
    </header>

    <section class="featured-photo-strip glass-panel">
      <RouterLink class="featured-photo-image" :to="`/photos/${featuredPhoto.slug}`">
        <img
          :src="featuredPhoto.src"
          :alt="featuredPhoto.title"
          :width="featuredPhoto.width"
          :height="featuredPhoto.height"
        />
      </RouterLink>
      <div>
        <p class="eyebrow">Featured Frame / {{ featuredPhoto.category }}</p>
        <h2>{{ featuredPhoto.title }}</h2>
        <p>{{ featuredPhoto.note }}</p>
        <RouterLink class="soft-link compact" :to="`/photos/${featuredPhoto.slug}`">
          进入照片故事
        </RouterLink>
      </div>
    </section>

    <section class="film-wall" aria-label="摄影胶片墙">
      <RouterLink
        v-for="(photo, index) in filteredPhotos"
        :key="photo.slug"
        class="film-frame glass-panel"
        :class="filmFrameClass(index, photo)"
        :to="`/photos/${photo.slug}`"
      >
        <img :src="photo.src" :alt="photo.title" :width="photo.width" :height="photo.height" loading="lazy" />
        <div class="film-frame-caption">
          <span>{{ photo.date }} / {{ photo.category }}</span>
          <strong>{{ photo.title }}</strong>
          <p>{{ photo.note }}</p>
        </div>
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { photos } from '@/data/photos'
import type { PhotoWork } from '@/types/content'

const pageRoot = ref<HTMLElement | null>(null)
const selectedCategory = ref<'全部' | PhotoWork['category']>('全部')
const categories = computed<Array<'全部' | PhotoWork['category']>>(() => [
  '全部',
  ...new Set(photos.map((photo) => photo.category)),
])
const filteredPhotos = computed(() =>
  selectedCategory.value === '全部'
    ? photos
    : photos.filter((photo) => photo.category === selectedCategory.value),
)
const featuredPhoto = computed(() =>
  selectedCategory.value === '全部'
    ? photos.find((photo) => photo.featured) ?? photos[0]
    : filteredPhotos.value[0] ?? photos[0],
)

const filmFrameClass = (index: number, photo: PhotoWork) => ({
  'is-wide': photo.width > photo.height && index % 5 === 0,
  'is-tall': photo.height > photo.width && index % 4 !== 0,
  'is-polaroid': index % 6 === 2,
})

const selectCategory = async (category: '全部' | PhotoWork['category']) => {
  if (selectedCategory.value === category) return
  selectedCategory.value = category
  await nextTick()
  if (!pageRoot.value) return
  gsap.fromTo(
    pageRoot.value.querySelectorAll('.film-frame'),
    { autoAlpha: 0, y: 30, filter: 'grayscale(0.45) blur(8px)' },
    { autoAlpha: 1, y: 0, filter: 'grayscale(0) blur(0px)', duration: 0.52, stagger: 0.04, ease: 'power2.out' },
  )
}

useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, root }) => {
  gsap.from('.photo-journal-hero', { autoAlpha: 0, y: 28, duration: 0.68, ease: 'power3.out' })

  ScrollTrigger.create({
    trigger: '.featured-photo-strip',
    start: 'top 78%',
    onEnter: () => {
      gsap.fromTo(
        '.featured-photo-strip > *',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.12, overwrite: true },
      )
    },
    onLeaveBack: () => {
      gsap.set('.featured-photo-strip > *', { autoAlpha: 0, y: 20 })
    },
  })

  ScrollTrigger.batch(root.querySelectorAll('.film-frame'), {
    start: 'top 84%',
    onEnter: (frames) => {
      gsap.fromTo(
        frames,
        { autoAlpha: 0, y: 36, filter: 'grayscale(0.55) blur(9px)' },
        { autoAlpha: 1, y: 0, filter: 'grayscale(0) blur(0px)', duration: 0.74, stagger: 0.06 },
      )
    },
    onLeaveBack: (frames) => {
      gsap.to(frames, { autoAlpha: 0, y: 24, filter: 'grayscale(0.4) blur(7px)', duration: 0.24 })
    },
  })
})
</script>
