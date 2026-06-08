<template>
  <main ref="pageRoot" class="page-shell archive-page code-page code-index-page">
    <RouterLink class="corner-return" to="/" aria-label="回到首页">
      <span aria-hidden="true">←</span>
    </RouterLink>

    <header class="code-index-hero glass-panel">
      <div class="code-index-copy">
        <p class="eyebrow">Home / Code</p>
        <h1>编程作品 <span>({{ projects.length }})</span></h1>
        <p>
          这些项目记录了我从前端页面、后端系统到交互实验的练习路径。每一个详情页都像 README，
          但会多一点截图、动效和真实的项目复盘。
        </p>
      </div>
      <div class="code-index-stats" aria-label="项目统计">
        <article v-for="stat in projectStats" :key="stat.label">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </article>
      </div>
    </header>

    <section class="featured-project-band glass-panel">
      <div class="featured-project-copy">
        <p class="eyebrow">Featured Project</p>
        <h2>{{ featuredProject.title }}</h2>
        <p>{{ featuredProject.summary }}</p>
        <div class="chip-row">
          <TagChip v-for="tag in featuredProject.stack.slice(0, 5)" :key="tag" :label="tag" />
        </div>
        <RouterLink class="soft-link compact" :to="`/code/${featuredProject.slug}`">
          阅读详情
        </RouterLink>
      </div>
      <RouterLink class="featured-project-image" :to="`/code/${featuredProject.slug}`">
        <img :src="featuredProject.heroImage" :alt="featuredProject.title" />
      </RouterLink>
    </section>

    <section class="code-category-strip glass-panel">
      <article
        v-for="(category, index) in categoryFocus"
        :key="category.title"
        :class="{ 'is-active': activeCategoryIndex === index }"
      >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ category.title }}</strong>
        <p>{{ category.copy }}</p>
      </article>
    </section>

    <section class="project-index-grid" aria-label="编程作品列表">
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import TagChip from '@/components/common/TagChip.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { projects } from '@/data/projects'

const pageRoot = ref<HTMLElement | null>(null)
const activeCategoryIndex = ref(0)
const featuredProject = computed(() => projects.find((project) => project.slug === 'ai-study-helper') ?? projects[0])

const fullStackCount = computed(() =>
  projects.filter((project) =>
    ['AI 全栈应用', '管理系统', '校园平台'].some((keyword) => project.category.includes(keyword)),
  ).length,
)
const creativeCount = computed(() =>
  projects.filter((project) => ['创意交互', '游戏'].some((keyword) => project.category.includes(keyword))).length,
)
const extensionCount = computed(() => projects.filter((project) => project.category.includes('扩展')).length)

const projectStats = computed(() => [
  { label: '项目数量', value: projects.length },
  { label: '全栈/后台', value: fullStackCount.value },
  { label: '浏览器扩展', value: extensionCount.value },
  { label: '创意实验', value: creativeCount.value },
])

const categoryFocus = [
  {
    title: '全栈应用',
    copy: 'AI 学习助手把前端、后端、数据库和 AI 服务串成学习闭环。',
  },
  {
    title: '后台系统',
    copy: '图书管理系统和校园平台更关注业务对象、列表管理和流程组织。',
  },
  {
    title: '浏览器扩展',
    copy: '学习通扩展强调网页识别、内容脚本、配置面板和安全边界。',
  },
  {
    title: '交互实验',
    copy: '粒子手势和像素机甲更像视觉与规则驱动的小型实验场。',
  },
]

useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, mm, root }) => {
  gsap.from('.code-index-hero', { autoAlpha: 0, y: 30, duration: 0.7, ease: 'power3.out' })
  gsap.from('.code-index-stats article', {
    autoAlpha: 0,
    y: 24,
    duration: 0.54,
    stagger: 0.08,
    delay: 0.12,
  })

  ScrollTrigger.create({
    trigger: '.featured-project-band',
    start: 'top 78%',
    onEnter: () => {
      gsap.fromTo(
        '.featured-project-band > *',
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.12, overwrite: true },
      )
    },
    onLeaveBack: () => {
      gsap.set('.featured-project-band > *', { autoAlpha: 0, y: 24 })
    },
  })

  mm.add('(min-width: 861px)', () => {
    const strip = root.querySelector<HTMLElement>('.code-category-strip')
    if (!strip) return undefined

    ScrollTrigger.create({
      trigger: strip,
      pin: true,
      start: 'top 118px',
      end: '+=760',
      scrub: 0.45,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        activeCategoryIndex.value = Math.min(categoryFocus.length - 1, Math.floor(self.progress * categoryFocus.length))
      },
      onLeave: () => {
        activeCategoryIndex.value = categoryFocus.length - 1
      },
      onLeaveBack: () => {
        activeCategoryIndex.value = 0
      },
    })

    return undefined
  })

  mm.add('(max-width: 860px)', () => {
    ScrollTrigger.create({
      trigger: '.code-category-strip',
      start: 'top 78%',
      end: 'bottom 38%',
      scrub: 0.45,
      onUpdate: (self) => {
        activeCategoryIndex.value = Math.min(categoryFocus.length - 1, Math.floor(self.progress * categoryFocus.length))
      },
    })
  })

  ScrollTrigger.batch(root.querySelectorAll('.project-card'), {
    start: 'top 82%',
    onEnter: (cards) => {
      gsap.fromTo(cards, { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: 0.64, stagger: 0.08 })
    },
    onLeaveBack: (cards) => {
      gsap.to(cards, { autoAlpha: 0, y: 24, duration: 0.24, overwrite: true })
    },
  })
})
</script>
