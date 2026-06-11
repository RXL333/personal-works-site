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
  detail: string
  stack: string[]
  status: WorkStatus
  date: string
  category: string
  thumbnail: string
  heroImage: string
  diagramImage: string
  detailImages: {
    src: string
    title: string
    caption: string
  }[]
  screenshots?: {
    src: string
    title: string
    caption: string
    focus?: string
  }[]
  role: string
  repoLabel: string
  features: string[]
  highlights: string[]
  screenshotNeeds: string[]
  diagramIdeas: string[]
  featured: boolean
}

export interface PhotoWork {
  slug: string
  title: string
  src: string
  category: '花草' | '草木' | '云天' | '雨夜' | '竹影'
  date: string
  location: string
  note: string
  description: string
  width: number
  height: number
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
