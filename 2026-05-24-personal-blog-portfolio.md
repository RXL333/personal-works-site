# Personal Blog Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh glassmorphism personal blog portfolio for Ren Xiaolin, with programming works, landscape/plant photography, an about page, scroll transitions, and GitHub Pages deployment readiness.

**Architecture:** Create a new Vue 3 + Vite + TypeScript app in `personal-blog-portfolio/`. Keep content in typed data modules under `src/data/`, visual primitives under `src/components/`, route pages under `src/pages/`, and scroll animation helpers under `src/composables/`. The first version is static and content-driven, so adding works or photos only requires editing data files and adding images.

**Tech Stack:** Vue 3, Vite, TypeScript, Vue Router, Vitest, Vue Test Utils, CSS variables, IntersectionObserver, GitHub Pages.

---

## File Structure

- Create: `personal-blog-portfolio/package.json` - scripts, dependencies, deployment commands.
- Create: `personal-blog-portfolio/index.html` - Vite app shell.
- Create: `personal-blog-portfolio/vite.config.ts` - Vue plugin, test config, GitHub Pages base.
- Create: `personal-blog-portfolio/tsconfig.json` - strict TypeScript settings.
- Create: `personal-blog-portfolio/src/main.ts` - app bootstrap.
- Create: `personal-blog-portfolio/src/App.vue` - persistent layout shell.
- Create: `personal-blog-portfolio/src/router/index.ts` - route definitions.
- Create: `personal-blog-portfolio/src/types/content.ts` - shared content types.
- Create: `personal-blog-portfolio/src/data/profile.ts` - personal profile, links, navigation labels.
- Create: `personal-blog-portfolio/src/data/projects.ts` - programming work records.
- Create: `personal-blog-portfolio/src/data/photos.ts` - landscape and plant photo records.
- Create: `personal-blog-portfolio/src/data/activity.ts` - recent updates feed.
- Create: `personal-blog-portfolio/src/composables/useRevealOnScroll.ts` - reusable reveal animation hook.
- Create: `personal-blog-portfolio/src/components/layout/AppNav.vue` - frosted capsule navigation.
- Create: `personal-blog-portfolio/src/components/layout/AppFooter.vue` - frosted footer toolbar.
- Create: `personal-blog-portfolio/src/components/common/GlassPanel.vue` - shared glass panel wrapper.
- Create: `personal-blog-portfolio/src/components/common/TagChip.vue` - tag chip.
- Create: `personal-blog-portfolio/src/components/work/ProjectCard.vue` - programming card.
- Create: `personal-blog-portfolio/src/components/photo/PhotoTile.vue` - photo tile.
- Create: `personal-blog-portfolio/src/pages/HomePage.vue` - visual entry page.
- Create: `personal-blog-portfolio/src/pages/CodePage.vue` - programming archive.
- Create: `personal-blog-portfolio/src/pages/PhotographyPage.vue` - landscape/plant gallery.
- Create: `personal-blog-portfolio/src/pages/AboutPage.vue` - personal profile page.
- Create: `personal-blog-portfolio/src/styles/base.css` - reset, typography, tokens.
- Create: `personal-blog-portfolio/src/styles/theme.css` - background, glass, motion styles.
- Create: `personal-blog-portfolio/src/__tests__/content.test.ts` - data integrity tests.
- Create: `personal-blog-portfolio/src/__tests__/routing.test.ts` - route smoke tests.
- Create: `personal-blog-portfolio/README.md` - run, build, and GitHub Pages instructions.
- Create: `personal-blog-portfolio/.github/workflows/deploy.yml` - GitHub Pages workflow.

---

### Task 1: Scaffold Vue App Metadata

**Files:**
- Create: `personal-blog-portfolio/package.json`
- Create: `personal-blog-portfolio/index.html`
- Create: `personal-blog-portfolio/vite.config.ts`
- Create: `personal-blog-portfolio/tsconfig.json`

- [ ] **Step 1: Create package metadata**

Write `personal-blog-portfolio/package.json`:

```json
{
  "name": "personal-blog-portfolio",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "vite": "^6.0.0",
    "vue": "^3.5.0",
    "vue-router": "^4.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@vue/test-utils": "^2.4.6",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0",
    "vue-tsc": "^2.2.0"
  }
}
```

- [ ] **Step 2: Create Vite HTML shell**

Write `personal-blog-portfolio/index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="晓林的精神世界：编程作品、风光摄影与植物观察。" />
    <title>晓林的精神世界</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 3: Create Vite config**

Write `personal-blog-portfolio/vite.config.ts`:

```ts
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/personal-blog-portfolio/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

- [ ] **Step 4: Create TypeScript config**

Write `personal-blog-portfolio/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vitest/globals"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.vue", "vite.config.ts"]
}
```

- [ ] **Step 5: Install dependencies**

Run:

```bash
cd personal-blog-portfolio
npm install
```

Expected: `node_modules/` and `package-lock.json` are created without dependency resolution errors.

- [ ] **Step 6: Commit**

```bash
git add personal-blog-portfolio/package.json personal-blog-portfolio/package-lock.json personal-blog-portfolio/index.html personal-blog-portfolio/vite.config.ts personal-blog-portfolio/tsconfig.json
git commit -m "chore: scaffold personal blog portfolio app"
```

