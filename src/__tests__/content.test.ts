import { describe, expect, it } from 'vitest'
import { activities } from '@/data/activity'
import { photos } from '@/data/photos'
import { projects } from '@/data/projects'
import { navItems, profile } from '@/data/profile'

describe('site content', () => {
  it('has the expected identity and navigation', () => {
    expect(profile.siteName).toBe('晓林的精神世界')
    expect(profile.headline).toContain('自然')
    expect(navItems.map((item) => item.label)).toEqual(['首页', '编程', '摄影', '关于'])
  })

  it('keeps photo slugs unique and includes plant-focused photos', () => {
    const slugs = photos.map((photo) => photo.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(photos.some((photo) => ['花草', '植物'].includes(photo.category))).toBe(true)
  })

  it('keeps code section present but lightweight for now', () => {
    expect(projects).toHaveLength(1)
    expect(projects[0]?.summary).toContain('后续')
  })

  it('has activity for the home page', () => {
    expect(activities.length).toBeGreaterThanOrEqual(2)
  })
})
