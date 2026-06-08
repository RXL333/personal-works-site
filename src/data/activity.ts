import type { ActivityItem } from '@/types/content'

export const activities: ActivityItem[] = [
  {
    id: 'activity-archive-refresh',
    title: '自然档案馆风格重排',
    summary: '把首页、编程页、摄影页和关于页重新整理成一本个人作品集，让每个入口都更像被认真归档的一页。',
    kind: '手记',
    date: '2026-06-03',
    tags: ['个人网站', '作品集', 'GSAP'],
  },
  {
    id: 'activity-code-pages',
    title: '编程详情页逐个打磨',
    summary: 'AI 学习助手、学习通扩展、粒子手势、图书系统、校园平台和像素机甲都有了独立风格的详情页。',
    kind: '编程',
    date: '2026-06-03',
    tags: ['Vue', '项目复盘', 'ScrollTrigger'],
  },
  {
    id: 'activity-photos',
    title: '摄影作品整理为胶片墙',
    summary: '把植物、云天、雨夜和水边照片整理成更自由的胶片墙，让摄影页和编程页有明显区分。',
    kind: '摄影',
    date: '2026-06-03',
    tags: ['摄影', '自然观察', '相册'],
  },
]