---

### Task 2: Add Typed Content Data

**Files:**
- Create: `personal-blog-portfolio/src/types/content.ts`
- Create: `personal-blog-portfolio/src/data/profile.ts`
- Create: `personal-blog-portfolio/src/data/projects.ts`
- Create: `personal-blog-portfolio/src/data/photos.ts`
- Create: `personal-blog-portfolio/src/data/activity.ts`
- Create: `personal-blog-portfolio/src/__tests__/content.test.ts`

- [ ] **Step 1: Define content types**

Write `personal-blog-portfolio/src/types/content.ts`:

```ts
export type WorkStatus = 'done' | 'in-progress' | 'planned'

export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface Profile {
  siteName: string
  displayName: string
  headline: string
  intro: string
  roles: string[]
  socials: SocialLink[]
}

export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
  status: WorkStatus
  date: string
  category: string
  thumbnail: string
  githubUrl?: string
  demoUrl?: string
  featured: boolean
}

export interface PhotoWork {
  slug: string
  title: string
  src: string
  category: '山野' | '花草' | '河谷' | '海边' | '树影' | '云层'
  date: string
  location: string
  note: string
  featured: boolean
}

export interface ActivityItem {
  id: string
  title: string
  summary: string
  kind: '编程' | '摄影' | '手记'
  date: string
  tags: string[]
}
```

- [ ] **Step 2: Add profile data**

Write `personal-blog-portfolio/src/data/profile.ts`:

```ts
import type { NavItem, Profile } from '@/types/content'

export const profile: Profile = {
  siteName: '晓林的精神世界',
  displayName: 'Ren Xiaolin',
  headline: '把代码写进生活，把自然收进相册',
  intro: '这里整理我的编程作品、风光摄影与植物观察，也会慢慢长出新的栏目。',
  roles: ['前端学习者', '风光与植物摄影', '记录生活'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
}

export const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '编程', to: '/code' },
  { label: '摄影', to: '/photos' },
  { label: '关于', to: '/about' },
]
```

- [ ] **Step 3: Add project data**

Write `personal-blog-portfolio/src/data/projects.ts`:

```ts
import type { Project } from '@/types/content'

export const projects: Project[] = [
  {
    slug: 'campus-market',
    title: '校园二手交易平台',
    summary: '支持商品发布、实时聊天、订单管理与用户认证的校园交易项目。',
    stack: ['Vue', 'Node', 'MongoDB'],
    status: 'done',
    date: '2026-05-20',
    category: '编程项目',
    thumbnail: '/images/projects/campus-market.svg',
    featured: true,
  },
  {
    slug: 'photo-gallery',
    title: '个人摄影图库',
    summary: '记录旅途中的风景与植物，支持分类浏览、关键词搜索与高清大图查看。',
    stack: ['Vue', 'TypeScript', 'Gallery'],
    status: 'in-progress',
    date: '2026-04-12',
    category: '摄影项目',
    thumbnail: '/images/projects/photo-gallery.svg',
    featured: true,
  },
  {
    slug: 'interaction-lab',
    title: '前端交互实验室',
    summary: '探索滚动动效、组件状态与页面转场的练习作品集合。',
    stack: ['Vue', 'Motion', 'CSS'],
    status: 'planned',
    date: '2026-03-18',
    category: '前端实验',
    thumbnail: '/images/projects/interaction-lab.svg',
    featured: true,
  },
]
```

- [ ] **Step 4: Add photography data**

Write `personal-blog-portfolio/src/data/photos.ts`:

```ts
import type { PhotoWork } from '@/types/content'

export const photos: PhotoWork[] = [
  {
    slug: 'may-river-valley',
    title: '五月的河谷',
    src: '/images/photos/may-river-valley.svg',
    category: '河谷',
    date: '2026-05-05',
    location: '河边草地',
    note: '风从草地经过，光落在水面上。',
    featured: true,
  },
  {
    slug: 'spring-daisies',
    title: '春天的白色小花',
    src: '/images/photos/spring-daisies.svg',
    category: '花草',
    date: '2026-04-18',
    location: '路边花丛',
    note: '很小的一片白，也能把春天照亮。',
    featured: true,
  },
  {
    slug: 'tree-shadow',
    title: '树影',
    src: '/images/photos/tree-shadow.svg',
    category: '树影',
    date: '2026-04-03',
    location: '校园小路',
    note: '阳光穿过树叶，落成一地细碎的图案。',
    featured: false,
  },
  {
    slug: 'distant-hills',
    title: '远山',
    src: '/images/photos/distant-hills.svg',
    category: '山野',
    date: '2026-03-22',
    location: '山边',
    note: '山在很远处，颜色却很安静。',
    featured: false,
  },
]
```

- [ ] **Step 5: Add activity data**

Write `personal-blog-portfolio/src/data/activity.ts`:

