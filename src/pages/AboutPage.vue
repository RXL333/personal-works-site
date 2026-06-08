<template>
  <main ref="pageRoot" class="page-shell about-page about-note-page">
    <RouterLink class="corner-return" to="/" aria-label="回到首页">
      <span aria-hidden="true">←</span>
    </RouterLink>

    <section class="about-letter glass-panel">
      <div class="avatar large profile-avatar">
        <img :src="profileAvatarSrc" alt="任笑林的头像" />
      </div>
      <div class="about-letter-copy">
        <p class="eyebrow">About / Personal Note</p>
        <h1>你好，我是任笑林。</h1>
        <p class="lead">
          我喜欢把一个想法做成能打开的页面，也喜欢用镜头收集生活里的安静瞬间。
        </p>
        <p>
          这个网站像我的小档案馆，放着我写过的项目、拍过的照片，以及正在慢慢成形的学习路径。
          我正在把这个网站当成一个长期作品来养，不是只为了放成果，也想留下自己学习、拍照、整理想法的过程。
          它不是一份冷冰冰的简历，更像一本会持续更新的个人手记。
        </p>
      </div>
    </section>

    <section class="about-slices">
      <GlassPanel v-for="slice in aboutSlices" :key="slice.title" class="about-slice-card">
        <span>{{ slice.index }}</span>
        <h2>{{ slice.title }}</h2>
        <p>{{ slice.copy }}</p>
        <div class="chip-row">
          <TagChip v-for="tag in slice.tags" :key="tag" :label="tag" />
        </div>
      </GlassPanel>
    </section>

    <section class="contact-copy-board glass-panel">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>联系方式</h2>
        <p>如果你正在浏览这个作品集，可以直接复制邮箱或 GitHub 链接。</p>
      </div>
      <div class="contact-copy-actions">
        <button type="button" class="soft-link compact" @click="copyText(email, 'email')">
          {{ copiedTarget === 'email' ? '已复制邮箱' : '复制邮箱' }}
        </button>
        <button type="button" class="soft-link compact" @click="copyText(githubUrl, 'github')">
          {{ copiedTarget === 'github' ? '已复制链接' : '复制 GitHub 链接' }}
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import { useGsapPageMotion } from '@/composables/useGsapPageMotion'
import { publicAsset } from '@/utils/assetPath'

const pageRoot = ref<HTMLElement | null>(null)
const profileAvatarSrc = publicAsset('/images/profile-avatar.png')
const email = '2654799110@qq.com'
const githubUrl = 'https://github.com/RXL333'
const copiedTarget = ref<'email' | 'github' | ''>('')
let copiedTimer: number | null = null

const aboutSlices = [
  {
    index: '01',
    title: '我在学习',
    copy: '我正在把前端、后端、AI 工具和交互网页串起来练习，让项目不只是能跑，也能被清楚地介绍出来。',
    tags: ['Vue', 'TypeScript', 'FastAPI', 'AI 工具'],
  },
  {
    index: '02',
    title: '我在创作',
    copy: '我会把课程项目、个人实验、说明图和详情页整理成完整作品，让每一个想法都能被打开、被阅读。',
    tags: ['个人网站', '项目说明', '交互实验', '作品复盘'],
  },
  {
    index: '03',
    title: '我在记录',
    copy: '我也会拍照，记录树影、花、天空和生活里很安静的片段，让这个网站保留一点真实的呼吸感。',
    tags: ['摄影', '生活片段', '自然观察', '手记'],
  },
]

const copyText = async (text: string, target: 'email' | 'github') => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const input = document.createElement('textarea')
    input.value = text
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

  copiedTarget.value = target
  if (copiedTimer !== null) window.clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => {
    copiedTarget.value = ''
  }, 1500)
}

useGsapPageMotion(pageRoot, ({ gsap, ScrollTrigger, root }) => {
  gsap.from('.profile-avatar', {
    autoAlpha: 0,
    y: 24,
    scale: 0.94,
    duration: 0.72,
    ease: 'power3.out',
  })
  gsap.from('.about-letter-copy > *', {
    autoAlpha: 0,
    y: 24,
    duration: 0.62,
    stagger: 0.1,
    delay: 0.08,
  })
  gsap.to('.profile-avatar', {
    y: -10,
    duration: 3.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  ScrollTrigger.batch(root.querySelectorAll('.about-slice-card, .contact-copy-board'), {
    start: 'top 82%',
    onEnter: (items) => {
      gsap.fromTo(items, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.66, stagger: 0.1 })
    },
    onLeaveBack: (items) => {
      gsap.to(items, { autoAlpha: 0, y: 24, duration: 0.24 })
    },
  })

  ScrollTrigger.batch(root.querySelectorAll('.about-slice-card .tag-chip'), {
    start: 'top 86%',
    onEnter: (items) => {
      gsap.fromTo(items, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.035 })
    },
  })
})
</script>
