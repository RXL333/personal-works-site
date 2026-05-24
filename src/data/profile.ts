import type { NavItem, Profile } from '@/types/content'

export const profile: Profile = {
  siteName: '晓林的精神世界',
  displayName: 'Ren Xiaolin',
  headline: '把代码写进生活，把自然收进相册',
  intro: '这里整理我的编程作品、风光摄影与植物观察，也会慢慢长出新的栏目。',
  location: 'China',
  roles: ['前端学习者', '风光与植物摄影', '记录生活'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'GH' },
    { label: 'Email', href: 'mailto:hello@example.com', icon: '✉' },
    { label: 'Camera', href: '/photos', icon: '◎' },
  ],
}

export const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '编程', to: '/code' },
  { label: '摄影', to: '/photos' },
  { label: '关于', to: '/about' },
]