```ts
import type { ActivityItem } from '@/types/content'

export const activities: ActivityItem[] = [
  {
    id: 'activity-campus-market',
    title: '整理了校园二手交易平台',
    summary: '补充项目截图、技术栈与功能说明，准备作为第一个正式编程作品展示。',
    kind: '编程',
    date: '2026-05-20',
    tags: ['Vue', '项目', '校园'],
  },
  {
    id: 'activity-river-valley',
    title: '加入五月河谷照片',
    summary: '把最近拍到的河流、草地和树影整理成风光植物相册。',
    kind: '摄影',
    date: '2026-05-05',
    tags: ['风光', '河谷', '植物'],
  },
]
```

- [ ] **Step 6: Write content integrity tests**

Write `personal-blog-portfolio/src/__tests__/content.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { activities } from '@/data/activity'
import { photos } from '@/data/photos'
import { projects } from '@/data/projects'
import { navItems, profile } from '@/data/profile'

describe('site content', () => {
  it('has complete navigation and profile text', () => {
    expect(profile.siteName).toBe('晓林的精神世界')
    expect(profile.headline).toContain('代码')
    expect(navItems.map((item) => item.label)).toEqual(['首页', '编程', '摄影', '关于'])
  })

  it('keeps project slugs unique and featured projects available', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(projects.some((project) => project.featured)).toBe(true)
  })

  it('keeps photo slugs unique and focused on landscape or plants', () => {
    const slugs = photos.map((photo) => photo.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(photos.map((photo) => photo.category)).toContain('花草')
    expect(photos.map((photo) => photo.category)).toContain('河谷')
  })

  it('has recent activity for the home feed', () => {
    expect(activities.length).toBeGreaterThanOrEqual(2)
    expect(activities.every((item) => item.title && item.summary)).toBe(true)
  })
})
```

- [ ] **Step 7: Run tests**

Run:

```bash
cd personal-blog-portfolio
npm test
```

Expected: all four `site content` tests pass.

- [ ] **Step 8: Commit**

```bash
git add personal-blog-portfolio/src/types/content.ts personal-blog-portfolio/src/data personal-blog-portfolio/src/__tests__/content.test.ts
git commit -m "feat: add typed portfolio content"
```

---

### Task 3: Build Base Layout, Theme, and Routing

**Files:**
- Create: `personal-blog-portfolio/src/main.ts`
- Create: `personal-blog-portfolio/src/App.vue`
- Create: `personal-blog-portfolio/src/router/index.ts`
- Create: `personal-blog-portfolio/src/styles/base.css`
- Create: `personal-blog-portfolio/src/styles/theme.css`
- Create: `personal-blog-portfolio/src/components/layout/AppNav.vue`
- Create: `personal-blog-portfolio/src/components/layout/AppFooter.vue`
- Create: `personal-blog-portfolio/src/pages/HomePage.vue`
- Create: `personal-blog-portfolio/src/pages/CodePage.vue`
- Create: `personal-blog-portfolio/src/pages/PhotographyPage.vue`
- Create: `personal-blog-portfolio/src/pages/AboutPage.vue`
- Create: `personal-blog-portfolio/src/__tests__/routing.test.ts`

- [ ] **Step 1: Add app bootstrap**

Write `personal-blog-portfolio/src/main.ts`:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './styles/base.css'
import './styles/theme.css'

createApp(App).use(router).mount('#app')
```

- [ ] **Step 2: Add router**

Write `personal-blog-portfolio/src/router/index.ts`:

```ts
import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage.vue'
import CodePage from '@/pages/CodePage.vue'
import HomePage from '@/pages/HomePage.vue'
import PhotographyPage from '@/pages/PhotographyPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/code', name: 'code', component: CodePage },
    { path: '/photos', name: 'photos', component: PhotographyPage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})
```

- [ ] **Step 3: Add placeholder route pages**

Write `personal-blog-portfolio/src/pages/HomePage.vue`:

```vue
<template>
  <main class="page-shell">
    <h1>把代码写进生活，把自然收进相册</h1>
  </main>
</template>
```

Write `personal-blog-portfolio/src/pages/CodePage.vue`:

```vue
<template>
  <main class="page-shell">
    <h1>编程作品</h1>
  </main>
</template>
```

Write `personal-blog-portfolio/src/pages/PhotographyPage.vue`:

```vue
<template>
  <main class="page-shell">
    <h1>风光与植物</h1>
  </main>
</template>
```

Write `personal-blog-portfolio/src/pages/AboutPage.vue`:

```vue
<template>
  <main class="page-shell">
    <h1>关于我</h1>
  </main>
</template>
```

- [ ] **Step 4: Add app shell**

Write `personal-blog-portfolio/src/App.vue`:

```vue
<template>
  <div class="site-frame">
    <div class="landscape-bg" aria-hidden="true"></div>
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
```

- [ ] **Step 5: Add frosted navigation**

Write `personal-blog-portfolio/src/components/layout/AppNav.vue`:

```vue
<template>
  <header class="app-nav glass-pill">
    <RouterLink class="brand" to="/">{{ profile.siteName }}</RouterLink>
    <nav aria-label="主导航">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="nav-actions" aria-label="页面工具">
      <button type="button" aria-label="搜索">⌕</button>
      <button type="button" aria-label="浅色模式">☼</button>
      <button type="button" aria-label="深色模式">☾</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { navItems, profile } from '@/data/profile'
