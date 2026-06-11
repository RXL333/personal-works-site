<template>
  <main ref="pageRoot" class="page-shell photo-detail-page photo-story-page">
    <RouterLink class="corner-return" to="/photos" aria-label="返回摄影">
      <span aria-hidden="true">←</span>
    </RouterLink>

    <template v-if="photo">
      <section class="photo-story-hero glass-panel">
        <aside class="photo-story-copy">
          <p class="eyebrow">{{ photo.date }} / {{ photo.location }}</p>
          <h1>{{ photo.title }}</h1>
          <TagChip :label="photo.category" />
          <p class="lead">{{ photo.note }}</p>
          <dl>
            <div>
              <dt>画幅</dt>
              <dd>{{ orientationLabel }}</dd>
            </div>
            <div>
              <dt>尺寸</dt>
              <dd>{{ photo.width }} × {{ photo.height }}</dd>
            </div>
          </dl>
        </aside>

        <figure class="photo-story-image">
          <img :src="photo.src" :alt="photo.title" :width="photo.width" :height="photo.height" />
        </figure>
      </section>

      <section class="photo-story-body">
        <article v-for="section in storySections" :key="section.title" class="photo-story-block glass-panel">
          <p class="eyebrow">{{ section.kicker }}</p>
          <h2>{{ section.title }}</h2>
          <p>{{ section.copy }}</p>
        </article>
      </section>

      <section v-if="relatedPhotos.length" class="related-section">
        <div class="section-heading">
          <p class="eyebrow">Related</p>
          <h2>同类照片</h2>
        </div>
        <div class="photo-grid related-grid">
          <PhotoTile v-for="item in relatedPhotos" :key="item.slug" :photo="item" />
        </div>
      </section>
    </template>

    <GlassPanel v-else class="missing-photo">
      <h1>没有找到这张照片</h1>
      <p>可能是照片已经被重新整理，回到摄影页再看看。</p>
    </GlassPanel>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import PhotoTile from '@/components/photo/PhotoTile.vue'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { photos } from '@/data/photos'

const pageRoot = ref<HTMLElement | null>(null)
const route = useRoute()
const photo = computed(() => photos.find((item) => item.slug === route.params.slug))
const orientationLabel = computed(() => {
  if (!photo.value) return ''
  const ratio = photo.value.width / photo.value.height
  if (ratio > 1.55) return '宽幅横图'
  if (ratio > 1.05) return '横图'
  if (ratio < 0.82) return '竖图'
  return '近方形'
})
const storySections = computed(() => {
  if (!photo.value) return []
  return [
    {
      kicker: 'Moment',
      title: '拍摄瞬间',
      copy: photo.value.note,
    },
    {
      kicker: 'Observation',
      title: '画面观察',
      copy: photo.value.description,
    },
    {
      kicker: 'Memory',
      title: '我的记忆',
      copy: `我把它放进相册，是因为它保留了一个很小但具体的瞬间：${photo.value.location}、${photo.value.date}，以及当时被我注意到的那一点光。`,
    },
  ]
})
const relatedPhotos = computed(() =>
  photo.value
    ? photos
        .filter((item) => item.category === photo.value?.category && item.slug !== photo.value.slug)
        .slice(0, 3)
    : [],
)

const motion = useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, root }) => {
  if (window.matchMedia('(min-width: 861px)').matches) {
    gsap.from('.photo-story-copy > *, .photo-story-image', {
      autoAlpha: 0,
      y: 28,
      duration: 0.76,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }

  ScrollTrigger.batch(root.querySelectorAll('.photo-story-block, .related-grid .photo-tile'), {
    start: 'top 82%',
    onEnter: (items) => {
      gsap.fromTo(items, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 })
    },
    onLeaveBack: (items) => {
      gsap.to(items, { autoAlpha: 0, y: 20, duration: 0.24 })
    },
  })
})

watch(
  () => route.params.slug,
  () => {
    void motion.refreshMotion()
  },
)
</script>
