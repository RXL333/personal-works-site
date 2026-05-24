import type { ActivityItem } from '@/types/content'

export const activities: ActivityItem[] = [
  {
    id: 'activity-site-start',
    title: '个人网站开始搭建',
    summary: '先完成首页、摄影和关于，把编程作品区域留给后续详细整理。',
    kind: '手记',
    date: '2026-05-24',
    tags: ['网站', '作品集', 'Vue'],
  },
  {
    id: 'activity-photos',
    title: '整理风光与植物照片',
    summary: '把已有摄影作品放进网站，作为首页背景和摄影页面的主要内容。',
    kind: '摄影',
    date: '2026-05-24',
    tags: ['风光', '植物', '相册'],
  },
]