</script>
```

- [ ] **Step 6: Add footer toolbar**

Write `personal-blog-portfolio/src/components/layout/AppFooter.vue`:

```vue
<template>
  <footer class="app-footer glass-pill">
    <span>© 2026 Ren Xiaolin</span>
    <div class="footer-links">
      <a v-for="link in profile.socials" :key="link.label" :href="link.href">
        {{ link.label }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '@/data/profile'
</script>
```

- [ ] **Step 7: Add base styles**

Write `personal-blog-portfolio/src/styles/base.css`:

```css
* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  background: #b9ddf4;
  color: #17212b;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", system-ui, sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
}

#app {
  min-height: 100vh;
}
```

- [ ] **Step 8: Add theme styles**

Write `personal-blog-portfolio/src/styles/theme.css`:

```css
:root {
  --page-max: 1220px;
  --glass-bg: rgba(244, 251, 255, 0.48);
  --glass-strong: rgba(255, 255, 255, 0.62);
  --glass-border: rgba(255, 255, 255, 0.72);
  --ink: #17212b;
  --muted: #536579;
  --leaf: #4d9b4f;
  --sky: #8bcdf4;
  --shadow: 0 24px 80px rgba(42, 94, 132, 0.18);
}

.site-frame {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 116px 24px 104px;
}

.landscape-bg {
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(circle at 18% 16%, rgba(255, 255, 255, 0.95) 0 6%, transparent 7%),
    radial-gradient(circle at 84% 20%, rgba(255, 255, 255, 0.9) 0 7%, transparent 8%),
    linear-gradient(180deg, #8fcdf4 0%, #cceefa 44%, #dff4c6 72%, #8cc479 100%);
}

.landscape-bg::before,
.landscape-bg::after {
  content: "";
  position: absolute;
  inset-inline: -10%;
  bottom: 0;
  height: 44%;
  background:
    radial-gradient(ellipse at 22% 96%, rgba(67, 130, 61, 0.85) 0 24%, transparent 25%),
    radial-gradient(ellipse at 64% 92%, rgba(118, 166, 83, 0.85) 0 28%, transparent 29%),
    linear-gradient(165deg, transparent 0 44%, rgba(77, 143, 88, 0.65) 45% 60%, transparent 61%);
  filter: blur(1px);
}

.landscape-bg::after {
  bottom: 5%;
  height: 24%;
  background: linear-gradient(95deg, transparent 0 35%, rgba(107, 188, 210, 0.7) 36% 49%, transparent 50%);
  filter: blur(8px);
}

.glass-pill,
.glass-panel {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px) saturate(130%);
}

.glass-pill {
  border-radius: 999px;
}

.glass-panel {
  border-radius: 24px;
}

.app-nav {
  position: fixed;
  z-index: 20;
  top: 24px;
  left: 50%;
  display: grid;
  width: min(var(--page-max), calc(100% - 48px));
  min-height: 70px;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 0 32px;
  transform: translateX(-50%);
}

.brand {
  font-size: 1.22rem;
  font-weight: 800;
}

.app-nav nav {
  display: flex;
  gap: 18px;
}

.app-nav nav a {
  border-radius: 999px;
  padding: 12px 24px;
  font-weight: 700;
}

.app-nav nav a.router-link-active {
  background: rgba(227, 246, 207, 0.82);
  color: #2f783b;
}

