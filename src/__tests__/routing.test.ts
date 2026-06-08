import { describe, expect, it } from 'vitest'

describe('router', () => {
  it('registers primary pages', async () => {
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: new URL('http://localhost/#/'),
    })
    const { router } = await import('@/router')

    expect(router.hasRoute('home')).toBe(true)
    expect(router.hasRoute('code')).toBe(true)
    expect(router.hasRoute('project-detail')).toBe(true)
    expect(router.hasRoute('photos')).toBe(true)
    expect(router.hasRoute('photo-detail')).toBe(true)
    expect(router.hasRoute('about')).toBe(true)
  })

  it('starts normal route navigation at the page top', async () => {
    const { router } = await import('@/router')

    expect(router.options.scrollBehavior?.({ path: '/code/ai-study-helper', fullPath: '/code/ai-study-helper', hash: '' } as never, {} as never, { left: 0, top: 720 })).toEqual({
      left: 0,
      top: 0,
      behavior: 'auto',
    })

    expect(router.options.scrollBehavior?.({ path: '/code/ai-study-helper', fullPath: '/code/ai-study-helper#overview', hash: '#overview' } as never, {} as never, null)).toEqual({
      el: '#overview',
      top: 96,
      behavior: 'smooth',
    })
  })
})
