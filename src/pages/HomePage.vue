<template>
  <main ref="pageRoot" class="page-shell home-page archive-home">
    <section class="home-cover">
      <div class="home-cover-copy">
        <p class="eyebrow">Personal Archive / Nature Notebook</p>
        <h1>
          <span>笑林的精神世界</span>
          <small>一本会呼吸的个人作品集</small>
        </h1>
        <p class="home-cover-intro">
          写代码，也记录光落在生活里的样子。这里收着我的编程作品、摄影片段和一点点正在长大的自我介绍。
        </p>
        <div class="hero-actions">
          <RouterLink to="/code">查看编程</RouterLink>
          <RouterLink to="/photos">翻开相册</RouterLink>
        </div>
      </div>

      <div class="workbook-preview" aria-label="今日打开的作品册">
        <RouterLink
          v-for="entry in workbookEntries"
          :key="entry.to"
          class="workbook-page glass-panel"
          :to="entry.to"
          :style="{ '--page-accent': entry.accent }"
        >
          <span>{{ entry.index }}</span>
          <img v-if="entry.image" :src="entry.image" :alt="entry.title" />
          <div>
            <small>{{ entry.kicker }}</small>
            <strong>{{ entry.title }}</strong>
            <p>{{ entry.copy }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="home-section home-latest-section">
      <div class="section-heading">
        <p class="eyebrow">Recently Filed</p>
        <h2>最近整理</h2>
      </div>

      <div class="latest-archive-grid">
        <RouterLink class="latest-card glass-panel" :to="`/code/${featuredProject.slug}`">
          <img :src="featuredProject.heroImage" :alt="featuredProject.title" />
          <div>
            <p class="eyebrow">Code / {{ featuredProject.category }}</p>
            <h3>{{ featuredProject.title }}</h3>
            <p>{{ featuredProject.summary }}</p>
            <div class="chip-row">
              <TagChip v-for="tag in featuredProject.stack.slice(0, 4)" :key="tag" :label="tag" />
            </div>
          </div>
        </RouterLink>

        <RouterLink class="latest-card photo-latest-card glass-panel" :to="`/photos/${featuredPhoto.slug}`">
          <img :src="featuredPhoto.src" :alt="featuredPhoto.title" />
          <div>
            <p class="eyebrow">Photo / {{ featuredPhoto.category }}</p>
            <h3>{{ featuredPhoto.title }}</h3>
            <p>{{ featuredPhoto.note }}</p>
            <div class="chip-row">
              <TagChip :label="featuredPhoto.date" />
              <TagChip :label="featuredPhoto.location" />
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="home-section archive-note-section glass-panel">
      <div>
        <p class="eyebrow">Archive Note</p>
        <h2>这个网站会继续长大</h2>
      </div>
      <p>
        编程页像项目索引台，摄影页像胶片墙，关于页像个人手记。后续每一次补图、补文字和调整动效，都会让这本作品册更完整一点。
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import TagChip from '@/components/common/TagChip.vue'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { photos } from '@/data/photos'
import { projects } from '@/data/projects'
import { publicAsset } from '@/utils/assetPath'

const pageRoot = ref<HTMLElement | null>(null)
const featuredProject = computed(() => projects.find((project) => project.featured) ?? projects[0])
const featuredPhoto = computed(() => photos.find((photo) => photo.featured) ?? photos[0])

const workbookEntries = computed(() => [
  {
    index: '01',
    kicker: 'Code',
    title: '编程作品',
    copy: '从全栈应用、浏览器扩展到交互实验。',
    to: '/code',
    image: featuredProject.value.heroImage,
    accent: '#44a35b',
  },
  {
    index: '02',
    kicker: 'Photos',
    title: '摄影作品',
    copy: '风、花、树影和日常里安静的瞬间。',
    to: '/photos',
    image: featuredPhoto.value.src,
    accent: '#4d91c9',
  },
  {
    index: '03',
    kicker: 'About',
    title: '关于我',
    copy: '一点学习路径，一点创作习惯。',
    to: '/about',
    image: publicAsset('/images/profile-avatar.png'),
    accent: '#ef9a43',
  },
])

useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, mm, root }) => {
  const coverTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
  coverTimeline
    .from('.home-cover-copy .eyebrow', { autoAlpha: 0, y: 18, duration: 0.5 })
    .from('.home-cover-copy h1 span', { autoAlpha: 0, y: 34, duration: 0.72 }, '-=0.18')
    .from('.home-cover-copy h1 small', { autoAlpha: 0, y: 20, duration: 0.52 }, '-=0.38')
    .from(
      '.home-cover-intro, .home-cover-copy .hero-actions',
      {
        autoAlpha: 0,
        y: 22,
        duration: 0.58,
        stagger: 0.1,
      },
      '-=0.24',
    )
    .from(
      '.workbook-page',
      {
        autoAlpha: 0,
        x: 42,
        y: 28,
        rotation: 2,
        duration: 0.7,
        stagger: 0.12,
      },
      '-=0.42',
    )

  gsap.to(root, {
    '--home-breath-y': '-18px',
    duration: 6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })

  ScrollTrigger.batch(root.querySelectorAll('.latest-card, .archive-note-section'), {
    start: 'top 82%',
    onEnter: (items) => {
      gsap.fromTo(items, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 })
    },
    onLeaveBack: (items) => {
      gsap.to(items, { autoAlpha: 0, y: 24, duration: 0.26, overwrite: true })
    },
  })

  mm.add('(min-width: 861px)', () => {
    const pages = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.workbook-page'))
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      pages.forEach((page, index) => {
        gsap.to(page, {
          x: x * (index + 1) * 10,
          y: y * (index + 1) * 8,
          duration: 0.45,
          overwrite: true,
        })
      })
    }

    root.addEventListener('pointermove', onMove)
    return () => root.removeEventListener('pointermove', onMove)
  })
})
</script>