.nav-actions,
.footer-links {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.nav-actions button,
.footer-links a {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  color: var(--ink);
}

.page-shell {
  width: min(var(--page-max), 100%);
  margin: 0 auto;
}

.app-footer {
  position: fixed;
  z-index: 20;
  left: 50%;
  bottom: 24px;
  display: flex;
  width: min(var(--page-max), calc(100% - 48px));
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  transform: translateX(-50%);
}

@media (max-width: 820px) {
  .site-frame {
    padding: 96px 16px 96px;
  }

  .app-nav {
    grid-template-columns: 1fr;
    border-radius: 28px;
    padding: 16px;
  }

  .app-nav nav {
    flex-wrap: wrap;
  }

  .app-footer {
    border-radius: 24px;
    padding: 14px 18px;
  }
}
```

- [ ] **Step 9: Add routing tests**

Write `personal-blog-portfolio/src/__tests__/routing.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { router } from '@/router'

describe('router', () => {
  it('registers the four primary pages', () => {
    expect(router.hasRoute('home')).toBe(true)
    expect(router.hasRoute('code')).toBe(true)
    expect(router.hasRoute('photos')).toBe(true)
    expect(router.hasRoute('about')).toBe(true)
  })
})
```

- [ ] **Step 10: Verify**

Run:

```bash
cd personal-blog-portfolio
npm test
npm run build
```

Expected: tests pass and Vite writes `dist/`.

- [ ] **Step 11: Commit**

```bash
git add personal-blog-portfolio/src personal-blog-portfolio/vite.config.ts personal-blog-portfolio/tsconfig.json
git commit -m "feat: add app shell routing and theme"
```

---

### Task 4: Implement Reusable UI Components and Scroll Reveal

**Files:**
- Create: `personal-blog-portfolio/src/composables/useRevealOnScroll.ts`
- Create: `personal-blog-portfolio/src/components/common/GlassPanel.vue`
- Create: `personal-blog-portfolio/src/components/common/TagChip.vue`
- Create: `personal-blog-portfolio/src/components/work/ProjectCard.vue`
- Create: `personal-blog-portfolio/src/components/photo/PhotoTile.vue`
- Modify: `personal-blog-portfolio/src/styles/theme.css`

- [ ] **Step 1: Add reveal composable**

Write `personal-blog-portfolio/src/composables/useRevealOnScroll.ts`:

```ts
import { onMounted, onUnmounted, ref } from 'vue'

export function useRevealOnScroll() {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { target, isVisible }
}
```

- [ ] **Step 2: Add glass panel component**

Write `personal-blog-portfolio/src/components/common/GlassPanel.vue`:

```vue
<template>
  <section ref="target" class="glass-panel reveal" :class="{ 'is-visible': isVisible }">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll'

const { target, isVisible } = useRevealOnScroll()
</script>
```

- [ ] **Step 3: Add tag chip component**

Write `personal-blog-portfolio/src/components/common/TagChip.vue`:

```vue
<template>
  <span class="tag-chip">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
```

- [ ] **Step 4: Add project card component**

Write `personal-blog-portfolio/src/components/work/ProjectCard.vue`:

```vue
<template>
  <GlassPanel class="project-card">
    <img class="project-thumb" :src="project.thumbnail" :alt="`${project.title} 截图`" />
    <div class="project-copy">
      <p class="eyebrow">{{ project.date }} · {{ project.category }}</p>
      <h2>{{ project.title }}</h2>
      <p>{{ project.summary }}</p>
      <div class="chip-row">
        <TagChip v-for="tag in project.stack" :key="tag" :label="tag" />
      </div>
    </div>
  </GlassPanel>
</template>

<script setup lang="ts">
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import type { Project } from '@/types/content'

defineProps<{
  project: Project
}>()
</script>
```

- [ ] **Step 5: Add photo tile component**

Write `personal-blog-portfolio/src/components/photo/PhotoTile.vue`:

```vue
<template>
  <article class="photo-tile">
    <img :src="photo.src" :alt="photo.title" />
    <div class="photo-caption">
      <strong>{{ photo.title }}</strong>
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
```

- [ ] **Step 6: Add component styles**

Append to `personal-blog-portfolio/src/styles/theme.css`:

```css
.reveal {
  opacity: 0;
  transform: translateY(34px) scale(0.98);
  transition: opacity 720ms ease, transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.34);
  padding: 0 16px;
  color: #2b4b43;
  font-size: 0.9rem;
  font-weight: 650;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.project-card {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 26px;
  padding: 28px;
}

.project-thumb,
.photo-tile img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.project-thumb {
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.48);
}

.project-copy h2 {
  margin: 6px 0 10px;
  font-size: 1.55rem;
}

.project-copy p {
  color: var(--muted);
  line-height: 1.75;
}

.eyebrow {
  margin: 0;
  color: var(--leaf);
  font-size: 0.92rem;
  font-weight: 700;
}

.photo-tile {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: 0 18px 48px rgba(55, 108, 88, 0.14);
}

.photo-tile img {
  aspect-ratio: 4 / 3;
}

.photo-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px;
}

