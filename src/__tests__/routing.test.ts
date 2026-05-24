import { describe, expect, it } from 'vitest'
import { router } from '@/router'

describe('router', () => {
  it('registers primary pages', () => {
    expect(router.hasRoute('home')).toBe(true)
    expect(router.hasRoute('code')).toBe(true)
    expect(router.hasRoute('photos')).toBe(true)
    expect(router.hasRoute('about')).toBe(true)
  })
})
