export type WorkStatus = 'done' | 'in-progress' | 'planned'

export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface Profile {
  siteName: string
  displayName: string
  headline: string
  intro: string
  location: string
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
  featured: boolean
}

export interface PhotoWork {
  slug: string
  title: string
  src: string
  category: '山野' | '花草' | '植物' | '河谷' | '海边' | '树影' | '云层' | '湖畔'
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