@media (max-width: 720px) {
  .project-card {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 7: Verify**

Run:

```bash
cd personal-blog-portfolio
npm run build
```

Expected: TypeScript and Vite build pass.

- [ ] **Step 8: Commit**

```bash
git add personal-blog-portfolio/src/composables personal-blog-portfolio/src/components personal-blog-portfolio/src/styles/theme.css
git commit -m "feat: add glass UI components and scroll reveal"
```

---

### Task 5: Implement Home Page

**Files:**
- Modify: `personal-blog-portfolio/src/pages/HomePage.vue`
- Modify: `personal-blog-portfolio/src/styles/theme.css`

- [ ] **Step 1: Build home page layout**

Replace `personal-blog-portfolio/src/pages/HomePage.vue`:

```vue
<template>
  <main class="page-shell home-page">
    <section class="home-hero">
      <GlassPanel class="hero-copy">
        <p class="eyebrow">个人博客 · 作品归档 · 自然观察</p>
        <h1>{{ profile.headline }}</h1>
        <p>{{ profile.intro }}</p>
        <div class="hero-actions">
          <RouterLink to="/code">查看编程作品</RouterLink>
          <RouterLink to="/photos">浏览风光植物</RouterLink>
        </div>
      </GlassPanel>

      <GlassPanel class="profile-card">
        <div class="avatar" aria-hidden="true">林</div>
        <h2>{{ profile.displayName }}</h2>
        <div class="chip-row">
          <TagChip v-for="role in profile.roles" :key="role" :label="role" />
        </div>
        <p>正在搭建自己的长期作品档案。</p>
      </GlassPanel>
    </section>

    <section class="entry-grid" aria-label="网站入口">
      <GlassPanel>
        <h2>编程作品</h2>
        <p>{{ featuredProject.summary }}</p>
        <RouterLink to="/code">进入编程归档</RouterLink>
      </GlassPanel>
      <GlassPanel>
        <h2>风光与植物</h2>
        <p>{{ featuredPhoto.note }}</p>
        <RouterLink to="/photos">进入摄影图库</RouterLink>
      </GlassPanel>
      <GlassPanel>
        <h2>最近动态</h2>
        <p>{{ latestActivity.summary }}</p>
        <RouterLink to="/about">看看我是谁</RouterLink>
      </GlassPanel>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import { activities } from '@/data/activity'
import { photos } from '@/data/photos'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

const featuredProject = computed(() => projects.find((project) => project.featured) ?? projects[0])
const featuredPhoto = computed(() => photos.find((photo) => photo.featured) ?? photos[0])
const latestActivity = computed(() => activities[0])
</script>
```

- [ ] **Step 2: Add home page styles**

Append to `personal-blog-portfolio/src/styles/theme.css`:

```css
.home-page {
  display: grid;
  gap: 28px;
}

.home-hero {
  display: grid;
  min-height: 560px;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.75fr);
  align-items: center;
  gap: 28px;
}

.hero-copy,
.profile-card,
.entry-grid .glass-panel {
  padding: 34px;
}

.hero-copy h1 {
  max-width: 760px;
  margin: 12px 0 18px;
  font-size: clamp(2.6rem, 6vw, 5.7rem);
  line-height: 1.05;
}

.hero-copy > p {
  max-width: 650px;
  color: var(--muted);
  font-size: 1.1rem;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-actions a,
.entry-grid a {
  display: inline-flex;
  border-radius: 999px;
  background: rgba(227, 246, 207, 0.84);
  padding: 12px 20px;
  color: #2f783b;
  font-weight: 800;
}

.avatar {
  display: grid;
  width: 82px;
  height: 82px;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #dff7c8, #9bd7f7);
  color: #245d39;
  font-size: 2rem;
  font-weight: 900;
}

.profile-card h2 {
  margin: 18px 0 12px;
}

.profile-card p,
.entry-grid p {
  color: var(--muted);
  line-height: 1.8;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 900px) {
  .home-hero,
  .entry-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify**

Run:

```bash
cd personal-blog-portfolio
npm run build
```

Expected: build passes and home page imports resolve.

- [ ] **Step 4: Commit**

```bash
git add personal-blog-portfolio/src/pages/HomePage.vue personal-blog-portfolio/src/styles/theme.css
git commit -m "feat: build visual home page"
```

---

### Task 6: Implement Programming and Photography Pages

**Files:**
- Modify: `personal-blog-portfolio/src/pages/CodePage.vue`
- Modify: `personal-blog-portfolio/src/pages/PhotographyPage.vue`
- Modify: `personal-blog-portfolio/src/styles/theme.css`

- [ ] **Step 1: Build programming page**

Replace `personal-blog-portfolio/src/pages/CodePage.vue`:

```vue
<template>
  <main class="page-shell archive-page">
    <header class="page-heading">
      <h1>编程作品 <span>({{ projects.length }})</span></h1>
      <p>Home / Code</p>
    </header>

    <div class="archive-layout">
      <section class="card-list" aria-label="编程作品列表">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </section>

      <GlassPanel class="sidebar">
        <h2>技术栈</h2>
        <div class="chip-row">
          <TagChip v-for="tag in stackTags" :key="tag" :label="tag" />
        </div>
        <h2>作品状态</h2>
        <p>已完成 {{ doneCount }}</p>
        <p>进行中 {{ progressCount }}</p>
        <p>计划中 {{ plannedCount }}</p>
      </GlassPanel>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import ProjectCard from '@/components/work/ProjectCard.vue'
import { projects } from '@/data/projects'

const stackTags = computed(() => [...new Set(projects.flatMap((project) => project.stack))])
const doneCount = computed(() => projects.filter((project) => project.status === 'done').length)
const progressCount = computed(() => projects.filter((project) => project.status === 'in-progress').length)
const plannedCount = computed(() => projects.filter((project) => project.status === 'planned').length)
</script>
```

- [ ] **Step 2: Build photography page**

Replace `personal-blog-portfolio/src/pages/PhotographyPage.vue`:

```vue
<template>
  <main class="page-shell archive-page">
    <header class="page-heading">
      <h1>风光与植物 <span>({{ photos.length }})</span></h1>
      <p>Home / Photos</p>
    </header>

    <div class="archive-layout">
      <GlassPanel class="photo-gallery">
        <article class="featured-photo">
          <img :src="featuredPhoto.src" :alt="featuredPhoto.title" />
          <div>
            <TagChip :label="featuredPhoto.category" />
            <h2>{{ featuredPhoto.title }}</h2>
            <p>{{ featuredPhoto.note }}</p>
          </div>
        </article>
        <div class="photo-grid">
          <PhotoTile v-for="photo in photos" :key="photo.slug" :photo="photo" />
        </div>
      </GlassPanel>

      <GlassPanel class="sidebar">
        <h2>分类</h2>
        <div class="chip-row">
          <TagChip v-for="category in categories" :key="category" :label="category" />
        </div>
        <h2>相册</h2>
        <p>春天的花 · {{ flowerCount }}</p>
        <p>河边散步 · {{ riverCount }}</p>
        <p>山野记录 · {{ mountainCount }}</p>
      </GlassPanel>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import PhotoTile from '@/components/photo/PhotoTile.vue'
import { photos } from '@/data/photos'

const featuredPhoto = computed(() => photos.find((photo) => photo.featured) ?? photos[0])
const categories = computed(() => ['全部', ...new Set(photos.map((photo) => photo.category))])
const flowerCount = computed(() => photos.filter((photo) => photo.category === '花草').length)
const riverCount = computed(() => photos.filter((photo) => photo.category === '河谷').length)
const mountainCount = computed(() => photos.filter((photo) => photo.category === '山野').length)
</script>
```

- [ ] **Step 3: Add archive page styles**

Append to `personal-blog-portfolio/src/styles/theme.css`:

```css
.archive-page {
  display: grid;
  gap: 24px;
}

.page-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
}

.page-heading h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
}

