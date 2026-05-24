# 晓林的精神世界

清新毛玻璃风格的个人博客作品站，用于整理首页、风光植物摄影、关于我，以及后续要补充的编程作品。

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

- 摄影作品：`src/data/photos.ts`
- 首页动态：`src/data/activity.ts`
- 个人信息：`src/data/profile.ts`
- 编程作品：`src/data/projects.ts`

## GitHub Pages

推送到 GitHub 后，可以使用 `.github/workflows/deploy.yml` 自动构建并发布 `dist/`。
