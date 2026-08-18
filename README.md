# 个人博客（Astro + Markdown + Tailwind CSS）

基于 [Astro](https://astro.build) 的静态个人博客，文章用 Markdown 管理。

## ✨ 已实现功能

- 📄 文章列表页（首页 + `/blog/`）
- 📖 文章详情页（Markdown 渲染、代码块、上一篇相关样式）
- 🏷️ 标签系统（标签总览 + 标签详情）
- 🗂️ 首页文章导航（按合集/分类归类，点击直达该分类文章）
- 📡 RSS 订阅源（`/rss.xml`）与站点地图（`sitemap-index.xml`）
- 🔍 SEO（title/description/canonical/Open Graph/RSS 自动发现）
- 🌗 亮/暗模式切换（class 策略，无闪烁，`localStorage` 记忆）
- 📱 响应式布局（移动端无横向溢出）
- 🧶 点击进入的门面页（羊毛毡插画，点击上拉淡出）
- 🚀 GitHub Pages 自动部署（GitHub Actions）

## 🚀 技术栈

- **Astro** 7（静态站点，无 JS 框架）
- **Tailwind CSS** 4（Vite 插件集成，class 策略暗色模式）
- **Markdown 内容集合**（`src/content/blog/`）

## 📦 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `npm install` | 安装依赖 |
| `npm run dev` | 本地开发，`localhost:4321` |
| `npm run build` | 构建生产站点到 `./dist/` |
| `npm run preview` | 本地预览构建产物 |
updatedDate: 2026-08-19   # 可选：最后更新日期
tags: ['astro', '前端']    # 可选：标签
category: 前端               # 可选：合集/分类（首页文章导航按此归类，默认 未分类）
heroImage: './cover.png'   # 可选：封面图（指向 src/assets 的相对路径）
draft: false               # 可选：草稿，构建时会被过滤
lang: zh-CN                # 可选：预留 i18n
---
```

> 草稿文章（`draft: true`）在 `npm run dev` 下可见，`npm run build` 时会被过滤。📝 写文章

在 `src/content/blog/` 下新建 `.md` 文件，frontmatter 字段：

```yaml
---
title: 文章标题
description: 文章摘要
pubDate: 2026-08-18
tags: ['astro', '前端']
draft: false
---
```

## 🚀 部署到 GitHub Pages

### 1. 配置构建变量

两种方式任选其一（推荐方式二，CI 与本地一致）：

**方式一：本地 `.env` 文件**

复制 `.env.example` 为 `.env` 并填写：

```bash
PUBLIC_SITE=https://<你的用户名>.github.io
PUBLIC_BASE=/            # 用户站点用 /；项目站点用 /<仓库名>
```

**方式二：GitHub Actions 变量**

在仓库 `Settings → Secrets and variables → Actions → Variables` 中添加：
- `PUBLIC_SITE` = `https://<你的用户名>.github.io`
- `PUBLIC_BASE` = `/` 或 `/<仓库名>`

> **用户站点 vs 项目站点：**
> - 用户站点：仓库名必须是 `<用户名>.github.io`，`PUBLIC_BASE` 用 `/`
> - 项目站点：普通仓库名，`PUBLIC_BASE` 必须设为 `/仓库名`，否则资源会 404

### 2. 启用 GitHub Pages

1. 把代码推到 GitHub 仓库
2. 仓库 `Settings → Pages`
3. **Source** 选择 **GitHub Actions**

之后每次推送 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并部署。

### 3. 使用自定义域名（可选）

在 `public/` 下添加 `CNAME` 文件（内容为你的域名），并把 `PUBLIC_SITE` 改为域名、`PUBLIC_BASE` 清空。
自动部署
├── public/                 # 静态资源（favicon、robots.txt、felt-poster.png 门面插画）
├── src/
│   ├── content/
│   │   └── blog/           # Markdown 文章
│   ├── content.config.ts   # 内容集合 schema + glob loader
│   ├── components/         # Header / Footer / ThemeToggle / PostCard / TagBadge / Splash
│   ├── layouts/            # BaseLayout（全局）/ BlogPost（文章布局）
│   ├── lib/                # posts.ts / tags.ts（数据读取与过滤）
│   ├── pages/              # 首页、blog/（列表+详情+标签）、rss.xml、404
│   └── styles/global.css   # Tailwind 入口 + 暗色变体 + 正文排版
├── .env.example            # GitHub Pages 部署变量模板
└── astro.config.mjs        # Astro 配置（site/base/sitemap/Tailwind）
```

## 🗺️ 页面路由

| 路由 | 说明 |
| :--- | :--- |
| `/` | 首页（门面页 + 最新文章） |
| `/blog/` | 文章列表 |
| `/blog/[...slug]/` | 文章详情 |
| `/blog/tag/` | 标签总览 |
| `/blog/tag/[tag]/` | 标签下的文章 |
| `/blog/category/[category]/` | 合集/分类下的文章（首页导航跳转目标） |
| `/rss.xml` | RSS 订阅源 |
| `/sitemap-index.xml` | 站点地图（自动生成） |
| `/404` | 404 页 | ├── components/         # 组件
│   ├── layouts/            # 布局
│   ├── pages/              # 页面路由
│   └── styles/global.css   # Tailwind 入口
└── astro.config.mjs        # Astro 配置
```