.page-heading h1 span {
  color: var(--leaf);
  font-size: 0.72em;
}

.page-heading p {
  margin: 0 0 10px;
  color: var(--muted);
}

.archive-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  align-items: start;
  gap: 28px;
}

.card-list {
  display: grid;
  gap: 18px;
}

.sidebar {
  position: sticky;
  top: 120px;
  display: grid;
  gap: 18px;
  padding: 26px;
}

.sidebar h2 {
  margin: 0;
}

.sidebar p {
  margin: 0;
  color: var(--muted);
  font-weight: 700;
}

.photo-gallery {
  padding: 24px;
}

.featured-photo {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) 1fr;
  gap: 24px;
  align-items: center;
  margin-bottom: 22px;
}

.featured-photo img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 22px;
}

.featured-photo h2 {
  margin: 14px 0 10px;
  font-size: 2rem;
}

.featured-photo p {
  color: var(--muted);
  line-height: 1.9;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 980px) {
  .archive-layout,
  .featured-photo {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .photo-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .page-heading {
    align-items: start;
    flex-direction: column;
  }

  .photo-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Verify**

Run:

```bash
cd personal-blog-portfolio
npm run build
```

Expected: build passes and both archive pages render without missing imports.

- [ ] **Step 5: Commit**

```bash
git add personal-blog-portfolio/src/pages/CodePage.vue personal-blog-portfolio/src/pages/PhotographyPage.vue personal-blog-portfolio/src/styles/theme.css
git commit -m "feat: build code and photography archives"
```

---

### Task 7: Implement About Page, Asset Placeholders, and GitHub Pages Docs

**Files:**
- Modify: `personal-blog-portfolio/src/pages/AboutPage.vue`
- Create: `personal-blog-portfolio/public/images/projects/campus-market.svg`
- Create: `personal-blog-portfolio/public/images/projects/photo-gallery.svg`
- Create: `personal-blog-portfolio/public/images/projects/interaction-lab.svg`
- Create: `personal-blog-portfolio/public/images/photos/may-river-valley.svg`
- Create: `personal-blog-portfolio/public/images/photos/spring-daisies.svg`
- Create: `personal-blog-portfolio/public/images/photos/tree-shadow.svg`
- Create: `personal-blog-portfolio/public/images/photos/distant-hills.svg`
- Create: `personal-blog-portfolio/README.md`
- Create: `personal-blog-portfolio/.github/workflows/deploy.yml`
- Modify: `personal-blog-portfolio/src/styles/theme.css`

- [ ] **Step 1: Build about page**

Replace `personal-blog-portfolio/src/pages/AboutPage.vue`:

```vue
<template>
  <main class="page-shell about-page">
    <GlassPanel class="about-card">
      <div class="avatar large" aria-hidden="true">林</div>
      <div>
        <p class="eyebrow">About</p>
        <h1>{{ profile.displayName }}</h1>
        <p>{{ profile.intro }}</p>
        <div class="chip-row">
          <TagChip v-for="role in profile.roles" :key="role" :label="role" />
        </div>
      </div>
    </GlassPanel>

    <section class="about-grid">
      <GlassPanel>
        <h2>正在学习</h2>
        <p>Vue、TypeScript、前端工程化、滚动动效与组件设计。</p>
      </GlassPanel>
      <GlassPanel>
        <h2>喜欢拍摄</h2>
        <p>风光、植物、河流、树影，以及路上遇见的安静瞬间。</p>
      </GlassPanel>
      <GlassPanel>
        <h2>这个网站</h2>
        <p>会持续收纳编程作品、摄影相册、学习手记和小实验。</p>
      </GlassPanel>
    </section>
  </main>
</template>

<script setup lang="ts">
import GlassPanel from '@/components/common/GlassPanel.vue'
import TagChip from '@/components/common/TagChip.vue'
import { profile } from '@/data/profile'
</script>
```

- [ ] **Step 2: Add about styles**

Append to `personal-blog-portfolio/src/styles/theme.css`:

```css
.about-page {
  display: grid;
  gap: 24px;
}

.about-card {
  display: grid;
  min-height: 420px;
  grid-template-columns: 160px 1fr;
  align-items: center;
  gap: 34px;
  padding: 42px;
}

.avatar.large {
  width: 140px;
  height: 140px;
  font-size: 3.2rem;
}

.about-card h1 {
  margin: 8px 0 14px;
  font-size: clamp(2.4rem, 5vw, 4.8rem);
}

.about-card p,
.about-grid p {
  color: var(--muted);
  line-height: 1.9;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.about-grid .glass-panel {
  padding: 28px;
}

@media (max-width: 820px) {
  .about-card,
  .about-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Create SVG image placeholders**

Create each SVG with a distinct title and color. Example for `personal-blog-portfolio/public/images/photos/may-river-valley.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-labelledby="title">
  <title id="title">五月的河谷</title>
  <rect width="800" height="500" fill="#bfe7fb"/>
  <path d="M0 360C160 300 280 330 410 280C560 220 650 250 800 190V500H0Z" fill="#8dcf82"/>
  <path d="M0 410C220 365 350 390 520 340C650 300 720 330 800 280V500H0Z" fill="#68b96b"/>
  <path d="M190 500C270 410 470 390 620 500Z" fill="#78cde1"/>
  <circle cx="650" cy="95" r="46" fill="#fff7b0"/>
</svg>
```

Use the same SVG structure for the remaining six files, changing `<title>`, sky fill, hill fill, and accent shapes so cards are visually different:

```text
campus-market.svg: title 校园二手交易平台, dashboard rectangles and green accents
photo-gallery.svg: title 个人摄影图库, four mini photo rectangles
interaction-lab.svg: title 前端交互实验室, stacked motion cards
spring-daisies.svg: title 春天的白色小花, green background and white flower circles
tree-shadow.svg: title 树影, green background and dark leaf shadows
distant-hills.svg: title 远山, layered blue-green hills
```

- [ ] **Step 4: Add README**

Write `personal-blog-portfolio/README.md`:

```md
# 晓林的精神世界

清新毛玻璃风格的个人博客作品站，用于整理编程作品、风光摄影与植物观察。

## 本地运行

```bash
npm install
npm run dev
```

## 检查

```bash
npm test
npm run build
```

## 内容维护

- 编程作品：`src/data/projects.ts`
- 摄影作品：`src/data/photos.ts`
- 最近动态：`src/data/activity.ts`
- 个人信息：`src/data/profile.ts`

## GitHub Pages

仓库开启 GitHub Pages 后，推送到 `main` 会通过 `.github/workflows/deploy.yml` 构建并发布 `dist/`。
```

- [ ] **Step 5: Add GitHub Pages workflow**

Write `personal-blog-portfolio/.github/workflows/deploy.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: personal-blog-portfolio/package-lock.json
      - run: npm ci
        working-directory: personal-blog-portfolio
      - run: npm run build
        working-directory: personal-blog-portfolio
        env:
          GITHUB_PAGES: 'true'
      - uses: actions/upload-pages-artifact@v3
        with:
          path: personal-blog-portfolio/dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 6: Verify**

Run:

```bash
cd personal-blog-portfolio
npm test
npm run build
```

Expected: tests pass, build succeeds, and image paths resolve in `dist/`.

- [ ] **Step 7: Commit**

```bash
git add personal-blog-portfolio/src/pages/AboutPage.vue personal-blog-portfolio/src/styles/theme.css personal-blog-portfolio/public personal-blog-portfolio/README.md personal-blog-portfolio/.github/workflows/deploy.yml
git commit -m "feat: add about page assets and deployment docs"
```

---

### Task 8: Visual QA and Final Polish

**Files:**
- Modify: `personal-blog-portfolio/src/styles/theme.css`
- Modify: page or component files only when visual QA finds spacing, overlap, or responsiveness issues.

- [ ] **Step 1: Run local development server**

Run:

```bash
cd personal-blog-portfolio
npm run dev
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 2: Check desktop pages**

Open and inspect:

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/code
http://127.0.0.1:5173/photos
http://127.0.0.1:5173/about
```

Expected:
- Navigation remains readable on the glass background.
- Cards do not overlap footer.
- Page titles and Chinese text fit within panels.
- Scroll reveal does not hide content permanently.

- [ ] **Step 3: Check mobile width**

Resize browser to 390px width.

Expected:
- Navigation wraps without horizontal scrolling.
- Project cards become single-column.
- Photo grid becomes single-column.
- Footer remains visible and does not cover primary content.

- [ ] **Step 4: Run final commands**

Run:

```bash
cd personal-blog-portfolio
npm test
npm run build
```

Expected: both commands pass.

- [ ] **Step 5: Commit polish**

If files changed during QA:

```bash
git add personal-blog-portfolio/src
git commit -m "style: polish responsive portfolio layout"
```

If no files changed, do not create an empty commit.

---

## Self-Review

- Spec coverage: The plan covers the approved personal blog direction, visual home entry, programming archive, photography archive, about page, typed content, scroll reveal, glassmorphism styling, responsive checks, and GitHub Pages deployment.
- Placeholder scan: The plan does not use vague `TBD`, `TODO`, or undefined feature steps. The SVG assets are intentionally simple first-version assets with concrete filenames and visual directions.
- Type consistency: `Project`, `PhotoWork`, `ActivityItem`, `Profile`, and all imported component props use the same names across tasks.
- Scope check: This plan intentionally stops at the first static version. Search behavior, theme persistence, full detail pages, image lightbox, Markdown articles, plant encyclopedia, and travel map are excluded from this first implementation so the site can become usable quickly.

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-05-24-personal-blog-portfolio.md`. Two execution options:

1. **Subagent-Driven (recommended)** - dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
