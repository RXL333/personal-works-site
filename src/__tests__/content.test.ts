import { describe, expect, it } from 'vitest'
import { activities } from '@/data/activity'
import { photos } from '@/data/photos'
import { projects } from '@/data/projects'
import { navItems, profile } from '@/data/profile'

describe('site content', () => {
  it('has the expected identity and navigation', () => {
    expect(profile.siteName).toBe('笑林的精神世界')
    expect(profile.headline).toContain('自然')
    expect(navItems.map((item) => item.label)).toEqual(['首页', '编程', '摄影', '关于'])
  })

  it('keeps photo slugs unique and includes plant-focused photos', () => {
    const slugs = photos.map((photo) => photo.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(photos.some((photo) => ['花草', '草木', '竹影', '水生'].includes(photo.category))).toBe(true)
    expect(photos.every((photo) => photo.width > 0 && photo.height > 0)).toBe(true)
  })

  it('publishes the programming portfolio with long-form detail copy', () => {
    expect(projects).toHaveLength(6)
    expect(projects.some((project) => project.slug === 'library-management-system')).toBe(true)
    expect(projects.every((project) => project.detail.length >= 800)).toBe(true)
    expect(projects.every((project) => project.title !== 'web后端期末作业')).toBe(true)
    expect(projects.every((project) => project.heroImage.endsWith('.png'))).toBe(true)
    expect(projects.every((project) => project.diagramImage.endsWith('.svg'))).toBe(true)
    expect(projects.every((project) => project.detailImages.length >= 3)).toBe(true)
    expect(
      projects.every((project) => project.detailImages.every((image) => image.src.endsWith('.svg'))),
    ).toBe(true)
  })

  it('does not expose internal screenshot planning labels on public portfolio pages', async () => {
    const codePage = await import('@/pages/CodePage.vue?raw')
    const projectDetailPage = await import('@/pages/ProjectDetailPage.vue?raw')
    const publicTemplates = `${codePage.default}\n${projectDetailPage.default}`

    expect(publicTemplates).not.toContain('截图待补')
    expect(publicTemplates).not.toContain('推荐补图顺序')
    expect(publicTemplates).not.toContain('需要你补的截图')
    expect(publicTemplates).not.toContain('可生成的说明图')
  })

  it('keeps project detail and about pages reader-facing', async () => {
    const projectDetailPage = await import('@/pages/ProjectDetailPage.vue?raw')
    const aboutPage = await import('@/pages/AboutPage.vue?raw')

    expect(projectDetailPage.default).toContain('项目速览')
    expect(projectDetailPage.default).toContain('开发角色')
    expect(aboutPage.default).toContain('我正在把这个网站当成一个长期作品来养')
    expect(aboutPage.default).toContain('不是只为了放成果')
    expect(aboutPage.default).toContain('/images/profile-avatar.png')
  })

  it('uses copy actions for contact values instead of opening external actions', async () => {
    const footer = await import('@/components/layout/AppFooter.vue?raw')

    expect(footer.default).toContain('复制 GitHub 链接')
    expect(footer.default).toContain('复制邮箱地址')
    expect(footer.default).not.toContain('打开 GitHub')
    expect(footer.default).not.toContain('发送邮件')
  })

  it('has activity for the home page', () => {
    expect(activities.length).toBeGreaterThanOrEqual(2)
  })
})
